var db = require('./db'),
  helpers = require('../helpers');

var Post = new db.Schema({
  owner: { type: db.ObjectId, ref: 'User' },
  title: { 
    type: String, 
    set: helpers.toUpperCaseFirst,
    trim: true,
    required: [ true, '{path|Naslov} je obavezno polje.' ],
    min: [ 3, '{path|Naslov} je prekratak (minimum je {min} karaktera).' ],
    max: [ 60, '{path|Naslov} je predugačak (maksimum je {max} karaktera).' ]
  },
  titleUrl: {
    type: String,
    set: normalizeTitle,
    unique: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  comments: [{ type: db.ObjectId, ref: 'Comment' }],
});

function normalizeTitle(v) {
  return v.toLowerCase().replace(/\s/g, '-');
};

Post.pre('save', function (next) {
  this.titleUrl = this.title;
  next();
});

Post.methods.normalizeTitle = normalizeTitle;

Post.statics.findWithFullDetails = function (postTitle, cb) {
  return this.findOne({ titleUrl: postTitle }).populate('owner').populate('comments').run(cb);
};

module.exports = db.mongoose.model('Post', Post);