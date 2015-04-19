var express		= require('express'),
	  router		= express.Router(),
	  logger    = require('morgan'),
	  request   = require('request');

router.use(logger('dev'));

router.get('/', function (req, res) {

	// Get the current user ID, make another request to the current user path, get all the other data, then ccreate the query string.
	request({
		uri: '/current_user',
		method: 'GET'
	}, function (error, response, body) {
			var age      = body.age;
			var gender   = body.gender;
			var pregnant = body.pregnant;
			var baseUrl  = 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=';
			var apiKey   = 'xdwpkcqluwfuahrx';

			request({
				uri: baseUrl + apiKey +	'&age=' + age + '&gender=' + gender + '&pregnant=' + pregnant,
				method: 'GET'
			}, function (error, response, body) {

			});
	});
});

module.exports = router;


// Can I do this instead of the above for the nested request at line 14?
// function (error, response, body) {
// 			var baseUrl  = 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=';
// 			var apiKey   = 'xdwpkcqluwfuahrx';

// 			request({
// 				uri: baseUrl + apiKey +	age + gender + pregnant,
// 				method: 'GET',
// 				qs: {
// 					age: body.age,
// 					gender: body.gender,
// 					pregnant: body.pregnant
// 				}
// 			}, function (error, response, body) {

// 			});
// 	});