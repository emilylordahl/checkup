console.log('Loaded: views/tips.js');

App.Views.Tip = Backbone.View.extend({

	initialize: function() {
		console.log('Created: Single Tip View');
		this.tipsTemplate = Handlebars.compile($('#tips-template').html());
		this.render();
	},

	events: {
		'click .checkbox': 'toggleDone'
	},

	render: function() {
		this.$el.html(this.tipsTemplate(this.model.toJSON()));
		this.saveModel();
	},

	saveModel: function() {
		console.log('Saving Model...');

		this.model.save().done(this.changeClass.bind(this));
	},

	changeClass: function() {
		console.log('Changing Class');
		console.log(this.$el);
		var completeStatus = this.model.get('complete');
		console.log(completeStatus);
		if (completeStatus === true) {
			this.$el.addClass('done')
		} else {
			this.$el.removeClass('done')
		}
	},

	toggleDone: function() {
		console.log('You clicked the checkbox!');
		this.model.toggle();
	}
});