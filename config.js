
/**
 * Module dependencies.
 */

var fs = require('fs'),
  app = require('./app');
  express = require('express'),
  MongoStore = require('session-mongoose'),
  helpers = require('./helpers'),
  HttpError = require('./httperror'),
  InternalError = require('./models/internalerror'),
  util = require('util'),
  browserify = require('browserify'),
  User = require('./models/user'),
  Post = require('./models/post'),
  Email = require('./models/email'),
  credentials = require('./credentials');

/**
 * Module exports.
 */

module.exports = function () {

  /**
   * Use favicon.ico
   */

  app.use(express.favicon(__dirname + '/public/favicon.ico'));

  /**
   * Use logger middleware
   */

  // This is useless, because Nodejitsu doesn't
  // provide interface to collect logs.
  // Uncomment when custom server is available.
  //
  // app.use(express.logger({
  //   stream: fs.createWriteStream('./logs/app.log', { flags: 'r+' })
  // }));

  /**
   * Sets views path.
   */

  app.set('views', __dirname + '/views');

  /**
   * Sets view engine to `jade`
   */

  app.set('view engine', 'jade');

  /**
   * Sets view options.
   *
   * Available functions in all views are:
   *
   * - {String} substring(String string)
   * - {Date} date(Date date)
   * - {String} encode(Sting html)
   */

  app.set('view options', {
    substring: helpers.substring,
    date: helpers.formatDateFine,
    encode: helpers.encode
  });

  /**
   * Use body parser middleware.
   */

  app.use(express.bodyParser());

  /**
   * Use method override middleware.
   */

  app.use(express.methodOverride());

  /**
   * Use cookie parser middleware.
   */

  app.use(express.cookieParser());

  /**
   * Use session middleware.
   */

  app.use(express.session({
    secret: credentials.session,
    store: new MongoStore({ url: credentials.db })
  }));

  /**
   * Use CSRF middleware.
   */

  app.use(express.csrf());

  /**
   * Use router middleware.
   */

  app.use(app.router);

  /**
   * Sets dynamic helpers.
   *
   * Available helpers are:
   *
   * - {String} messages()
   * - {Object} session
   * - {String} csrfToken
   * - {Boolean} isAdmin
   * - {String} currentUrl
   * - {Object} sidebar
   */

  app.dynamicHelpers({
    messages: require('express-messages'),
    session: function (req, res) { return req.session; },
    csrfToken: function (req, res) { return req.session._csrf; },
    isAdmin: function (req, res) {
      if (req.session.user) {
        for (var i = 0; i < credentials.admins.length; i++) {
          if (credentials.admins[i].email === req.session.user.email)
            return true;
        }
      }
    },
    currentUrl: function (req, res) { return req.url; },
    sidebar: function (req, res) { return req.sidebar; },
  });

  /**
   * Sets application public directory.
   */

  app.use(express.static(__dirname + '/public'));

  /**
   * Use `browserify` to expose modules to the browser
   */

  app.use(browserify({
    require: {
      helpers: './helpers'
    },
    filter: function (src) {
      // ready to use js minifier (uglify)
      return src;
    }
  }));
    
  /**
   * Sets handler for `404` pages.
   */

  app.use(function (req, res, next) {
    var message = 'Tražena stranica nije pronađena.';
    if (typeof req.sidebar === 'undefined') {
      handleSidebar(req, res, next, function () {
        res.render('error/404', { status: 404, message: message });
      });
    } else {
      res.render('error/404', { status: 404, message: message });
    }
  });

  /**
   * Sets `development` error handler configuration.
   */

  app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  /**
   * Sets `production` error handler configuration.
   */

  app.configure('production', function () {
    app.use(function (err, req, res, next) {
      
      // take care only for 'real' errors
      if (!(err instanceof HttpError) || err.status >= 500) {
        // if user is logged in save his _id
        var _user = req.session.user
          ? req.session.user._id
          : undefined;
        // if typeof err.status === 'undefined' that's ok for mongoose
        var status = err.status;

        var data = {
          _user: _user,
          name: err.name,
          message: err.message,
          status: status,
          stack: err.stack,
          url: req.url,
          referrer: req.header('referrer'),
          browser: req.header('user-agent'),
          method: req.method
        }

        var internalError = new InternalError(data);

        // user doesn't need to wait while saving error
        // this is for internal purposes, so display
        // 500 error page to user and do it in background
        internalError.save();

        data.createdAt = internalError.createdAt;
        data.username = req.session.user ? req.session.user.name.username : undefined;
        var email = new Email({
          data: data,
          type: Email.types['internalError']
        });
        email.send();
      }

      if ('object' !== typeof err)
        err = { message: err };

      if (err instanceof HttpError) {
        switch (err.status) {
          case 400:
            err.message = 'Vaš zahtev nije validan. Molimo Vas ne pokušavajte to ponovo.';
          break;
          case 403:
            err.message = 'Nemate dozvolu za pristup ovoj stranici.';
          break;
          case 404:
            err.message = 'Tražena stranica nije pronađena.';
          break;
          default:
            err.message = 'Nešto nije u redu i već radimo na tome. Hvala na razumevanju.';
          break;
        }
      } else {
        err.message = 'Nešto nije u redu i već radimo na tome. Hvala na razumevanju.';
      }

      res.render('error/500', { status: err.status || 500, message: err.message });
    });

    app.use(express.errorHandler());
  });

  /**
   * Provides sidebar data needed for view layout.
   * This is used only if `typeof req.sidebar === 'undefined'`
   */

  function handleSidebar(req, res, next, fn) {
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
          fn();
        });
      });
    });
  }

};