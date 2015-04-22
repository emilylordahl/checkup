console.log('Loaded: views/login.js');

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
		'click #logout-button': 'logout',
		'keypress #login input' : 'loginByEnter'
	},

	renderSession: function() {
		console.log('I\'m here');
		$.get('/current_user').done(function(user) {
			if (user) {
				$('#session').html(loggedInTemplate(user));
				App.tipCollection.fetch({
					success: function() {
						App.tipCollectionView.setCollection(App.tipCollection);
						App.tipCollectionView.render();
					}
				});
			} else {
				$('#session').html(loginTemplate());
			}
		}).fail(function(jqXHR) {
			if (jqXHR.status === 404) {
				$('#session').html('404 Not Found :(');
			}
		});
	},

	loginByEnter: function(e) {
		if (e.which === 13) {
			this.login();
		}
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

		// App.tipCollection.fetch();
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