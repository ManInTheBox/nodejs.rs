
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  HttpError = require('./httperror'),
  Post = require('./models/post');

var app = module.exports = express.createServer();

/**
 * Application configuration
 */
app.configure(require('./config'));

/**
 * Route middleware
 */
function loginRequired(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.returnUrl = req.url;
    req.flash('error', 'Morate se prvo ulogovati.');
    res.redirect('/login');
  }
}

function grantAccess(fn) {
  return function (req, res, next) {
    if (req.session.user.name.username === 'admin') {
      next();
    }
    else {
      fn(req, res, next);
    }
  };
}

function profileOwner(req, res, next) {
  if (req.params.username === req.session.user.name.username) {
    next();
  } else {
    next(new HttpError(403));
  }
}

function postOwner(req, res, next) {
  var conditions = {
    titleUrl: req.params.postTitle,
    owner: req.session.user._id
  };

  if ('undefined' !== typeof req.params.postId) {
    conditions = {
      _id: req.params.postId,
      owner: req.session.user._id
    };
  }

  Post.count(conditions, function (err, count) {
    if (err) return next(err);
    return count === 1 ? next() : next(new HttpError(403));
  });
}

app.param('postId', function (req, res, next, postId) {
  Post.findById(postId, function (err, post) {
    if (err) return next(err);
    if (!post) return next(new HttpError(404, 'Ne postoji trazeni post.'));
    req.post = post;
    next();
  });
});

// Routes

app.get('/', routes.index);

app.get('/register', routes.user.register);
app.post('/register', routes.user.register);

app.get('/login', routes.user.login);
app.post('/login', routes.user.login);

app.get('/logout', routes.user.logout);

app.get('/user/:username/edit', loginRequired, grantAccess(profileOwner), routes.user.edit);
app.put('/user/:username/edit', loginRequired, grantAccess(profileOwner), routes.user.edit);

app.get('/post', routes.post.list);

app.get('/post/new', loginRequired, routes.post.new);
app.post('/post/new', loginRequired, routes.post.new);

app.get('/post/:postTitle', routes.post.view);

app.get('/post/:postTitle/download', routes.post.download);

app.del('/post/:postId/delete', loginRequired, grantAccess(postOwner), routes.post.delete);

app.get('/post/:postTitle/edit', loginRequired, grantAccess(postOwner), routes.post.edit);
app.put('/post/:postTitle/edit', loginRequired, grantAccess(postOwner), routes.post.edit);

app.post('/post/:postId/comment/new', loginRequired, routes.post.comment.new);

app.del('/post/:postId/comment/:commentId/delete', loginRequired, routes.post.comment.delete);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);



app.get('/test', function (req, res, next) {
  require('fs').readFile('/aaasdfasdf', function (err, f) {
    if (err) return next(err);
  });

  // return next(new Error('nemaaaaa'));

  // var Email = require('./models/email');
  // var email = new Email({
  //   message: {
  //     to: ['zarko.stankovic@itsmyplay.com']
  //   },
  //   type: 1,
  // });

  // // email.bodyData: {
  // //     'fullName': 'Zarko Stankovic',
  // //     'category': 'Car nad carevima'
  // //   };
  // email.save(function (err) {
  //   if (err) return next(err);
  //   res.send(email);
  // });
});



