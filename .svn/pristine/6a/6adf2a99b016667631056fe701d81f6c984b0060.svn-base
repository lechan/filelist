/*
@author   lingchen
@date:    2013-03-26
@edition: 1.0
@info:    视频正文页大海报广告
@use:
PosterAd.init({
	mainSrc : '主素材地址',
	href : '点击链接',
	startTime : '开始时间(例：2013-01-01)',
	endTime : '结束时间(例：2013-02-01)'	
});
*/
(function(document, window){
var PosterAd = window.PosterAd = {
	timer : null,
	count : 10,
	w: 960,
	h: 600,
	init : function(option){
		var _this = this;
		with(option){
			if(_this.timeLimit(startTime,endTime)){
				_this.mainProgram(mainSrc,href);
			}
		}
	},
	mainProgram : function(mainSrc,href){
		var _this = this;
		_this.createMainWrap(mainSrc,href);
	},
	timeLimit : function(start,end){
		var start = this.strToDate(start);
		var end = this.strToDate(end);
		var date = new Date();
		var date_year = date.getFullYear(),
			date_month = date.getMonth(),
			date_day = date.getDate();
		date = this.strToDate(date_year + '-' + (parseInt(date_month) + 1) + '-' + date_day);
		if(date>=start && date<=end){
			return true;
		}else{
			return false;	
		}
	},
	countDownEvent : function(obj){
		var _this = this;
		var num = _this.count;
		_this.timer = setInterval(function(){
			num--;
			if(num==0){
				clearInterval(_this.timer);
				_this.animate(obj,{'opacity':0},function(){
					_this.closeEvent('posterAd');
				});
			}
		},1000);
	},
	createMainWrap : function(mainsrc,href){
		var _this = this;
		var mainWrap = document.createElement('div');
		mainWrap.id = 'posterAd';
		var cssText = 'width:'+ _this.w +'px; height:'+ _this.h +'px; background:#000; position:absolute; left:50%; margin-left:-'+ _this.w/2 +'px; z-index:20000; opacity:0; filter:alpha(opacity=0);';
		_this.loadCss(mainWrap,cssText);
		document.body.insertBefore(mainWrap,document.body.childNodes[0]);
		var conBox = document.createElement('div');
		conBox.id = 'posterAdWrap';
		mainWrap.appendChild(conBox);
		//_this.createMainClose(mainWrap);
		_this.fillContent(conBox,mainsrc,href,_this.w,_this.h);
		setTimeout(function(){
			_this.animate(mainWrap,{'opacity':100},function(){
				_this.countDownEvent(mainWrap);	
			});
		},3000);
	},
	loadImg : function(src,fn){
		var oImage = new Image();
		oImage.src = src;
		oImage.timer = setInterval(function(){
			if(oImage.onload){
				clearInterval(oImage.timer);
				if(fn){
					fn.call(oImage);	
				}	
			}
		},30);
	},
	/*createMainClose : function(parent){
		var _this = this;
		var oA = document.createElement("a");
		oA.innerHTML = '<img src="http://d1.sina.com.cn/shh/lechan/HD_Pic/images/close1.gif" width="40" height="18" style="position:absolute; right:0px; top:0px; z-index:10;" />';
		oA.href = 'javascript:void(0)';
		parent.appendChild(oA);
		oA.onclick = function(){
			_this.closeEvent('endSelectPop');
			document.getElementById('endSelectBar').style.display = 'block';
			clearInterval(_this.timer);
		} 
	},*/
	closeEvent : function(id){
		var obj = document.getElementById(id);
		if (obj && obj.parentNode) {
			obj.parentNode.removeChild(obj);
		}
		obj = null;
	},
	fillContent: function (obj,src,href,w,h) {
		var _src = decodeURIComponent(src);
		var filetype = _src.substring(_src.length - 3).toLowerCase();
		var _this = this;
		var _href = href;
		var conWrap = obj;
		switch(filetype) {
		case "swf":
			_this.loadFlash(conWrap,_src,'posterAdFlash',w,h,'transparent');
			if (_href&&_href!="") {
				var ell = document.createElement('a');
				ell.setAttribute("href", _href);
				ell.setAttribute("target", "_blank");
				ell.style.cssText += ";display:block;width:" + w + "px;height:" + h + "px;position:absolute;left:0px;top:0px;filter:alpha(opacity:0);background:#fff;opacity:0; z-index:10";
				conWrap.appendChild(ell);
			}
			break;
		case "jpg":
		case "gif":
		case "png":
			conWrap.innerHTML = '<a href="' + _href + '" target="_blank"><img src="' + _src + '" border="0" width="' + w + '" height="' + h + '"/></a>';
			break;
		case "htm":
		case "tml":
			conWrap.innerHTML = '<iframe id="ifm_poster" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="' + _src + '"></iframe>';
			break;
		case ".js":
			break;
		default:

		}
	},
	loadFlash : function(obj,src,id,w,h,wmode){
		var flash_obj ='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="'+ id +'" name="'+ id +'" width="'+ w +'" height="'+ h +'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="'+ src +'" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="allowScriptAccess" value="always" /><param name="wmode" value="'+ wmode +'" /><embed src="'+ src +'" quality="high" bgcolor="#ffffff" width="'+ w +'" height="'+ h +'" id="'+ id +'" name="'+ id +'" align="middle" play="true" loop="true" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="'+ wmode +'"></embed></object>';
		obj.innerHTML = flash_obj;	
	},
	loadCss : function(obj,cssText){
		obj.style.cssText = cssText;
	},	
	getClass : function(oParent,sClass){
		var parent = oParent || document;
		var re = new RegExp('\\b'+sClass+'\\b');
		var aEles = parent.getElementsByTagName('*');
		var arr = [];
		for(var i=0; i<aEles.length; i++){
			if(re.test(aEles[i].className)){arr.push(aEles[i]);}
		}
		return arr;
	},
	strToDate : function(str,ext){
		var arys = new Array();
		arys = str.split('-');
		var newDate = new Date(arys[0],arys[1]-1,arys[2],0,0,0);
		if(ext){
			newDate = new Date(newDate.getTime()+1000*60*60*24);
		}
		return newDate;
	},
	animate : function(obj,json,fn){
		var _this = this;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in json){
				var iCur = 0;
				if(attr=='opacity'){
					iCur = Math.round(parseFloat(_this.getStyle(obj,attr))*100);
				}else{
					iCur = parseInt(_this.getStyle(obj,attr));
				}
				var iSpeed = (json[attr]-iCur)/8;
				iSpeed = iSpeed<0?Math.floor(iSpeed):Math.ceil(iSpeed);
				if(json[attr] !=iCur){
					bBtn = false;	
				}
				if(attr=='opacity'){
					obj.style.filter = 'alpha(opacity='+(iCur+iSpeed)+')';
					obj.style.opacity = (iCur+iSpeed)/100;
				}else{
					obj.style[attr] = iCur + iSpeed +'px';
				}
			}
			
			if(bBtn){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);	
				}
			}
		},30);
	},
	getStyle : function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];	
		}else{
			return getComputedStyle(obj,false)[attr];	
		}
	},
	setCookie: function (key, value, expires) {
		var l = new Date();
		var z = new Date(l.getTime() + expires * 60000);
		document.cookie = key + "=" + escape(value) + ";path=/;expires=" + z.toGMTString() + ";domain=sina.com.cn";
	},
	getCookie: function (key) {
		var c = document.cookie.split("; ");
		for (var i = 0; i < c.length; i++) {
			var d = c[i].split("=");
			if (d[0] == key) {
				return unescape(d[1]);
			}
		}
		return '';
	}
}

})(document, window)


PosterAd.init({
	mainSrc : 'http://d1.sina.com.cn/shh/lechan/posterAd/poster.jpg',
	href : 'http://www.baidu.com/',
	startTime : '2013-01-01',
	endTime : '2015-04-01'	
});