console.log('Loaded: collections/tip.js');

App.Collections.Tips = Backbone.Collection.extend({
	url : '/search',

	model: App.Models.Tip,

	initialize: function() {
		console.log('Created: Tips Collection');
		this.fetch({ reset: true });
	}
});