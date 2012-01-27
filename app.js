
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    errors = require('express-errors');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set(express.logger());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'test' }));
  app.use(app.router);
  app.dynamicHelpers({ messages: require('express-messages') });
  app.dynamicHelpers({ session: function(req, res) { return req.session; } });
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

//errors.bind(app, { layout: false });

function isGuest(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash('error', 'Morate se prvo ulogovati.');
        res.redirect('/login');
    }
}


// Routes

app.get('/', routes.index);

app.all('/register', routes.user.register);

app.all('/login', routes.user.login);

app.get('/logout', routes.user.logout);

app.get('/user/:username/edit', routes.user.edit);
app.put('/user/:username/edit', routes.user.edit);

app.get('/post', routes.post.list);

app.all('/post/new', isGuest, routes.post.new);

app.get('/post/:postTitle', routes.post.view);

app.get('/post/:postTitle/download', routes.post.download); // ne radi... proveri res.sendfile()...

app.get('/post/:postTitle/delete', routes.post.delete);







//errors.define({
//    name: 'BadRequest', // You will be able to access it through `errors.BadRequest` in future
//    message: 'Bad request', // This message for XHR requests
//    status: 400 // HTTP status
//});


//app.get('/400', function(req, res, next) {
//    next(errors.BadRequest);
//});

//app.get('/404', function(req, res, next) {
//    res.render('errors/404');
//});

//app.get('/500', function(req, res, next) {
//    next(new Error('500 errror yaaaaaa!'));
//});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
