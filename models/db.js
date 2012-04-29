
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  credentials = require('../credentials');

/**
 * Connects to MongoDB.
 */

mongoose.connect(credentials.db);

/**
 * Sets mongoose debug mode.
 *
 * To set debug mode pass `true` as third `argv` argument.
 *
 * Example:
 * `node app.js true`
 */

mongoose.set('debug', process.argv[2] || false);

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