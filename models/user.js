var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    
var UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    birthDate: {type: Date}
});

mongoose.model('User', UserSchema);

module.exports.User = mongoose.model('User');