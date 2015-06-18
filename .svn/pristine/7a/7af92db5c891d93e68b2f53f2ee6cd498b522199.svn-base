if(typeof Backbone != "undefined"){
var ListModel = Backbone.Model.extend({
});

var ListCollect = Backbone.Collection.extend({
	model : ListModel,
	parse : function(jdata){
		return 	jdata.datalist || {}
	}
});

}