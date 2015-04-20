var express		= require('express'),
	  router		= express.Router(),
	  logger    = require('morgan'),
	  request   = require('request');

router.use(logger('dev'));

router.get('/', function (req, res) {

	// After a user has signed it, need to first make a request to the server to /current_user and get that user's id
	// Then ping the server again for /users/:id to get the age, gender and pregnancy status
	// Then use all that information to create the query string below

	request({
		uri: 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=',
		method: 'GET',
		qs: {
			api_key: 'xdwpkcqluwfuahrx',
			age: 25, // This will be user.age
			gender: 'female', // This will be user.gender
			pregnant: false // This will be user.pregnant or default of false
		},
		json: true
	}, function (error, response, body) {
		var results = body.Result.Topics;
		// console.log(results);
		results.forEach(function(title) {
			var resultData = {
				tip: title.Title,
				description: title.MyHFDescription
			};
		console.log(resultData);
		res.send(resultData);
		});
	});
});

module.exports = router;

	// Get the current user ID, make another request to the current user path, get all the other data, then ccreate the query string.
	// request({
	// 	uri: '/current_user',
	// 	method: 'GET'
	// }, function (error, response, body) {

// });