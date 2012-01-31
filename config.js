var fs = require('fs'),
    app = require('./app');
    express = require('express'),
//    MongoStore = require('connect-session-mongo'),
    RedisStore = require('connect-redis')(express);

module.exports = function() {
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
        session: function(req, res) { return req.session; },
        csrfToken: function(req, res) { return req.session._csrf; }
    });

    app.use(express.static(__dirname + '/public'));
    
    app.use(function(req, res, next) {
        res.render('error/404', { status: 404, url: req.url });
    });
    // da prikaze stack trace
    if (app.settings.env !== 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);        
            res.render('error/500', { status: res.statusCode, err: err });
        });
    }
};
