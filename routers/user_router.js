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

// Debug
router.get('/debug_session', function (req, res) {
	res.send(req.session);
});

// User Auth Middleware
var restrictAccess = function(req, res, next) {
	var sessionID = parseInt( req.session.currenUser );
	var reqID = parseInt( req.params.id );

	sessionID === reqID ? next() : res.status(401).send({ err: 401, msg: 'Access denied.' });
};

var authenticate = function(req, res, next) {
	req.session.currentUser ? next() : res.status(400).send({ err: 400, msg: 'Login denied.' });
};

//----- SESSION -----//

router.get('/current_user', function (req, res) {
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

router.post('/sessions', function (req, res) {
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
						console.log(req.session.currentUser);
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

router.delete('/sessions', function (req, res) {
	delete req.session.currentUser;
	res.send('Successfully logged out.');	
});

//----- USER -----//

// Show
router.get('/:id', function (req, res) {
	User
		.findOne({
			where: { id: req.params.id },
			include: [Checkup]
		})
		.then(function(user) {
			res.send(user);
			console.log(user.age);
			console.log(user.gender);
			console.log(user.pregnant);
		});
});

// Create
router.post('/', function (req, res) {
	var firstName = req.body.first_name;
	var lastName  = req.body.last_name;
	var username  = req.body.username;
	var password  = req.body.password;
	var age       = req.body.age;
	var gender    = req.body.gender;
	var pregnant  = req.body.pregnant;

	bcrypt.hash(password, 10, function(err, hash) {
		User
			.create({
				first_name: firstName,
				last_name: lastName,
				username: username,
				password_digest: hash,
				age: age,
				gender: gender,
				pregnant: pregnant
			})
			.then(function(user) {
				res.send(user);
			});
	});
});

// Update
router.put('/:id', function (req, res) {
	User
		.findOne(req.params.id)
		.then(function (user) {
			user
				.update(req.body)
				.then(function(updatedUser) {
					res.send(updatedUser);
				});
		});
});

// Destroy
router.delete('/:id', function (req, res) {
	User
		.findOne(req.params.id)
		.then(function (user) {
			user
				.destroy()
					res.send(user);
		});
});

router.get('/:id/search', function (req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			res.send( user.getUserInfo() );
		});
});

module.exports = router;