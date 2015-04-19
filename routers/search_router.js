var express		= require('express'),
	  router		= express.Router(),
	  logger    = require('morgan'),
	  request   = require('request');

router.use(logger('dev'));

router.get('/', function (req, res) {

	// Need to first make a request to the server to /current_user and get the id
	// Then ping the server again for /users/:id to get the age, gender and pregnancy status
	// Then use all that information to create the query string

	request({
		uri: 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=',
		method: 'GET',
		qs: {
			api_key: 'xdwpkcqluwfuahrx',
			age: 25,
			gender: 'female',
			pregnant: false
		},
		json: true
	}, function (error, response, body) {
		var results = body.Result.Topics;
		results.forEach(function(title) {
			var resultData = title.Title;
		console.log(resultData);	
		return resultData;
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