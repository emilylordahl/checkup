var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
}

$(function () {
	console.log('Loaded: app.js');

	App.signupView = new App.Views.Signup;
	App.loginView = new App.Views.Login;

});