var db = require('./db'),
    Comment = require('./comment');

var Post = new db.Schema({
    owner: { type: db.ObjectId, ref: 'User' },
    title: { type: String, set: capitalize, trim: true, validate: [length, 'Polje "Naslov" mora biti izmedju 5 i 100 karaktera.'], required: true },
    titleUrl: { type: String, set: beautifyTitle },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    comments: [{ type: db.ObjectId, ref: 'Comment' }],
});

function beautifyTitle(v) {
    return v.toLowerCase().replace(/\s/g, '-');
}

function length(v) {
    return v.length >= 5 && v.length <= 100;
}

function capitalize(v) {
    return v.charAt(0).toUpperCase() + v.slice(1);
}

Post.pre('save', function(next) {
    this.titleUrl = this.title;
    next();
});

module.exports = db.mongoose.model('Post', Post);
