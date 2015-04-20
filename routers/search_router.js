var express		= require('express'),
	  router		= express.Router(),
	  logger    = require('morgan'),
	  request   = require('request');

router.use(logger('dev'));

router.get('/', function (req, res) {

	// After a user has signed in, need to first make a request to the server to /current_user and get that user's id
	// session.currentUser to get the ID then send a request to DB
	// Then ping the server again for /users/:id to get the age, gender and pregnancy status
	// Then use all that information to create the query string below

	request({
		uri: 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=',
		method: 'GET',
		qs: {
			api_key: 'xdwpkcqluwfuahrx',
			age: 25, // This will need to be user.age
			gender: 'female', // This will need to be user.gender
			pregnant: false // This will be need to user.pregnant or default of false
		},
		json: true
	}, function (error, response, body) {
		console.log(body.Result.Topics);
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

module.exports = router;

	// Get the current user ID, make another request to the current user path, get all the other data, then ccreate the query string.
	// request({
	// 	uri: '/current_user',
	// 	method: 'GET'
	// }, function (error, response, body) {

// });