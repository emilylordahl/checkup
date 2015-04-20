var express = require('express'),
		models  = require('../models'),
		bcrypt  = require('bcrypt'),
		session = require('express-session'),
		router  = express.Router(),
		User    = models.users,
		Checkup = models.checkups;

router.use(session({
	secret: 'secretsarenofun',
	resave: false,
	saveUninitialized: true
}));

router.post('/', function (req, res) {
	var loginUsername = req.body.username;
	var loginPassword = req.body.password;

	User
		.findOne({
			where: { username: loginUsername }
		})
		.then(function(user) {
			if (user) {
				var passwordDigest = user.password_digest;

				bcrypt.compare(loginPassword, passwordDigest, function(err, result) {
					if (result) {
						req.session.currentUser = user.id;
						res.send('Correct login information.');
					} else {
						res.status(400);
						res.send({
							err: 400,
							msg: 'Wrong password. Please try again.'
						});
					}
				});
			} else {
				res.status(400);
				res.send({
					err: 400,
					msg: 'Username does not exist.'
				});
			}
		});
});

router.delete('/', function (req, res) {
	delete req.session.currentUser;
	res.send('Successfully logged out.');	
});

module.exports = router;