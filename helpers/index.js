var crypto = require('crypto');

exports.toUpperCaseFirst = function (v) {
  return v.charAt(0).toUpperCase() + v.slice(1);
};

exports.generateHash = function() {
  return crypto.createHmac('md5', Date()).digest('hex');
};
