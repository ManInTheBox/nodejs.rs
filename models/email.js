
/**
 * Module dependencies.
 */

var db = require('./db'),
  nodemailer = require('nodemailer'),
  credentials = require('../credentials'),
  jade = require('jade'),
  fs = require('fs');

/**
 * Priority constants.
 */

const PRIORITY_HIGHEST = 1;
const PRIORITY_HIGH = 2;
const PRIORITY_NORMAL = 3;
const PRIORITY_LOW = 4;
const PRIORITY_LOWEST = 5;

/**
 * Email types this model supports.
 */

var types = {
  'register': 1,
  'newPostComment': 2,
  'internalError': 3
};

/**
 * Sets up email transport layer.
 */

var transport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: credentials.gmail.username,
    pass: credentials.gmail.password
  }
});

/**
 * Email views template path.
 */

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
  sendingCounter: { type: Number, default: 0 },
  error: String
});

/**
 * This method will actually send an email.
 *
 * Please DON'T call it directly in your application code!
 * It's called only by email deamon command.
 *
 * @api private
 */

Email.methods.doSend = function (cb) {
  cb = cb || function () {};
  var self = this;

  var mailOptions = {
    from: self.from || 'Node Srbija <noreply@nodejs.rs>',
    generateTextFromHTML: true,
    to: self.to,
    subject: self.subject,
    html: self.html
  };

  self.sendingCounter++;
  self.save(function (err) {
    if (err) return cb(err);
    transport.sendMail(mailOptions, function (err, res) {
      if (err) {
        self.error = err;
        self.save(function (err) {
          if (err) return cb(err);
          return cb(err);
        });
      }
      self.sent = true;
      self.sentAt = Date.now();
      self.save(function (err) {
        if (err) return cb(err);
        cb(null);
      });
    });
  });
};

/**
 * Configures email model based on its type.
 *
 * @api private
 */

Email.methods.configure = function configure(next) {
  var self = this;
  switch (+self.type) {
    case types['register']:
      fs.readFile(templatePath + 'register.jade', 'utf8', function (err, file) {
        if (err) return next(err);
        self.subject = 'Dobrodošli na Node Srbija!';
        self.html = jade.compile(file)(self.data);
        self.data = undefined; // we don't need this to be saved
        self.priority = PRIORITY_LOW;
        self.save(function (err) {
          if (err) return next(err);
          next();
        });
      });
    break;
    case types['newPostComment']:
      fs.readFile(templatePath + 'newpostcomment.jade', 'utf8', function (err, file) {
        if (err) return next(err);
        self.subject = 'Novi komentar na Node Srbija: ' + self.data.title;
        self.html = jade.compile(file)(self.data);
        self.data = undefined; // we don't need this to be saved
        self.priority = PRIORITY_HIGH;
        self.save(function (err) {
          if (err) return next(err);
          next();
        });
      });
    break;
    case types['internalError']:
      fs.readFile(templatePath + 'internalerror.jade', 'utf8', function (err, file) {
        if (err) return next(err);
        self.subject = 'Internal Error - Node Srbija ('+self.data.createdAt+')';
        self.html = jade.compile(file)(self.data);
        self.data = undefined; // we don't need this to be saved
        self.priority = PRIORITY_HIGHEST;

        self.to = '';
        for (var i = 0; i < credentials.admins.length; i++) {
          self.to += credentials.admins[i].email + ',';
        }
        self.to = self.to.substring(0, self.to.length-1);

        self.save(function (err) {
          if (err) return next(err);
          next();
        });
      });
    break;
  }
};

/**
 * Please use this method in your application code.
 * It will properly configure email and save it into database.
 *
 * @param {Function} callback
 * @api public
 */

Email.methods.send = function (cb) {
  cb = cb || function () {};
  this.configure(function (err) {
    if (err) return cb(err);
    cb(null);
  });
};

/**
 * Expose `Email` types.
 */

Email.statics.types = types;

/**
 * Expose `Email` model.
 */

module.exports = db.mongoose.model('Email', Email);