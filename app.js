
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  HttpError = require('./httperror'),
  Post = require('./models/post'),
  User = require('./models/user'),
  Comment = require('./models/comment'),
  credentials = require('./credentials');

/**
 * Expose application.
 */

var app = module.exports = express.createServer();

/**
 * Configures application.
 */

app.configure(require('./config'));

// Route middlewares

/**
 * Checks if user is logged in.
 */

function loginRequired(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.returnUrl = req.url;
    req.flash('error', 'Morate se prvo ulogovati.');
    return res.redirect('/login');
  }
}

/**
 * Performs authorization.
 *
 * Access is automatically granted to admin users, otherwise provided
 * function is called to perform authorization. If no function 
 * is provided request will be ended with 404 status.
 * 
 * @param {Function} function to perform authorization
 */

function grantAccess(fn) {
  return function (req, res, next) {
    for (var i = 0; i < credentials.admins.length; i++) {
      if (credentials.admins[i].email === req.session.user.email) {
        return next(); // forward admin users
      }
    }

    if (fn) // forward to auth fn
      fn(req, res, next);
    else
      return next(new HttpError(404));
  };
}

/**
 * Grants access to profile owner.
 */

function profileOwner(req, res, next) {
  if (req.params.username === req.session.user.name.username) {
    next();
  } else {
    next(new HttpError(403));
  }
}

/**
 * Grants access to post owner.
 */

function postOwner(req, res, next) {
  var conditions = {
    titleUrl: req.params.postTitle,
    _owner: req.session.user._id
  };

  if ('undefined' !== typeof req.params.postId) {
    conditions = {
      _id: req.params.postId,
      _owner: req.session.user._id
    };
  }

  Post.count(conditions, function (err, count) {
    if (err) return next(err);
    return count === 1 ? next() : next(new HttpError(403));
  });
}

/**
 * Grants access to comment owner
 * or post owner that comment belongs to.
 */

function commentOwner(req, res, next) {
  // comment owner
  var conditions = {
    _id: req.params.commentId,
    _owner: req.session.user._id
  };
  Comment.count(conditions, function (err, count) {
    if (err) return next(err);
    if (count) return next();
    // post owner that this comment belongs to
    conditions = {
      comments: { $in : [req.params.commentId] },
      _owner: req.session.user._id
    };
    Post.count(conditions, function (err, count) {
      if (err) return next(err);
      return !!count ? next() : next(new HttpError(403));
    });
  });
}

/**
 * Route param pre-conditions.
 *
 * Automatically loads `Post` model based on `postId` param.
 */

app.param('postId', function (req, res, next, postId) {
  Post.findById(postId, function (err, post) {
    if (err) return next(err);
    if (!post) return next(new HttpError(404));
    req.post = post;
    next();
  });
});

/**
 * Provides sidebar data needed for view layout.
 */

function handleSidebar(req, res, next) {
  User.findByUsername('ManInTheBox', function (err, user) {
    if (err) return next(err);
    Post.findByAuthor(user._id, function (err, authorPosts) {
      if (err) return next(err);
      Post.findNewest(function (err, newestPosts) {
        if (err) return next(err);
        req.sidebar = {
          data: {
            user: user,
            posts: {
              author: authorPosts,
              newest: newestPosts
            }
          }
        };
        next();
      });
    });
  });
}

// Routes

/**
 * Handle sidebar for all routes except for public directory.
 */

app.all(/^\/(?!articles|images|javascripts|stylesheets)(.*)$/i, handleSidebar);

/**
 * Root site route.
 */

app.get('/', routes.site.index);

/**
 * Search site route.
 */

app.get('/search/:tag?', routes.site.search);

/**
 * About site route.
 */

app.get('/about', routes.site.about);

/**
 * Admin site route.
 */

 app.get('/admin', loginRequired, grantAccess(), routes.site.admin);

/**
 * Register user route.
 */

app.get('/register', routes.user.register);
app.post('/register', routes.user.register);

/**
 * Login user route.
 */

app.get('/login', routes.user.login);
app.post('/login', routes.user.login);

/**
 * Logout user route.
 */

app.get('/logout', routes.user.logout);

/**
 * View user route.
 */

app.get('/user/:username', routes.user.view);

/**
 * Edit user route.
 */

app.get('/user/:username/edit', loginRequired, grantAccess(profileOwner), routes.user.edit);
app.put('/user/:username/edit', loginRequired, grantAccess(profileOwner), routes.user.edit);

/**
 * List posts route.
 */

app.get('/post', routes.post.list);

/**
 * New post route.
 */

app.get('/post/new', loginRequired, routes.post.new);
app.post('/post/new', loginRequired, routes.post.new);

/**
 * View post route.
 */

app.get('/post/:postTitle', routes.post.view);

/**
 * Edit post route.
 */

app.get('/post/:postTitle/edit', loginRequired, grantAccess(postOwner), routes.post.edit);
app.put('/post/:postTitle/edit', loginRequired, grantAccess(postOwner), routes.post.edit);

/**
 * Delete post route.
 */

app.del('/post/:postId/delete', loginRequired, grantAccess(postOwner), routes.post.delete);

/**
 * Download post route.
 */

app.get('/post/:postTitle.:format?/download', routes.post.download);

/**
 * View raw file route.
 */

 app.get('/post/:postTitle/raw/:name', routes.post.raw);

/**
 * New post comment route.
 */

app.post('/post/:postId/comment/new', loginRequired, routes.post.comment.new);

/**
 * Edit post comment route.
 */

app.put('/post/:postId/comment/:commentId/edit', loginRequired, grantAccess(commentOwner), routes.post.comment.edit);

/**
 * Delete post comment route.
 */

app.del('/post/:postId/comment/:commentId/delete', loginRequired, grantAccess(commentOwner), routes.post.comment.delete);

/**
 * Sets a `Belgrade` time zone.
 *
 * NOTE:
 * There's a known bug with `process.env.TZ`:
 * https://github.com/joyent/node/issues/3286
 *
 * Please report if you find any issues.
 */

// we need to use `jitsu env set TZ 'Europe/Belgrade'` for Nodejitsu platform.
// Uncomment when custom server is available.
// process.env.TZ = 'Europe/Belgrade';

/**
 * Starts the server.
 */

app.listen(app.settings.env = 'development' ? 3000 : 80);

/**
 * Catches all exceptions that were not handled by application.
 */

process.on('uncaughtException', function (err) {
  // just keep server running
});