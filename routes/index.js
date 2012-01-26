
/*
 * GET home page.
 */

exports.index = function(req, res){
    var flash = req.flash('login.success');
    if (flash.length)
        res.render('index', { title: 'Node Srbija', flash: flash })
    else
        res.render('index', { title: 'Node Srbija' })
};

exports.user = require('./user');
exports.post = require('./post');
