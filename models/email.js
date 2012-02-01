var db = require('./db'),
    mail = require('mail').Mail({
        host: 'localhost'
    });

const STATUS_NOT_SENT = 0;
const STATUS_SENT = 1;

var types = {
    'register': 1,
};

var Email = new db.Schema({
    message: {
        from: String,
        to: [String],
        subject: String
    },
    body: String,
    status: { type: Number, default: STATUS_NOT_SENT },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    sendAt: Date,
    type: Number
});

Email.methods.send = function(cb) {
    var self = this;
    // nece da prihvati this.message???
    mail.message({
        from: this.message.from,
        to: this.message.to,
        subject: this.message.subject
    })
    .body(this.body)
    .send(function(err) {
        if (err) cb(err);
        self.status = STATUS_SENT;
        self.sendAt = Date.now();
        self.save(function(err) {
            if (err) cb(err);
            cb(null);
        });
    });
};

Email.statics.types = types;

module.exports = db.mongoose.model('Email', Email);
