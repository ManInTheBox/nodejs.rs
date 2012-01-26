var crypto = require('crypto');

exports.stringBetweenValidator = function (from, to) {
    return function(v) {
        return (v.length >= from) && (v.length <= to);
    }
};

exports.toUpperCaseFirst = function (v) {
    return v.charAt(0).toUpperCase() + v.slice(1);
};

exports.generateHash = function() {
    return crypto.createHash('md5').digest('hex');
};
