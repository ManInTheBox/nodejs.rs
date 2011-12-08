
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./models/user').User;
    
mongoose.connect('mongodb://localhost/nodejsrs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/user', function(req, res) {
    var user = new User();
    user.name.first = "Zarko";
    user.name.last = "Stankovic";
    user.birthDate = new Date('1986', '01', '27');
    var result = 'empty';
    
    user.save(function(err) {
       if (err) {
           throw err;
       }
        result = 'cool';
        res.render('user', {
            result: result
        });
    });
});

app.get('/user/:id', function(req, res, next) {
    var condition = name.firstName;
    User.find({condition: req.params.id}, function (err, users) {
       if (err) {
           throw err;
       }
       
       if (users.length == 0) {
           next();
       }
       
       console.log(users)
       res.render('user', {
           user: users[0]
       });
   });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
