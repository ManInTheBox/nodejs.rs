var fs = require('fs');

module.exports = function(app, express) {
    return function() {
        app.use(express.profiler());
        app.use(express.logger({
            format: 'short',
            stream: fs.createWriteStream('./logs/app.log', { flags: 'r+' })
        }));
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'neki fancy session secret key :PPP' }));
        app.use(express.csrf());
        app.use(app.router);
        
        app.dynamicHelpers({
            messages: require('express-messages'),
            session: function(req, res) { return req.session; },
            csrfToken: function(req, res) { return req.session._csrf; }
        });
  
        app.use(express.static(__dirname + '/public'));
    };
};
