var db = require('./db'),
  helpers = require('../helpers');

var Post = new db.Schema({
  owner: { type: db.ObjectId, ref: 'User' },
  title: { 
    type: String, 
    set: helpers.toUpperCaseFirst,
    trim: true,
    validate: [length, 'Polje "Naslov" mora biti izmedju 5 i 100 karaktera.'],
    required: true
  },
  titleUrl: { type: String, set: normalizeTitle },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  comments: [{ type: db.ObjectId, ref: 'Comment' }],
});

function normalizeTitle(v) {
  return v.toLowerCase().replace(/\s/g, '-');
};

function length(v) {
    return v.length >= 5 && v.length <= 100;
}

Post.pre('save', function (next) {
  this.titleUrl = this.title;
  next();
});

Post.methods.normalizeTitle = normalizeTitle;

Post.statics.findWithFullDetails = function (postTitle, cb) {
  return this.findOne({ titleUrl: postTitle }).populate('owner').populate('comments').run(cb);
};

module.exports = db.mongoose.model('Post', Post);

// Post.pre('init', function (next) {
//   next(new Error('ne moze bre post!!!'));
// });

