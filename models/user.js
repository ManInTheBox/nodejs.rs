var db = require('./db'),
  util = require('util'),
  crypto = require('crypto'),
  helpers = require('../helpers');
    
var User = new db.Schema({
  name: {
    first: { 
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, '{path|Ime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Ime} je predugačko (maksimum je {max} karaktera).' ]
    },
    last: { 
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, '{path|Prezime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Prezime} je predugačko (maksimum je {max} karaktera).' ]
    },
    username: {
      type: String,
      required: [ true, '{path|Korisničko ime} je obavezno polje.' ],
      trim: true,
      min: [ 2, '{path|Korisničko ime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Korisničko ime} je predugačko (maksimum je {max} karaktera).' ],
      match: [ /^[\w-.]+$/, '{path|Korisničko ime} nije ispravno. Dozvoljeni su karakteri, brojevi i "._-"' ],
      unique: true
    }
  },
  email: {
    type: String,
    required: [ true, '{path|E-mail} je obavezno polje.' ],
    validate: [ helpers.EmailValidator, 'email', 'E-mail nije ispravna e-mail adresa.' ],
    unique: true
  },
  password: {
    type: String, 
    required: [ true, '{path|Lozinka} je obavezno polje.' ],
    min: [ 6, '{path|Lozinka} je prekratka (minimum je {min} karaktera).' ],
    max: [ 32, '{path|Lozinka} je predugačka (maksimum je {max} karaktera).' ]
  },
  bio: {
    about: {
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 5, 'Polje {path|O meni} je prekratko (minimum je {min} karaktera).' ],
      max: [ 500, 'Polje {path|O meni} je predugačko (maksimum je {max} karaktera).' ]
    },
    company: {
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 3, '{path|Kompanija} je prekratka (minimum je {min} karaktera).' ],
      max: [ 100, '{path|Kompanija} je predugačka (maksimum je {max} karaktera).' ]
    },
    website: {
      type: String,
      validate: [ helpers.UrlValidator, 'url', '{path|Website} nije ispravna URL adresa.' ]
    },
    github: {
      type: String,
      validate: [ helpers.UrlValidator, 'url', '{path|Github} nije ispravna URL adresa.' ]
    },
    twitter: {
      type: String,
      validate: [ helpers.UrlValidator, 'url', '{path|Twitter} nije ispravna URL adresa.' ]
    },
    location: {
      type: String,
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, '{path|Lokacija} je prekratka (minimum je {min} karaktera).' ],
      max: [ 100, '{path|Lokacija} je predugačka (maksimum je {max} karaktera).' ]
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
  return this.findOne({ 'name.username': username }, cb);
};

module.exports = db.mongoose.model('User', User);