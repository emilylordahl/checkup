console.log('Loaded: views/tips.js');

App.Views.Tip = Backbone.View.extend({

	initialize: function() {
		console.log('Created: Single Tip View');
		this.tipsTemplate = Handlebars.compile($('#tips-template').html());
		this.render();
	},

	render: function() {
		this.$el.html(this.tipsTemplate(this.model.toJSON()));
	}
}); 