console.log('Loaded: models/tip.js');

App.Models.Tip = Backbone.Model.extend({
	initialize: function() {
		console.log('Created: Tip Model');
	},

	toggle: function() {
		// this.get('complete');
		// if (this.complete === false) {
		// 	this.save('complete', true)
		// } else {
		// 	this.save('complete', false)
		// }
		this.get('complete') ? this.save('complete', false) : this.save('complete', true);
	}
	
});