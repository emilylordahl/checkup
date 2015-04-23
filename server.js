var express		 			  = require('express'),
		bodyParser 			  = require('body-parser'),
		logger 		 			  = require('morgan'),
		userRouter    	  = require('./routers/user_router.js'),
		checkupRouter 	  = require('./routers/checkup_router.js'),
		sessionRouter 	  = require('./routers/session_router.js'),
		currentUserRouter = require('./routers/current_user_router.js'),
		searchRouter			= require('./routers/search_router.js'),
		session 					= require('express-session'),
		app               = express();

if (process.env.NODE_ENV !== 'test') {
  app.use( logger('dev') );
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.use(session({
	secret: 'secretsarenofun',
	resave: false,
	saveUninitialized: true
}));

// Current User
app.use('/current_user', currentUserRouter);

// Users
app.use('/users', userRouter);

// Checkups
app.use('/checkups', checkupRouter);

// Sessions
app.use('/sessions', sessionRouter);

// Search API
app.use('/search', searchRouter);

app.listen(3000, function() {
	console.log('Server listening on 3000...');
});

module.exports = app;

