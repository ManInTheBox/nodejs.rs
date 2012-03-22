var db = require('./db'),
  imagemagick = require('imagemagick'),
  path = require('path'),
  storePath = path.join(__dirname, '/../public/images/users/');

var Picture = new db.Schema({
  path: String,
  name: String,
});

Picture.methods.crop = function (cb) {
  var opts = {
    srcPath: this.path,
    dstPath: storePath + this.name + '_small.jpg',
    width: 42,
    height: 42,
    quality: 1
  },
  self = this;

  imagemagick.crop(opts, function (err, stdout, stderr) {
    if (err) return cb(err);
    opts.dstPath = storePath + self.name + '_large.jpg';
    opts.width = 200;
    opts.height = 200;
    imagemagick.crop(opts, cb);
  });
};

module.exports = db.mongoose.model('Picture', Picture);