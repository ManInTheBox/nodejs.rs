/**
 * Helpers
 */
var util = require('util'),
  qs = require('querystring'),
  url = require('url');

/**
 * Models
 */
var User = require('../models/user'),
  Email = require('../models/email'),
  Picture = require('../models/picture');

/**
 * Register action
 */
exports.register = function (req, res, next) {
  var user = new User();

  if (req.body.user) { // we have submitted form
    var u = req.body.user;

    user.name = {
      first: u.name.first.length ? u.name.first : undefined,
      last: u.name.last.length ? u.name.last : undefined,
      username: u.name.username
    };
    user.email = u.email;
    user.password = u.password;

    user.save(function (err) {
      if (err) // validation failed
        return res.render('user/register', { user: user });

      // everything is cool, send email and redirect to login
      var email = new Email({
        message: {
          to: [ user.email ]
        },
        type: Email.types['register']
      });

      email.save(function (err) {
        if (err) return next(err);
        req.flash('success', 'Uspesno ste kreirali nalog. Ulogujte se.');
        res.redirect('/login');
      });
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

  var returnUrl = qs.parse(url.parse(req.url).query).returnUrl;

  if (returnUrl) {
    req.session.returnUrl = returnUrl;
  }

  if (req.body.user) {
    var u = req.body.user;

    User.findOne({ email: u.email }, function (err, user) {
      if (err) return next(err);
      if (!user) {
        u.errors = [ 'E-mail ili Lozinka nisu ispravni.' ];
        return res.render('user/login', { user: u });
      }

      if (user.password === user.encryptPassword(u.password)) {
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
        u.errors = [ 'E-mail ili Lozinka nisu ispravni.' ];
        res.render('user/login', { user: u });
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
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('user/view', { user: user });
  });
};
/**
 * Edit action
 */
exports.edit = function (req, res, next) {
  User.findOne({ 'name.username': req.params.username }, function (err, user) {
    if (err) return next(err);
    if (!user) return next(); // 404 will catch this...

    if (req.body.user) {
      var u = req.body.user,
        photo = req.files.user.photo.size ? req.files.user.photo : null;

      if (photo) {
        if (!/jpe?g/.test(photo.type)) {
          user.password = null;
          user.errors = [ 'Dozovljeni format za fotografiju je "jpeg".' ];
          return res.render('user/edit', { user: user });
        }

        var picture = new Picture({
          path: photo.path,
          name: req.session.user.name.username
        });

        picture.crop(function (err) {
          if (err) return next(err);
          picture.save(function (err) {
            if (err) return next(err);
            // process.nextTick(function () {
              res.emit('photo', picture._id);
            // });
          });
        });
      } else {
        process.nextTick(function () {
          res.emit('photo', undefined);
        });
      }

      res.on('photo', function (photo) {
        if (u.password) {
          user.password = u.password;
          user.passwordRepeat = u.passwordRepeat;

          if (!u.passwordRepeat) {
            user.errors = [ 'Morate uneti potvrdu lozinke.' ];
            return res.render('user/edit', { user: user });
          } else if (u.password !== u.passwordRepeat) {
            user.errors = [ 'Lozinke se ne poklapaju.' ];
            return res.render('user/edit', { user: user });
          }
        }

        user.name.first = u.name.first.length ? u.name.first : undefined;
        user.name.last = u.name.last.length ? u.name.last : undefined;
        user.name.username = u.name.username;
        user.photo = photo;
        user.bio.about = u.bio.about.length ? u.bio.about : undefined;
        user.bio.company = u.bio.company.length ? u.bio.company : undefined;
        user.bio.website = u.bio.website.length ? u.bio.website : undefined;
        user.bio.github = u.bio.github.length ? u.bio.github : undefined;
        user.bio.twitter = u.bio.twitter.length ? u.bio.twitter : undefined;
        user.bio.location = u.bio.location.length ? u.bio.location : undefined;

        user.save(function (err) {
          if (err) {
            user.password = null; // don't display anything
            return res.render('user/edit', { user: user });
          }

          if (u.password) {
            User.update({ password: user.encryptPassword() }, function (err) {
              if (err) return next(err);
              req.session.user = user;
              req.flash('success', 'Uspešno sačuvane izmene profila.');
              res.redirect('/user/' + user.name.username);
            });
          } else {
            req.session.user = user;
            req.flash('success', 'Uspešno sačuvane izmene profila.');
            res.redirect('/user/' + user.name.username);
          }
        });
      });
    } else {
      user.password = null; // don't display anything
      res.render('user/edit', { user: user });
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