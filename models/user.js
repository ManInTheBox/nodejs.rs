var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    
var UserSchema = new Schema({
    name: {
        first: {type: String},
        last: {type: String}
    },
    birthDate: {type: Date},
    createdAt: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);

module.exports.User = mongoose.model('User');