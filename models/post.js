var db = require('./db'),
  helpers = require('../helpers');

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
  viewCount: { type: Number, default: 0 }
});

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

// TODO:
// situacija: Uvod u "Jade": Node template engine
// proizvodi
// uvod-u-jadenode-template-engine
// treba ostaviti jedan - izmedju minimum.
// uvod-u-jade-node-template-engine
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
          .replace(/-{2,}/g, '-')
          .replace(/^-/, '')
          .replace(/-$/, '');
};

Post.pre('save', function (next) {
  this.titleUrl = this.title;
  next();
});

Post.methods.normalizeTitle = normalizeTitle;

Post.statics.findWithFullDetails = function (postTitle, cb) {
  return this.findOne({ titleUrl: postTitle }).populate('_owner').populate('comments').run(cb);
};

Post.statics.findByAuthor = function (author, cb) {
  return this.find({ _owner: author }, cb);
};

Post.statics.findNewest = function (limit, cb) {
  var defultLimit = 10;

  if ('function' === typeof limit) {
    cb = limit;
    limit = defultLimit;
  }

  limit = limit || defultLimit;

  return this.find({}).limit(limit).desc('createdAt').run(cb);
};

module.exports = db.mongoose.model('Post', Post);