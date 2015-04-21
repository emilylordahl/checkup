App.Views.Signup = Backbone.View.extend({

	el: '#signup',

	initialize: function() {
		console.log('Created: Signup View');
	},

	events: {
		'click #signup-button' : 'signup'
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

		$.post('/users', {
			first_name: firstName,
			last_name: lastName,
			username: username,
			password: password,
			age: age,
			gender: gender,
			pregnant: pregnant
		}).done();
	}
});