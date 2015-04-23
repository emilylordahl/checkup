console.log('Loaded: views/tips.js');

App.Views.Tip = Backbone.View.extend({

	url: '/checkups',

	// className: 'checkbox',

	initialize: function() {
		console.log('Created: Single Tip View');
		this.tipsTemplate = Handlebars.compile($('#tips-template').html());
		this.render();
	},

	events: {
		'click .checkbox' : 'toggleDone'
	},

	render: function() {
		this.$el.html(this.tipsTemplate(this.model.toJSON()));
		this.saveModel();
	},

	saveModel: function() {
		console.log('Saving Model...');

		$.post('/checkups', {
			tip: this.model.attributes.tip,
			description: this.model.attributes.description
		}).done(this.changeClass.bind(this)); 
	},

	changeClass: function() {
		console.log('Changing Class');

		var completeStatus = this.model.get('complete');
		if (completeStatus === true) {
			this.$el.addClass('done')
		} else {
			this.$el.removeClass('done')
		}
		console.log(this.$el);
	},

	toggleDone: function() {
		console.log('You clicked the checkbox!');
		this.model.toggle();
	}

});