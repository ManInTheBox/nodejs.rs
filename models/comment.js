var db = require('./db');

var Comment = new db.Schema({
});

module.exports = db.mongoose.model('Comment', Comment);
