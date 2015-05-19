App.Views.Login = Backbone.View.extend({

	el: 'body',

	initialize: function() {
		loginTemplate = Handlebars.compile($('#login-template').html());
		loggedInTemplate = Handlebars.compile($('#logged-in-template').html());
		this.fetchAndRenderSession();
	},

	events: {
		'click #login-button' : 'login',
		'click #logout-button': 'logout',
		'keypress #login input' : 'loginByEnter'
	},

	fetchAndRenderSession: function() {
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
				$('#session').html('404: Cannot log in!');
			}
		});
	},

	loginByEnter: function(e) {
		if (e.which === 13) {
			this.login();
		}
	},

	login: function() {
		var username  = $('[name="login-username"]').val();
		var password  = $('[name="login-password"]').val();

		$.post('/sessions', {
			username: username,
			password: password
		}).done(this.fetchAndRenderSession);

		$('#signup').hide();
	},

	logout: function() {
		$.ajax({
			url: '/sessions',
			method: 'DELETE'
		}).done(this.fetchAndRenderSession);

		$('#signup').show();
	}

});