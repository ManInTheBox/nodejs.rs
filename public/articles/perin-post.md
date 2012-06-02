Ovo je proba

```javascript
[raw=newPost.js]
/**
 * New action
 */

exports.new = function (req, res, next) {
  var post = new Post();

  if (req.body.post) {
    var p = req.body.post;
    post.title = p.title;
    post._owner = req.session.user._id;
    post.tags = p.tags;

    if (!p.content.length) {
      post.errors = ['Sadržaj je obavezno polje.'];
      return res.render('post/new', { post: post });
    }

    var fileName = checkPostSecurity(post, function (err) {
      if (err) return next(err);
      post.save(function (err) {
        if (err) {
          if (~err.toString().indexOf('duplicate key'))
            post.errors = ['Naslov je već zauzet.'];

          post.content = p.content;
          res.render('post/new', { post: post });
        } else {
          fs.writeFile(fileName, p.content.trim(), function (err) {
            if (err) return next(err);
            req.flash('success', 'Novi članak uspešno kreiran.');
            res.redirect('/post');
          });
        }
      });
    });
  } else {
    res.render('post/new', { post: post });
  }
};
```
sada sledi detaljan opis ispod.

[cutHere]

Ovo ispod je nastavak...

```javascript
[raw=normalizeTitle.js]
function normalizeTitle(v) {
  return v
          .toLowerCase()
          .replace(/č/g, 'c')
          .replace(/ć/g, 'c')
          .replace(/š/g, 's')
          .replace(/đ/g, 'dj')
          .replace(/ž/g, 'z')
          .replace(/(\s)+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '')
          .replace(/-{2,}/g, '')
          .replace(/^-/, '')
          .replace(/-$/, '');
};
```