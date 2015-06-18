
//logo点击监测+跳转地址
var monitorLink = 'http://sina.allyes.com/main/adfclick?db=sina&bid=549799,616500,621769&cid=0,0,0&sid=625243&advid=13935&camid=96048&show=ignore&url=http://clk.pagechoice.net/clk/iv-2692/st-23/cr-2/oi-99455/or-1617/adv-9/pcon-0/http%253A%252F%252Fsport2013.peaksport.com%252Fnbaplayoffs';
//按钮监测填写
var btnMonitor = 'http://sina.allyes.com/main/adfclick?db=sina&bid=549799,616822,622091&cid=0,0,0&sid=625582&advid=13935&camid=96048&show=ignore&url=';
// 广告展示时间、支持的2个队员的名称、对应球员id填写
var peakAdList = [
	{start:'2013-05-07',end:'2013-05-07',l:'帕克',l_id:'65',r:'巴蒂尔',r_id:'64'},
	{start:'2013-05-08',end:'2013-05-08',l:'帕克',l_id:'65',r:'巴蒂尔',r_id:'64'},
	{start:'2013-05-09',end:'2013-05-09',l:'帕克',l_id:'0',r:'巴蒂尔',r_id:'0'},
	{start:'2013-05-10',end:'2013-05-10',l:'帕克',l_id:'70',r:'巴蒂尔',r_id:'69'},
	{start:'2013-05-11',end:'2013-05-11',l:'乔治希尔',l_id:'67',r:'萨姆杨',r_id:'68'},
	{start:'2013-05-12',end:'2013-05-12',l:'帕克',l_id:'73',r:'巴蒂尔',r_id:'72'}
];




$(function(){
var csshtml = '';
csshtml += '<style type="text/css">';
csshtml += '.main{ overflow:visible;}';
csshtml += '.peakAd{ position:relative; width:400px; margin:10px auto; overflow:hidden;}';
csshtml += '.peaklogo{ width:80px; height:100px; float:left; background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/logo.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/logo2.png) no-repeat left center;}';
csshtml += '.peaklogo a{ padding-left:80px; width:0px; height:100px; display:block;}';
csshtml += '.peakcon{ width:320px; height:100px; float:left;}';
csshtml += '.teambox{ width:320px; height:45px;}';
csshtml += '.player{ width:160px; float:left; height:45px;}';
csshtml += '.player span{ width:18px; height:18px; background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/checkbox.png) no-repeat right center; float:left; margin-top:14px; cursor:pointer; position:relative; z-index:2;}';
csshtml += '.player span img{ display:none;}';
csshtml += '.player input{ display:none;}';
csshtml += '.player a{ width:0px; height:45px; padding-left:160px; position:absolute; top:0px; left:0px; z-index:1;}';
csshtml += '.peakslogan{ width:320px; height:36px; background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/title.png) no-repeat 0 -10px!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/title2.png) no-repeat 0 -10px; position:relative;}';
csshtml += '.peakslogan .titlelink{ height:36px; padding-left:320px; width:0px; position:absolute; top:0px; left:0px; z-index:1;}';
csshtml += '.peakslogan .submit_btn{ width:0px; height:28px; padding-left:84px; position:relative; z-index:2; background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/submit.png) no-repeat 0 0; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/submit.png) no-repeat 0 0; float:left; margin:5px 0px 0px 190px;}';
csshtml += '.name1{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name1.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name1.png) no-repeat left center;}';
csshtml += '.name2{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name2.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name2.png) no-repeat left center;}';
csshtml += '.name3{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name3.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name3.png) no-repeat left center;}';
csshtml += '.name4{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name4.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name4.png) no-repeat left center;}';
csshtml += '.name5{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name5.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name5.png) no-repeat left center;}';
csshtml += '.name6{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name6.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name6.png) no-repeat left center;}';
csshtml += '.name7{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name7.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name7.png) no-repeat left center;}';
csshtml += '.name8{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name8.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name8.png) no-repeat left center;}';
csshtml += '.name9{ background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/name9.png) no-repeat left center!important; _background:url(http://d2.sina.com.cn/shh/lechan/20130507peak/images/ie6/name9.png) no-repeat left center;}';
csshtml += '</style>';

var peakhtml = '';
peakhtml +='<div class="peaklogo"><a href="'+monitorLink+'" target="_blank"></a></div>';
peakhtml +='<div class="peakcon"><div class="teambox">';
peakhtml +='<div class="player" id="player1"><a href="'+monitorLink+'" target="_blank"></a><span><img src="http://d5.sina.com.cn/shh/lechan/20130507peak/images/select.png" /></span><input type="radio" name="player" value="" /></div>';
peakhtml +='<div class="player" id="player2"><a href="'+monitorLink+'" target="_blank"></a><span><img src="http://d5.sina.com.cn/shh/lechan/20130507peak/images/select.png" /></span><input type="radio" name="player" value="" /></div>';
peakhtml +='</div>';
peakhtml +='<div class="peakslogan"><a href="'+monitorLink+'" target="_blank" class="titlelink"></a><a href="javascript:;" class="submit_btn"></a></div>';
peakhtml +='</div></div>';		  
$(csshtml).insertAfter($("#suningAd"))

$('<div class="peakAd"></div>').insertAfter($("#suningAd"));
$(".peakAd").html(peakhtml);

var data = [
	{ name : '乔治希尔',bg : 'name1',w:'135' },
	{ name : '萨姆杨',bg : 'name2',w:'116' },
	{ name : '沃特森',bg : 'name3',w:'101' },
	{ name : '帕克',bg : 'name4',w:'97' },
	{ name : '巴蒂尔',bg : 'name5',w:'99' },
	{ name : '麦基',bg : 'name6',w:'92' },
	{ name : '古德洛克',bg : 'name7',w:'130' },
	{ name : '兰德里',bg : 'name8',w:'95' },
	{ name : '戴勒姆波特',bg : 'name9',w:'133' }
];

var timeLimit = function(start,end){
	var start = strToDate(start);
	var end = strToDate(end);
	var date = new Date();
	var date_year = date.getFullYear(),
		date_month = date.getMonth(),
		date_day = date.getDate();
	date = strToDate(date_year + '-' + (parseInt(date_month) + 1) + '-' + date_day);
	return (date>=start && date<=end)? true: false;
}

var strToDate = function(str,ext){
	var arys = new Array();
	arys = str.split('-');
	var newDate = new Date(arys[0],arys[1]-1,arys[2],0,0,0);
	if(ext){
		newDate = new Date(newDate.getTime()+1000*60*60*24);
	}
	return newDate;
}

var getDataBg = function(name){
	var bg = '';
	
	for(var i=0;i<data.length;i++){
		if(name==data[i].name){
			bg = data[i].bg;
			break;	
		}
	}
	
	return bg;
}

var getDataW = function(name){
	var w = '';
	
	for(var i=0;i<data.length;i++){
		if(name==data[i].name){
			w = data[i].w;
			break;	
		}
	}
	
	return w;
}



for(var i=0;i<peakAdList.length;i++){
	var start = peakAdList[i].start;
	var end = peakAdList[i].end;
	var l = peakAdList[i].l;
	var r = peakAdList[i].r;
	var l_id = peakAdList[i].l_id;
	var r_id = peakAdList[i].r_id;
	if(timeLimit(start,end)){
		$(".peakAd").show();
		var l_bg = getDataBg(l);
		var r_bg = getDataBg(r);
		var l_w = parseInt(getDataW(l))+5;
		var r_w = parseInt(getDataW(r))+5;
		$("#player1").addClass(l_bg);	
		$("#player1").find('input').val(l_id);
		$("#player1").find('span').css('padding-left',l_w+'px');
		$("#player2").addClass(r_bg);	
		$("#player2").find('input').val(r_id);
		$("#player2").find('span').css('padding-left',r_w+'px');
		break;
	}else{
		$(".peakAd").hide();	
	}
}

 

$(".player span").click(function(){
	$(".player span").find('img').hide();
	$(this).find('img').show();
	$(this).siblings('input:radio').attr('checked','checked');
}); 

$(".submit_btn").click(function(){
	var player_id = $("input:radio[name='player']:checked").val();
	if(player_id=='undefined'||player_id==null){
		player_id = 0;	
	}
	var url = btnMonitor + 'http://sport2013.peaksport.com/nbaplayoffs/?gameid='+player_id+'&redirect=videosina';
	window.open(url);
});




});