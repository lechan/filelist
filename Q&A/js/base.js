function Sandbox(){
	"use strict";
	var args = Array.prototype.slice.call(arguments),
		//最后一个参数为回调函数
		callback = args.pop(),
		//参数是数组或者单个串
		modules = (args[0] && typeof(args[0]) === 'string') ? args : args[0],
		i;
		
	//强制对象化调用
	if(!(this instanceof Sandbox)){ return new Sandbox(modules, callback); }
	////add Sandbox properties...
	//this.propA = '', this.propB = '';
	
	////add modules to Sandbox
	if(!modules || modules === '*'){
		modules = [];
		for(i in Sandbox.modules){
			if(Sandbox.modules.hasOwnProperty(i)){ modules.push(i); }
		}
	}
	
	////init modules 执行所有模块
	for(i=0; i<modules.length; i+=1){ Sandbox.modules[modules[i]](this); }
	
	callback(this);
}

////需要增加的任何原型属性
//Sandbox.prototype = {
//	name: '乐小编',
//	version: '1.0',
//	fool: function(){
//		//do sth useful
//	}
//};

Sandbox.module = {};

/*****************
todo
沙箱化 旧版amp模块代码的定义调用
*/

var LENOVO = LENOVO || {};
LENOVO.namespace = function(ns_str){
	var parts = ns_str.split('.'),
		parent = LENOVO, i;
	//去掉全局变量
	if(parts[0] === 'LENOVO'){parts = parts.slice(1);}
	for(i=0; i<parts.length; i+=1){
		//不存在就建一个空对象
		if(typeof parent[parts[i]] === 'undefined'){parent[parts[i]] = {};}
		//层层深入
		parent = parent[parts[i]];
	}
	return parent;
};

LENOVO.conf = {
	'ctx': '/appeditor/',
	'global' : window.lestore || window.App5 || window.newxb,	
	'realm' : "appstore.lps.lenovo.com",
	'device' : '',
	'ie6': 'undefined' === typeof(document.body.style.maxHeight),
	'clientID': '',
	'ua': window.navigator.userAgent,
	'host':'http://'+window.location.host,
	"checkedvc" : "61300", //必须支持的versioncode
	"lastestvc" : "61310", //当前最新的versioncode //http:/www.lenovomm.com/error/queryappvc.do?pn=com.lenovo.leos.appstore
	"downloadurl" : "http://app.lenovo.com/appstore/psl/com.lenovo.leos.appstore?cnum=19302",//乐商店下载地址
	"score" : 0,
	"loadingFlag" : false
};

LENOVO.namespace('LENOVO.com.txt');
LENOVO.com.txt = (function(){
	var
	toDate = function(_ms){
		var date = new Date(_ms),
			month = date.getMonth()+1,
			xdate = date.getDate();
		return date.getFullYear() + '-' + (month < 10 ? '0'+month : month) + '-' + (xdate < 10 ? '0'+xdate : xdate);
	},
	
	cut = function(_str){
		var i, t=0, strLength = _str.length;
		for(i=0;i<strLength;i++){
			_str.charCodeAt(i)>255 ? t+=2 : t+=1;
		}
		return t;
	};
	
	return {
		toDate: toDate,
		cut: cut
	};
}());

LENOVO.namespace('LENOVO.com.cookie');
LENOVO.com.cookie = (function(){
	var 
	get = function(_name){
		var	cookies = document.cookie, pos = cookies.indexOf(_name+'='), value;
		
		if(pos !== -1){
			var start = pos + _name.length+1;
			var end = cookies.indexOf(';',start);
			//最后一个
			if(end === -1){end = cookies.length;}
			value = cookies.substring(start,end);
			value = decodeURIComponent(value);
		}
		return value;
	},
	set = function(_name, _value, _etc){
		document.cookie = _name+'='+encodeURIComponent(_value) + (_etc ? _etc : '');
	};
	return {
		get:get,
		set:set
	};
}());

LENOVO.namespace('LENOVO.com.position');
LENOVO.com.position = (function(){
	////todo 只针对ie6不支持fixed的情况
	var fixed = function(node){
		node.data('initScrollY', document.documentElement.scrollTop);
		node.data('initTop',node.offset().top);
		//alert(node.data('initTop'));
		$(window).scroll(function(){
			node.offset({top: node.data('initTop') + (document.documentElement.scrollTop - node.data('initScrollY')), left: node.offset().left});
		});
	},
	
	hCenter = function(node){
		var leftPx;
		node.css('display','block');////必须为block否则没办法计算宽高
		leftPx = ($(document.body).width() - node.width())/2;
		node.css('left',leftPx);
		////zepto bug 这里必须设置Y值，否则会被删除。。。
		//node.offset({left: leftPx, top: node.offset().top});
		return node;
	},
	
	vCenter = function(node){
		var topPx;
		node.css('display','block');
		topPx = ($(window).height() - node.height())/2 + document.documentElement.scrollTop;
		node.offset({left: node.offset().left, top: topPx});
		return node;
	},
	
	vWindowCenter = function(node){
		var topPx;
		node.css('display', 'block');
		topPx = ($(window).height() - node.height())/2;
		node.css('top', topPx);
		return node;
	}
	
	return {
		fixed: fixed,
		hCenter: hCenter,
		vCenter: vCenter,
		vWindowCenter: vWindowCenter
	};
}());

LENOVO.namespace('LENOVO.com.ui.toast');
LENOVO.com.ui.toast = (function(){
	var initialized = false, 
		node,
		playing,
		position = LENOVO.com.position,
	
	init = function(){
		if(initialized){return;}
		node = $('#toast');
		node.css('display','block');
		////Y位置，自定义toast位置
		if(LENOVO.conf.ie6){
			node.css('position', 'absolute');
			node.offset({top: document.documentElement.scrollTop + ($(window).height() - 75)});
			position.fixed(node);
		}
		$(window).resize(function(){
			position.hCenter(node);
		});
		initialized = true;
	},
	
	show = function(msg, cb){
		init();
		if(playing){return;}
		node.text(msg);
		////X位置居中--每次更新msg都需要居中一次
		position.hCenter(node);
		
		playing = true;
		node.fadeIn(800,function(){
			window.setTimeout(function(){
				node.fadeOut(800,function(){
					playing = false;
					if(cb){cb();}
				});
			}, 1000);
		});
	};
	
	return {
		show: show
	};
}());

LENOVO.namespace('LENOVO.com.ui.dialog');
LENOVO.com.ui.dialog = (function(){
	var mask = $('#masking'),
	position = LENOVO.com.position,
		
	hide = function(node){
		
		node.removeClass('animate_popOn').addClass('animate_popOff');
		mask.removeClass('animate_maskOn').addClass('animate_maskOff');
		setTimeout(function(){mask.height(0).css('display', 'none');node.css('display', 'none');},200)
	},
	
	show = function(node){
		mask.height($(document).height()).css('display', 'block');
		node = position.hCenter(node);
		if(LENOVO.conf.ie6){
			node.css('position', 'absolute');
			position.fixed(position.vCenter(node));
		}else{
			position.vWindowCenter(node);
		}
		mask.removeClass('animate_maskOff').addClass('animate_maskOn');
		node.removeClass('animate_popOff').addClass('animate_popOn');
	};
	
	return {
		show: show,
		hide: hide
	};
}());

LENOVO.namespace('LENOVO.com.ajaxTip');
LENOVO.com.ajaxTip = (function(){
	var errors = {'timeout':'请求超时', 'abort':'网络异常'},
	get = function(str){
		return errors[str];
	};
	
	return {get: get};
}());
