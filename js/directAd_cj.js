/*
@author   lingchen
@date:    2013-03-28
@edition: 1.0
@info:    ��ҳ������������
@use:	  attachURL2Window(id,cookiename,url) 
@description��
		  1.��ĳ��id�����ڵ�����a��ǩע�����¼���ʹ��������sina.com.cn������һ����Ϊcookiename��cookie��
		  2.��������url��⣨����ʱ�޼�⣩��
		  3.��cookie ���ڽ�������ҳ�󱻶�ͨ�����л�00�������ڰ�ť�����ű��ļ���ȡ��ʵ������������
		  4.��cookie ���ڽ�������ҳ�󱻻��л�00�ű��ļ�ɾ��
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
				//������
				if(url){
					var _clickStat = new Image();
					_clickStat.src = url + "&_=" + new Date().getTime() + "&url=";
				}
			});
		}
	};
	
	//����Ҫ�ž۽� begin
	attachURL2Window("blk_hdline_01","directAd_samsung");
	attachURL2Window("directAd_samsung_id","directAd_samsung");
	attachURL2Window("directAd_samsung_id_02","directAd_samsung");
	//����Ҫ�ž۽� end
	
	//����Ҫ�ž۽� begin
	attachURL2Window("directAd_dell_fidx_01","directAd_dell_fidx");
	attachURL2Window("directAd_dell_fidx_02","directAd_dell_fidx");
	attachURL2Window("directAd_dell_fidx_03","directAd_dell_fidx");
	attachURL2Window("directAd_dell_fidx_04","directAd_dell_fidx");
	attachURL2Window("directAd_dell_fidx_05","directAd_dell_fidx");
	attachURL2Window("directAd_dell_fidx_title","directAd_dell_fidx");
	//����Ҫ�ž۽� end
	
	
	//�������� begin
	
	attachURL2Window("directAd_huaan_01","directAd_huaan");
	attachURL2Window("directAd_huaan_02","directAd_huaan");
	attachURL2Window("directAd_huaan_03","directAd_huaan");
	attachURL2Window("directAd_huaan_04","directAd_huaan");
	//�������� end
	
})()