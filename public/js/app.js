var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
}

$(function () {
	console.log('Loaded: js/app.js');

	App.tipCollection = new App.Collections.Tips;
	App.tipCollectionView = new App.Views.Tips({ collection: App.tipCollection });

	App.signupView = new App.Views.Signup;
	App.loginView = new App.Views.Login;

});