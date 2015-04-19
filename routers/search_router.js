var express		= require('express'),
	  router		= express.Router(),
	  logger    = require('morgan'),
	  request   = require('request');

router.use(logger('dev'));

router.get('/', function (req, res) {

	var age      = 25;
	var gender   = 'female';
	var pregnant = false;
	var baseUrl  = 'http://healthfinder.gov/developer/MyHFSearch.json?api_key=';
	var apiKey   = 'xdwpkcqluwfuahrx';

	request({
		uri: baseUrl + apiKey +	'&age=' + age + '&gender=' + gender + '&pregnant=' + pregnant,
		method: 'GET',
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
	// });