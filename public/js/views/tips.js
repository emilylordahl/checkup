console.log('Loaded: views/tips.js');

App.Views.Tips = Backbone.View.extend({

	el: '#tips-container',

	initialize: function() {
		console.log('Created: Tips Collection View');
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.collection, 'add', this.renderOne);
		this.render();
	},

	render: function() {
		this.setElement('#tips-container');
		this.collection.each(this.renderOne.bind(this));
	},

	renderOne: function(tip) {
		console.log('Fetching and Rendering...');
		var tipView = new App.Views.Tip({ model: tip });
		this.$el.append(tipView.$el);
	},

	setCollection: function(collection) {
		this.collection = collection;
	}
}); 