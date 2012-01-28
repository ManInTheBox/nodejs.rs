var Post = require('../models/post'),
    Comment = require('../models/comment'),
    fs = require('fs'),
//    md = require('node-markdown').Markdown;
    md = require('discount'),
    path = require('path'),
    util = require('util'),
    contentPath = __dirname + '/../views/post/content/';
    

exports.list = function(req, res) {
    Post.find({}, function(err, posts) {
        res.render('post/list', { posts: posts });
    });
};

exports.new = function(req, res, next) {
    if (req.body.post) {
        var p = req.body.post;
        var post = new Post({
            title: p.title,
            owner: req.session.user._id
        });
        
        post.save(function(err) {
            if (err) {
                next(err);
            } else {
                var fileName = __dirname + '/../views/post/content/' + post.titleUrl + '.md';
                fs.writeFile(fileName, p.content, function(err) {
                    if (err) {
                        next(err);
                    } else {
                        req.flash('success', 'Novi post uspesno kreiran.');
                        res.redirect('/post');
                    }
                });
            }
        });
        
        
    } else {
        res.render('post/new');
    }
};

exports.view = function(req, res, next) {
    Post.findOne({ titleUrl: req.params.postTitle }).populate('owner').populate('comments').run(function(err, post) {
        if (err) {
            next(err);
        } else {
            var filePath = __dirname + '/../views/post/content/' + post.titleUrl + '.md';
            fs.readFile(filePath, function(err, content) {
                if (err) next(err);
                res.render('post/view', { post: post, content: md.parse(content.toString()) });
            });
        }
    });
};

exports.download = function(req, res, next) {
    var filePath = contentPath + req.params.postTitle + '.md';
    res.download(path.normalize(filePath), function(err) {
        if (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    Post.findById(req.params.postId).remove(function(err) {
        if (err) {
            next(err);
        } else {
            req.flash('success', 'Uspesno obrisan post.');
            res.send('ok');
        }
    });
};

exports.edit = function(req, res, next) {
    Post.findOne({titleUrl: req.params.postTitle}, function(err, post) {
        if (err) {
            next(err);
        } else {
            if (req.body.post) {
                var p = req.body.post;
                post.title = p.title;
                post.updatedAt = Date.now();
                post.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        var filePath = __dirname + '/../views/post/content/' + post.titleUrl + '.md';
                        fs.writeFile(filePath, p.content, function(err) {
                            if (err) {
                                next(err);
                            } else {
                                req.flash('success', 'Uspesno editovan post "' + post.title + '"');
                                res.redirect('/post');
                            }
                        });
                    }
                });
            } else {
                var filePath = __dirname + '/../views/post/content/' + post.titleUrl + '.md';
                fs.readFile(filePath, function(err, file) {
                    res.render('post/edit', { post: post, content: file.toString() });
                });
            }
        }
    });
};

exports.comment = {
    new: function(req, res, next) {
        Post.findById(req.params.postId, function(err, post) {
            if (err) {
                next(err);
            } else {
                post.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        var comment = new Comment({
                            text: req.body.post.comment
                        });
                        comment.save(function(err) {
                            if (err) {
                                next(err);
                            } else {
                                post.comments.push(comment);
                                post.save(function(err) {
                                    if (err) next(err);
                                    req.flash('success', 'Novi komentar uspesno dodat.');
                                    res.redirect('/post/' + post.titleUrl);
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    delete: function(req, res, next) {
        Post.findById(req.params.postId).populate('comments', ['_id'], { _id: req.params.commentId }).run(function(err, post) {
            if (err) next(err);
            post.comments[0].remove(function(err) {
                if (err) next(err);
                req.flash('success', 'Uspesno obrisan komentar');
                res.redirect('/post/' + post.titleUrl);
            });
        });
    }
};
