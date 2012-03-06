
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  HttpError = require('./httperror');

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

function grantAccess(req, res, next) {
  if (req.session.user.name.username === 'admin') {
    next();
  } else if (req.params.username === req.session.user.name.username) {
    next();
  } else {
    next(new HttpError(403, 'Nemate dozvolu za pristup.'));
  }
}

app.get('/test', function (req, res, next) {
  var Email = require('./models/email');
  var email = new Email({
    message: {
      to: ['test to']
    },
    type: 1,
  });
  email.save(function (err) {
    if (err) console.log(err);
    res.send(email);
  });
});

// Routes

app.get('/', routes.index);

app.get('/register', routes.user.register);
app.post('/register', routes.user.register);

app.get('/login', routes.user.login);
app.post('/login', routes.user.login);

app.get('/logout', routes.user.logout);

app.get('/user/:username/edit', loginRequired, grantAccess, routes.user.edit);
app.put('/user/:username/edit', loginRequired, grantAccess, routes.user.edit);

app.get('/post', routes.post.list);

app.get('/post/new', loginRequired, routes.post.new);
app.post('/post/new', loginRequired, routes.post.new);

app.get('/post/:postTitle', routes.post.view);

app.get('/post/:postTitle/download', routes.post.download);

app.del('/post/:postId/delete', loginRequired, routes.post.delete);

app.get('/post/:postTitle/edit', loginRequired, routes.post.edit);
app.put('/post/:postTitle/edit', loginRequired, routes.post.edit);

app.post('/post/:postId/comment/new', loginRequired, routes.post.comment.new);

app.get('/post/:postId/comment/:commentId/delete', loginRequired, routes.post.comment.delete); // ovo ce biti app.del()

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);