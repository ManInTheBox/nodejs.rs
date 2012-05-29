U ovom tutorijalu cu vam pokazati `cool` kod :)

*kod*

```html
<html>
  <head>
    <title>Hello Node</title>
  </head>
  <body>
    <h3>Hello Node Srbija</h3>
  </body>
</html>
[raw=hello_node_srbija.html]
```

```javascript
[raw=comments.js]
/**
 * Post comment actions
 */

exports.comment = {

  /**
   * New comment action
   */

  new: function (req, res, next) {
    var comment = new Comment({
      _owner: req.session.user._id,
      text: req.body.post.comment
    });
    comment.save(function (err) {
      if (err) {
        var errors = [];
        for (var msg in err.errors)
          errors.push(err.errors[msg].message);

        req.flash('error', errors);
        return res.redirect('back');
      }
      req.post.comments.push(comment);
      req.post.save(function (err) {
        if (err) return next(err);
        req.flash('success', 'Novi komentar uspešno dodat.');
        res.redirect('/post/' + req.post.titleUrl);
      });
    });
  },

  /**
   * Delete comment action
   */

  delete: function (req, res, next) {
    Comment.findById(req.params.commentId, function (err, comment) {
      if (err) return next(err);
      if (!comment) return next();

      var _id = req.session.user._id;
      comment.remove(function (err) {
        if (err) return next(err);
        var pos = req.post.comments.indexOf(comment._id);
        req.post.comments.splice(pos, 1); // manually remove it... mongoose bug?

        if (req.post.comments.length === 0) {
          req.post.comments = undefined; // tell mongoose to remove comments key... mongoose bug?
        }

        req.post.save(function (err) {
          if (err) return next(err);
          if (req.xhr) {
            return res.send('Komentar uspešno obrisan.');
          } else {
            req.flash('success', 'Komentar uspešno obrisan.');
            res.redirect('/post/' + req.post.titleUrl);
          }
        });
      });
    });
  },

  /**
   * Edit comment action
   */

  edit: function (req, res, next) {
    Comment.findById(req.params.commentId, function (err, comment) {
      if (err) return next(err);
      if (!comment) return next();

      var _id = req.session.user._id;
      if (req.body.get) {
        return res.send(comment.text);
      } else {
        comment.text = req.body.text;
        comment.save(function (err) {
          if (req.xhr) { // ajax request
            if (err) return res.send({ err: err.errors.text.message });
            return res.send({
              text: helpers.markdown(comment.text),
              msg: 'Komentar uspešno izmenjen.'
            });
          } else {
            if (err) return next(err);
            req.flash('success', 'Komentar uspešno izmenjen.');
            res.redirect('/post/' + req.post.titleUrl);
          }
        });
      }
    });
  }
};


function checkPostSecurity(post, cb) {
  var normalizedTitle = post.normalizeTitle(post.title),
    fileName = path.join(contentPath, normalizedTitle + '.md');

  process.nextTick(function () {
    return (fileName.indexOf(contentPath) === 0 && !~fileName.indexOf('\0'))
      && !~fileName.indexOf('new.md')
      ? cb(null) : cb(new HttpError(400));
  });

  return fileName;
}

function handleSidebar(req, res, next, post, cb) {
  if (post._owner.length) {
    Post.findByAuthor(post._owner).ne('_id', post._id).run(function (err, posts) {
      if (err) return next(err);
      req.sidebar = {
        viewFile: 'post/_sidebar',
        data: {
          user: post._owner,
          posts: posts
        }
      };
      cb();
    });
  } else {
    User.findOne({ _id: post._owner}).populate('photo').run(function (err, user) {
      if (err) return next(err);
      Post.findByAuthor(post._owner).ne('_id', post._id).run(function (err, posts) {
        if (err) return next(err);
        req.sidebar = {
          viewFile: 'post/_sidebar',
          data: {
            user: user,
            posts: posts
          }
        };
        cb();
      });
    });
  }
}
```