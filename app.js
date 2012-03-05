
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(require('./config'));

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


function restrictAccess(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash('error', 'Morate se prvo ulogovati.');
        res.redirect('/login');
    }
}


// Routes

app.get('/', routes.index);

app.get('/register', routes.user.register);
app.post('/register', routes.user.register);

app.get('/login', routes.user.login);
app.post('/login', routes.user.login);

app.get('/logout', routes.user.logout);

app.get('/user/:username/edit', routes.user.edit);
app.put('/user/:username/edit', routes.user.edit);

app.get('/post', routes.post.list);

app.get('/post/new', restrictAccess, routes.post.new);
app.post('/post/new', restrictAccess, routes.post.new);

app.get('/post/:postTitle', routes.post.view);

app.get('/post/:postTitle/download', routes.post.download);

app.del('/post/:postId/delete', restrictAccess, routes.post.delete);

app.get('/post/:postTitle/edit', restrictAccess, routes.post.edit);
app.put('/post/:postTitle/edit', restrictAccess, routes.post.edit);

app.post('/post/:postId/comment/new', routes.post.comment.new);

app.get('/post/:postId/comment/:commentId/delete', restrictAccess, routes.post.comment.delete); // ovo ce biti app.del()

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);