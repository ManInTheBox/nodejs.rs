
/**
 * Http error
 *
 * HttpError should be used to represent error caused by end-users.
 *
 * @param {Number} status HTTP status code
 * @param {String} message error message
 */
function HttpError (status, message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.status = status;
  this.message = message;
  this.name = 'HttpError';
};

/**
 * Inherits from Error.
 */

HttpError.prototype.__proto__ = Error.prototype;

/**
 * Module exports.
 */
 
exports = module.exports = HttpError;