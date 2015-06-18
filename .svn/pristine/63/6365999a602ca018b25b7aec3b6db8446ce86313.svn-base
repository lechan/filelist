//搜索行程
function searchTravel(){
	var place = '';
	$("input[name='way']:checked").each(function(){ 
		place+=$(this).val()+','; 
	}); 
	var otherplace = $("#search_otherplace").val();
	if(place.indexOf("其他")!=-1 && otherplace!=""){
		place = place.replace("其他",otherplace);
	}
	place = place.substring(0,place.length-1);
	var startdate = $("#search_startdate").val();
	var url = "hiddphp.php?act=getsearch";
	$("#pageNum").val(1);
	var page = $("#pageNum").val();
	if(place!="" && place!=null){
		var param = {"page":page,"way":place,"star_tim":startdate};
	}else{
		var param = {"page":page,"way":default_way,"star_tim":startdate};
	}
	//var param = {"page":page, "way":place, "star_tim":startdate};
	$.post(url,param,function(jdata){
		jdata = JSON.parse(jdata);
		if(jdata.datatype==1){
			
			var travelerUl = $("#searchtravelerlist");
			var travelerTpl = $('#travelerTpl').html();
			var render = _.template(travelerTpl);
			data = jdata.datalist;
			var html = render(data);
			travelerUl.html(html);
			searchback();
		}else{
			alert("未搜索到相关信息");
			searchback();
		}
	});
}

//发布行程
function createTravel(){
	var place = '';
	$("input[name='way2']:checked").each(function(){ 
		place+=$(this).val()+','; 
	}); 
	var otherplace = $("#otherplace").val();
	if(place.indexOf("其他")!=-1 && otherplace!=""){
		place = place.replace("其他",otherplace);
	}
	place = place.substring(0,place.length-1);
	var startdate = $("#startdate").val();
	var remarks = $("#target").val();
	var tel = $("#tel").val();
	var url = "hiddphp.php?act=maketravel";
	var param = {"way":place, "star_tim":startdate,"content":remarks,"touch":tel};
	if(place!=""&&startdate!=""&&tel!=""){
		$.post(url,param);
		var travelerTpl = $('#travelerTpl2').html();
		var render = _.template(travelerTpl);
		var dataitem = {"uname":uname,"uface":uface,"way":place,"starcity":"西藏","startim":startdate,"touch":tel,"content":remarks};
		var html = render(dataitem);
		if($("#searchtravelerlist li").length!=0){
			$(html).insertBefore($("#searchtravelerlist li:eq(0)"));
		}else{
			$("#searchtravelerlist").append(html);
		}
		
		//锚点定位
		$("html,body").animate({scrollTop: $("#searchtravelerlist").offset().top-80}, 100);
		$("#searchtravelerlist li:eq(0)").hide().fadeIn(1000);
		searchback();
	}else{
		alert("请填写相关信息");	
	}
}

//关闭按钮
function searchback(){
	$(".sidebar2").hide();
	$("#mask2").hide();
	$(".middle_btn").hide();
	$("#create_sub").show();
	$("html").removeClass("scrollhide");
	bBtn = true; 
	return false;
}

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
		searchback(); 
 });

var flag = true;
searchTravel();
window.onscroll = function(){
	var num = parseInt($("#pageNum").val());
	num = num + 1;
	var place = '';
	$("input[name='way']:checked").each(function(){ 
		place+=$(this).val()+','; 
	}); 
	var otherplace = $("#search_otherplace").val();
	if(place.indexOf("其他")!=-1 && otherplace!=""){
		place = place.replace("其他",otherplace);	
	}
	place = place.substring(0,place.length-1);
	var startdate = $("#search_startdate").val();
	var loader = document.body.scrollHeight;
	var iH = document.body.scrollTop + document.documentElement.clientHeight;
	var url = "hiddphp.php?act=getsearch";
	if(place!="" && place!=null){
		var param = {"page":num,"way":place,"star_tim":startdate};
	}else{
		var param = {"page":num,"way":default_way,"star_tim":startdate};
	}
	if(flag && loader - 20 < iH){
		flag = false;
		$("#pageNum").val(num);
		$.post(url,param,function(jdata){
			jdata = JSON.parse(jdata);
			
			if(jdata.datatype==1){
				var travelerUl = $("#searchtravelerlist");
				var travelerTpl = $('#travelerTpl').html();
				var render = _.template(travelerTpl);
				data = jdata.datalist;
				var html = render(data);
				travelerUl.append(html);
				flag = true;
			}else{
				setTimeout(function(){
					flag = true;	
				},500);	
			}
		});
			
	}	
}


$('input[name="way"]').click(function(){
	if($('input[name="way"]').is(':checked')){
		$('input[name="way"]:checked').each(function(){
			var val = $(this).val();
			if(val == "其他"){
				$('input[name="way"]').parent().siblings("input.otherplace").show();	 
			}else{
				$('input[name="way"]').parent().siblings("input.otherplace").hide();	 
			}
		});
	}else{
		$('input[name="way"]').parent().siblings("input.otherplace").hide();
	}
});

$('input[name="way2"]').click(function(){
	if($('input[name="way2"]').is(':checked')){
		$('input[name="way2"]:checked').each(function(){
			var val = $(this).val();
			if(val == "其他"){
				$('input[name="way2"]').parent().siblings("input.otherplace").show();	 
			}else{
				$('input[name="way2"]').parent().siblings("input.otherplace").hide();	 
			}
		});
	}else{
		$('input[name="way2"]').parent().siblings("input.otherplace").hide();
	}
});

$(".clear_btn").click(function(){
	$(this).parent().siblings(".way_box").find("input").removeAttr("checked");	
});


var list_height = $(window).height()-140;
$(".search_list").css("height",list_height);

(function(){
	var list = $("#searchpricelist li"),
		len = list.length,
		more = $("#more"),
		num = 2;
	if(len>2){
		more.css("display","block");
		list.each(function(index, element) {
			if(index>1){
				list.eq(index).hide();	
			}
		});
	}
	more.click(function(){
		num+=2;
		list.each(function(index, element) {
			if(index>1 && index<num){
				list.eq(index).show();
			}
		});
		if(len-1<=num){
			more.hide();
			return;	
		}
		
			
	});
})()

