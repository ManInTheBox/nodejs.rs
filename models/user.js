var db = require('./db'),
    crypto = require('crypto'),
    util = require('util');
    
var User = new db.Schema({
    name: {
        first: { 
            type: String, 
            trim: true, 
            set: capitalize,
            validate: [length, 'Polje "Ime" mora biti izmedju 2 i 30 karaktera.'], 
            required: true 
        },
        middle: { 
            type: String, 
            trim: true, 
            set: capitalize,
            validate: [length, 'Polje "Srednje Ime" mora biti izmedju 2 i 30 karaktera.']
        },
        last: { 
            type: String, 
            trim: true, 
            set: capitalize, 
            validate: [length, 'Polje "Prezime" mora biti izmedju 2 i 30 karaktera.'], 
            required: true 
        }
    },
    email: { type: db.mongoose.SchemaTypes.Email, required: true /*, unique: true */ },
    password: { type: String, required: true },
    salt: { type: String, default: generateSalt },
    birthDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

function length(v) {
    return (v.length >= 2) && (v.length <= 30);
}

function generateSalt() {
    return crypto.createHash('md5').digest('hex');
}

function capitalize(v) {
    return v.charAt(0).toUpperCase() + v.slice(1);
}

User.methods.encryptPassword = function(password, salt) {
    var _password = password || this.password;
    var _salt = salt || this.salt;
    return crypto.createHmac('md5', _password + _salt).digest('hex');
};

User.pre('save', function(next) {
    if (this.isNew) {
        this.password = this.encryptPassword(this.password, this.salt);
    }
    next();
});

module.exports = db.mongoose.model('User', User);
