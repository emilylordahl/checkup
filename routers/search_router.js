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

	// After a user has signed in, need to first make a request to the server to /current_user and get that user's id
	// session.currentUser to get the ID then send a request to DB
	// Then ping the server again for /users/:id to get the age, gender and pregnancy status
	// Then use all that information to create the query string below


User
	.getUserId()
	.then(function(user) {
		// res.send(user);
		console.log(user);
		});

	// request({
	// 	uri: 'http://localhost:3000/users/current_user',
	// 	method: 'GET',
	// 	json: true
	// }, function (error, response, body) {
	// 	console.log(req.session.currentUser);
	// 	if (req.session.currentUser) {
	// 		User
	// 			.findOne(req.session.currentUser)
	// 			.then(function(user) {
	// 				res.send(user)
	// 			});
	// 	} else {
	// 		res.send(null);
	// 	}
	// });

	console.log(req.session.currentUser);

// 	request({
// 		uri: 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=',
// 		method: 'GET',
// 		qs: {
// 			api_key: 'xdwpkcqluwfuahrx',
// 			age: 25, // This will need to be currentUser.age
// 			gender: 'female', // This will need to be currentUser.gender
// 			pregnant: false // This will be need to currentUser.pregnant or default of false
// 		},
// 		json: true
// 	}, function (error, response, body) {
// 		// console.log(body.Result.Topics);
// 		var results = body.Result.Topics;
// 		var resultsArray =[];
// 		results.forEach(function(content) {
// 			var resultData = {
// 				tip: content.Title,
// 				description: content.MyHFDescription
// 			}
// 			resultsArray.push(resultData);
// 		});
// 		res.send(resultsArray);
// 	});
});

module.exports = router;