(function() {
	var setCookie = function (key, value, options) {
		options = options || {};

		// ����cookie����ʱ��
		var expires = options.expires;
		if ('number' === typeof options.expires) {
			expires = new Date();
			expires.setTime(expires.getTime() + options.expires);
		}
		document.cookie =
			key + "=" + value +
			(options.path ? "; path=" + options.path : "") +
			(expires ? "; expires=" + expires.toGMTString() : "") +
			(options.domain ? "; domain=" + options.domain : "") +
			(options.secure ? "; secure" : '');

    }
	
	
	
	
	var addEvent = function(obj, eventType, func) {
		if(obj.attachEvent) {
			obj.attachEvent("on" + eventType, func);
		} else {
			obj.addEventListener(eventType, func, false);
		}
	};
	/**
	 * �����ʶ(���������)
	 * @param  {String} ������������id
	 * @param  {String} ��ʶֵ
	 * @param  {String} ������ 
	 */
	var sinaads_entry_fn = function(id,value,url){
		var links;
		try {
			links = document.getElementById(id).getElementsByTagName("a");
		}catch(e) {
			links = [];
		}
		
		for (var i = 0, len = links.length; i < len; i++) {
			addEvent(links[i], "mousedown", function() {
				setCookie("sinaads_entry",value,{"path":"/","domain":".sina.com.cn","expires":24*3600000});	
				//������
				if(url){
					var _clickStat = new Image();
					_clickStat.src = url + "&_=" + new Date().getTime() + "&url=";
				}
			});
		}
		
	}
	
	//Ҫ�ž۽� begin
	sinaads_entry_fn("blk_hdline_01","zheshang");
	sinaads_entry_fn("directAd_samsung_id","zheshang");
	sinaads_entry_fn("directAd_samsung_id_02","zheshang");
	//Ҫ�ž۽� end
	
	//����Ҫ�ž۽� begin
	sinaads_entry_fn("directAd_dell_fidx_01","zheshang");
	sinaads_entry_fn("directAd_dell_fidx_02","zheshang");
	sinaads_entry_fn("directAd_dell_fidx_03","zheshang");
	sinaads_entry_fn("directAd_dell_fidx_04","zheshang");
	sinaads_entry_fn("directAd_dell_fidx_05","zheshang");
	sinaads_entry_fn("directAd_dell_fidx_title","zheshang");
	//����Ҫ�ž۽� end
	
	
	//�������� begin
	
	sinaads_entry_fn("directAd_huaan_01","huaan");
	sinaads_entry_fn("directAd_huaan_02","huaan");
	sinaads_entry_fn("directAd_huaan_03","huaan");
	sinaads_entry_fn("directAd_huaan_04","huaan");
	sinaads_entry_fn("directAd_huaan_05","huaan");
	//�������� end
	
})()