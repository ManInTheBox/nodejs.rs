var Post = require('../models/post'),
    Comment = require('../models/comment'),
    fs = require('fs'),
//    md = require('node-markdown').Markdown;
    md = require('discount'),
    path = require('path'),
    util = require('util'),
    contentPath = path.normalize(__dirname + '/../public/stories/'),
    HttpError = require('../httperror');


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
  Post.findWithFullDetails(req.params.postTitle, function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404 will catch this...
    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      fs.readFile(fileName, function (err, file) {
        if (err) return next(err);
        post.content = md.parse(file.toString());
        res.render('post/view', { post: post });
      });
    });
  });
};

/**
 * Download action
 */
exports.download = function (req, res, next) {
  var filePath = path.join(contentPath, req.params.postTitle + '.md');
  res.download(filePath, function (err) {
    if (err) return next(err);
  });
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
    new: function(req, res, next) {
        Post.findById(req.params.postId, function(err, post) {
            if (err) {
                next(err);
            } else {
                post.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        var comment = new Comment({
                            text: req.body.post.comment
                        });
                        comment.save(function(err) {
                            if (err) {
                                next(err);
                            } else {
                                post.comments.push(comment);
                                post.save(function(err) {
                                    if (err) next(err);
                                    req.flash('success', 'Novi komentar uspesno dodat.');
                                    res.redirect('/post/' + post.titleUrl);
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    delete: function(req, res, next) {
        Post.findById(req.params.postId).populate('comments', ['_id'], { _id: req.params.commentId }).run(function(err, post) {
            if (err) next(err);
            post.comments[0].remove(function(err) {
                if (err) next(err);
                req.flash('success', 'Uspesno obrisan komentar');
                res.redirect('/post/' + post.titleUrl);
            });
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