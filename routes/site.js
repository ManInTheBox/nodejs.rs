
/**
 * Helpers module dependencies.
 */

var qs = require('querystring'),
  url = require('url'),
  helpers = require('../helpers');

/**
 * Models module dependencies.
 */

var User = require('../models/user'),
  Email = require('../models/email'),
  Picture = require('../models/picture')
  Post = require('../models/post');

/**
 * Index action
 */

exports.index = function (req, res, next){
  res.render('index', {
    title: 'Dobrodošli na Node Srbija'
  });
};

/**
 * Search action
 */

exports.search = function (req, res, next) {
  var page = +qs.parse(url.parse(req.url).query).page || 1;
  var itemCount = 2;

	if (req.params.tag) {
    var conditions = {
      tags: { $in: [req.params.tag] }
    };
    Post.count(conditions, function (err, postCount) {
      if (err) return next(err);
      var pageCount = Math.ceil(postCount / itemCount) || 1;

      if (page < 0)
        page = 1; // show first page
      if (page > pageCount)
        page = pageCount; // show last page

      var previousPage = page - 1;
      var nextPage = page != pageCount ? page + 1 : null;

      Post.find(conditions).skip((page - 1) * itemCount).limit(itemCount).populate('_owner').run(function (err, posts) {
        if (err) return next(err);
        res.render('site/search', {
          posts: posts,
          q: req.params.tag,
          previousPage: previousPage,
          nextPage: nextPage,
          searchByTag: true,
          title: 'Pretraga'
        });
      });
    });
	} else {
    var q = qs.parse(url.parse(req.url).query).q;
    var conditions = {
      $or: [
        { title: new RegExp(q, 'i') },
        { titleUrl: new RegExp(q, 'i') },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    Post.count(conditions, function (err, postCount) {
      if (err) return next(err);
      var pageCount = Math.ceil(postCount / itemCount) || 1;

      if (page < 0)
        page = 1; // show first page
      if (page > pageCount)
        page = pageCount; // show last page

      var previousPage = page - 1;
      var nextPage = page != pageCount ? page + 1 : null;

      Post.find(conditions).skip((page - 1) * itemCount).limit(itemCount).populate('_owner').run(function (err, posts) {
        if (err) return next(err);
        res.render('site/search', {
          posts: posts,
          q: q,
          previousPage: previousPage,
          nextPage: nextPage,
          searchByTag: false,
          title: 'Pretraga'
        });
      });
    });
  }
};

/**
 * About action
 */

exports.about = function (req, res, next) {
  res.render('site/about');
};