var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    mongooseTypes = require('mongoose-types');
    
mongoose.connect('mongodb://localhost/nodejsrs');

mongooseTypes.loadTypes(mongoose);

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
module.exports.ObjectId = ObjectId;
