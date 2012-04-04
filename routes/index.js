exports.index = function (req, res){
  res.render('index', { 
    title: 'Node Srbija'
  });
};

exports.user = require('./user');
exports.post = require('./post');