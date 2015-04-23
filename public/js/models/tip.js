console.log('Loaded: models/tip.js');

App.Models.Tip = Backbone.Model.extend({
	initialize: function() {
		console.log('Created: Tip Model');
	},

	url: '/checkups',

	toggle: function() {
		this.get('complete') ? this.save('complete', false) : this.save('complete', true);
	}

});