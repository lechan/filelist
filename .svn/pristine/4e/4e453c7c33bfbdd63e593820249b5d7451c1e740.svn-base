//全局配置
var BASE = {
	//"domain" : "http://activity.lenovomm.com",
	"domain" : "http://beta.test2.surepush.cn",
	"realm" : "test.appstore.lps.lenovo.com",
	"imgHost" : (function(){return window.location.host == 'beta.test2.surepush.cn'?'http://beta.test2.surepush.cn':'http://img.lenovomm.com'})(),
	"checkedvc" : "61300", //必须支持的versioncode
	"lastestvc" : "61310", //当前最新的versioncode //http://app.lenovo.com/error/queryappvc.do?pn=com.lenovo.leos.appstore
	"downloadurl" : "http://app.lenovo.com/appstore/psl/com.lenovo.leos.appstore?cnum=19302",//乐商店下载地址
	"minScoreLottery" : 1, //抽奖最小点数
	"currentFn" : null
	
}

var global = window.lestore || window.App5 || window.newxb,
showToast = function(txt){
	global ? global.showToast(txt) : alert(txt);
}

var LENOVO = LENOVO || {};

LENOVO.namespace = function(ns_str){
	var parts = ns_str.split('.'), i,
		parent = LENOVO;
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

//http 组件
LENOVO.namespace('LENOVO.com.ajax');
LENOVO.com.ajax = (function(){
	var 
	get = function(_url, _param, _headers, _callback, _error){
	  var req, i;
		req = xhr(_callback,_error);
		req.open('GET',_url +'?'+ _param);
		for(var i in _headers){
			req.setRequestHeader(i, _headers[i]);
		}
		req.send(null);
	},
	
	post = function(_url, _param, _headers, _callback, _error){
		var req = xhr(_callback,_error), i;
		req.open('POST',_url);
		for(var i in _headers){
			req.setRequestHeader(i, _headers[i]);
		}
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		req.send(encodeData(_param) || null);
	},
	
	xhr = function(_callback,_error){
		var req = new XMLHttpRequest(),
		
			timer = window.setTimeout(function(){
				req.abort();
				//LENOVO.com.ui.toast.show('请求超时！');
				//showToast('请求超时！');
				if(_error){
					_error();	
				}
			},16000);

		req.addEventListener("readystatechange",function(){
			if(req.readyState == 4){
				window.clearTimeout(timer);
				if(req.status == 200){
					_callback(window.JSON.parse(req.responseText));
				}else{
					//showToast('请求异常，请稍后再试！');
					if(_error){
						_error();	
					}
					//alert(req.statusText+' : '+req.status + ' : ' + req.readyState + ' : ' + req.getResponseHeader());
					//LENOVO.com.ui.toast.show('请求异常，请稍后再试');
					
				}
			}//end if readystate
		},true);
		
		return req;
	},
	
	encodeData = function(_param){
		var params = _param.split('&'), length = params.length, i, 
		tpArray, str = '';
		for(i=0;i<length;i++){
			tpArray = params[i].split('=');
			str += tpArray[0]+'='+encodeURIComponent(tpArray[1]) + (i === length-1 ? '' : '&');
		}
		return str;
	};
	
	return {
		get:get,
		post:post
	};
}());

//文本处理
LENOVO.namespace('LENOVO.com.txt');
LENOVO.com.txt = (function(){
	var
	toDate = function(_ms){
		var date = new Date(_ms),
			month = date.getMonth()+1,
			xdate = date.getDate();
		return date.getFullYear() + '-' + (month < 10 ? '0'+month : month) + '-' + (xdate < 10 ? '0'+xdate : xdate);
	},
	
	cut = function(_size){
		/*var i, t=0, strLength = _str.length;
		for(i=0;i<strLength;i++){
			_str.charCodeAt(i)>255 ? t+=2 : t+=1;
		}
		return t;*/
	};
	
	return {
		toDate: toDate,
		cut: cut
	};
}());

////位置，高度计算
LENOVO.namespace('LENOVO.com.position');
LENOVO.com.position = (function(){
	var xoxo,
	////元素离原点偏移
	//todo有相对定位的距离的时候
	offset = function(_element){
		var top = 0,left = 0;
		while(_element !== document.body){
			top += _element.offsetTop;
			left += _element.offsetLeft;
			_element = _element.offsetParent;
			//console.log("top:" +top, "_element: "+_element);
		}
		return {"top":top,"left":left};
	},
	////元素高度
	height = function(_element){
		var style = window.getComputedStyle(_element);
		return (parseFloat(style.height) + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
	},
	////动作：回到顶部
	toTop = function(){
		window.scrollTo(0,0);
	},
	
	preventScroll = function(_node){
		_node.addEventListener('touchmove',function(_e){
			_e.preventDefault();
			_e.stopPropagation();
		},false);
	};
		
	return {
		offset: offset,
		height: height,
		toTop: toTop,
		preventScroll: preventScroll
	};
}());

////处理节点一类
LENOVO.namespace('LENOVO.com.node');
LENOVO.com.node = (function(){
	var
	addClass = function(_node, _class){
		if(!(new RegExp('(^|\\s+)'+_class+'($|\\s+)')).test(_node.className)){
			_node.className = _node.className + ' ' + _class;
		}
	},

	removeClass = function(_node, _class){
		_node.className = _node.className.replace(new RegExp('(^|\\s+)'+_class+'($|\\s+)'),' ');
	},
	
	toggleClass = function(_node, _class){
		_node.className.indexOf(_class) === -1 ? this.addClass(_node,_class) : this.removeClass(_node,_class);
	};
	
	return {
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass
	};
}());

////cookie
LENOVO.namespace('LENOVO.com.cookie');
LENOVO.com.cookie = (function(){
	var 
    domain = BASE.domain.replace("http:\/\/",""),
	get = function(_name){
		var arr,reg=new RegExp("(^| )"+_name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return arr[2];
		else
			return "";
	},
	set = function(_name,_value,_day){
		var Days = _day || 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = _name + "="+ _value + ";path=/;domain="+domain+";expires=" + exp.toGMTString();
	};
	return {
		get:get,
		set:set
	};
}());




//ui 组件,能独立于小编之外
LENOVO.namespace('LENOVO.com.ui.toast');
LENOVO.com.ui.toast = (function(){
	var toastNode, 
	//惰性函数
	render = function(){
		document.body.innerHTML += '<p id="toast" class="tcenter pf"></p>';
		//toastNode = document.getElementById('toast');
		render = function(_txt){
			////console.log(toastNode === toast); todo 研究为什么会不等
			//console.log(toastNode,document.getElementById('toast'),toast);
			toast.innerText = _txt;
			LENOVO.com.node.addClass(toast,'toastAnimation');
			toast.addEventListener("webkitAnimationStart",function(){
				////hard coding
				this.style.bottom = '1.5em';
			});
			toast.addEventListener("webkitAnimationEnd",function(){
				this.style.bottom = '-10em';
				LENOVO.com.node.removeClass(this,'toastAnimation');
			});
		};
	},
	
	show = function(_txt){
		render(_txt);
	};
	
	return {
		////ready只包含了第一次render的引用,参考js模式
		ready: render,
		show: show
	};
}());

//ui 组件,能独立于小编之外
LENOVO.namespace('LENOVO.com.ui.dialog');
LENOVO.com.ui.dialog = (function(){
	var mask,dialogWrapper,
	render = function(){
		mask = document.createElement("div");
		mask.id = "mask";
		mask.className = "pa";
		dialogWrapper = document.createElement("div");
		dialogWrapper.id = "dialogWrapper";
		
		var userAgent = navigator.userAgent;  
		var index = userAgent.indexOf("Android")  
		if(index >= 0){  
			var androidVersion = parseFloat(userAgent.slice(index+8));   
			if(androidVersion<4){  
				// 版本小于4
				dialogWrapper.className = "pa"; 
			}else{
				dialogWrapper.className = "pf";	
			}
		}else{
			dialogWrapper.className = "pf";	
		}
		
		document.body.appendChild(mask);
		document.body.appendChild(dialogWrapper);
		document.addEventListener('touchmove', function(_e){
			if(window.getComputedStyle(mask,null).display === 'block'){
				_e.preventDefault();
				_e.stopPropagation();
			}
		},false);
		//mask.onclick = function(){close(); }
		render = function(){
			mask.style.height = document.body.scrollHeight+'px';
			//mask.style.display = 'block';
			if(index >= 0){  
				var androidVersion = parseFloat(userAgent.slice(index+8));   
				if(androidVersion<4){  
					// 版本小于4
					mask.style.display = 'none';
				}else{
					mask.style.display = 'block';
				}
			}else{
				mask.style.display = 'block';
			}
			
		};
	},
	
	open = function(_html,fn){
		var sectionStyle,
		goCenter = function(h){
			//dialogWrapper.style.top = (document.documentElement.clientHeight - parseFloat(h))/2 + 'px';
			
			var userAgent = navigator.userAgent;  
			var index = userAgent.indexOf("Android")  
			if(index >= 0){  
				var androidVersion = parseFloat(userAgent.slice(index+8));   
				if(androidVersion<4){  
					// 版本小于4
					dialogWrapper.style.top = (document.body.scrollTop + 30) + "px";
				}else{
					if( parseInt(h) >200){
						dialogWrapper.style.top = "20px";
					}else{
						dialogWrapper.style.top = "80px";
					}
				}
			}else{
				if( parseInt(h) >200){
					dialogWrapper.style.top = "20px";
				}else{
					dialogWrapper.style.top = "80px";
				}
			}
			
			
			
			dialogWrapper.style.left = "50%";
			dialogWrapper.style.marginLeft = - dialogWrapper.offsetWidth / 2 +'px';
		}
		//var scrollTop = parseInt(document.body.scrollTop, 10);
		render();
		if(_html){
			dialogWrapper.innerHTML = _html;
			dialogWrapper.style.display = 'block';		
			sectionStyle = window.getComputedStyle(dialogWrapper.querySelector('section'), null);			
			goCenter(sectionStyle.height);
			if(fn){
				fn();
			}
			//console.log(scrollTop + document.documentElement.clientHeight - parseFloat(sectionStyle.height))
		}
		window.onresize = function(){
				//goCenter(sectionStyle.height);
				mask.style.height = document.body.scrollHeight+'px';
		}
		////todo 包装wrapper
	},
	
	close = function(){
		mask.style.display = 'none';
		//document.body.removeChild(mask);
		////todo:考虑用一个dialog的容器，每次隐藏容器，兼容img??
		/*var i;
		dialogs = document.querySelectorAll('body>[dialog]');
		for(i=0; i<dialogs.length; i++){
			dialogs[i].style.display = 'none';
		}*/
		dialogWrapper.style.display = 'none';
		//document.body.removeChild(dialogWrapper);
		////硬编的，todo，抽象
		//illustrateZoom.style.display = 'none';
		//window.App5.replyDialog(0);
	};
	
	return {
		ready: render,
		open: open,
		close: close
	};
	
}());

////杂项
LENOVO.namespace('LENOVO.com.util');
LENOVO.com.util = (function(){
	var getURLParam = function(_key){
		var searchStr = window.location.search,
				paramStr, paramObj={}, paramArr, splitArr;
		if(!searchStr){return '';}
		paramStr = searchStr.slice(1);
		//单个参数
		if(paramStr.indexOf('&') === -1){
			splitArr = paramStr.split('=');
			paramObj[splitArr[0]] = splitArr[1];
			return paramObj[_key];
		}
		//多个
		paramArr = paramStr.split('&');
		for(var i=0;i<paramArr.length;i+=1){
			splitArr = paramArr[i].split('=');
			paramObj[splitArr[0]] = splitArr[1];
		}
		return paramObj[_key];
	},
	
	loadJS = function(_url,_callback){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.onload = function(){ if(_callback){ _callback(); } };
		script.src = _url;
		document.getElementsByTagName('head')[0].appendChild(script);
  },
	
	loadCSS = function(_url){
		var css = document.createElement('link');
		css.rel = "stylesheet";
		css.type = "text/css";
		css.href = _url;
		document.getElementsByTagName('head')[0].appendChild(css);
	};
	
	return {
		getURLParam: getURLParam,
		loadJS: loadJS,
		loadCSS: loadCSS
	};
}());

////自定义事件，todo待完善
LENOVO.namespace('LENOVO.com.event');
LENOVO.com.event = (function(){
	var fire = function(_name){
		var evt = document.createEvent('Events');
		evt.initEvent(_name, true, false);
		document.dispatchEvent(evt);
	};
	return {fire: fire};
}());