var User = require('../models/user.js');

exports.register = function (req, res) {
    req.login(req.user, function(err){
		if(err){
			res.json({response: 'Server Error'})
		}else{
            res.json(req.user);
        }
	})
};