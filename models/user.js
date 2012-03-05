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
            validate: [
                helpers.stringBetweenValidator(2, 30), 
                'Polje "Ime" mora biti izmedju 2 i 30 karaktera.'
            ], 
            required: true 
        },
        middle: { 
            type: String, 
            trim: true, 
            set: helpers.toUpperCaseFirst,
            validate: [
                helpers.stringBetweenValidator(2, 30), 
                'Polje "Srednje Ime" mora biti izmedju 2 i 30 karaktera.'
            ]
        },
        last: { 
            type: String, 
            trim: true, 
            set: helpers.toUpperCaseFirst, 
            validate: [
                helpers.stringBetweenValidator(2, 30), 
                'Polje "Prezime" mora biti izmedju 2 i 30 karaktera.'
            ], 
            required: true 
        },
        username: {
            type: String,
            trim: true,
            validate: [
                usernameValidator(5, 10),
                'Polje "Korisnicko ime" mora biti izmedju 5 i 10 karaktera.'
            ]
        }
    },
    email: {
        type: db.mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        validate: [
            helpers.stringBetweenValidator(6, 30),
            'Polje lozinka mora biti izmedju 6 i 30 karaktera.'
        ]
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

User.pre('save', function(next) {
//    if (this.isNew) {
        this.password = this.encryptPassword(this.password, this.salt);
//    }
    next();
});

User.virtual('name.full').get(function() {
    return this.name.first + ' ' + this.name.last;
});

module.exports = db.mongoose.model('User', User);
