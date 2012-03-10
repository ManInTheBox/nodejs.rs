var Post = require('../models/post'),
    Comment = require('../models/comment'),
    fs = require('fs'),
//    md = require('node-markdown').Markdown;
    md = require('discount'),
    path = require('path'),
    util = require('util'),
    contentPath = path.normalize(__dirname + '/../public/stories/'),
    HttpError = require('../httperror'),
    User = require('../models/user');


/**
 * List action
 */
exports.list = function (req, res, next) {
  Post.find({}, function (err, posts) {
    if (err) return next(err);
    res.render('post/list', { posts: posts });
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

    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      post.save(function (err) {
        if (err) {
          post.content = p.content;
          res.render('post/new', { post: post });
        } else {
          fs.writeFile(fileName, p.content, function (err) {
            if (err) return next(err);
            req.flash('success', 'Novi post uspesno kreiran.');
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

  Post.findWithFullDetails(req.params.postTitle, function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404 will catch this...
    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      fs.readFile(fileName, function (err, file) {
        if (err) return next(err);
        post.content = md.parse(file.toString());

        var length = post.comments.length;
        post.comments.forEach(function (comment) {
          User.findById(comment._owner, [ 'name.first', 'name.last', 'name.username' ], function (err, user) {
            if (err) return next(err);
            comment._ownerUsername = user.name.username;
            comment._ownerFullName = user.name.full;
            if (--length === 0)
              res.emit('comments loaded');
          });
        });
        res.on('comments loaded', function() {
          res.render('post/view', { 
            post: post,
            canEditPost: isLoggedIn() && (isPostOwner(post) || isAdmin()),
          });
        });
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
      req.flash('success', 'Uspesno obrisan post.');
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
      post.title = p.title;
      post.updatedAt = Date.now();

      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);
        post.save(function (err) {
          if (err) return next(err);
          fs.writeFile(filePath, p.content, function(err) {
            if (err) return next(err);
            req.flash('success', 'Uspesno editovan post "' + post.title + '"');
            res.redirect('/post');
          });
        });
      });
    } else {
      var filePath = checkPostSecurity(post, function (err) {
        if (err) return next(err);
        fs.readFile(filePath, function (err, file) {
          if (err) return next(err);
          res.render('post/edit', { post: post, content: file.toString() });
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
      if (err) return next(err);
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