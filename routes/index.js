
/*
 * GET home page.
 */

exports.index = function(req, res){
    var flash = req.flash('login.success');
    if (flash.length)
        res.render('index', { title: 'Express', flash: flash })
    else
        res.render('index', { title: 'Express' })
};

exports.user = require('./user');
