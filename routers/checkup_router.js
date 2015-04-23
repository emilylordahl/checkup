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

// Show
router.get('/', function (req, res) {
	Checkup
		.findOne(req.params.id)
		.then(function (checkup) {
			res.send(checkup);
		});
});

// Create
router.post('/', function (req, res) {
	Checkup
		.findOrCreate({
			where: { 			
				tip: req.body.tip,
				description: req.body.description,
				complete: false,
				user_id: req.session.currentUser 
			}
		})
		.then(function(checkup) {
			res.send(checkup[0]);
		});
});

// Update
router.put('/', function (req, res) {
	Checkup
		.findOne(req.body.id)
		.then(function (checkup) {
			checkup 
				.update(req.body)
				.then(function(updatedCheckup) {
					res.send(updatedCheckup)
				});
		});
});

// Delete
router.delete('/', function (req, res) {
});

module.exports = router;