console.log('Loaded: collections/checkups.js');

App.Collections.Checkups = Backbone.Collection.extend({
	initialize: function() {
		console.log('Created: Checkup Collection');	
	}	
});