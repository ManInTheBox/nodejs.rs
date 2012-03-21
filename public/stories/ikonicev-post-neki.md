Ikonic je `pedercina` **okorela** Ikonic je `pedercina` **okorela** Ikonic je `pedercina` **okorela** Ikonic je `pedercina` **okorela**

<script>alert("asdfasf");</script>


> ahahhaha

````
<script>alert("asdfasf");</script>
````


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