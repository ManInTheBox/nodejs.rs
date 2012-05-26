var db = require('./db');

var InternalError = new db.Schema({
  _user: { type: db.ObjectId, ref: 'User' },
  name: { type: String },
  message: { type: String },
  stack: { type: String },
  createdAt: { type: Date, default: Date.now },
  url: { type: String },
  referrer: { type: String },
  browser: { type: String },
  method: { type: String }
});

module.exports = db.mongoose.model('InternalError', InternalError);