
/**
 * Module dependencies.
 */

var db = require('./db'),
  nodemailer = require('nodemailer'),
  credentials = require('../credentials'),
  jade = require('jade'),
  fs = require('fs');

/**
 *
 */

const PRIORITY_HIGHEST = 1;
const PRIORITY_HIGH = 2;
const PRIORITY_NORMAL = 3;
const PRIORITY_LOW = 4;
const PRIORITY_LOWEST = 5;

/**
 *
 */

var types = {
  'register': 1,
  'newPostComment': 2
};

/**
 *
 */

var transport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: credentials.gmail.username,
    pass: credentials.gmail.password
  }
});

/**
 *
 */

var mailOptions = {
  from: 'Node Srbija <noreply@nodejs.rs>',
  generateTextFromHTML: true
};

var templatePath = __dirname + '/../views/email/';


/**
 * Defines `Email` schema.
 */

var Email = new db.Schema({
  from: { type: String, default: 'Node Srbija <noreply@nodejs.rs>' },
  to: String,
  subject: String,
  data: {},
  html: String,
  sent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  sentAt: Date,
  type: { type: Number, default: 0 },
  priority: { type: Number, default: PRIORITY_NORMAL },
  sendingCounter: { type: Number, default: 0 }
});

/**
 *
 */

Email.methods.send = function (cb) {

  // var s = new Date().getTime();
  // console.log('cekam 5 sekundi', new Date())
  // while(new Date().getTime() < s + 5000);
  // console.log('proslo 5 sekundi', new Date())

  cb = cb || function () {};
  var self = this;

  mailOptions['to'] = self.to;
  mailOptions['subject'] = self.subject;
  mailOptions['html'] = self.html;
  self.sendingCounter++;
  self.save(function (err) {
    if (err) return cb(err);
    console.log('about to send', self.sent)
    transport.sendMail(mailOptions, function (err, res) {
      if (err) return cb(err);
      self.sent = true;
      self.sentAt = Date.now();
      self.save(function (err) {
        if (err) return cb(err);
        cb(null);
      })
    });
  });
};

/**
 *
 */

Email.methods.configure = function configure(next) {
  var self = this;
  switch (+self.type) {
    case types['register']:
      fs.readFile(templatePath + 'register.jade', 'utf8', function (err, file) {
        if (err) return next(err);
        self.subject = 'Registracija na Node Srbija';
        self.html = jade.compile(file)(self.data);
        self.data = undefined; // we don't need this to be saved
        self.priority = PRIORITY_HIGHEST;
        self.save(function (err) {
          if (err) return next(err);
          next();
        });
      });
    break;
    case types['newPostComment']:
      fs.readFile(templatePath + 'newpostcomment.jade', 'utf8', function (err, file) {
        if (err) return next(err);
        self.subject = 'Novi komentar na Node Srbija';
        self.html = jade.compile(file)(self.data);
        self.data = undefined; // we don't need this to be saved
        self.save(function (err) {
          if (err) return next(err);
          next();
        });
      });
    break;
  }
}

Email.pre('save', function (next) {
  if (this.isNew) {
    this.configure(function (err) {
      if (err) return next(err);
      next();
    });
  } else {
    next();
  }
});


/**
 *
 */

Email.statics.types = types;

/**
 * Expose `Email` model.
 */

module.exports = db.mongoose.model('Email', Email);