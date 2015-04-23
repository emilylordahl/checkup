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
	var sessionID = parseInt( req.session.currentUser );
	var reqID = parseInt( req.params.id );

	sessionID === reqID ? next() : res.status(401).send({ err: 401, msg: 'Access denied.' });
};

var authenticate = function(req, res, next) {
	req.session.currentUser ? next() : res.status(400).send({ err: 400, msg: 'Login denied.' });
};

// Show
router.get('/:id', restrictAccess, authenticate, function (req, res) {
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
router.put('/:id', restrictAccess, authenticate, function (req, res) {
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
router.delete('/:id', restrictAccess, authenticate, function (req, res) {
	User
		.findOne({
			where: { id: req.params.id },
			include: [Checkup]
		})
		.then(function (user) {
			user
				.destroy()
					res.send(user);
		});
});

module.exports = router;