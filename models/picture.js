var db = require('./db'),
  imagemagick = require('imagemagick'),
  path = require('path'),
  storePath = path.join(__dirname, '/../public/images/users/');

const DEFAULT = '4f8999604ba40e823c000034';
const MAX_SIZE = 1024 * 1024 * 2;

var Picture = new db.Schema({
  name: String,
  size: {
    type: Number,
    max: [ MAX_SIZE, 'Dozvoljena maksimalna veličina fotografije je 2MB.' ]
  },
  type: {
    type: String,
    match: [/(jpe?g|png|gif)/, 'Dozvoljeni formati za fotografiju su: "jpeg, png, gif".' ]
  }
});

Picture.methods.store = function (path, cb) {
  var self = this;

  this.save(function (err) {
    if (err) return cb(err);
    var opts = {
      srcPath: path,
      dstPath: storePath + self.name + '_small.jpg',
      width: 42,
      height: 42,
      quality: 1
    };

    imagemagick.crop(opts, function (err, stdout, stderr) {
      if (err) return cb(err);
      opts.dstPath = storePath + self.name + '_large.jpg';
      opts.width = 200;
      opts.height = 200;
      imagemagick.crop(opts, function (err, stdout, stderr) {
        if (err) return cb(err);
        cb(null);
      });
    });
  });
};

Picture.statics.DEFAULT = DEFAULT;
Picture.statics.MAX_SIZE = MAX_SIZE;

module.exports = db.mongoose.model('Picture', Picture);