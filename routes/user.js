/**
 * Helpers
 */
var util = require('util');

/**
 * Models
 */
var User = require('../models/user');

/**
 * Routes
 */ 
exports.register = function(req, res, next) {
    if (req.body.user) { // we have submitted form
        var u = req.body.user;
        var user = new User({
            name: {
                first: u.name.first,
                last: u.name.last
            },
            email: u.email,
            password: u.password
        });
        
        user.save(function(err) {
            if (err) {
                res.render('user/register', {user: user});
            }
            else {
                req.flash('success', 'Uspesno ste kreirali nalog. Ulogujte se.');
                res.redirect('/login');
            }
        });
    } else {
        res.render('user/register');
    }
};

exports.login = function(req, res, next) {
    if (req.body.user) {
        var u = req.body.user;
        u.errors = [];
        
        if (u.email === '') {
            u.errors.push({email: 'Polje "E-mail" je obavezno.'});
        }
        if (u.password === '') {
            u.errors.push({password: 'Polje "Lozinka" je obavezno.'});
        }
        
        if (u.errors.length) {
            res.render('user/login', {user: u});
        } else {
            User.findOne({email: u.email}, function(err, user) {
                if (err) {
                    next(err);
                } else if (user && user.password === user.encryptPassword(u.password)) {
                    req.session.user = user;
                    req.flash('success', 'Uspesno ste se ulogovali.');
                    res.redirect('/');
                } else {
                    u.errors.push({login: 'E-mail ili Lozinka nisu ispravni.'});
                    res.render('user/login', {user: u});
                }
            });
        }
    } else {
        res.render('user/login');
    }
};

exports.logout = function(req, res) {
    delete req.session.user;
    req.flash('success', 'Uspesno ste se izlogovali.');
    res.redirect('/login');
};
