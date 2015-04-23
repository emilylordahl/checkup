console.log('Loaded: views/tips.js');

App.Views.Tip = Backbone.View.extend({

	url: '/checkups',

	initialize: function() {
		console.log('Created: Single Tip View');
		this.tipsTemplate = Handlebars.compile($('#tips-template').html());
		this.render();
	},

	events: {
		'click input.checkbox' : 'toggleDone'
	},

	render: function() {
		this.$el.html(this.tipsTemplate(this.model.toJSON()));
		this.saveModel();
		console.log('CONSOLE LOG: ') + console.log(this.model.attributes.complete);
		this.model.get('complete') ? this.$el.addClass('done') : this.$el.removeClass('done');
	},

	saveModel: function() {
		console.log('Saving Model...');

		$.post('/checkups', {
			tip: this.model.attributes.tip,
			description: this.model.attributes.description
		}).done(); 
	},

	toggleDone: function() {
		console.log('You clicked the checkbox!');
		this.model.toggle();
	}

});