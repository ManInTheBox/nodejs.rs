var Post = require('../models/post'),
  Comment = require('../models/comment'),
  fs = require('fs'),
  path = require('path'),
  util = require('util'),
  contentPath = path.normalize(__dirname + '/../public/articles/'),
  HttpError = require('../httperror'),
  User = require('../models/user'),
  Email = require('../models/email'),
  helpers = require('../helpers'),
  url = require('url');
  qs = require('querystring'),
  pdf = require('pdfcrowd'),
  credentials = require('../credentials');


/**
 * List action
 */

exports.list = function (req, res, next) {
  var page = +qs.parse(url.parse(req.url).query).page || 1;
  var itemCount = 10;

  Post.count(function (err, postCount) {
    if (err) return next(err);
    var pageCount = Math.ceil(postCount / itemCount) || 1;

    if (page < 0)
      page = 1; // show first page
    if (page > pageCount)
      page = pageCount; // show last page

    var previousPage = page - 1;
    var nextPage = page != pageCount ? page + 1 : null;

    Post.find({})
      .desc('createdAt')
      .skip((page - 1) * itemCount)
      .limit(itemCount)
      .populate('_owner', ['name.username']) // need only username
      .populate('comments', ['_id']) // need only count - none fields
      .run(function (err, posts) {
        if (err) return next(err);

        var length = posts.length;
        posts.forEach(function (post) {
          var cutHere = post.content.indexOf('[cutHere]');
          post.content = helpers.markdown(post.content.substring(0, cutHere));
          post.createdAtFormatted = helpers.formatDate(post.createdAt);

          if (--length === 0) {
            process.nextTick(function () {
              res.emit('posts');
            });
          }
        });

        res.on('posts', function () {
          res.render('post/list', {
            posts: posts,
            previousPage: previousPage,
            nextPage: nextPage
          });
        });
      });
  });
};

/**
 * New action
 */

exports.new = function (req, res, next) {
  var post = new Post();

  if (req.body.post) {
    var p = req.body.post;
    post.title = p.title;
    post.content = p.content;
    post._owner = req.session.user._id;
    post.tags = p.tags;

    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      post.save(function (err) {
        if (err) {
          if (~err.toString().indexOf('duplicate key'))
            post.errors = ['Naslov je već zauzet.'];

          res.render('post/new', { post: post });
        } else {
          fs.writeFile(fileName, post.content, function (err) {
            if (err) return next(err);
            req.flash('success', 'Novi članak uspešno kreiran.');
            res.redirect('/post');
          });
        }
      });
    });
  } else {
    res.render('post/new', { post: post });
  }
};


/**
 * View action
 */

exports.view = function (req, res, next) {

  function isLoggedIn() {
    return !!req.session.user;
  }

  function isAdmin() {
    for (var i = 0; i < credentials.admins.length; i++) {
      if (req.session.user.email === credentials.admins[i].email)
        return true;
    }
    return false;
  }

  function isPostOwner(post) {
    return req.session.user._id == post._owner._id;
  }

  function isCommentOwner(comment) {
    return req.session.user._id == comment._owner
  }

  Post.findWithFullDetails(req.params.postTitle, function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404 will catch this...

    Post.update({ _id: post._id }, { $inc: { viewCount: 1 }}, function (err) {
      if (err) return next(err);

      var fileName = checkPostSecurity(post, function (err) {
        if (err) return next(err);

        post.content = helpers.markdown(post.content);
        post.createdAtFormatted = helpers.formatDateFine(post.createdAt);
        post.updatedAtFormatted = helpers.formatDateFine(post.updatedAt);

        var length = post.comments.length;

        if (length) {
          post.comments.forEach(function (comment) {
            User
              .findById(comment._owner, [ 'name.first', 'name.last', 'name.username', 'photo' ])
              .populate('photo', ['name', 'ext'])
              .run(function (err, user) {

              if (err) return next(err);

              comment._ownerUsername = user.name.username;
              comment._ownerFullName = user.name.full;
              comment.createdAtFormatted = helpers.formatDateFine(comment.createdAt);
              comment.cssClass = (isLoggedIn() && isCommentOwner(comment)) ? ['thread-alt', 'depth-1'] : 'depth-1';
              comment._ownerPhoto = user.photo.small;
              comment._ownerPhotoName = user.photo.name;

              comment.text = helpers.markdown(comment.text);

              if (--length === 0) {
                // sort comments - newer first
                post.comments.sort(function (a, b) {
                  return b.createdAt - a.createdAt;
                });
                res.emit('comments loaded');
              }
            });
          });
          res.on('comments loaded', function () {
            handleSidebar(req, res, next, post, function () {
              res.render('post/view', {
                post: post,
                canEditPost: isLoggedIn() && (isPostOwner(post) || isAdmin())
              });
            });
          });
        } else {
          handleSidebar(req, res, next, post, function () {
            res.render('post/view', { 
              post: post,
              canEditPost: isLoggedIn() && (isPostOwner(post) || isAdmin())
            });
          });
        }
      });
    });
  });
};

/**
 * Download action
 */

exports.download = function (req, res, next) {
  var conditions = { titleUrl: req.params.postTitle };
  Post.findOne(conditions).populate('_owner').run(function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404

    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);

      Post.update({ _id: post._id }, { $inc: { downloadCount: 1 }}, function (err) {
        if (err) return next(err);

        // Used for generating HTML content.
        // It will save new content on file system and pass
        // new HTML to cb function
        function generateHtml(post, cb) {
          var path = contentPath + '/' + post.titleUrl + '.md';
          var author = post._owner.name.full || post._owner.name.username;

          var hl = contentPath + '/../javascripts/highlight/highlight.pack.js';
          var gh = contentPath + '/../javascripts/highlight/styles/github.min.css';
          var css = contentPath + '/../stylesheets/coolblue.min.css';
          
          fs.readFile(hl, 'utf8', function (err, hl) {
            if (err) return cb(err);
            fs.readFile(gh, 'utf8', function (err, gh) {
              if (err) return cb(err);
              fs.readFile(css, 'utf8', function (err, css) {
                if (err) return cb(err);

                post.content = helpers.markdown(post.content);
                // transform relative to absolute urls
                post.content = post.content.replace(
                  /\<a class="raw-file" href="#([\w-_. ]+)"\>/g, 
                  '<a class="raw-file" href="http://nodejs.rs/post/' + post.titleUrl + '/raw/$1">');

                var html = [
                  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
                  '<html>',
                  '  <head>',
                  '    <title>' + post.title + ' - Node Srbija</title>',
                  '    <meta charset="utf-8">',
                  '    <script type="text/javascript">',
                  '      ' + hl,
                  '    </script>',
                  '    <script type="text/javascript">',
                  '      hljs.initHighlightingOnLoad();',
                  '    </script>',
                  '    <style type="text/css">',
                  '      ' + gh,
                  '    </style>',
                  '    <style type="text/css">',
                  '      ' + css,
                  '    </style>',
                  '  </head>',
                  '  <body style="margin: 0 auto; width: 978px;">',
                  '    <h3>',
                  '      <a href="http://nodejs.rs/post/' + post.titleUrl + '">' + post.title + '</a>',
                  '    </h3>',
                  '    <div style="margin: 0 0 70px 3px; font-size: 14px;">',
                  '      Napisao <a href="http://nodejs.rs/user/'+post._owner.name.username+'">'+author+'</a>, dana '+helpers.formatDateFine(post.createdAt),
                  '    </div>',
                  '    ' + post.content,
                  '    <div style="text-align: center; font-size: 0.8em;">',
                  '      Preuzeto sa Node Srbija - <a href="http://nodejs.rs">http://nodejs.rs</a>',
                  '    </div>',
                  '  </body>',
                  '</html>'
                ].join('\n');

                var pos = fileName.lastIndexOf('.md');
                var htmlFileName = fileName.substring(0, pos) + '.html';
                // save HTML for future use
                fs.writeFile(htmlFileName, html, 'utf8', function (err) {
                  if (err) return cb(err);
                  cb(null, html);
                });
              });
            });
          });
        }

        var author = post._owner.name.full || post._owner.name.username;
        // TODO: make ReadStream and pipe it to ServerResponse
        // instead of read whole file and then respond with that file 
        switch (req.params.format) {
          case 'md':
            post.content = [
              '### [' + post.title + '](http://nodejs.rs/post/' + post.titleUrl + ')',
              'Napisao _['+author+'](http://nodejs.rs/user/'+post._owner.name.username+')_, dana '+helpers.formatDateFine(post.createdAt),
              '\n\n'
            ].join('\n') + post.content;

            res.send(post.content, {
              'Content-Type': 'text/plain',
              'Content-Disposition': 'attachment; filename="' + post.titleUrl + '.md"'
            });
          break;
          case 'pdf':
            var pos = fileName.lastIndexOf('.md');
            var pdfFileName = fileName.substring(0, pos) + '.pdf';
            // check if we already have generated PDF content to serve it immediately
            path.exists(pdfFileName, function (exists) {
              if (exists && !post.shouldGeneratePdf) {
                fs.readFile(pdfFileName, function (err, pdf) {
                  if (err) return next(err);
                  res.send(pdf, {
                    'Content-Type': 'application/pdf',
                    'Cache-Control': 'no-cache',
                    'Accept-Ranges': 'none',
                    'Content-Disposition': 'attachment; filename="' + post.titleUrl + '.pdf"'
                  });
                });
              } else { // need to generate PDF content
                generateHtml(post, function (err, html) {
                  if (err) return next(err);
                  Post.update({ _id: post._id }, { shouldGeneratePdf: false }, function (err) {
                    if (err) return next(err);
                    var client = new pdf.Pdfcrowd(credentials.pdf.username, credentials.pdf.password);
                    client.convertHtml(
                      html, {
                        pdf: function (rstream) {
                          var wstream = fs.createWriteStream(pdfFileName);
                          rstream.pipe(wstream); // save PDF for future use
                          // on read end rstream.pipe(wstream) will automatically call wstream.end()!
                        },
                        error: function (message, status) {
                          // forward as 5xx to error handler
                          return next(new HttpError(status, message));
                        },
                        end: function () {
                          // newly generated PDF is now saved so respond with it
                          fs.readFile(pdfFileName, function (err, pdf) {
                            if (err) return next(err);
                            res.send(pdf, {
                              'Content-Type': 'application/pdf',
                              'Cache-Control': 'no-cache',
                              'Accept-Ranges': 'none',
                              'Content-Disposition': 'attachment; filename="' + post.titleUrl + '.pdf"'
                            });
                          });
                        }
                      }, {
                      author: author + ' - Node Srbija (http://nodejs.rs)',
                      page_layout: 2,
                      page_mode: 2
                    });
                  });
                });
              }
            });
          break;
          default: // html
            var pos = fileName.lastIndexOf('.md');
            var htmlFileName = fileName.substring(0, pos) + '.html';
            // check if we already have valid HTML content to serve it immediately
            if (!post.shouldGenerateHtml) {
              fs.readFile(htmlFileName, 'utf8', function (err, html) {
                if (err) return next(err);
                res.send(html, {
                  'Content-Disposition': 'attachment; filename="' + post.titleUrl + '.html"'
                });
              });
            } else { // need to generate HTML content
              generateHtml(post, function (err, html) {
                if (err) return next(err);
                Post.update({ _id: post._id }, { shouldGenerateHtml: false }, function (err) {
                  if (err) return next(err);
                  res.send(html, {
                    'Content-Disposition': 'attachment; filename="' + post.titleUrl + '.html"'
                  });
                });
              });
            }
          break;
        }
      });
    });
  });
};

/**
 * Delete action
 */
 
exports.delete = function (req, res, next) {
  Post.findById(req.params.postId).populate('comments').run(function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404 will catch this...

    if (post.comments.length) { // remove subdocs - comments
      post.comments.forEach(function (v, i, a) {
        v.remove(function (err) {
          if (err) return next(err);
          if (i === a.length-1) res.emit('comments removed');
        });
      });
    } else {
      process.nextTick(function () {
        res.emit('comments removed');
      });
    }

    var postPath = contentPath + post.titleUrl;

    // remove markdown file
    res.on('comments removed', function () {
      post.remove(function (err) {
        if (err) return next(err);
        fs.unlink(postPath + '.md', function (err) {
          if (err) return next(err);
          res.emit('markdown removed');
        });
      });
    });

    // remove html file
    res.on('markdown removed', function () {
      path.exists(postPath + '.html', function (exists) {
        if (exists) {
          fs.unlink(postPath + '.html', function (err) {
            if (err) return next(err);
            res.emit('html removed');
          });
        } else {
          process.nextTick(function () {
            res.emit('html removed');
          });
        }
      });
    });

    // remove pdf file
    res.on('html removed', function () {
      path.exists(postPath + '.pdf', function (exists) {
        if (exists) {
          fs.unlink(postPath + '.pdf', function (err) {
            if (err) return next(err);
            res.emit('pdf removed');
          });
        } else {
          process.nextTick(function () {
            res.emit('pdf removed');
          });
        }
      });
    });

    // removal complete
    res.on('pdf removed', function () {
      req.flash('success', 'Uspešno obrisan članak.');
      res.end();
    });

  });
};

/**
 * Edit action
 */

exports.edit = function (req, res, next) {
  Post.findOne({ titleUrl: req.params.postTitle }, function (err, post) {
    if (err) return next(err);

    if (req.body.post) {
      var p = req.body.post;
      var originalTitleUrl = post.titleUrl;

      post.title = p.title;
      post.content = p.content;
      post.tags = p.tags;
      post.updatedAt = Date.now();
      post.shouldGenerateHtml = true; // used for generating new HTML (download action)
      post.shouldGeneratePdf = true; // used for generating new PDF (download action)

      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);

        post.save(function (err) {
          if (err) {
            if (~err.toString().indexOf('duplicate key')) {
              post.errors = [ 'Naslov je već zauzet.' ];
              post.titleUrl = originalTitleUrl;
            }

            handleSidebar(req, res, next, post, function () {
              res.render('post/edit', { post: post });
            });
            return;
          }

          fs.rename(contentPath + originalTitleUrl + '.md', filePath, function (err) {
            if (err) return next(err);
            fs.writeFile(filePath, post.content, function (err) {
              if (err) return next(err);
              req.flash('success', 'Uspešno izmenjen članak "' + helpers.encode(post.title) + '"');
              res.redirect('/post/' + post.titleUrl);
            });
          });
        });
      });
    } else {
      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);
        handleSidebar(req, res, next, post, function () {
          res.render('post/edit', { post: post });
        });
      });
    }
  });
};

/**
 * View raw file action
 */

exports.raw = function (req, res, next) {
  Post.findOne({ titleUrl: req.params.postTitle }).populate('comments').run(function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404

    post.content = helpers.markdown(post.content, true);
    var name = req.params.name,
      startSearch = '<input type="hidden" value="[raw=' + name + ']" />',
      endSearch = '<input type="hidden" value="[/raw=' + name + ']" />',
      start = post.content.indexOf(startSearch),
      end = post.content.indexOf(endSearch),
      content = post.content.substring(start + startSearch.length, end);

      // no raw files found in post, try to find some in comments
      if (start === -1 || end === -1) {
        var length = post.comments.length;
        if (length) {
          post.comments.forEach(function (comment) {
            comment.text = helpers.markdown(comment.text, true);
            start = comment.text.indexOf(startSearch);
            end = comment.text.indexOf(endSearch);
            content = comment.text.substring(start + startSearch.length, end);

            // found raw file in comment - respond and exit
            if (start !== -1 || end !== -1) {
             // stop here
             return res.send(content, { 'Content-Type': 'text/plain' });
            } else if (--length === 0) { // no raw files found in comments
              return next(); // 404
            }
          });
        } else {
          return next(); // 404
        }
      } else { // found raw file
        res.send(content, { 'Content-Type': 'text/plain' });
      }
  });
};

/**
 * Post comment actions
 */

exports.comment = {

  /**
   * New comment action
   */

  new: function (req, res, next) {
    var comment = new Comment({
      _owner: req.session.user._id,
      text: req.body.post.comment
    });
    comment.save(function (err) {
      if (err) {
        var errors = [];
        for (var msg in err.errors)
          errors.push(err.errors[msg].message);

        req.flash('error', errors);
        return res.redirect('back');
      }
      req.post.comments.push(comment);
      req.post.save(function (err) {
        if (err) return next(err);
        
        // var commentUrl = 'http://nodejs.rs/post/' + req.post.titleUrl + '#comment-' + comment._id,
        //   author = req.session.user.name.full || req.session.user.name.username,
        //   date = helpers.formatDateFine(comment.createdAt),
        //   username = req.session.user.name.username,
        //   title = req.post.title,
        //   titleUrl = req.post.titleUrl,
        //   commentText = helpers.markdown(comment.text);

        // var conditions = { _id: { $in: req.post.comments } };
        // Comment.distinct('_owner', conditions, function (err, _owners) {
        //   if (err) return next(err);

        //   // add post owner to mail list
        //   if (!~_owners.indexOf(req.post._owner)) {
        //     _owners.push(req.post._owner);
        //   }

        //   var len = _owners.length;
        //   _owners.forEach(function (_owner) {
        //     User.findById(_owner, function (err, user) {
        //       if (err) return next(err);

        //         var email = new Email({
        //           to: user.email,
        //           data: {
        //             title: title,
        //             titleUrl: titleUrl,
        //             date: date,
        //             author: author,
        //             username: username,
        //             commentText: commentText,
        //             commentUrl: commentUrl
        //           },
        //           type: Email.types['newPostComment']
        //         });
                
        //         email.send(function (err) {
        //           if (err) return next(err);

        //           if (--len === 0) {
                    req.flash('success', 'Novi komentar uspešno dodat.');
                    res.redirect('/post/' + req.post.titleUrl);
        //           }
        //         });
        //     });
        //   });
        // });

      });
    });
  },

  /**
   * Delete comment action
   */

  delete: function (req, res, next) {
    Comment.findById(req.params.commentId, function (err, comment) {
      if (err) return next(err);
      if (!comment) return next();

      var _id = req.session.user._id;
      comment.remove(function (err) {
        if (err) return next(err);
        var pos = req.post.comments.indexOf(comment._id);
        req.post.comments.splice(pos, 1); // manually remove it... mongoose bug?

        if (req.post.comments.length === 0) {
          req.post.comments = undefined; // tell mongoose to remove comments key... mongoose bug?
        }

        req.post.save(function (err) {
          if (err) return next(err);
          if (req.xhr) {
            return res.send('Komentar uspešno obrisan.');
          } else {
            req.flash('success', 'Komentar uspešno obrisan.');
            res.redirect('/post/' + req.post.titleUrl);
          }
        });
      });
    });
  },

  /**
   * Edit comment action
   */

  edit: function (req, res, next) {
    Comment.findById(req.params.commentId, function (err, comment) {
      if (err) return next(err);
      if (!comment) return next();

      var _id = req.session.user._id;
      if (req.body.get) {
        return res.send(comment.text);
      } else {
        comment.text = req.body.text;
        comment.save(function (err) {
          if (req.xhr) { // ajax request
            if (err) return res.send({ err: err.errors.text.message });
            return res.send({
              text: helpers.markdown(comment.text),
              msg: 'Komentar uspešno izmenjen.'
            });
          } else {
            if (err) return next(err);
            req.flash('success', 'Komentar uspešno izmenjen.');
            res.redirect('/post/' + req.post.titleUrl);
          }
        });
      }
    });
  }
};

/**
 *
 */

function checkPostSecurity(post, cb) {
  var normalizedTitle = post.normalizeTitle(post.title),
    fileName = path.join(contentPath, normalizedTitle + '.md');

  process.nextTick(function () {
    return (fileName.indexOf(contentPath) === 0 && !~fileName.indexOf('\0'))
      && !~fileName.indexOf('new.md')
      ? cb(null) : cb(new HttpError(400));
  });

  return fileName;
}

/**
 *
 */

function handleSidebar(req, res, next, post, cb) {
  if (post._owner.length) {
    Post.findByAuthor(post._owner).ne('_id', post._id).run(function (err, posts) {
      if (err) return next(err);
      req.sidebar = {
        viewFile: 'post/_sidebar',
        data: {
          user: post._owner,
          posts: posts
        }
      };
      cb();
    });
  } else {
    User.findOne({ _id: post._owner}).populate('photo').run(function (err, user) {
      if (err) return next(err);
      Post.findByAuthor(post._owner).ne('_id', post._id).run(function (err, posts) {
        if (err) return next(err);
        req.sidebar = {
          viewFile: 'post/_sidebar',
          data: {
            user: user,
            posts: posts
          }
        };
        cb();
      });
    });
  }
}