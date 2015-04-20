var express		 			  = require('express'),
		bodyParser 			  = require('body-parser'),
		morgan 		 			  = require('morgan'),
		userRouter    	  = require('./routers/user_router.js'),
		checkupRouter 	  = require('./routers/checkup_router.js'),
		// sessionRouter 	  = require('./routers/session_router.js'),
		// currentUserRouter = require('./routers/current_user_router.js'),
		searchRouter			= require('./routers/search_router.js'),
		session 					= require('express-session'),
		app               = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static('./public'));

app.use(session({
	secret: 'secretsarenofun',
	resave: false,
	saveUninitialized: true
}));

app.post('/sessions', function (req, res) {
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
						// globalUserID = req.session.currentUser;
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

app.delete('/sessions', function (req, res) {
	delete req.session.currentUser;
	res.send('Successfully logged out.');	
});

// Users
app.use('/users', userRouter);

// Checkups
app.use('/checkups', checkupRouter);

// Sessions
// app.use('/sessions', sessionRouter);

// Current User
// app.use('/current_user', currentUserRouter);

// Search API
app.use('/search', searchRouter);

app.listen(3000, function() {
	console.log('Server listening on 3000...');
});

module.exports = app;

