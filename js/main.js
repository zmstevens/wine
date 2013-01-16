//models

window.Wine = Backbone.Model.extend();

//collections

window.WineCollection = Backbone.Collection.extend ({
	model:Wine,
	url:'api/wines'
	});



//views

window.wineListView = Backbone.View.extend({
	
	tagName:'ul',
	initialize: function(){
	this.model.bind('reset',this.render,this);
	
	},
	
	render:function(){
		_.each(this.model.models,function(wine){
		
		//console.log(wine);
		$(this.el).append(new wineListItemView({model:wine}).render().el);
		},this)
	return this;
	
	}

});

window.wineListItemView = Backbone.View.extend ({
	
	tagName:"li",
	template:_.template($('#tpl-wine-list-item').html() ),
	render:function(){
		$(this.el).html(this.template(this.model.toJSON() ) );
		return this;
		
		}
	
});


window.WineView = Backbone.View.extend({
	template:_.template($('#tpl-wine-details').html()),
	
	render:function(){
		$(this.el).html(this.template(this.model.toJSON() ) );
		return this;
	}
});

//routers 

var AppRouter = Backbone.Router.extend ({

routes:{
	'':'list',
	'wines/:id':'wineDetails'
},

list:function(){

this.wineList = new WineCollection();
this.wineListView = new wineListView({model:this.wineList});
this.wineList.fetch();
$('#sidebar').html(this.wineListView.render().el);

}//list
,
wineDetails:function(id){
	this.wine = this.wineList.get(id);
	this.wineView = new WineView({model:this.wine});
	$('#content').html(this.wineView.render().el);
	}

});

var app = new AppRouter();
Backbone.history.start();