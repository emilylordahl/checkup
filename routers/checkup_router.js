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

// Create Checkup
router.post('/', function (req, res) {
	Checkup
		.findOrCreate({
			where: { 			
				tip: req.body.tip,
				description: req.body.description,
				complete: false
			}
		})
		.then(function(checkup) {
			res.send(checkup);
		});
});

// Delete Checkup
router.delete('/', function (req, res) {
});

module.exports = router;