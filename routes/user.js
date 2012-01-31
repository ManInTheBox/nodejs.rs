/**
 * Helpers
 */
var util = require('util'),
    mail = require('mail').Mail({
        host: 'localhost',
//        username: '',
//        password: ''
    });

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
                last: u.name.last,
                username: u.name.username
            },
            email: u.email,
            password: u.password
        });
        
        user.save(function(err) {
            if (err) {
                res.render('user/register', {user: user});
            }
            else {
                var mailMessage = {
                    from: 'account@nodejs.rs',
                    to: ['zarko.stankovic@itsmyplay.com'],
                    subject: 'Nodejs.rs salje...'
                };
                var mailBody = [
                    'Hvala ti ' + user.name.full,
                    'Poseti Nodejs.rs da nesto naucis',
                    'Pozdrav'
                ].join('\n');
                
                mail.message(mailMessage).body(mailBody).send(function(err) {
                    if (err) throw err;
                    console.log('uspesno poslat mejl');
                });
                
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

exports.edit = function(req, res, next) {
    User.findOne({ 'name.username': req.params.username }, function(err, user) {
        if (err) next(err);
        if (user) {
            var u = req.body.user;
            if (u) {
                console.log(u);
                user.name.first = u.name.first;
                user.name.last = u.name.last;
                user.name.username = u.name.username;
                user.email = u.email;
                user.password = u.password

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
            next(new Error('Ove errore treba srediti.... btw nema tog usera...'));
        }
    });
};

exports.logout = function(req, res) {
    delete req.session.user;
    req.flash('success', 'Uspesno ste se izlogovali.');
    res.redirect('/login');
};
