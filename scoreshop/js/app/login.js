define(["app/tool"],function(t) {
	"use strict";
	var global = window.lestore || window.App5 || window.newxb;
	/**
	 * lenovoid登录相关
	 * @return {Function} login(callback) [登录]
	 * @return {Function} checkLogin() [检查登录]
	 */
	var lenovoid = (function(){
		var
		bBtn = true,
		config = {
			domain : window.location.host,
			url : 'userInfo.do'+'?t='+new Date().getTime()
		},
		MOCK = {
			url : 'MOCK/loginSuccess.json'+'?t='+new Date().getTime()
		},
		//获取lpsust
		getLpsUst = function(){
			var lpsust,realm = (function(){return config.domain == 'beta.test2.surepush.cn'?'appstore.lps.lenovo.com':'appstore.lps.lenovo.com'})();
			if(global && typeof(global.getLpsUst)!="undefined"){
				lpsust = global.getLpsUst(realm,0);
				/*if(t.cookie.get("lpsust")==""){
					t.cookie.set("lpsust",lpsust);
				}*/
			}else{
				lpsust = t.cookie.get("lpsust");
				if(lpsust=="null"){
					lpsust = '';	
				}
			}
			return typeof(lpsust) == 'undefined' ? '' : lpsust;
			
		},
		checkLogin = function(success,fail){
			t.debugMode(config,MOCK);
			$.getJSON(config.url,function(data){
				if(data.status==true){
					return success(data);
				}else{
					return fail();
				}
			});
		},
		login = function(success,fail){
			if(global){
				if(bBtn == true){
					bBtn = false;
					
					setTimeout(function(){
						bBtn = true;
						if(typeof(global.getLpsUst)=="undefined"){
							//LENOVO.win.pop.init(15);
							return false;
							//window.location.reload();
						}else{
							global.showLogin();	
							
							var timer = null;
							if(typeof(global.getLpsUst)!="undefined"){
								timer = setInterval(function(){
									//toast.show("lpsust:"+getLpsUst());
									var t;
									if((t=getLpsUst())!=''){
										clearInterval(timer);
										checkLogin(success,fail);
										
										/*if(BASE.currentFn!=null){
											setTimeout(function(){
												eval(BASE.currentFn)();
												BASE.currentFn = null;
											},200);
										}*/
									}
								},500);
							}else{
								
								if(getLpsUst()!=''){
									checkLogin(success,fail);	
								}
							}	
						}
					},500);
					
				}
			}else{
				/*var fileurl = (function(){
					var url = window.location.pathname;
					while(url.indexOf("/") > -1) {
						url = url.substring(url.indexOf("/") + 1, url.length);
					}
					return url;
				})()*/
				var url = window.location.href;
				t.cookie.set("jumpUrl",url);
				window.location.href = 'lenovoLogin.do';
			}
		};
		return {login:login,checkLogin:checkLogin}
	}());
	//module.exports = lenovoid;
	return lenovoid;
});