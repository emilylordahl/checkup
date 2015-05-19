App.Collections.Tips = Backbone.Collection.extend({
	
	url : '/search',

	model: App.Models.Tip,

	initialize: function() {
		this.fetch({ reset: true });
	}
	
});