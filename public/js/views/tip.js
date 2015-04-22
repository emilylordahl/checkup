console.log('Loaded: views/tips.js');

App.Views.Tip = Backbone.View.extend({

	url: '/checkups',

	initialize: function() {
		console.log('Created: Single Tip View');
		this.tipsTemplate = Handlebars.compile($('#tips-template').html());
		this.render();
	},

	render: function() {
		this.$el.html(this.tipsTemplate(this.model.toJSON()));
		this.saveModel();
	},

	saveModel: function() {
		console.log(this);
		console.log('Saving Model...');

		$.post('/checkups', {
			tip: this.model.attributes.tip,
			description: this.model.attributes.description
		}).done(); 
	}
});