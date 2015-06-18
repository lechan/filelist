$(function(){	 
	 var bBtn = true;
	 $("#func_btn").click(function(){
		 if(bBtn==true){
			$(this).removeClass("func_btn").addClass("func_btn_active");
			$("#sidebar").show();
			$("#pop").show();
			$("#mask").show();
			bBtn = false;	 
		 }else{
			 $(this).removeClass("func_btn_active").addClass("func_btn");
			 $("#sidebar").hide();
			 $("#pop").hide();
			 $("#mask").hide();
			 bBtn = true;
		 }
		 return false;
	 });
	 
	 $("#mask").click(function(){
			$("#func_btn").removeClass("func_btn_active").addClass("func_btn");
			 $("#sidebar").hide();
			 $("#mask").hide();
			 $("#pop").hide();
			 bBtn = true; 
			 return false;
	 });
	 
	 
	 $("#search_btn").click(function(){
		 $(".sidebar2").hide();
			//$(this).removeClass("search_btn").addClass("func_btn_active");
			$("#sidebar").show();
			$("#mask2").show();
			$(".middle_btn").hide();
			 $("#search_sub").show();
			 $("html").addClass("scrollhide");
			bBtn = false;	 
	 });
	 
	 
	 $("#create_sub").click(function(){
		 $(".sidebar2").hide();
		 $("#create_path").show();
		$("#mask2").show();
		$(".middle_btn").hide();
		 $("#path_sub").show();
		 $("html").addClass("scrollhide");
		bBtn = false;
	 });
	 
	 
	 
	 
	 $("#mask2,#back_btn2").click(function(){
			//$("#search_btn").removeClass("func_btn_active").addClass("search_btn");
			 $(".sidebar2").hide();
			 $("#mask2").hide();
			 $(".middle_btn").hide();
			 $("#create_sub").show();
			 $("html").removeClass("scrollhide");
			 bBtn = true; 
			 return false;
	 });
	 
	 
	 
	 
	 
	 $(".place_sel").change(function(){
		 var val = $(this).val();
		 if(val == "other"){
			$(this).siblings("input.otherplace").show();	 
		 }else{
			$(this).siblings("input.otherplace").hide().val("");	 
		 }
	 });
	 
	 
	 
 	
	
	editPath();
	
	pricecalc();
});	 



//微信相关
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	WeixinJSBridge.call('hideToolbar');
});	 



//拉取我的行程列表
function myPathList(){
	var _uid = uid;
	//var _url = 'hiddphp.php?act=getmytravel&uid='+ _uid;
	var _url = 'js/data.js';
	$.getJSON(_url,function(jdata){
		if(jdata.datatype==1){
			
			var pathUl = $("#pathlist");
			var pathTpl = $('#pathTpl').html();
			var render = _.template(pathTpl);
			data = jdata.datalist;
			var html = render(data);
			pathUl.html(html);	
			editPath();
		}
	});
	
}

	 
//我的行程编辑
function editPath(){
	 
	 $(".edit_btn").click(function(){
		 $(this).addClass("hide");
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
	 
}


//价格计算
function pricecalc(){
	 
	 if(typeof data !="undefined"){
		 $("#price").html(data.price);
		 $("#total").html("￥"+$("#num").val()*data.price);
		 if(data.type == "normal"){
			 var tips = "单价*人数";
			 $("#tips_price").html(tips);
			 $("#make_friends").hide();	 
		 }else if(data.type == "circle"){
			 var tips = "总价/人数*人数";
			 $("#tips_price").html(tips);
			 $("#make_friends").show();
		 }
		 
		 
		 $(".edit b.minus").click(function(){
			 var val = $(this).siblings("input").val();
			if(val > 1){
				val--;
				$(this).siblings("input").val(val);
				$(this).siblings("i").html(val+"人");	
				$("#total").html("￥"+val*data.price);
			}
		 });
		 $(".edit b.plus").click(function(){
			 var val = $(this).siblings("input").val();
			if(val < 100){
				val++;
				$(this).siblings("input").val(val);
				$(this).siblings("i").html(val+"人");
				$("#total").html("￥"+val*data.price);
			}
		 });
	 }
}
	 	


function closepop(){
	$("#mask").hide();
	$("#pop").hide();
	$(".footer").hide();
}

//textarea自适应高
/*(function(){
	var addHandler = window.addEventListener?
    function(elem,event,handler){elem.addEventListener(event,handler);}:
    function(elem,event,handler){elem.attachEvent("on"+event,handler);};

    var $ = function(id){return document.getElementById(id);}

        
    function autoTextArea(elemid){
        //新建一个textarea用户计算高度
        if(!$("_textareacopy")){
            var t = document.createElement("textarea");
            t.id="_textareacopy";
            t.style.position="absolute";
            t.style.left="-9999px";
            document.body.appendChild(t);
        }
        function change(){
            $("_textareacopy").value= $(elemid).value;
            $(elemid).style.height= $("_textareacopy").scrollHeight+$("_textareacopy").style.height+"px";
        }
        addHandler($("target"),"propertychange",change);//for IE
        addHandler($("target"),"input",change);// for !IE
        $(elemid).style.overflow="hidden";//一处隐藏，必须的。
        $(elemid).style.resize="none";//去掉textarea能拖拽放大/缩小高度/宽度功能
    }

    addHandler(window,"load",function(){
        autoTextArea("target");
    });
})()*/


