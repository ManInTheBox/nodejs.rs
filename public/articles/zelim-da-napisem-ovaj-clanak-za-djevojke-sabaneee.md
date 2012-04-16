  /**
   * Edit comment action
   */

  edit: function (req, res, next) {
    Comment.findById(req.params.commentId, function (err, comment) {
      if (err) return next(err);
      if (!comment) return next();

      var _id = req.session.user._id;
      if (comment._owner == _id || req.post._owner == _id) {
        comment.text = req.body.text;
        comment.save(function (err) {
          if (req.xhr) {
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
      } else {
        return next(new HttpError(403)); 
      }
    });
  }