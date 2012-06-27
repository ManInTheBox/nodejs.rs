var db = require('./db'),
  nodemailer = require('nodemailer'),
  credentials = require('../credentials'),
  jade = require('jade'),
  fs = require('fs'),
  EventEmitter = require('events').EventEmitter;

const PRIORITY_HIGHEST = 1;
const PRIORITY_HIGH = 2;
const PRIORITY_NORMAL = 3;
const PRIORITY_LOW = 4;
const PRIORITY_LOWEST = 5;

var types = {
  'register': 1,
};

var transport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: credentials.gmail.username,
    pass: credentials.gmail.password
  }
});

var mailOptions = {
  from: 'Node Srbija <noreply@nodejs.rs>',
  generateTextFromHTML: true
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
  priority: { type: Number, default: PRIORITY_NORMAL },
  sendingCounter: { type: Number, default: 0 }
});

Email.methods.send = function (cb) {
  var self = this;
  this.sendingCounter++;

  var f = __dirname + '/../views/emails/register.jade';
  console.log(f);
  fs.readFile(f, 'utf8', function (err, html) {
    if (err) throw err;
      
    var x = jade.compile(html)(mailOptions['data']);

    mailOptions['html'] = x;

    transport.sendMail(mailOptions, function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  });

  // this.save(function (err) {
  //   if (err) cb(err);

  // });
};

Email.pre('save', function (next) {
  if (+this.type !== 0) {
    switch (+this.type) {
      case types['register']:
        this.message = {
          from: 'register@nodejs.rs',
          subject: 'Registracija na nodejs.rs'
        };
        this.body = [
          // 'Zdravo ' + bodyData['fullName'],
          // 'Ti si: ' + bodyData['category'],
          'Dobrodosli na Node.js Srbija',
          'Kliknite ovde za aktivaciju:<br />',
          'Ova poruka je poslata na ' + this.message.to[0]
        ].join('\n');
        this.priority = PRIORITY_HIGHEST;
      break;
    }
  }
  next();
});

Email.statics.types = types;

// var bodyData = {};

// Email.virtual('bodyData').set(function (data) {
//   bodyData = data;
// });

Email.statics.opts = mailOptions;

module.exports = db.mongoose.model('Email', Email);

