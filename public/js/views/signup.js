console.log('Loaded: views/signup.js');

App.Views.Signup = Backbone.View.extend({

	el: '#signup',

	initialize: function() {
		console.log('Created: Signup View');
	},

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
		}).done(/*this.login*/);

	}
	// login: function() {

	// 	$.post('/sessions', {
	// 		username: username,
	// 		password: password
	// 	}).done(this.fetchAndRenderSession);

	// 	// Need to write function to show and hide this properly so that the refresh doesn't show this.
	// 	$('#signup').hide();
	// }

});