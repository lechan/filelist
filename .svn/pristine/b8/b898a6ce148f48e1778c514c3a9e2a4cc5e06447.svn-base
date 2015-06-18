var Price = Backbone.View.extend({
	priceTpl: _.template($('#priceTpl').html()),
	
	initialize: function () {
		
        var scope = this;
        var page = 1;
        this.list = new ListCollect();
        //this.list.url = 'hiddphp.php?act=getlist&page' + page;
		this.list.url = 'js/data.js';
        this.list.fetch({
          success: function () {
            scope.render();
          }
        });
        this.wrapper = $('#pricelist');
	},
	render: function () {
		var models = this.list.models;
        var html = '';
        for (var i = 0, len = models.length; i < len; i++) {
          models[i].index = i;
          html += this.priceTpl(_.extend(models[i].toJSON(), { index: i }));
        }
        this.wrapper.html(html);
	},
	events: {
		/*'click .edit_btn': function (e) {
			var el = $(e.currentTarget);
		  	el.addClass("hide");
			el.siblings(".edit").removeClass("hide").addClass("show");	 
			el.siblings(".result").removeClass("show").addClass("hide");
		}*/
	}
	
});

var price = new Price();