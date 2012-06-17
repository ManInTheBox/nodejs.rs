Testiranje...


[cutHere]

```javascript
[raw=test.js]
exports.raw = function (req, res, next) {
  Post.findOne({ titleUrl: req.params.postTitle }).populate('comments').run(function (err, post) {
    if (err) return next(err);
    if (!post) return next(); // 404

    var name = req.params.name;
    // var fileName = checkPostSecurity(post, function (err) {
    //   if (err) return next(err);
      // fs.readFile(fileName, 'utf8', function (err, file) {
        if (err) return next(err);
        post.content = helpers.markdown(post.content, true);
        var startSearch = '<input type="hidden" value="[raw=' + name + ']" />',
          endSearch = '<input type="hidden" value="[/raw=' + name + ']" />',
          start = post.content.indexOf(startSearch),
          end = post.content.indexOf(endSearch),
          content = post.content.substring(start + startSearch.length, end);

          // no raw files found in post, try to find some in comments
          if (start === -1 || end === -1) {
            var length = post.comments.length;
            post.comments.forEach(function (comment) {
              comment.text = helpers.markdown(comment.text, true);
              start = comment.text.indexOf(startSearch);
              end = comment.text.indexOf(endSearch);
              content = comment.text.substring(start + startSearch.length, end);

              // found raw file in comment - respond and exit
              if (start !== -1 || end !== -1) {
               // stop here
               return res.send(content, { 'Content-Type': 'text/plain' });
              } else if (--length === 0) { // no raw files found in comments
                return next(); // 404
              }
            });
          } else { // found raw file
            res.send(content, { 'Content-Type': 'text/plain' });
          }
      // });
    // });

  });
};
```