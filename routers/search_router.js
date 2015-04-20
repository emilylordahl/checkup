var express		= require('express'),
	  router		= express.Router(),
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

router.get('/', function (req, res) {

	request({
		uri: '/users/current_user',
		method: 'GET',
		json: true
	}, function (error, response, body) {
		console.log(req.session.currentUser);
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
				description: content.MyHFDescription
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