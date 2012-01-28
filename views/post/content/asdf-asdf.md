### ovo je neki naslov

    Post.findById(req.params.postId, function(err, post) {
        if (err) next(err);
        res.send(post.title);
    });