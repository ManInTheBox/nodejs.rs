/**
 * Helpers
 */
var util = require('util');

/**
 * Models
 */
var User = require('../models/user'),
  Email = require('../models/email');

/**
 * Routes
 */ 
exports.register = function (req, res, next) {
  var user = new User();

  if (req.body.user) { // we have submitted form
    var u = req.body.user;

    user = new User({
      name: {
        first: u.name.first,
        last: u.name.last,
        username: u.name.username
      },
      email: u.email,
      password: u.password
    });
        
    user.save(function (err) {
      if (err) {
        res.render('user/register', { user: user });
      }
      else { // everything is cool, send email and redirect to login
        var mailMessage = {
          from: 'account@nodejs.rs',
          to: [user.email],
          subject: 'Nodejs.rs salje...'
        };
        var mailBody = [
          'Hvala ti ' + user.name.full,
          'Poseti Nodejs.rs da nesto naucis',
          'Pozdrav'
        ].join('\n');
                
        var email = new Email({
          message: mailMessage,
          body: mailBody,
          type: Email.types['register']
        });
                
        email.save(function (err) {
          if (err) next(err);
          req.flash('success', 'Uspesno ste kreirali nalog. Ulogujte se.');
          res.redirect('/login');
        });
      }
    });
  } else {
    res.render('user/register', { user: user });
  }
};

exports.login = function (req, res, next) {
  var user = new User();

  if (req.body.user) {
    var u = req.body.user;

    User.findOne({ email: u.email }, function (err, user) {
      if (err) {
        next(err);
      } else if (user && user.password === user.encryptPassword(u.password)) {
        req.session.user = user;
        req.flash('success', 'Uspesno ste se ulogovali.');
        res.redirect('home');
      } else {
        u.errors.push({login: 'E-mail ili Lozinka nisu ispravni.'});
        res.render('user/login', {user: u});
      }
    });
  } else {
    res.render('user/login', { user: user });
  }
};

exports.edit = function(req, res, next) {
    User.findOne({ 'name.username': req.params.username }, function(err, user) {
        if (err) next(err);
        if (user) {
            var u = req.body.user;
            if (u) {
                user.name.first = u.name.first;
                user.name.last = u.name.last;
                user.name.username = u.name.username;
                user.email = u.email;
                user.password = u.password // ovo nesto zajebava...

                user.save(function(err) {
                    if (err) next(err);
                    req.flash('success', 'Uspesno sacuvane izmene profila.');
                    res.redirect('/post');
                });
            } else {
                res.render('user/edit', { user: user });
            }
        }
        else {
            next(); // 404 ce uhvatiti ovo...
        }
    });
};

exports.logout = function(req, res) {
    delete req.session.user;
    req.flash('success', 'Uspesno ste se izlogovali.');
    res.redirect('/login');
};
