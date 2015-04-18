var express		 			  = require('express'),
		bodyParser 			  = require('body-parser'),
		morgan 		 			  = require('morgan'),
		userRouter    	  = require('./routers/user_router.js'),
		checkupRouter 	  = require('./routers/checkup_router.js'),
		sessionRouter 	  = require('./routers/session_router.js'),
		currentUserRouter = require('./routers/current_user_router.js'),
		app               = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static('./public'));

// Users
app.use('/users', userRouter);

// Checkups
app.use('/checkups', checkupRouter);

// Sessions
app.use('/sessions', sessionRouter);

// Current User
app.use('/current_user', currentUserRouter);

app.listen(3000, function() {
	console.log('Server listening on 3000...');
});

module.exports = app;

