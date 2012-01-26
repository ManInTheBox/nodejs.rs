var Post = require('../models/post'),
    fs = require('fs'),
//    md = require('node-markdown').Markdown;
    md = require('discount');
    

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
    Post.findOne({ titleUrl: req.params.postTitle }).populate('owner').run(function(err, post) {
        if (err) {
            next(err);
        } else {
            var path = __dirname + '/../views/post/content/' + post.titleUrl + '.md';
            fs.readFile(path, function(err, content) {
                if (err) next(err);
                res.render('post/view', { post: post, content: md.parse(content.toString()) });
            });
        }
    });
};

exports.download = function(req, res, next) {
    var path = __dirname + '/../views/post/content/' + req.params.postTitle + '.md';
    res.download(path,  function(err) {
        if (err) {
            console.log(err);
            next(err);
        }
        console.log('prenet fajl %s', path);
    });
};

exports.delete = function(req, res, next) {
    Post.findOne({titleUrl: req.params.postTitle}).remove(function(err) {
        if (err) next(err);
        req.flash('success', 'Uspesno obrisan "' + req.params.postTitle + '"');
        res.redirect('/post');
    });
};
