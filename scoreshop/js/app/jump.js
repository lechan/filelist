define(["app/tool"],function(t) {
	"use strict";
	var lpsust = t.getURLParam("lenovoid.wust");
	//var url = t.getURLParam("toPath");
	var url = t.cookie.get("jumpUrl");
	t.cookie.set("lpsust",lpsust);
	if(url){
		window.location.href = url;
	}else{
		window.location.href = 'index.html';
	}
});