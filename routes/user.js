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
 * Register action
 */
exports.register = function (req, res, next) {
  var user = new User();

  if (req.body.user) { // we have submitted form
    var u = req.body.user;

    user.name = {
      first: u.name.first,
      last: u.name.last,
      username: u.name.username
    };
    user.email = u.email;
    user.password = user.encryptPassword(u.password);

    user.save(function (err) {
      if (err) {
        res.render('user/register', { user: user });
      }
      else { // everything is cool, send email and redirect to login
        var email = new Email({
          message: {
            to: [ user.email ]
          },
          type: Email.types['register']
        });

        email.save(function (err) {
          if (err) {
            next(err);
          } else {
            req.flash('success', 'Uspesno ste kreirali nalog. Ulogujte se.');
            res.redirect('/login');
          }
        });
      }
    });
  } else {
    res.render('user/register', { user: user });
  }
};

/**
 * Login action
 */
exports.login = function (req, res, next) {
  var user = new User();

  if (req.body.user) {
    var u = req.body.user;

    User.findOne({ email: u.email }, function (err, user) {
      if (err) {
        next(err);
      } else if (user && (user.password === user.encryptPassword(u.password))) {
        req.session.user = user;
        req.flash('success', 'Uspesno ste se ulogovali.');

        if (req.session.returnUrl) {
          var returnUrl = req.session.returnUrl;
          delete req.session.returnUrl;
          res.redirect(returnUrl);
        } else {
          res.redirect('home');
        }
      } else {
        user.errors = [ 'E-mail ili Lozinka nisu ispravni.' ];
        res.render('user/login', { user: user });
      }
    });
  } else {
    res.render('user/login', { user: user });
  }
};

/**
 * View action
 */
exports.view = function (req, res, next) {
  User.findByUsername(req.params.username, function (err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.render('user/view', { user: user });
  });
};
/**
 * Edit action
 */
exports.edit = function (req, res, next) {
  User.findOne({ 'name.username': req.params.username }, function (err, user) {
    if (err) {
      next(err);
    } else if (user) {
      if (req.body.user) {
        var u = req.body.user;

        if (u.password) {
          user.password = u.password;
          user.passwordRepeat = u.passwordRepeat;

          if (!u.passwordRepeat) {
            user.errors = [ 'Morate uneti potvrdu lozinke.' ];
            res.render('user/edit', { user: user });
            return;
          } else if (u.password !== u.passwordRepeat) {
            user.errors = [ 'Lozinke se ne poklapaju.' ];
            res.render('user/edit', { user: user });
            return;
          }
        }

        user.name.first = u.name.first;
        user.name.last = u.name.last;
        user.name.username = u.name.username;

        if (u.password) {
          user.password = user.encryptPassword(u.password);
        }

        user.save(function (err) {
          if (err) {
            user.password = null; // don't display anything
            res.render('user/edit', { user: user });
          } else {
            req.session.user = user;
            req.flash('success', 'Uspesno sacuvane izmene profila.');
            res.redirect('/post');
          }
        });
      } else {
        user.password = null; // don't display anything
        res.render('user/edit', { user: user });
      }
    } else {
      next(); // 404 will catch this...
    }
  });
};

/**
 * Logout action
 */
exports.logout = function (req, res) {
  delete req.session.user;
  req.flash('success', 'Uspesno ste se izlogovali.');
  res.redirect('/login');
};