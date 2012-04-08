var Post = require('../models/post'),
  Comment = require('../models/comment'),
  fs = require('fs'),
  md = require('discount'),
  flags = md.flags.autolink | md.flags.noHTML;
  path = require('path'),
  util = require('util'),
  contentPath = path.normalize(__dirname + '/../public/stories/'),
  HttpError = require('../httperror'),
  User = require('../models/user'),
  helpers = require('../helpers');


/**
 * List action
 */
exports.list = function (req, res, next) {
  Post.find({}).desc('createdAt').populate('owner').populate('comments').run(function (err, posts) {
    if (err) return next(err);

    var length = posts.length;
    if (length) {
      posts.forEach(function (post) {
        var path = contentPath + post.titleUrl + '.md';
        fs.readFile(path, 'utf8', function (err, content) {
          if (err) return next(err);
          post.content = md.parse(content.substring(0, 400), flags);
          post.createdAtFormatted = helpers.formatDate(post.createdAt);
          post.commentsCount = post.comments.length;
          if (--length === 0) res.emit('posts');
        });
      });
    } else {
      res.emit('posts');
    }
    res.on('posts', function () {
      res.render('post/list', { posts: posts });
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
    post.owner = req.session.user._id;
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
            req.flash('success', 'Novi post uspešno kreiran.');
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
    return req.session.user.name.username === 'admin';
  }

  function isPostOwner(post) {
    return req.session.user._id == post.owner._id;
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
        // var flags = md.flags.autolink | md.flags.noHTML;
        // post.content = md.parse(file, flags);

        post.content = helpers.markdown(file);

        post.createdAtFormatted = helpers.formatDateFine(post.createdAt);

        var length = post.comments.length;

        if (length) {
          post.comments.forEach(function (comment) {
            User.findById(comment._owner, [ 'name.first', 'name.last', 'name.username' ], function (err, user) {
              if (err) return next(err);
              comment._ownerUsername = user.name.username;
              comment._ownerFullName = user.name.full;
              comment.createdAtFormatted = helpers.formatDateFine(comment.createdAt);
              comment.cssClass = (isLoggedIn() && isCommentOwner(comment)) ? ['thread-alt', 'depth-1'] : 'depth-1';

              // comment.text = md.parse(comment.text, flags);
              comment.text = helpers.markdown(comment.text);

              if (--length === 0)
                res.emit('comments loaded');
            });
          });
          res.on('comments loaded', function () {
            res.render('post/view', {
              post: post,
              canEditPost: isLoggedIn() && (isPostOwner(post) || isAdmin())
            });
          });
        } else {
          Post.find({ owner: post.owner }, function (err, posts) {
            if (err) return next(err);
            req.sidebar = {
              viewFile: 'post/_sidebar',
              data: {
                user: post.owner,
                posts: posts
              }
            };
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
          content = md.parse(file.toString());
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
        post.errors = ['Sadržaj je obavezno polje.'];
        return res.render('post/edit', { post: post });
      }

      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);
        post.save(function (err) {
          if (err) {
            if (~err.toString().indexOf('duplicate key')) {
              post.errors = ['Naslov je već zauzet.'];
              post.titleUrl = originalTitleUrl;
            }

            post.content = p.content;
            return res.render('post/edit', { post: post });
          }

          fs.rename(contentPath + originalTitleUrl + '.md', filePath, function (err) {
            if (err) return next(err);
            fs.writeFile(filePath, p.content, function (err) {
              if (err) return next(err);
              req.flash('success', 'Uspesno editovan post "' + post.title + '"');
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
          res.render('post/edit', { post: post });
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
        req.flash('success', 'Novi komentar uspesno dodat.');
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
      if (comment._owner == _id || req.post.owner == _id) {
        comment.remove(function (err) {
          if (err) return next(err);
          var pos = req.post.comments.indexOf(comment._id);
          req.post.comments.splice(pos, 1); // manually remove it... mongoose bug?

          if (req.post.comments.length === 0) {
            req.post.comments = undefined; // tell mongoose to remove comments key... mongoose bug?
          }

          req.post.save(function (err) {
            if (err) return next(err);
            req.flash('success', 'Uspesno obrisan komentar');
            res.end();
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
    res.end('in progress...');
  }
};


function checkPostSecurity(post, cb) {
  var normalizedTitle = post.normalizeTitle(post.title),
    fileName = path.join(contentPath, normalizedTitle + '.md');

  process.nextTick(function () {
    return fileName.indexOf(contentPath) === 0 && !~fileName.indexOf('\0')
      ? cb(null) : cb(new HttpError(400, 'Vas zahtev nije validan.'));
  });

  return fileName;
}