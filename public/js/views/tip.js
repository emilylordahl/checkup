App.Views.Tip = Backbone.View.extend({

	initialize: function() {
		this.tipsTemplate = Handlebars.compile($('#tips-template').html());
		this.render();
	},

	events: {
		'click .checkbox': 'toggleDone',
		'click .tips': 'changeColor'
	},

	render: function() {
		this.$el.html(this.tipsTemplate(this.model.toJSON()));
		this.saveModel();
	},

	saveModel: function() {
		this.model.save().done(this.changeClass.bind(this));
	},

	changeClass: function() {
		var completeStatus = this.model.get('complete');
		if (completeStatus === true) {
			this.$el.addClass('done');
		} else {
			this.$el.removeClass('done');
		}
	},

	toggleDone: function() {
		this.model.toggle();
	},

	changeColor: function(event) {
		var clicked = $(event.currentTarget);
		// var completeStatus = clicked.attr('data-value');
		clicked.toggleClass('done');
	}
	
});






