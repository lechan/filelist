(function(){

jsLoader({
	name : 'trackers',
	url : 'js/trackers.js'
});


jsLoader({
	name : (function(){return navigator.userAgent.indexOf("MSIE")>0 ? 'jquery' : 'zepto'})(),
	url : (function(){return navigator.userAgent.indexOf("MSIE")>0 ? 'js/jquery.js' : 'js/zepto.js'})(),
	callback : function(){
		jsLoader({
			name : 'base',
			url : 'js/base.js',
			callback : function(){
				jsLoader({
					name : 'index',
					url : 'js/index.js',
						callback : function(){
							LENOVO.act.initail.init();
							LENOVO.act.guessApp.init();
						}
					});		
			}
		});
	}
});

//百度统计
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F04ffe61048b600908188038ff243dec8' type='text/javascript'%3E%3C/script%3E"));

})()