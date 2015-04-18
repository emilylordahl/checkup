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
	req.session.currenUser ? next() : res.status(400).send({ err: 400, msg: 'Login denied.' });
};

// ----- USER ----- //

// Show
router.get('/:id', authenticate, restrictAccess, function (req, res) {
	User
		.findOne({
			where: { id: req.params.id },
			include: [Checkup]
		})
		.then(function(user) {
			res.send(user);
		});
});

// Create
router.post('/', function (req, res) {

	bcrypt.hash(password, 10, function(err, hash) {
		User
			.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				username: req.body.username,
				password_digest: hash,
				age: req.body.age,
				gender: req.body.gender,
				pregnant: req.body.pregnant
			})
			.then(function(user) {
				res.send(user);
			});
	});
});

// Update
router.put('/:id', function (req, res) {
});

// Destroy
router.delete('/:id', function (req, res) {
});

module.exports = router;