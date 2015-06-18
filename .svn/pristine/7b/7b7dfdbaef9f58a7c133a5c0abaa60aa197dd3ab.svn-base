/*
@author   lingchen
@date:    2013-03-28
@edition: 1.0
@info:    首页文字链定向广告
@use:	  attachURL2Window(id,cookiename,url) 
@description：
		  1.给某个id容器内的所有a标签注册点击事件，使其点击后在sina.com.cn域下种一个名为cookiename的cookie；
		  2.点击后访问url监测（不填时无监测）；
		  3.该cookie 会在进入文章页后被顶通、画中画00和文章内按钮三个脚本文件读取，实现文字链定向；
		  4.该cookie 会在进入文章页后被画中画00脚本文件删除
*/
(function() {
	var addEvent = function(obj, eventType, func) {
		if(obj.attachEvent) {
			obj.attachEvent("on" + eventType, func);
		} else {
			obj.addEventListener(eventType, func, false);
		}
	};

	var attachURL2Window = function(id,cookiename,url) {
		var links;
		try {
			links = document.getElementById(id).getElementsByTagName("a");
		}catch(e) {
			links = [];
		}
		for (var i = 0, len = links.length; i < len; i++) {
			addEvent(links[i], "mousedown", function(e) {
				var writeCookie = function(O, o, l, I, p) {
				var i = "",
				c = "",
				path = "";
				if (l != null) {
					if(l == "NaN"){
						i = ";";
					}else{
						i = new Date((new Date).getTime() + l * 3600000);
						i = "; expires=" + i.toGMTString();
					}
				};
				if (I != null) {
					c = ";domain=" + I
				};
				if(p != null){
					path = ";path=" + p;
				};
				document.cookie = O + "=" + escape(o) + i + c + path;
				};
				writeCookie(cookiename,"true",1,".sina.com.cn","/");
				//点击监测
				if(url){
					var _clickStat = new Image();
					_clickStat.src = url + "&_=" + new Date().getTime() + "&url=";
				}
			});
		}
	};
		
	
	//华安基金 begin
	attachURL2Window("directAd_huaan_jj_01_1","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_01_2","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_01_3","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_01_4","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_02","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_03","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_04","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_05","directAd_huaan");
	attachURL2Window("directAd_huaan_jj_06","directAd_huaan");
	//华安基金 end
	
})()