var User = require('../models/user.js');

exports.register = function (req, res) {
    req.login(req.user, function(err){
		if(err){
			res.json({response: 'Server Error'})
		}else{
            res.json({response: req.user});
        }
	})
};

exports.login = function (req, res) {
	res.json({response: req.user})
};

exports.user_details = function (req, res) {
	if (req.isAuthenticated()) {
        res.json({response: req.user})
    }else{
        res.json({response: false})        
    }
};

exports.logout = function (req, res){
    req.logout();
    res.json({response: true})
}