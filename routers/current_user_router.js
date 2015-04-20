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
	console.log(req.session.currentUser);
	if (req.session.currentUser) {
		User
			.findOne(req.session.currentUser)
			.then(function(user) {
				res.send(user);
			});
	} else {
		res.send(null);
	}
});

module.exports = router;