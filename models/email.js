var db = require('./db'),
  mail = require('mail').Mail({ host: 'localhost' });

const PRIORITY_HIGHEST = 1;
const PRIORITY_HIGH = 2;
const PRIORITY_NORMAL = 3;
const PRIORITY_LOW = 4;
const PRIORITY_LOWEST = 5;

var types = {
  'register': 1,
};

var Email = new db.Schema({
  message: {
    from: { type: String, default: 'noreply@nodejs.rs' },
    to: [ String ],
    subject: String
  },
  body: String,
  sent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  sentAt: Date,
  type: { type: Number, default: 0 },
  priority: { type: Number, default: PRIORITY_NORMAL }
});

Email.methods.send = function (type, cb) {
  var self = this;

  // if ('undefined' === typeof cb && 'function' === typeof type) {

  // }

    // nece da prihvati this.message???
    mail.message({
        from: this.message.from,
        to: this.message.to,
        subject: this.message.subject
    })
    .body(this.body)
    .send(function(err) {
        if (err) cb(err);
        self.sent = true;
        self.sentAt = Date.now();
        self.save(function(err) {
            if (err) cb(err);
            cb(null);
        });
    });
};

Email.pre('save', function (next) {
  if (+this.type !== 0) {
    switch (+this.type) {
      case types['register']:
        this.message = {
          from: 'register@nodejs.rs',
          subject: 'Registracija na nodejs.rs'
        };
        this.body = 'ovo je test registracionog mejla.';
        this.priority = PRIORITY_HIGHEST;
      break;
    }
  }
  next();
});

Email.statics.types = types;

module.exports = db.mongoose.model('Email', Email);
