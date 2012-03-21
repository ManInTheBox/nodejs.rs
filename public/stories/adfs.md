Ovo je jedan tako cool
post.    
    
    /**
     * View action
     */
    exports.view = function (req, res, next) {

      function isLoggedIn() {
        return !!req.session.user;
      }

      function isAdmin() {
        return req.session.user.name.username === 'admin';
      }

      function isPostOwner(post) {
        return req.session.user._id == post.owner._id;
      }

      Post.findWithFullDetails(req.params.postTitle, function (err, post) {
        if (err) return next(err);
        if (!post) return next(); // 404 will catch this...
        var fileName = checkPostSecurity(post, function (err) {
          if (err) return next(err);
          fs.readFile(fileName, 'utf8', function (err, file) {
            if (err) return next(err);
            var flags = md.flags.autolink | md.flags.noHTML;
            post.content = md.parse(file, flags);

            var length = post.comments.length;

            if (length) {
              post.comments.forEach(function (comment) {
                User.findById(comment._owner, [ 'name.first', 'name.last', 'name.username' ], function (err, user) {
                  if (err) return next(err);
                  comment._ownerUsername = user.name.username;
                  comment._ownerFullName = user.name.full;

                  comment.text = md.parse(comment.text, flags);

                  if (--length === 0)
                    res.emit('comments loaded');
                });
              });
              res.on('comments loaded', function() {
                res.render('post/view', { 
                  post: post,
                  canEditPost: isLoggedIn() && (isPostOwner(post) || isAdmin())
                });
              });
            } else {
              res.render('post/view', { 
                post: post,
                canEditPost: isLoggedIn() && (isPostOwner(post) || isAdmin())
              });
            }
          });
        });
      });
    };

Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...Ovo je veoma poucan tekst...aaasdsfsdfdsfasdfas sf asdfasfsadfasfsdfsdfsdfsf3243sdfdfds