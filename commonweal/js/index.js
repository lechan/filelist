var now = 0,wh = document.documentElement.clientHeight,len = $("#menuArea .item").length;
function adjustHeight(){
	var h = document.documentElement.clientHeight;
	$(".main_wrap,.section").css("height",h+"px");
}


function tabsMove(now){
    $("#menuArea li").eq(now).addClass("current").siblings().removeClass("current");
    //console.log(now);
    $("#container").animate({'top': -wh*now}, 300);
    //$(".area").eq(now).addClass("areaOn").siblings().removeClass("areaOn");
}

$("#menuArea .item").each(function(i,o){
    $(o).click(function(){
        now = i;
        tabsMove(now);
    });
});

$(".area0 .item").each(function(i,o){
    $(o).click(function(){
        now = i+1;
        tabsMove(now);
    });
});

//prev
function prevMove(){
	now --;
    if(now < 0){
        now = 0;
        return false;
    }else{
	    if( now == 0 ) $(".prev").addClass("prevout");
        tabsMove(now);
    }
}

//next
function nextMove(){
	now ++;
    if(now > len-1){
        now = len-1;
        return false;
    }else{
	    if( now == len-1 ) $(".next").addClass("nextout");
        tabsMove(now);
    }
}

adjustHeight();	

//mousewheel
var timer = null;
$("body").mousewheel(function(event,delta){
	//console.log(delta > 0 )
	clearTimeout(timer);
	if(delta > 0){
		timer = setTimeout(function(){prevMove();}, 200);
    }else if(delta < 0){
		timer = setTimeout(function(){nextMove();}, 200);
    }
});

$(".section2").parallax(); 