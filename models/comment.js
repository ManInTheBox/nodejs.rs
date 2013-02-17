
/**
 * Module dependencies.
 */

var db = require('./db');

/**
 * Defines `Comment` schema.
 */

var Comment = new db.Schema({
  _owner: { type: db.ObjectId, ref: 'User' },
  text: {
    type: String,
    required: [ true, 'Sadržaj komentara je obavezno polje.' ],
    min: [ 2, 'Komentar je prekratak (minimum je {min} karaktera).' ],
    max: [ 5000, 'Komentar je predugačak (maksimum je {max} karaktera).' ],
    trim: true
  },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Module exports.
 */

module.exports = db.mongoose.model('Comment', Comment);