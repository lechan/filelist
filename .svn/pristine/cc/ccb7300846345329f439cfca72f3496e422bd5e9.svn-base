/**
 * 省市级联（jsonp）
 * @param {String} id [容器id]
 * @param {Array} data [省市数据:cities.js]
 * @usage
 *		LENOVO.com.area.init(id,data)
 */
LENOVO.namespace('LENOVO.com.area');
LENOVO.com.area = (function(){
	var
	createElements = function(id){
		var area_box = document.querySelector("#"+id),
			html = '<select disabled="disabled" id="province" name="province"></select><select disabled="disabled" id="city" name="city"></select><select disabled="disabled" id="region" name="region"></select>';
		area_box.innerHTML = html;
	},
	initRender = function(data){
		var pstr = '',
			i=0,
			len = data.length;
			province = document.querySelector("#province");
		for(;i<len;i++){
			pstr +='<option value="'+data[i]["name"]+'" >'+data[i]["name"]+'</option>';	
		}
		province.innerHTML = pstr;
		changeProvince(data);
	},
	changeProvince = function(data){
		var 
		cstr='',
		i=0,
		j,
		index,
		plen = data.length,
		province = document.querySelector("#province"),
		city = document.querySelector("#city"),
		pValue = province.value,
		cArr,
		clen;
		for(;i<plen;i++){
			if(data[i]["name"]==pValue){
				cArr = data[i]["sub"];
				index = i;
				if(cArr){
					clen = cArr.length;
					for(j=0;j<clen;j++){
						cstr+='<option value="'+cArr[j]["name"]+'" >'+cArr[j]["name"]+'</option>';
					}
				}else{
					city.innerHTML = '<option value="/" >/</option>';
					area.innerHTML = '<option value="/" >/</option>';
					return false;
				}
			}
		}
		city.innerHTML = cstr;
		changeCity(data,index);
		return index;
	},
	changeCity = function(data,index){
		var 
		sstr='',
		i=0,
		j,
		city = document.querySelector("#city"),
		area = document.querySelector("#region"),
		cValue = city.value,
		cArr = data[index]["sub"],
		aArr,
		alen;
		if(cArr){
			clen = cArr.length;
			for(;i<clen;i++){
				if(cArr[i]["name"]==cValue){
					aArr = cArr[i]["sub"];
					if(aArr){
						alen = aArr.length;
						if(alen>0){
							for(j=0;j<alen;j++){
								sstr+='<option value="'+aArr[j]["name"]+'" >'+aArr[j]["name"]+'</option>';
							}
						}else{
							area.innerHTML = '<option value="/" >/</option>';
							return false;	
						}
					}else{
						area.innerHTML = '<option value="/" >/</option>';
						return false;
					}
				}
			}
		}else{
			city.innerHTML = '<option value="/" >/</option>';
			area.innerHTML = '<option value="/" >/</option>';
			return false;
		}
		area.innerHTML = sstr;
	},
	handler = function(data){
		var
		province = document.querySelector("#province"),
		city = document.querySelector("#city"),	
		area = document.querySelector("#region"),
		curIndex;
		province.onchange = function(){
			curIndex = changeProvince(data);
		};
		city.onchange = function(){
			changeCity(data,curIndex);
		};
	},
	init = function(id,data){
		createElements(id);
		initRender(data);
		handler(data);
	};
	return {init: init};	
})() 


/**
 * lenovoId登录相关
 * @param {String} id [容器id]
 * @usage
 *		LENOVO.com.lenovoid.init(id)
 */
LENOVO.namespace('LENOVO.com.lenovoid');
LENOVO.com.lenovoid = (function(){
var
bBtn = true,
global = LENOVO.conf.global,
logout = function(){
	if(global){
		global.logout();
	}
},
login = function(){
	if(global){
		if(bBtn == true){
			bBtn = false;
			setTimeout(function(){
				bBtn = true;
				
				if(typeof(global.getLpsUst)=="undefined"){
					LENOVO.com.cookie.set("lenovoIdBtn",1,1);
					LENOVO.win.pop.init(15);
					return false;
					//window.location.reload();
				}else{
					global.showLogin();	
					
					var timer = null;
					if(typeof(global.getLpsUst)!="undefined"){
						timer = setInterval(function(){
							//alert("lpsust:"+getLpsUst());
							if(getLpsUst()!=''){
								
								clearInterval(timer);
								loginDataChange();
								
								if(BASE.currentFn!=null){
									setTimeout(function(){
										eval(BASE.currentFn)();
										BASE.currentFn = null;
									},200);
								}
							}
						},500);
					}else{
						
						if(getLpsUst()!=''){
							LENOVO.com.cookie.set("lenovoIdBtn",0,1);
							loginDataChange();	
						}
					}	
				}
			},500);
			
		}
	}else{
		var fileurl = (function(){
            var url = window.location.pathname;
            while(url.indexOf("/") > -1) {
                url = url.substring(url.indexOf("/") + 1, url.length);
            }
            return url;
		})()
		window.location.href = 'lenovoLogin.do?toPath=/'+fileurl;
	}
},
checkLogin = function(id){
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==false){
			login(id);
			return false;
		}else{
			return true;
		}
	});	
},
loginDataChange = function(){
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==true){
			
			if(document.querySelector("#login_box")){
				document.querySelector("#login_box").innerHTML = '<em>欢迎</em>'+formatName(data.username);
			}
			
			if(document.querySelector("#myPrize")){
				document.querySelector("#myPrize").innerHTML = '<a href="myprize.html">我的奖品</a>';
			}
			
			/*if(document.querySelector("#intro_login")){
				document.querySelector("#intro_login").innerHTML = '<a href="javascript:showToast(\'已登录\')">登录/注册</a>';	
			}
			
			if(document.querySelector("#myScore_logout")){
				document.querySelector("#myScore_logout").style.display = 'none';
			}*/
			
			if(typeof(lottery)!='undefined'){
				//alert("测试弹窗");
				lottery();
			}
			
			if(typeof(LENOVO.act.initail.init)!='undefined'){
				LENOVO.act.initail.init();	
			}
		}
	});
},

refreshPage = function(){
	var btn = LENOVO.com.cookie.get("lenovoIdBtn");
	
	//alert("lpsust:"+getLpsUst());
	
	if(getLpsUst()!=''){
		LENOVO.com.cookie.set("lenovoIdBtn",0,1);
		loginDataChange();	
	}
	if(btn==1){
		setTimeout(function(){
			window.location.reload();
		},2000);		
	}
},

formatName = function(str){
	str = str.replace(/@.+/,'');
	if(str.length>=15){
		str = str.substring(0,10);
		return str + "...";
	}else{
		return str;	
	}
},

init = function(id){
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==false){
			if(document.querySelector("#login_box")){
				document.querySelector("#login_box").innerHTML = '<a href="javascript:LENOVO.com.lenovoid.login()">请登录</a>';
			}
			
			if(document.querySelector("#intro_login")){
				document.querySelector("#intro_login").innerHTML = '<a href="javascript:LENOVO.com.lenovoid.login()">登录/注册</a>';	
			}
			
			if(document.querySelector("#myPrize")){
				document.querySelector("#myPrize").innerHTML = '<a href="javascript:LENOVO.com.lenovoid.login()">我的奖品</a>';
			}
			
		}else{
			if(document.querySelector("#login_box")){
				document.querySelector("#login_box").innerHTML = "<em>欢迎</em>"+formatName(data.username);
			}
			
			if(document.querySelector("#myPrize")){
				document.querySelector("#myPrize").innerHTML = '<a href="myprize.html">我的奖品</a>';
			}
			
			/*if(document.querySelector("#myPrize_logout")){
				document.querySelector("#myPrize_logout").style.display = 'none';
				document.querySelector("#myPrize_login").style.display = 'block';
			}
			
			if(document.querySelector("#myScore_logout")){
				document.querySelector("#myScore_logout").style.display = 'none';
			}
			
			if(document.querySelector("#intro_login")){
				document.querySelector("#intro_login").innerHTML = '<a href="javascript:showToast(\'已登录\')">登录/注册</a>';	
			}*/
		}
	});	
}
return {
	init:init,
	checkLogin:checkLogin,
	login:login,
	logout:logout,
	refreshPage:refreshPage
}
})()

//LENOVO.com.lenovoid.refreshPage();


/**
 * 列表上下滚动
 * @param {String} id [容器id]
 * @usage
 *		LENOVO.act.scrollList.init(id)
 */
LENOVO.namespace('LENOVO.act.scrollList');
LENOVO.act.scrollList = (function(){
	var
	timer = null,
	autoPlay = function(id){
		var scrollList = document.querySelector("#"+id),
		scrollListCon = scrollList.querySelectorAll("div.scrollList_con"),
		scrollListHeight = scrollListCon[0].offsetHeight,
		wrapHeight = document.querySelector("div.scrollList_wrap").offsetHeight,
		top;
		scrollList.style.height = scrollListHeight*2 + "px";
		scrollListCon[1].innerHTML = scrollListCon[0].innerHTML;
		scrollList.style.top = "0px";
		timer = setInterval(function(){
			top = parseInt(scrollList.style.top);
			scrollList.style.top = (top - 1) + "px";
			if(Math.abs(top)>scrollListHeight *2 - wrapHeight){
				scrollList.appendChild(scrollListCon[0]);
				scrollList.style.top = "0px";
			}
		},70);
	},
	handler = function(id){
		var scrollList = document.querySelector("#"+id);	
		scrollList.onmouseover = function(){
			clearInterval(timer);
		};
		scrollList.onmouseout = function(){
			autoPlay(id);	
		}
	},
	init = function(id){
		if(document.querySelector("#"+id+" span")){
			document.querySelector("#"+id).style.top = "0px";
			autoPlay(id);
			//handler(id);
		}else{
			document.querySelector(".scrollList_wrap").style.display = "none";	
		}
	}
	return { init : init }
})() 


function closePop(){
	LENOVO.com.ui.dialog.close();	
}

//最新版乐商店的app下载
function lestoreapp(){
	var global = LENOVO.conf.global;
	if(global){
		var packageName = 'com.lenovo.leos.appstore',
		//versionCode = '61110',
		versionCode = BASE.lastestvc,
		//downloadurl = 'http://ams.lenovomm.com/ams/3.0/appdownaddress.do?ic=0&dt=1&ty=2&pn=com.lenovo.leos.appstore&cid=17148&tcid=12346',
		downloadurl = BASE.downloadurl,
		name = '乐商店',
		iconurl = 'http://img.lenovomm.com/crawler@cluster-1/ams/fileman/img/icon/2014-05-21100237-_1400680957981_8905.png';
		global.startDownload(packageName,versionCode,downloadurl,name,iconurl);	
	}
	
	closePop();	
}

//版本低直接弹窗升级
function updateApp(){
	var global = LENOVO.conf.global;
	if(global && ( parseInt(global.getVersionCode()) < BASE.checkedvc || typeof(global.showLogin)=="undefined" )){
		LENOVO.win.pop.init(12);
		return false;
	}else{
		return true;	
	}
}

//格式化用户名
function formatUserName(str){
	str = str.replace(/@.+/,'');
	var reg = /(^.{2})(.*)(.{2})$/;
	if(str.length>=5){
		var match = reg.exec(str);
		str = match[1];
		str += '***';
		/*for(var i = 0; i <match[2].length; i++) {
			str += '*';
		}*/
		return str + match[3];
	}else{
		return str;	
	}
}

//判断日期时间是否到了(true：到了 false：没到)
//2014/9/7 00:00:00
function dateCheck(dateStr){
	var curTime = new Date().getTime();
	var targetTime = new Date(dateStr).getTime();
	return curTime < targetTime ? false : true;
}

//avatar打桩
function avatarTracker(category,action,label,ref,appName){
	var avatarData = [category,action,label],avatarParams=[];
	avatarParams.cpn = window.location.href;
	if(appName){
		avatarParams.app = appName;
	}
	avatarParams.act = "";
	avatarParams.ref = ref;
	avatarData.push(avatarParams);
	Avatar.track(avatarData, false);	
}


//活动结束弹窗
function ending(){
	LENOVO.win.pop.init(6,{},{"msg":"活动已结束<br/>感谢您的参与"});	
}