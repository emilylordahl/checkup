App.Views.Login = Backbone.View.extend({

	el: '#login',

	initialize: function() {
		console.log('Created: Login View');
	},

	events: {
		'click #login-button' : 'login'
	},

	login: function() {
		console.log('You clicked the signup button!');
		var username  = $('[name="login-username"]').val();
		var password  = $('[name="login-password"]').val();

		$.post('/sessions', {
			username: username,
			password: password
		}).done();
	}
});