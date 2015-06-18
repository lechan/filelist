
	 
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
 
 
 /*$(".inp_date").focus(function(){
	var val = $(this).val();
	if(val == "yyyy-mm-dd"){
		$(this).val("");	
	} 
 }).blur(function(){
	 var val = $(this).val();
	 if(val == ""){
		$(this).val("yyyy-mm-dd");	
	} 
 });
 
 $("#tel").focus(function(){
	var val = $(this).val();
	if(val == "QQ号/微信号/手机"){
		$(this).val("");	
	} 
 }).blur(function(){
	 var val = $(this).val();
	 if(val == ""){
		$(this).val("QQ号/微信号/手机");	
	} 
 });*/
 
 $("#search_startdate").click(function(){
	 $("#scrollbox1").animate({scrollTop: 320}, 100);
	
 });
	
$("#startdate").click(function(){
	$("#scrollbox2").animate({scrollTop: 320}, 100);	
	
 });

 $("#tel").click(function(){
	 $("#scrollbox2").animate({scrollTop: 380}, 100);	
 });
 
 $(".remarks").click(function(){
	$("#scrollbox2").animate({scrollTop: 430}, 100);	
	
 });


	 
/*/微信相关
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	WeixinJSBridge.call('hideToolbar');
});	 
**/
order();
	 
	 
});







//订单编辑页
function order(){
	 
	 if(typeof data !="undefined"){
		 $("#price").html(data.price);
		 $("#total").html("￥"+$("#num").val()*data.price);
		 $("#hid_total").val($("#num").val()*data.price);
		 if(data.type == "1"){
			 var tips = "单价*人数";
			 $("#tips_price").html(tips);
			 $("#make_friends").hide();	 
		 }else if(data.type == "2"){
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
				$("#hid_total").val($("#num").val()*data.price);
			}
		 });
		 $(".edit b.plus").click(function(){
			 var val = $(this).siblings("input").val();
			if(val < 100){
				val++;
				$(this).siblings("input").val(val);
				$(this).siblings("i").html(val+"人");
				$("#total").html("￥"+val*data.price);
				$("#hid_total").val($("#num").val()*data.price);
			}
		 });
		 
		 //日期调接口
		 $("#star_tim").change(function(){
			 var aid = data.id;
			 var star_tim = $(this).val();
			 var maxnum = data.maxnum;
			 var url = "hiddphp.php?act=getman&aid="+aid+"&star_tim="+star_tim;
			$.get(url,function(data){
				if(data && data >=0){
					$(".num_box").show();
					$("#cur_num").html(data);
					$("#remain_num").html(maxnum-data);	
				}
			});	 
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


