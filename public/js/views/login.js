App.Views.Login = Backbone.View.extend({

	el: 'body',

	initialize: function() {
		console.log('Created: Login View');
		loginTemplate = Handlebars.compile($('#login-template').html());
		loggedInTemplate = Handlebars.compile($('#logged-in-template').html());
		this.renderSession();
	},

	events: {
		'click #login-button' : 'login',
		'click #logout-button': 'logout'
	},

	renderSession: function() {
		$.get('/current_user').done(function(user) {
			if (user) {
				$('#session').html(loggedInTemplate(user));
			} else {
				$('#session').html(loginTemplate());
			}
		}).fail(function(jqXHR) {
			if (jqXHR.status === 404) {
				$('#session').html('404 Not Found :(');
			}
		});
	},

	login: function() {
		console.log('You clicked the login button!');
		var username  = $('[name="login-username"]').val();
		var password  = $('[name="login-password"]').val();

		$.post('/sessions', {
			username: username,
			password: password
		}).done(this.renderSession);

		$('#signup').hide();
	},

	logout: function() {
		console.log('You clicked the logout button!');
		$.ajax({
			url: '/sessions',
			method: 'DELETE'
		}).done(this.renderSession);

		$('#signup').show();

	}
});