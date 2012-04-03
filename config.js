var fs = require('fs'),
  app = require('./app');
  express = require('express'),
//    MongoStore = require('connect-session-mongo'),
  RedisStore = require('connect-redis')(express),
  HttpError = require('./httperror');

module.exports = function () {
//        app.use(express.profiler());
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger({
//            format: 'short',
    stream: fs.createWriteStream('./logs/app.log', { flags: 'r+' })
  }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'neki fancy session secret key :PPP',
    store: new RedisStore()
//            store: new MongoStore() // proveriti zasto baca exception...
  }));
  app.use(express.csrf());
  app.use(app.router);

  app.dynamicHelpers({
    messages: require('express-messages'),
    session: function (req, res) { return req.session; },
    csrfToken: function (req, res) { return req.session._csrf; },
    isAdmin: function (req, res) { 
      return req.session.user && req.session.user.name.username === 'admin'; 
    },
    currentUrl: function (req, res) { return req.url; }
  });

  app.use(express.static(__dirname + '/public'));
    
  app.use(function (req, res, next) {
    var message = 'Nemaaaa togaaaa ovdeeee';
    res.render('error/404', { status: 404, message: message, url: req.url });
  });

  app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  app.configure('production', function () {
    app.use(function (err, req, res, next) {

      if (err instanceof HttpError) {
        switch (err.status) {
          case 403:
            err.message = 'Ne moze breeeeeasdfasdf v cxc';
          break;
          case 404:
            err.message = 'Nemaaaa togaaaa ovdeeee';
          break;
          default:
            err.message = 'Nesto je crklo i radim na tome.';
          break;
        }
      }

      res.render('error/500', { status: err.status || 500, message: err.message });
    });
    app.use(express.errorHandler()); 
  });
};