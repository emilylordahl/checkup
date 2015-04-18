var express = require('express'),
		models  = require('../models'),
		session = require('express-session'),
		router  = express.Router(),
		User    = models.users,
		Checkup = models.checkups;

router.use(session({
	secret: 'secretsarenofun',
	resave: false,
	saveUninitialized: true
}));

router.get('/', function (req, res) {
	var userID = req.session.currentUser;
	User
		.findOne(userID)
		.then(function(user) {
			res.send(user);
		});
});

module.exports = router;