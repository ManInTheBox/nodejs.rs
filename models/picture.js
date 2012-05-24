
/**
 * Module dependencies.
 */

var db = require('./db'),
  imagemagick = require('imagemagick'),
  path = require('path'),
  storePath = path.join(__dirname, '/../public/images/users/');

/**
 * Default `Picture._id`
 */

const DEFAULT = '4fbeb036b65eb1c21f0003e3';

/**
 * Maximum picture file size.
 */

const MAX_SIZE = 1024 * 1024 * 2;

/**
 * Defines `PictureSchema`
 */

var Picture = new db.Schema({
  name: String,
  size: {
    type: Number,
    max: [ MAX_SIZE, 'Dozvoljena maksimalna veličina fotografije je 2MB.' ]
  },
  type: {
    type: String,
    match: [ /(jpe?g|png|gif)/, 'Dozvoljeni formati za fotografiju su: "jpeg, png, gif".' ]
  },
  ext: String
});

/**
 * Generates two images, large and small and saves model.
 */

Picture.methods.store = function (path, cb) {
  var self = this;

  this.save(function (err) {
    if (err) return cb(err);
    var opts = {
      srcPath: path,
      dstPath: storePath + self._id + '_small.' + self.ext,
      width: 42,
      height: 42,
      quality: 1
    };

    imagemagick.crop(opts, function (err, stdout, stderr) {
      if (err) return cb(err);
      opts.dstPath = storePath + self._id + '_large.' + self.ext;
      opts.width = 200;
      opts.height = 200;
      imagemagick.crop(opts, function (err, stdout, stderr) {
        if (err) return cb(err);
        cb(null);
      });
    });
  });
};

/**
 * Virtual getter for large image name
 *
 * @return {String} small image name
 */

Picture.virtual('large').get(function () {
  return this._id + '_large.' + this.ext;
});

/**
 * Virtual getter for small image name
 *
 * @return {String} small image name
 */

Picture.virtual('small').get(function () {
  return this._id + '_small.' + this.ext;
});

/**
 * Expose static `Picture.DEFAULT`
 */

Picture.statics.DEFAULT = DEFAULT;

/**
 * Expose static `Picture.MAX_SIZE`
 */

Picture.statics.MAX_SIZE = MAX_SIZE;

/**
 * Expose static `Picture.STORE_PATH`
 */

Picture.statics.STORE_PATH = storePath;

/**
 * Exports `Picture` model
 */

module.exports = db.mongoose.model('Picture', Picture);