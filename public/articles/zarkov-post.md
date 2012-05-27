U sledecem delu koda pokazacu vam kako da izvrsite autorizaciju. Ako je user `admin` automatski ide dalje. Ako nije i ako je prosledjena druga funkcija za autorizaciju ona se poziva. U suprotnom baca se `404`.

```javascript
[raw=auth.js]
/**
 * Performs authorization.
 *
 * Access is automatically granted to admin users, otherwise provided
 * function is called to perform authorization. If no function 
 * is provided request will be ended with 404 status.
 * 
 * @param {Function} function to perform authorization
 */

function grantAccess(fn) {
  return function (req, res, next) {
    for (var i = 0; i < credentials.admins.length; i++) {
      if (credentials.admins[i].email === req.session.user.email) {
        return next(); // forward admin users
      }
    }

    if (fn) // forward to auth fn
      fn(req, res, next);
    else
      return next(new HttpError(404));
  };
}
```

vrlo jednostavno :)

sad primer konkretne funkcije za autorizaciju

```javascript
[raw=post-owner.js]
/**
 * Grants access to post owner.
 */

function postOwner(req, res, next) {
  var conditions = {
    titleUrl: req.params.postTitle,
    _owner: req.session.user._id
  };

  if ('undefined' !== typeof req.params.postId) {
    conditions = {
      _id: req.params.postId,
      _owner: req.session.user._id
    };
  }

  Post.count(conditions, function (err, count) {
    if (err) return next(err);
    return count === 1 ? next() : next(new HttpError(403));
  });
}
```