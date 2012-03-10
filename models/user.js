var db = require('./db'),
  util = require('util'),
  crypto = require('crypto'),
  helpers = require('../helpers');
    
var User = new db.Schema({
  name: {
    first: { 
      type: String,
      required: [ true, '{path|Ime} je obavezno polje.' ],
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, '{path|Ime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Ime} je predugačko (maksimum je {max} karaktera).' ]
    },
    middle: { 
      type: String, 
      trim: true, 
      set: helpers.toUpperCaseFirst,
      min: [ 2, '{path|Srednje ime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Srednje ime} je predugačko (maksimum je {max} karaktera).' ]
    },
    last: { 
      type: String,
      required: [ true, '{path|Prezime} je obavezno polje.' ],
      trim: true,
      set: helpers.toUpperCaseFirst,
      min: [ 2, '{path|Prezime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Prezime} je predugačko (maksimum je {max} karaktera).' ]
    },
    username: {
      type: String,
      trim: true,
      min: [ 2, '{path|Korisničko ime} je prekratko (minimum je {min} karaktera).' ],
      max: [ 30, '{path|Korisničko ime} je predugačko (maksimum je {max} karaktera).' ]
    }
  },
    email: {
        type: db.mongoose.SchemaTypes.Email,
        required: [ true, '{path|E-mail} je obavezno polje.' ],
        unique: true
    },
    password: {
        type: String, 
        // required: true,
        // validate: [
        //     helpers.stringBetweenValidator(6, 30),
        //     'Polje lozinka mora biti izmedju 6 i 30 karaktera.'
        // ]
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

function usernameValidator(from, to) {
    return function(v) {
        if (helpers.stringBetweenValidator(from, to)(v)) {
            return true; // treba da ide dalja provera... regex etc etc...
        } else {
            return false;
        }
    };
}

User.methods.encryptPassword = function(password, salt) {
    var _password = password || this.password;
    var _salt = salt || this.salt;
    return crypto.createHmac('md5', _password + _salt).digest('hex');
};

// User.pre('save', function (next) {
//   // if (this.isNew) {
//     this.password = this.encryptPassword(this.password, this.salt);
//   // }
//   next();
// });

User.virtual('name.full').get(function() {
    return this.name.first + ' ' + this.name.last;
});

User.statics.findByUsername = function (username, cb) {
    return this.findOne({ 'name.username': username }, cb);
};

module.exports = db.mongoose.model('User', User);