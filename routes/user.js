
/**
 * Helpers module dependencies.
 */

var util = require('util'),
  qs = require('querystring'),
  url = require('url');

/**
 * Models module dependencies.
 */

var User = require('../models/user'),
  Email = require('../models/email'),
  Picture = require('../models/picture')
  Post = require('../models/post');

/**
 * Register action
 */

exports.register = function (req, res, next) {
  var user = new User();

  if (req.body.user) { // we have submitted form
    var u = req.body.user;
    u.photo = req.files.user.photo.size ? req.files.user.photo : null;

    user.name = {
      first: u.name.first.length ? u.name.first : undefined,
      last: u.name.last.length ? u.name.last : undefined,
      username: u.name.username
    };
    user.email = u.email;
    user.password = u.password;
    user.bio = {
      about: u.bio.about.length ? u.bio.about : undefined,
      company: u.bio.company.length ? u.bio.company : undefined,
      website: u.bio.website.length ? u.bio.website : undefined,
      github: u.bio.github.length ? u.bio.github : undefined,
      twitter: u.bio.twitter.length ? u.bio.twitter : undefined,
      location: u.bio.location.length ? u.bio.location : undefined,
    };

    user.save(function (err) {
      if (err) { // validation failed
        if (~err.toString().indexOf('duplicate key')) {
          if (~err.toString().indexOf('username')) {
            user.password = u.password;
            user.errors = [ 'Korisničko ime je već zauzeto.' ];
          } else if (~err.toString().indexOf('email')) {
            user.password = u.password;
            user.errors = [ 'E-mail je već zauzet.' ];
          }
        }

        var bio = false;
        if (user.bio.about)
          bio = true;
        if (user.bio.company)
          bio = true;
        if (user.bio.website)
          bio = true;
        if (user.bio.github)
          bio = true;
        if (user.bio.twitter)
          bio = true;
        if (user.bio.location)
          bio = true;

        if (user.name.first || user.name.last || bio) {
          user.displayFullForm = true;
        }
        return res.render('user/register', { user: user });
      }

      if (u.photo) {
        var picture = new Picture({
          name: user.name.username,
          size: u.photo.size,
          type: u.photo.type
        });

        picture.store(u.photo.path, function (err) {
          user.displayFullForm = true;
          if (err) {
            user.remove(function (err) {
              if (err) return next(err);
              user.errors = picture.errors;
              user.password = u.password;
              return res.render('user/register', { user: user });
            });
          } else {
            User.update({ _id: user._id }, { photo: picture._id }, function (err) {
              if (err) return next(err);
              res.emit('user ready');
            });
          }
        });
      } else {
        process.nextTick(function () {
          res.emit('user ready');
        });
      }

      res.on('user ready', function () {
        // everything is cool, send email and redirect to login
        var email = new Email({
          message: {
            to: [ user.email ]
          },
          type: Email.types['register']
        });

        email.save(function (err) {
          if (err) return next(err);
          req.flash('success', 'Uspešno ste kreirali nalog. Sada se možete ulogovati.');
          res.redirect('/login');
        });
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
  var user = new User(),
    returnUrl = qs.parse(url.parse(req.url).query).returnUrl;

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
        req.flash('success', 'Uspešno ste se ulogovali.');

        if (req.session.returnUrl) {
          var returnUrl = req.session.returnUrl;
          delete req.session.returnUrl;
          res.redirect(returnUrl);
        } else {
          res.redirect('/post');
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
    handleSidebar(req, res, next, user, function () {
      res.render('user/view', { user: user });
    });
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
      var u = req.body.user;
      u.photo = req.files.user.photo.size ? req.files.user.photo : null;

      if (u.password) {
        user.password = u.password;
        user.passwordRepeat = u.passwordRepeat;

        if (!u.passwordRepeat) {
          user.errors = [ 'Morate uneti potvrdu lozinke.' ];
          handleSidebar(req, res, next, user, function () {
            res.render('user/edit', { user: user });
          });
          return;
        } else if (u.password !== u.passwordRepeat) {
          user.errors = [ 'Lozinke se ne poklapaju.' ];
          handleSidebar(req, res, next, user, function () {
            res.render('user/edit', { user: user });
          });
          return;
        }
      }

      var originalUsername = user.name.username;

      user.name.first = u.name.first.length ? u.name.first : undefined;
      user.name.last = u.name.last.length ? u.name.last : undefined;
      user.name.username = u.name.username;
      user.bio.about = u.bio.about.length ? u.bio.about : undefined;
      user.bio.company = u.bio.company.length ? u.bio.company : undefined;
      user.bio.website = u.bio.website.length ? u.bio.website : undefined;
      user.bio.github = u.bio.github.length ? u.bio.github : undefined;
      user.bio.twitter = u.bio.twitter.length ? u.bio.twitter : undefined;
      user.bio.location = u.bio.location.length ? u.bio.location : undefined;

      user.save(function (err) {
        if (err) {
          user.name.username = originalUsername;
          user.password = null; // don't display anything
          
          if (~err.toString().indexOf('duplicate key')) {
            user.errors = [ 'Korisničko ime je već zauzeto.' ];
          }
          handleSidebar(req, res, next, user, function () {
            res.render('user/edit', { user: user });
          });
          return;
        }

        if (u.password) {
          User.update({ password: user.encryptPassword() }, function (err) {
            if (err) return next(err);
            req.session.user = user;
            res.emit('ready for photo');
          });
        } else {
          req.session.user = user;
          process.nextTick(function () {
            res.emit('ready for photo');
          });
        }

        res.on('ready for photo', function () {
          if (u.photo) {
            var picture = new Picture({
              name: user.name.username,
              size: u.photo.size,
              type: u.photo.type
            });

            picture.store(u.photo.path, function (err) {
              if (err) {
                user.password = null;
                user.errors = picture.errors;
                handleSidebar(req, res, next, user, function () {
                  res.render('user/edit', { user: user });
                });
                return;
              } else {
                User.update({ _id: user._id }, { photo: picture._id }, function (err) {
                  if (err) return next(err);
                  res.emit('photo done');
                });
              }
            });
          } else {
            process.nextTick(function () {
              res.emit('photo done');
            });
          }
        });

        res.on('photo done', function () {
          req.flash('success', 'Uspešno sačuvane izmene profila.');
          res.redirect('/user/' + user.name.username);
        });

      });
    } else {
      user.password = null; // don't display anything
      handleSidebar(req, res, next, user, function () {
        res.render('user/edit', { user: user });
      });
    }
  });
};

/**
 * Logout action
 */

exports.logout = function (req, res) {
  delete req.session.user;
  req.flash('success', 'Uspešno ste se izlogovali.');
  res.redirect('/login');
};

/**
 * Provides sidebar data needed for view layout.
 */

function handleSidebar(req, res, next, user, cb) {
  Post.findByAuthor(user._id, function (err, posts) {
    if (err) return next(err);
    req.sidebar = {
      viewFile: 'user/_sidebar',
      data: {
        user: user,
        posts: posts
      }
    };
    cb();
  });

}