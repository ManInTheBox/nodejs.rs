var db = require('./db');
    
var UserSchema = new db.Schema({
    name: {
        first: { type: String, validate: [length, 'Polje "Ime" mora biti izmedju 2 i 30 karaktera.'], required: true },
        middle: { type: String, validate: [length, 'Polje "Srednje Ime" mora biti izmedju 2 i 30 karaktera.'] },
        last: { type: String, validate: [length, 'Polje "Prezime" mora biti izmedju 2 i 30 karaktera.'], required: true }
    },
    email: { type: db.mongoose.SchemaTypes.Email, required: [true, 'asdfsdfa'] },
    password: {type: String, required: true},
    birthDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

function length(v) {
    return (v.length >= 2) && (v.length <= 30);
}

module.exports = db.mongoose.model('User', UserSchema);
