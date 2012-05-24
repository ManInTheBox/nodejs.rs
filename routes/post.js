var Post = require('../models/post'),
  Comment = require('../models/comment'),
  fs = require('fs'),
  path = require('path'),
  util = require('util'),
  contentPath = path.normalize(__dirname + '/../public/articles/'),
  HttpError = require('../httperror'),
  User = require('../models/user'),
  helpers = require('../helpers'),
  url = require('url');
  qs = require('querystring'),
  credentials = require('../credentials');


/**
 * List action
 */

exports.list = function (req, res, next) {
  var page = +qs.parse(url.parse(req.url).query).page || 1;
  var itemCount = 5;

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
                .populate('_owner')
                .populate('comments')
                .run(function (err, posts) {
                  if (err) return next(err);

                  var length = posts.length;
                  if (length) {
                    posts.forEach(function (post) {
                      var path = contentPath + post.titleUrl + '.md';
                      fs.readFile(path, 'utf8', function (err, content) {
                        if (err) return next(err);
                        post.content = helpers.markdown(content.substring(0, 400));
                        post.createdAtFormatted = helpers.formatDate(post.createdAt);
                        post.commentsCount = post.comments.length;
                        if (--length === 0) res.emit('posts');
                      });
                    });
                  } else {
                    res.emit('posts');
                  }
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
    post._owner = req.session.user._id;
    post.tags = p.tags;

    if (!p.content.length) {
      post.errors = ['Sadržaj je obavezno polje.'];
      return res.render('post/new', { post: post });
    }

    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      post.save(function (err) {
        if (err) {
          if (~err.toString().indexOf('duplicate key'))
            post.errors = ['Naslov je već zauzet.'];

          post.content = p.content;
          res.render('post/new', { post: post });
        } else {
          fs.writeFile(fileName, p.content, function (err) {
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
    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      fs.readFile(fileName, 'utf8', function (err, file) {
        if (err) return next(err);

        post.content = helpers.markdown(file);

        post.createdAtFormatted = helpers.formatDateFine(post.createdAt);
        post.updatedAtFormatted = helpers.formatDateFine(post.updatedAt);

        var length = post.comments.length;

        if (length) {
          post.comments.forEach(function (comment) {
            User.findById(comment._owner, [ 'name.first', 'name.last', 'name.username', 'photo' ]).populate('photo', ['name']).run(function (err, user) {
              if (err) return next(err);

              comment._ownerUsername = user.name.username;
              comment._ownerFullName = user.name.full;
              comment.createdAtFormatted = helpers.formatDateFine(comment.createdAt);
              comment.cssClass = (isLoggedIn() && isCommentOwner(comment)) ? ['thread-alt', 'depth-1'] : 'depth-1';
              comment._ownerPhoto = user.photo.small;
              comment._ownerPhotoName = user.photo.name;

              comment.text = helpers.markdown(comment.text);

              if (--length === 0)
                res.emit('comments loaded');
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
  var fileName = path.join(contentPath, req.params.postTitle + '.md');

  if (fileName.indexOf(contentPath) === 0 && !~fileName.indexOf('\0')) {
    fs.readFile(fileName, function (err, file) {
      if (err) return err.code === 'ENOENT' ? next() : next(err); // 404 or 500
      var content = '';
      var contentType = '';
      fileName = req.params.postTitle;

      switch (req.params.format) {
        case 'md':
          content = file.toString();
          fileName += '.md';
          contentType = 'text/plain';
        break;
        case 'pdf':
          content = file.toString(); // one day...
          fileName += '.pdf';
          contentType = 'application/pdf';
        break;
        default: // html
          content = helpers.markdown(file.toString());
          fileName += '.html';
          contentType = 'text/html'
        break;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename=' + fileName,
        'Content-Length': content.length
      });
      res.end(content);
    });
  } else {
    return next(new HttpError(400));
  }
};

/**
 * Delete action
 */
 
exports.delete = function (req, res, next) {
  Post.findById(req.params.postId, function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404 will catch this...
    post.remove(function (err) {
      if (err) return next(err);
      fs.unlink(contentPath + post.titleUrl + '.md', function (err) {
        if (err) return next(err);
        req.flash('success', 'Uspesno obrisan post.');
        res.end();
      });
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
      post.tags = p.tags;
      post.updatedAt = Date.now();

      if (!p.content.length) {
        post.errors = [ 'Sadržaj je obavezno polje.' ];
        handleSidebar(req, res, next, post, function () {
          res.render('post/edit', { post: post });
        });
        return;
      }

      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);
        post.save(function (err) {
          if (err) {
            if (~err.toString().indexOf('duplicate key')) {
              post.errors = [ 'Naslov je već zauzet.' ];
              post.titleUrl = originalTitleUrl;
            }

            post.content = p.content;
            handleSidebar(req, res, next, post, function () {
              res.render('post/edit', { post: post });
            });
            return;
          }

          fs.rename(contentPath + originalTitleUrl + '.md', filePath, function (err) {
            if (err) return next(err);
            fs.writeFile(filePath, p.content, function (err) {
              if (err) return next(err);
              req.flash('success', 'Uspešno izmenjen članak "' + post.title + '"');
              res.redirect('/post/' + post.titleUrl);
            });
          });
        });
      });
    } else {
      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);
        fs.readFile(filePath, 'utf8', function (err, file) {
          if (err) return next(err);
          post.content = file;
          handleSidebar(req, res, next, post, function () {
            res.render('post/edit', { post: post });
          });
        });
      });
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
        req.flash('success', 'Novi komentar uspešno dodat.');
        res.redirect('/post/' + req.post.titleUrl);
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
      if (comment._owner == _id || req.post._owner == _id) {
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
      } else {
        return next(new HttpError(403)); 
      }
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
      if (comment._owner == _id || req.post._owner == _id) {

        if (req.body.get) {
          return res.send(comment.text);
        } else {
          comment.text = req.body.text;
          comment.save(function (err) {
            if (req.xhr) {
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
      } else {
        return next(new HttpError(403));
      }
    });
  }
};


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