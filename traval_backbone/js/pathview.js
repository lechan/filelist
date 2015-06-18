//我的行程
var Path = Backbone.View.extend({
	pathTpl: _.template($('#pathTpl').html()),
	
	initialize: function () {
		
        var scope = this;
        var page = 1;
		var uid = 2;
        this.list = new ListCollect();
        this.list.url = 'hiddphp.php?act=getmytravel&uid=' + uid + '&page' + page;
		//this.list.url = 'js/data.js';
        this.list.fetch({
          success: function () {
            scope.render();
          }
        });
        this.wrapper = $('#listbox');
	},
	render: function () {
		var models = this.list.models;
        var html = '';
        for (var i = 0, len = models.length; i < len; i++) {
          models[i].index = i;
          html += this.pathTpl(_.extend(models[i].toJSON(), { index: i }));
        }
        this.wrapper.html(html);
		editPath();
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

var path = new Path();


//我的行程编辑
function editPath(){
	 
	 $(".edit_btn").click(function(){
		 $(this).removeClass("show").addClass("hide");
		$(this).siblings(".edit").removeClass("hide").addClass("show");	 
		$(this).siblings(".result").removeClass("show").addClass("hide");	
		//$("#submit_btn").html("确认修改"); 
	 });
	 
	 
	 $(".friend_btn").click(function(){
		var val = $(this).find("input").val();
		if(val ==0 ){
			$(this).find("img").eq(0).show();
			$(this).find("img").eq(1).hide();
			$(this).find("input").val(1);
			$(this).parent().siblings("h3").find("img").eq(0).show();
			$(this).parent().siblings("h3").find("img").eq(1).hide();
		}else{
			$(this).find("img").eq(0).hide();
			$(this).find("img").eq(1).show();
			$(this).find("input").val(0);
			$(this).parent().siblings("h3").find("img").eq(0).hide();
			$(this).parent().siblings("h3").find("img").eq(1).show();
		}
	 });
	 
	 
	 $(".confirm_btn").click(function(){
		 var date = $(this).parent().siblings(".edit").find("input.inp_date").val();
		 var tel = $(this).parent().siblings(".edit").find("input.inp_tel").val();
		 var txt = $(this).parent().siblings(".edit").find("textarea").val();		 
		 var isover = $(this).parent().siblings(".edit").find(".friend_btn").find("input").val();
		 var id = $(this).data("id");
		
		//更新服务器
		var url = "hiddphp.php?act=edittravel";
		var param = {"id" : id , "startim" : date , "touch" : tel ,"content" : txt ,"isover" : isover};
		var This = this;
		$.post(url,param,function(data){
			if(data==1){
				alert("数据提交成功");
				$(This).parent().siblings(".result").find(".starttime").html(date);
				$(This).parent().siblings(".result").find(".remarks").html(txt);
				$(This).parent().siblings(".result").find(".tel").html(tel);
				$(This).parent().removeClass("show").addClass("hide");
				$(This).parent().siblings(".edit_btn").removeClass("hide").addClass("show");
				$(This).parent().siblings(".edit").removeClass("show").addClass("hide");	 
				$(This).parent().siblings(".result").removeClass("hide").addClass("show"); 
			}else{
				alert("数据提交失败");	
			}
		});
		
	 });
}
