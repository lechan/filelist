/*
RotatorAD V3.9 2012-12-14
Author: Dakular <shuhu@staff.sina.com.cn>
Editor: Lingchen <lingchen@staff.sina.com.cn>
格式: new RotatorAD(商业广告数组, 非商业广告数组, 层id)
说明: 第一次访问随机出现，以后访问顺序轮播；自动过滤过期广告；cookie时间24小时；商业广告数量不足时，从非商业广告中补充
	  限制最少轮播数量，广告少于限制数时，才从垫底里补充，否则不补垫底
*/
if(typeof(RotatorAD)!='function'){
var RotatorAD = function(rad,nad,div_id){

var date = new Date();
var id = 0;
var max = 99;
var url = document.location.href;

/*2012-10-26 coding about cookiename begin*/
//var cookiename = 'SinaRot'+escape(url.substr(url.indexOf('/',7),2)+url.substring(url.lastIndexOf('/')));
var urlStr = url.substring(7);
var urlArr = []
if(urlStr.indexOf('?')!=-1){
	urlStr = urlStr.substring(0,urlStr.indexOf('?'));
	urlArr = urlStr.split('/');
}else{
	urlArr = urlStr.split('/');
}
var cookiename = null;
var urlArrLen = urlArr.length;
var nameStr1 = urlArr[0].substring(0, urlArr[0].indexOf('.'));
var nameStr2 = '';
var nameStr3 = '';
if(urlArrLen>1){
	nameStr2 = '/'+urlStr.substring(urlStr.indexOf('/')+1,urlStr.lastIndexOf('/'));
	if(urlStr.substring(urlStr.lastIndexOf('/')).indexOf('.')!=-1){
		nameStr3 = '/zw'; 
	}else{
		nameStr3 = '/'+urlStr.substring(urlStr.lastIndexOf('/')+1)	
	}
}
cookiename = 'SinaRot/'+ nameStr1 + nameStr2 + nameStr3;
/*2012-10-26 coding about cookiename end*/

var timeout = 1440; //24h
var w = rad.width;
var h = rad.height;
var bnum = rad.num;
var num = rad.num;
var num2 = rad.num2;
var marginType = (typeof(rad.mtype)=="undefined")?0:rad.mtype;
var ary = new Array();
//过滤无效商广
for(var i=0; i<rad.length; i++){
	var start = strToDate(rad[i][2].replace('<startdate>','').replace('</startdate>',''));
	var end = strToDate(rad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
	//增加移动设备过滤 coding by lingchen
	var ua = navigator.userAgent.toLowerCase();
	var IOS = /\((iPhone|iPad|iPod)/i.test(ua);
	var ary_type = rad[i][0].substring(rad[i][0].length-3).toLowerCase();
	if(date>start && date<end){
		if(IOS){
			if(ary_type!='swf'){
				ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5]?rad[i][5]:'0',rad[i][6]?rad[i][6]:'']);
			}
		}else{
			ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5]?rad[i][5]:'0',rad[i][6]?rad[i][6]:'']);
		}
	}
}

//标记商广为空 acelan
var nullRad  = ary.length - 1;

//过滤无效垫底
var vnad = new Array();
for(var i=0; i<nad.length; i++){
	if(nad[i][2]==null||nad[i][2]==''){
		vnad.push([nad[i][0], nad[i][1],'', '0',nad[i][6]]);
	}else{
		var start = strToDate(nad[i][2].replace('<startdate>','').replace('</startdate>',''));
		var end = strToDate(nad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
		if(date>start && date<end){
			vnad.push([nad[i][0], nad[i][1], '', '0',nad[i][6]]);
		}
	}
}
//补位
var nn = 0;
if(vnad.length>0 && (num2==null || ary.length<num2)){
	for(var i=0; i<(num2==null?rad.num:num2); i++){
		if(i>ary.length-1){
			ary.push([vnad[nn][0], vnad[nn][1], '', '0', vnad[nn][6]]);
			if(++nn > nad.length-1) nn = 0;
		}
	}
}
//num = ary.length<num?ary.length:num;
//排序(同步有序号的广告)
ary.sort(function(x,y){return x[3]-y[3];});
//取id
if(typeof(globalRotatorId)=='undefined' || globalRotatorId==null || isNaN(globalRotatorId)){
	curId = G(cookiename);
	curId = curId==""?Math.floor(Math.random()*max):++curId;
	if(curId>max || curId==null || isNaN(curId)) curId=0;
	S(cookiename,curId,timeout);
	globalRotatorId = curId;
}

id=globalRotatorId%num;
//若商广为空
//nullRad = true;
if ((typeof _ssp_ad != 'undefined') && (id > nullRad)) {
    _ssp_ad.load(div_id, showAD, w, h);
} else {
    showAD();
}

//Show AD by acelan
function showAD() {
	if(ary.length==0) return; //如果没有广告则不显示
	var n = id;
	
	
	try{
	  if(typeof(ary[n][0])=="undefined" || ary[n][0]=="") return;
	  var type = ary[n][0].substring(ary[n][0].length-3).toLowerCase();
	  var od = document.getElementById(div_id);
	  if(od && marginType==1){od.style.marginTop = 8 + "px";}
	  if(od && marginType==2){od.style.marginBottom = 8 + "px";}
	  if(od && marginType==3){od.style.marginTop = 8 + "px";od.style.marginBottom = 8 + "px";}
		//将轮播序号返回到页面上
		if(ary[n][3]!=null||ary[n][3]!='undefined'){
			if(!document.getElementById('rotatorAD_id')){
				var rotatorAD_id = document.createElement('input');
				rotatorAD_id.id = 'rotatorAD_id';
				rotatorAD_id.type = 'hidden';
				rotatorAD_id.value = ary[n][3];
				document.body.insertBefore(rotatorAD_id,document.body.firstChild);
			}else{
				document.getElementById('rotatorAD_id').value = ary[n][3];	
			}
		}
		//添加监测
		if(ary[n][4]!=null&&ary[n][4]!=''){monitor(ary[n][4]);}
	}catch(e){return;}

	if(type=='swf'){
		var of = new sinaFlash(ary[n][0], div_id+'_swf', w, h, "7", "", false, "High");
		of.addParam("wmode", "opaque");
		of.addParam("allowScriptAccess", "always");
		of.addVariable("adlink", escape(ary[n][1]));
		if(ary[n][2]!="" && ary[n][2]!=null){of.addVariable("_did", ary[n][2]);}
		of.write(div_id);
		(function () {
			var url = ary[n][1];
			if (url) {
			var el = document.createElement('a'),
			flashEl = document.getElementById(div_id);
			flashEl.style.position = "relative";
			el.setAttribute("href", url);
			el.setAttribute("target", "_blank");
			el.style.cssText += ";display:block;width:" + w + "px;height:" + h + "px;position:absolute;left:0px;top:0px;filter:alpha(opacity:0)";
			if (el.style.filter) {
			el.style.backgroundColor = "white";
			}
			flashEl.appendChild(el);
			}
		})();
	}else if(type=='jpg' || type=='gif' || type=='png'){
		if(ary[n][2]!="" && ary[n][2]!=null){
		  od.innerHTML = '<a href="'+ary[n][1]+'" target="_blank" onclick="try{_S_acTrack('+ary[n][2]+');}catch(e){}"><img src="'+ary[n][0]+'" border="0" width="'+w+'" height="'+h+'" /></a>';
		}else{
		  od.innerHTML = '<a href="'+ary[n][1]+'" target="_blank"><img src="'+ary[n][0]+'" border="0" width="'+w+'" height="'+h+'" /></a>';
		}
	}else if(type=='htm' || type=='tml'){
		od.innerHTML = '<iframe id="ifm_'+div_id+'" frameborder="0" scrolling="no" width="'+w+'" height="'+h+'"></iframe>';
		document.getElementById('ifm_'+div_id).src = ary[n][0];
	}else if(type=='.js'){ //js
		//document.write('<script language="javascript" type="text/javascript" src="'+ary[n][0]+'"></scr'+'ipt>');
		var jsurl = ary[n][0];
		var adScript = document.createElement('script');
		adScript.src = jsurl;
		document.getElementsByTagName('head')[0].appendChild(adScript);
	}else{ //textlink
		if(ary[n][2]!="" && ary[n][2]!=null){
		  od.innerHTML = '<a href="'+ary[n][1]+'" onclick="try{_S_acTrack('+ary[n][2]+');}catch(e){}"  target="_blank">'+ary[n][0]+'</a>';
			}else{
		  od.innerHTML = '<a href="'+ary[n][1]+'"  target="_blank">'+ary[n][0]+'</a>';
		}
	}
}


function G(N){
	var c=document.cookie.split("; ");
	for(var i=0;i<c.length;i++){
		var d=c[i].split("=");
		if(d[0]==N)return unescape(d[1]);
	}return '';
};
function S(N,V,Q){
	var L=new Date();
	var z=new Date(L.getTime()+Q*60000);
	document.cookie=N+"="+escape(V)+";path=/;expires="+z.toGMTString()+";";
};
function strToDate(str,ext){
	var arys = new Array();
	arys = str.split('-');
	var newDate = new Date(arys[0],arys[1]-1,arys[2],9,0,0);
	if(ext){
		newDate = new Date(newDate.getTime()+1000*60*60*24);
	}
	return newDate;
}

//监测
function monitor(o){
	if(o instanceof Array){
		var aImg=[];
		
		for(var i=0,len=o.length;i<len;i++){
			aImg[i] = new Image();
			aImg[i].src = o[i];	
		}
	}else if(typeof o==='string'&& o!=""){
		var oImg = new Image();
		oImg.src = o;	
	}
}

}
}
