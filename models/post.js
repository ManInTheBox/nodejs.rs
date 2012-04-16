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
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  comments: [{ type: db.ObjectId, ref: 'Comment' }],
  tags: [ String ]
});

Post.path('tags').set(function (v) {
  var tags = v[0].replace(/\s/g, '').toLowerCase().split(',');

  return (tags.length === 1 && tags[0].length === 0)
    ? undefined
    : tags;
});

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