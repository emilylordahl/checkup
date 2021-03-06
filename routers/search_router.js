var express   = require('express'),
	  router    = express.Router(),
	  logger    = require('morgan'),
		session   = require('express-session'),
	  request   = require('request'),
		models    = require('../models'),
	  User      = models.users,
		Checkup   = models.checkups;

router.use(session({
	secret: 'secretsarenofun',
	resave: false,
	saveUninitialized: true
}));

router.use(logger('dev'));

// Ping HealthFinder.gov API
router.get('/', function (req, res) {
	request({
		uri: '/current_user',
		method: 'GET',
		json: true
	}, function (error, response, body) {
		if (req.session.currentUser) {
			User
				.findOne(req.session.currentUser)
				.then(function(user) {
					request({
						uri: 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=',
						method: 'GET',
						qs: {
							api_key: 'xdwpkcqluwfuahrx',
							age: user.age, 
							gender: user.gender, 
							pregnant: user.pregnant
						},
						json: true
					}, function (error, response, body) {
						var results = body.Result.Topics;
						var resultsArray =[];
						results.forEach(function(content) {
							var resultData = {
								tip: content.Title,
								description: content.MyHFDescription, // Change the format of this property. Split on the spaces, push to an array, pop off the last index and then join it back together on spaces. This eliminates the pesky parentheses.
								complete: false,
								user_id: req.session.currentUser
							}
							resultsArray.push(resultData);
						});
						res.send(resultsArray);
					});					
				});
		} else {
			res.send(null);
		}
	});
});

module.exports = router;