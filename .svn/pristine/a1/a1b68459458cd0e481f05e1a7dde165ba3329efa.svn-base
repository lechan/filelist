document.addEventListener('DOMContentLoaded', function(){
	//LENOVO.com.lenovoid.init('login_box');
	LENOVO.act.initail.init();
	LENOVO.act.list.checkDownload();
	LENOVO.act.hash.init();
	updateApp();
});


//通过hash值锚点
LENOVO.namespace('LENOVO.act.hash');
LENOVO.act.hash = (function(){
	var
	hashcode = window.location.search;
	init = function(){
		if(hashcode){
			setTimeout(function(){
				window.location.href = "#score_anchor"
			},800);
		}
	}
	return {init:init}
})()

//初始化数据
LENOVO.namespace('LENOVO.act.initail');
LENOVO.act.initail = (function(){
	var
	everydayScore = document.querySelector("#everydayScore"),
	shareBox = document.querySelector("#shareBox"),
	hardworkingBtn,
	shareToFriendBtn,
	adjustHeight = function(){
		var w = $(".wrap").width();
		$(".banner").css("height",Math.ceil(w*430/640)+"px");	
	},
	wishList = function(){
		$(".wish_txt span").click(function(){
			var txt = $(this).html();
			$("#wish_input").val(txt);	
		});	
	},
	get = function(){
		LENOVO.com.ajax.get('index.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
			
			scoreChange(data.userScore);	
			
			
			//每天领积分
			hardworkingBtn = data.btnStatus.hardworkingBtn;
			if(!hardworkingBtn){
				everydayScore.innerHTML = '<span class="btn_red" style="background:#DADADA; color:#757575;">已打卡</a>';
			}else{
				everydayScore.innerHTML = '<span class="btn_red" onClick="getOneScore()">打卡</a>';	
			}
			
			//分享微博
			shareToFriendBtn = data.btnStatus.shareToFriendBtn;
			if(!shareToFriendBtn){
				shareBox.innerHTML = '<span class="btn_red" style="background:#DADADA; color:#757575;">已分享</a>';
			}else{
				shareBox.innerHTML = '<span class="btn_red" onClick="shareweibo()">分享</a>';	
			}
			
			//下载列表
			LENOVO.act.list.renderList(data.appList);
			LENOVO.act.list.manageList();
			
			
		});	
	},
	init = function(){
		adjustHeight();
		wishList();
		get();
	}
	return {
		init:init
	}
})()


//下载列表
LENOVO.namespace('LENOVO.act.list');
LENOVO.act.list = (function(){
	var 
	ulNode = document.querySelector('ul.app_list'),
	changeBtn = document.querySelector("#changeBtn"),
	appInfoArr = ["给父母做一顿好吃的","带着父母去一次旅行","跟父母拍一张全家福","为父母做一次体检","陪父母看一场电影"],
	timer = null,
	bBtn=true,
	/*get = function(){
		changeBtn.style.cssText = 'background:#DADADA; color:#757575';
		if(bBtn==true){
			bBtn = false;
			LENOVO.com.ajax.get('nextAppListGroup.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(_resp){
				bBtn = true;
				changeBtn.style.cssText = 'background:#ff6600; color:#fff';
				if(_resp.ret==true){
					renderList(_resp.appList);
					manageList();
				}
			},function(){
				changeBtn.style.cssText = 'background:#ff6600; color:#fff';	
			});
		}
	},*/
	
	//列表渲染
	renderList = function(_data){
		var i, len = _data.length,loaded='',
			str = '';
		for(i=0; i<len; i+=1){
			if(_data[i].icon.indexOf('/')==0){
				_data[i].icon = _data[i].icon.substring(1);	
			}
			if(global){loaded = global.getApp5Status(_data[i].pkgName,String(_data[i].versionCode))};
			str +=
			'<li>\
				<div class="appImg '+(function(){return len%2==0?"fr":"fl"})()+'"><i></i><img src="http://img.lenovomm.com/'+_data[i].icon+'" /></div>\
				<div class="appInfo '+(function(){return len%2==0?"fr":"fl"})()+'">\
					<h2>' +_data[i].appName+ '</h2>\
					<h3>' +appInfoArr[i]+'</h3>\
				</div>\
				<a name="' +_data[i].appName+ '" iu="/' +_data[i].icon+ '" pn="'+_data[i].pkgName+'" vc="'+String(_data[i].versionCode)+'" lcaid="'+_data[i].lcaid+'" status="'+_data[i].status+'">\
				<div class="appStatus '+(function(){return len%2==0?"fl":"fr"})()+' btn">'+
					(function(){
						if(_data[i].status == 0 && (loaded === 'download' || loaded === 'update') || typeof(global)=='undefined'){
							return '<i>下载</i>';
						}else if(_data[i].status == 0 && loaded === 'run'){
							return '<i>打开</i>';
						}else if(_data[i].status == 1 && loaded === 'run'){
							return '<i>激活</i>';
						}else if(_data[i].status == 2 && loaded === 'run'){
							return '<i>打开</i>';
						}else{
							return '<i>下载</i>';	
						}
					})()
				+'</div>\
				</a>\
			</li>';
		}

		ulNode.innerHTML = str;
	},
	//列表事件管理
	manageList = function(){
		
		var btns = ulNode.querySelectorAll('li a'),
			i, 
			len = btns.length;
		for(i=0; i<len; i++){
			(function(i){
				btns[i].addEventListener('click',function(){
					
					//活动结束
					/*ending();
					return false;*/
					
					/*btns[i].querySelector('div.appStatus').style.background = '#DADADA';
					setTimeout(function(){
						btns[i].querySelector('div.appStatus').style.background = '#e0641a';	
					},200);*/
					
					var self = this;
					
					if(updateApp()){
					
						//判断登录
						LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
							if(data.status==false){
								showToast("请登录");	
								LENOVO.com.lenovoid.login();
								return false;
							}else{
								var 
								packageName = self.getAttribute('pn'), 
								versionCode = self.getAttribute('vc'),
								name = self.getAttribute('name'), 
								iconurl = self.getAttribute('iu'),
								lcaid = self.getAttribute('lcaid'),
								status = self.getAttribute('status'),
								downloadurl = 'http://www.lenovomm.com/appstore/shortlink/'+lcaid,
								loaded = '';
								
								
								for(var j=0;j<len;j++){
									btns[j].parentNode.className = "";	
								}
								btns[i].parentNode.className = "active";
								if(global){
									loaded = global.getApp5Status(packageName,versionCode);
									if(status == 0 && (loaded === 'download' || loaded === 'update')){
										//下载应用
										global.startDownload(packageName,versionCode,downloadurl,name,iconurl);
										btns[i].querySelector('div.appStatus').style.background = '#DADADA';
										
										//avatar打桩
										avatarTracker("D","cD","下载",window.location.href, packageName+"#"+versionCode);
										
										//百度统计
										_hmt.push(['_trackEvent', "12月活动", "下载", name]);	
									}else if(status == 0 && loaded === 'run'){
										//打开应用
										global.runApp(packageName);
										showToast("打开“"+name+"”中");
									}else if(status == 1 && loaded === 'run'){
										//激活应用
										global.runApp(packageName);
										showToast("激活“"+name+"”中");
										
										//avatar打桩
										avatarTracker("A","cA","激活",window.location.href, packageName+"#"+versionCode);
										
										//百度统计
										_hmt.push(['_trackEvent', "12月活动", "激活", name]);	
									}else if(status ==2 && loaded == 'run'){
										//打开应用
										global.runApp(packageName);
										showToast("打开“"+name+"”中");
									}else{
										//下载应用
										global.startDownload(packageName,versionCode,downloadurl,name,iconurl);
										
										//avatar打桩
										avatarTracker("D","cD","下载",window.location.href, packageName+"#"+versionCode);
										
										//百度统计
										_hmt.push(['_trackEvent', "12月活动", "下载", name]);		
									}
									
								}else{
									showToast("请在乐商店中进行下载");	
								}
							}
						});	
					}
					
				});
			})(i)
		}
	},
	//换一组
	/*changeList = function(){
		changeBtn.addEventListener("click",function(){
			get();
		},false);
	},*/
	//轮询获取当前瓶子数
	checkDownload = function(){
		var activitionArr = [];
		clearInterval(timer);
		timer = setInterval(function(){
			var 
			lcaidStr = '',
			btns = ulNode.querySelectorAll('li a'),
			i=0,
			len = btns.length;
			for(;i<len;i++){
				lcaidStr += btns[i].getAttribute('lcaid') + '|';	
			}
			lcaidStr = lcaidStr.substring(0,lcaidStr.length-1);
			
			Array.prototype.indexOf = function(val) {              
				for (var i = 0; i < this.length; i++) {  
					if (this[i] == val) return i;  
				}  
				return -1;  
			};
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
			
			LENOVO.com.ajax.get('getUserScoreNum.do','lcaid='+lcaidStr, {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
				//更新当前积分
				if(data.ret==true){
					scoreChange(data.userScore);
					for(i=0;i<len;i++){
						var pn = btns[i].getAttribute('pn'),vc = btns[i].getAttribute('vc'),loaded = '';
						if(global){loaded = global.getApp5Status(pn,vc);}
						if(data.appStatus[i] == 0 && loaded === 'run'){
							btns[i].querySelector("div.appStatus i").innerHTML = '打开';
							btns[i].querySelector('div.appStatus').style.background = '#e0641a';
						}else if(data.appStatus[i] == 0 && (loaded === 'download' || loaded === 'update') || typeof(global)=='undefined' ){
							btns[i].querySelector("div.appStatus i").innerHTML = '下载';
							btns[i].setAttribute('status',0);
						}else if(data.appStatus[i] == 1 && loaded === 'run'){
							btns[i].querySelector("div.appStatus i").innerHTML = '激活';
							btns[i].setAttribute('status',1);
							if(activitionArr.indexOf(btns[i].getAttribute('name')) == -1){
								activitionArr.push(btns[i].getAttribute('name'));
							}
							btns[i].querySelector('div.appStatus').style.background = '#e0641a';
						}else if(data.appStatus[i] == 2 && loaded === 'run'){
							if(activitionArr.indexOf(btns[i].getAttribute('name')) != -1){
								showToast(btns[i].getAttribute('name')+'激活成功');
								activitionArr.remove(btns[i].getAttribute('name'));
							}
							btns[i].querySelector("div.appStatus i").innerHTML = '打开';
							btns[i].setAttribute('status',2);
							//btns[i].querySelector("span").className = 'selected';
							btns[i].querySelector('div.appStatus').style.background = '#e0641a';
						}else{
							btns[i].querySelector("div.appStatus i").innerHTML = '下载';
							btns[i].setAttribute('status',0);	
						}
					}
				}
			});
		},5000);	
	},
	
	init = function(){
		//initData();
		changeList();
	};
	
	
	return {
		init:init,
		checkDownload:checkDownload,
		renderList:renderList,
		manageList:manageList
	}	
})();


//accessToken客户端api回调函数
function accessTokenWithCallback(msg){
	var 
	shareBox = document.querySelector("#shareBox"),
	content = "我在 @乐商店 许下一个心愿，小伙伴儿快来一起捞礼物吧！让我们的心愿触 “手” 可及 http://t.cn/Rvg0qD6",
	res = JSON.parse(msg),
	serverTransationUrl = "trans.do",
    sinaApi = "https://upload.api.weibo.com/2/statuses/upload.json",
	//sinaApi = "https://api.weibo.com/2/statuses/update.json",
	pic = BASE.domain+"/promotion/images/share.jpg",
	param,
	accToken = res.accessToken;
		
	if(accToken!=""){
		shareBox.innerHTML = '<span class="btn_grey">分享中</span>';
		param="url="+sinaApi+"&method=post&access_token="+accToken+"&status="+encodeURIComponent(content)+"&pic="+pic;
		LENOVO.com.ajax.post(serverTransationUrl,param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
			if(data.isSuccess){
				showToast("发布成功，请登录微博查看。");
				
				LENOVO.com.ajax.post('shareToFriendScore.do','',{"clientid":getclientid(),"lpsust":getLpsUst()},function(jdata){
					if(jdata.ret==true){
						shareBox.innerHTML = '<span class="btn_grey">已分享</span>';
						scoreChange(jdata.userScore);
						//avatar打桩
						avatarTracker("_NEWUA_","clickShareToWeibo","微博分享",window.location.href);
					}else{
						showToast(jdata.msg);
						shareBox.innerHTML = '<a class="btn" onclick="shareweibo()">分享</a>';
					}
				});
			}else{
				showToast("发布失败！");
				shareBox.innerHTML = '<a class="btn" onclick="shareweibo()">分享</a>';
			}
		});
	}
}


//分享到微博
function shareweibo(){
	//BASE.currentFn = shareweibo;
	//判断登录
	if(updateApp()){
		LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
			if(data.status==false){
				showToast("请登录");	
				LENOVO.com.lenovoid.login();
				return false;
			}else{
				global ? global.getWeiboAccessToken("accessTokenWithCallback") : showToast("请在乐商店环境下进行分享");
			}
		});	
	}
}




//打卡
function getOneScore(){
	var 
	url = 'makeWish.do',
	param = '',
	everydayScore = document.querySelector("#everydayScore");
	if(updateApp()){
		LENOVO.com.ajax.get(url,param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
			if(data.ret==true){
				
				everydayScore.innerHTML = '<span class="btn_grey">已提交</span>';
				showToast("打卡成功");	
				scoreChange(data.userScore);	
				
				//avatar打桩
				avatarTracker("_NEWUA_","clickEveryDay","打卡",window.location.href);
				
			}else{
				showToast(data.msg);
				if(data.msg=="请登录"){
					LENOVO.com.lenovoid.login();	
				}
			}
		});
	}
}

//分享弹窗
function sharebtn(){
	LENOVO.win.pop.init(3);	
}
