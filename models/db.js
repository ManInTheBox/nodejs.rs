
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  credentials = require('../credentials');

/**
 * Connects to MongoDB.
 *
 * Connection will be automatically made after `require('./db')`.
 * It will use connection string supplied either through stdin
 * or `credentials.json` (default).
 * Valid console arguments are: `-c` or `--connection-string`.
 */

(function () {
  var argv = process.argv;
  var c = argv.indexOf('-c');
  var connectionString = argv.indexOf('--connection-string');

  if (~c) {
    mongoose.connect(argv[c + 1]);
  } else if (~connectionString) {
    mongoose.connect(argv[connectionString + 1]);
  } else {
    mongoose.connect(credentials.db);
  }
})();

/**
 * Sets mongoose debug mode.
 *
 * To set debug mode pass `--mongoose-debug` as third `argv` argument.
 *
 * Example:
 * `node app.js --mongoose-debug`
 */

mongoose.set('debug', (process.argv[2] && process.argv[2] === '--mongoose-debug') || false);

/**
 * Expose mongoose.
 */

module.exports.mongoose = mongoose;

/**
 * Expose Schema.
 */

module.exports.Schema = Schema;

/**
 * Expose ObjectId.
 */

module.exports.ObjectId = ObjectId;