var db = require('./db');

var Comment = new db.Schema({
  _owner: { type: db.ObjectId, ref: 'User' },
  text: {
    type: String,
    required: [ true, 'Sadržaj komentara je obavezno polje.' ],
    min: [ 2, 'Komentar je prekratak (minimum je {min} karaktera).' ],
    max: [ 500, 'Komentar je predugačak (maksimum je {max} karaktera).' ]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = db.mongoose.model('Comment', Comment);