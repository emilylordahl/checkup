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


module.exports = router;