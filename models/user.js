var db = require('./db'),
  util = require('util'),
  crypto = require('crypto'),
  helpers = require('../helpers'),
  Picture = require('./picture');
    
var User = new db.Schema({
  name: {
    first: { 
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, 'Ime je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, 'Ime je predugačko (maksimum je {max} karaktera).' ]
    },
    last: { 
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, 'Prezime je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, 'Prezime je predugačko (maksimum je {max} karaktera).' ]
    },
    username: {
      type: String,
      required: [ true, 'Korisničko ime je obavezno polje.' ],
      trim: true,
      min: [ 2, 'Korisničko ime je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, 'Korisničko ime je predugačko (maksimum je {max} karaktera).' ],
      match: [ /^[\w-.]+$/, 'Korisničko ime nije ispravno. Dozvoljeni su karakteri, brojevi i "._-"' ],
      unique: true
    }
  },
  email: {
    type: String,
    required: [ true, 'E-mail je obavezno polje.' ],
    validate: [ helpers.EmailValidator, 'email', 'E-mail nije ispravna e-mail adresa.' ],
    unique: true
  },
  publicEmail: {
    type: Boolean,
    default: false
  },
  password: {
    type: String, 
    required: [ true, 'Lozinka je obavezno polje.' ],
    min: [ 6, 'Lozinka je prekratka (minimum je {min} karaktera).' ],
    max: [ 32, 'Lozinka je predugačka (maksimum je {max} karaktera).' ]
  },
  photo: {
    type: db.ObjectId,
    ref: 'Picture',
    default: Picture.DEFAULT
  },
  bio: {
    about: {
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 5, 'O meni je prekratko (minimum je {min} karaktera).' ],
      max: [ 500, 'O meni je predugačko (maksimum je {max} karaktera).' ]
    },
    company: {
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 3, 'Kompanija je prekratka (minimum je {min} karaktera).' ],
      max: [ 100, 'Kompanija je predugačka (maksimum je {max} karaktera).' ]
    },
    website: {
      type: String,
      validate: [ helpers.UrlValidator, 'url', 'Website/Blog nije ispravna URL adresa.' ]
    },
    github: {
      type: String,
      validate: [ helpers.UrlValidator, 'url', 'GitHub nije ispravna URL adresa.' ]
    },
    twitter: {
      type: String,
      validate: [ helpers.UrlValidator, 'url', 'Twitter nije ispravna URL adresa.' ]
    },
    location: {
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, 'Lokacija je prekratka (minimum je {min} karaktera).' ],
      max: [ 100, 'Lokacija je predugačka (maksimum je {max} karaktera).' ]
    }
  },
  salt: { 
    type: String,
    default: helpers.generateHash
  },
  createdAt: { 
    type: Date,
    default: Date.now
  }
});

User.methods.encryptPassword = function (password, salt) {
  var _password = password || this.password;
  var _salt = salt || this.salt;
  return crypto.createHmac('md5', _password + _salt).digest('hex');
};

User.pre('save', function (next) {
  if (this.isNew) {
    this.password = this.encryptPassword(this.password, this.salt);
  }
  next();
});

User.virtual('name.full').get(function () {
  var first = this.name.first || '';
  var last = this.name.last || '';
  var full = first + ' ' + last;
  return full.trim();
});

User.statics.findByUsername = function (username, cb) {
  return this.findOne({ 'name.username': username }).populate('photo').run(cb);
};

module.exports = db.mongoose.model('User', User);