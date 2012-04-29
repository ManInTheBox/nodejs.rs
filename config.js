
/**
 * Module dependencies.
 */

var fs = require('fs'),
  app = require('./app');
  express = require('express'),
  MongoStore = require('session-mongoose'),
  helpers = require('./helpers'),
  HttpError = require('./httperror'),
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

  app.use(express.logger({
    stream: fs.createWriteStream('./logs/app.log', { flags: 'r+' })
  }));

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
      return req.session.user && req.session.user.name.username === 'admin'; 
    },
    currentUrl: function (req, res) { return req.url; },
    sidebar: function (req, res) { return req.sidebar; },
  });

  /**
   * Sets application public directory.
   */

  app.use(express.static(__dirname + '/public'));
    
  /**
   * Sets handler for `404` pages.
   */

  app.use(function (req, res, next) {
    var message = 'Tražena stranica nije pronađena.';
    res.render('error/404', { status: 404, message: message });
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

};