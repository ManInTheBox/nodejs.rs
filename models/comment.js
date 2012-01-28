var db = require('./db');

var Comment = new db.Schema({
//    _creator: { type: db.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = db.mongoose.model('Comment', Comment);
