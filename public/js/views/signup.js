App.Views.Signup = Backbone.View.extend({

	el: '#signup',

	events: {
		'click #signup-button' : 'signup',
		'keypress .signup-input' : 'signupByEnter'
	},

	signupByEnter: function(e) {
		if (e.which === 13) {
			this.signup();
		}
	},

	signup: function() {
		console.log('You clicked the signup button!');
		var firstName = $('[name="first_name"]').val();
		var lastName  = $('[name="last_name"]').val();
		var username  = $('[name="username"]').val();
		var password  = $('[name="password"]').val();
		var age       = $('[name="age"]').val();
		var gender	  = $('[name="gender"]').val();
		var pregnant  = $('[name="pregnant"]').val();

		this.$('.signup-input').val('');

		$.post('/users', {
			first_name: firstName,
			last_name: lastName,
			username: username,
			password: password,
			age: age,
			gender: gender,
			pregnant: pregnant
		}).done(function() {
			alert('New user created: ' + username);
		}).fail(function() {
			alert('Something went wrong. Please try again.');
		});
	}

});