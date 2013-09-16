
/**
 * Module dependencies.
 */

var db = require('./db'),
  helpers = require('../helpers');

/**
 * Defines `Post` schema.
 */

var Post = new db.Schema({
  _owner: { type: db.ObjectId, ref: 'User' },
  title: { 
    type: String, 
    set: helpers.toUpperCaseFirst,
    trim: true,
    required: [ true, 'Naslov je obavezno polje.' ],
    min: [ 3, 'Naslov je prekratak (minimum je {min} karaktera).' ],
    max: [ 60, 'Naslov je predugačak (maksimum je {max} karaktera).' ]
  },
  titleUrl: {
    type: String,
    set: normalizeTitle,
    unique: true
  },
  content: {
    type: String,
    set: helpers.toUpperCaseFirst,
    trim: true,
    required: [ true, 'Sadržaj je obavezno polje.' ],
    min: [ 10, 'Sadržaj je prekratak (minimum je {min} karaktera).' ],
    max: [ 100000, 'Sadržaj je predugačak (maksimum je {max} karaktera).' ]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: db.ObjectId, ref: 'Comment' }],
  tags: [ String ],
  shouldGenerateHtml: { type: Boolean, default: true },
  shouldGeneratePdf: { type: Boolean, default: true },
  downloadCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  visible: false
});

/**
 * Method will properly set up `tags` collection.
 */

Post.path('tags').set(function (v) {
  var tagsOrigin = v[0].replace(/\s/g, '').toLowerCase().split(',');

  var tags = [];
  for (var i = 0; i < tagsOrigin.length; i++) {
    if (!~tags.indexOf(tagsOrigin[i]) && tagsOrigin[i].length)
      tags.push(tagsOrigin[i]);
  }

  return (tags.length === 1 && tags[0].length === 0)
    ? undefined
    : tags;
});

/**
 * Method to slugify post title.
 *
 * @return {String} slugified title
 * @api private
 */

function normalizeTitle(v) {
  return v
          .toLowerCase()
          .replace(/а/g, 'a')
          .replace(/б/g, 'b')
          .replace(/в/g, 'v')
          .replace(/г/g, 'g')
          .replace(/д/g, 'd')
          .replace(/ђ/g, 'đ')
          .replace(/е/g, 'e')
          .replace(/ж/g, 'ž')
          .replace(/з/g, 'z')
          .replace(/и/g, 'i')
          .replace(/ј/g, 'j')
          .replace(/к/g, 'k')
          .replace(/л/g, 'l')
          .replace(/љ/g, 'lj')
          .replace(/м/g, 'm')
          .replace(/н/g, 'n')
          .replace(/њ/g, 'nj')
          .replace(/о/g, 'o')
          .replace(/п/g, 'p')
          .replace(/р/g, 'r')
          .replace(/с/g, 's')
          .replace(/т/g, 't')
          .replace(/ћ/g, 'ć')
          .replace(/у/g, 'u')
          .replace(/ф/g, 'f')
          .replace(/х/g, 'h')
          .replace(/ц/g, 'c')
          .replace(/ч/g, 'č')
          .replace(/џ/g, 'dž')
          .replace(/ш/g, 'š')
          .replace(/č/g, 'c')
          .replace(/ć/g, 'c')
          .replace(/š/g, 's')
          .replace(/đ/g, 'dj')
          .replace(/ž/g, 'z')
          .replace(/(\s)+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '')
          .replace(/-{2,}/g, '-')
          .replace(/^-/, '')
          .replace(/-$/, '');
}

/**
 * Pre-save middleware.
 */

Post.pre('save', function (next) {
  this.titleUrl = this.title;
  if (!this.titleUrl)
    this.titleUrl = this._id; // backup
  next();
});

/**
 * Expose `normalizeTitle` method (aka `slugify`).
 */

Post.methods.normalizeTitle = normalizeTitle;

/**
 * Syntactic sugar finder.
 *
 * @param {String} post title
 * @param {Function} callback
 */

Post.statics.findWithFullDetails = function (postTitle, cb) {
  return this
          .findOne({ titleUrl: postTitle, visible: true })
          .populate('_owner')
          .populate('comments')
          .run(cb);
};

/**
 * Syntactic sugar finder.
 *
 * @param {User} post author model
 * @param {Function} callback
 */

Post.statics.findByAuthor = function (author, cb) {
  return this.find({ _owner: author, visible: true }, cb);
};

/**
 * Syntactic sugar finder.
 *
 * @param {Number} post limit. default is `10`
 * @param {Function} callback
 */

Post.statics.findNewest = function (limit, cb) {
  var defultLimit = 10;

  if ('function' === typeof limit) {
    cb = limit;
    limit = defultLimit;
  }

  limit = limit || defultLimit;

  return this.find({ visible: true }).limit(limit).desc('createdAt').run(cb);
};

/**
 * Expose `Post` model.
 */

module.exports = db.mongoose.model('Post', Post);