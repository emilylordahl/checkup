App.Models.Tip = Backbone.Model.extend({

	url: '/checkups',

	toggle: function() {
		this.get('complete') ? this.save('complete', false) : this.save('complete', true);
	}

});