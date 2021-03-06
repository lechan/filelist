document.addEventListener('DOMContentLoaded', function(){
	/*LENOVO.act.initail.init();
	LENOVO.com.lenovoid.init('login_box');
	LENOVO.act.list.checkDownload();*/
	LENOVO.act.hash.init();
	LENOVO.act.puzzle.init();
	updateApp();
});

/*LENOVO.win.pop.init(4,{},{
	"ledou" : 20	
});*/

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
	loadingImg = function(){
		var imgArr = ["icon4.png","icon5.png","icon6.png","icon7.png","loading.gif","1.jpg"];	
		var i,len = imgArr.length;
		for(i=0;i<len;i++){
			var imgObj = new Image();
			imgObj.src = 'images/'+imgArr[i];
		}
	},
	adjustHeight = function(){
		var w = $(".wrap").width();
		$(".banner").css("height",Math.ceil(w*355/640)+"px");	
	},
	wishList = function(){
		$(".wish_txt span").click(function(){
			var txt = $(this).html();
			$("#wish_input").val(txt);	
		});	
	},
	get = function(){
		LENOVO.com.ajax.get('index.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
			
			ledouChange(data.hbNum);
			
			//分享微博
			shareToFriendBtn = data.btnStatus.shareToFriendBtn;
			if(!shareToFriendBtn){
				shareBox.innerHTML = '<span class="btn_grey">已邀请</a>';
			}else{
				shareBox.innerHTML = '<a class="btn" onClick="shareweibo()">邀请</a>';	
			}
			
			//下载列表
			LENOVO.act.list.renderList(data.appList);
			LENOVO.act.list.manageList();
			
			
		});	
	},
	init = function(){
		loadingImg();
		adjustHeight();
		wishList();
		get();
	}
	return {
		init:init
	}
})()

//拼图
LENOVO.namespace('LENOVO.act.puzzle');
LENOVO.act.puzzle = (function(){
	var
	$btn = $("#play_btn_start"),
	$bar = $("#countdown_bar"),
	$countdown = $("#countdown"),
	flag = true,
	timer = null, 
	w = 0,
	resetGame = function(){
		flag = true;
		$btn.removeClass("btn_grey").addClass("btn").html("开始");
		$countdown.html("15&prime;00&Prime;");
		clearInterval(timer);
		w = 0;
		$bar.css("width","0px");
		LENOVO.com.countdown.stopCountDown();
		game();
	},
	gameEnter = function(){
		$("#game_enter").click(function(){
			$(".puzzle_enter").hide();
			game();
		});	
	},
	startBtn = function(){
		
		$btn.on("click",function(){
			if(flag){
				flag = false;
				$btn.removeClass("btn").addClass("btn_grey").html("进行中");
				timer = setInterval(function(){
					w += Math.floor(150 / (BASE.countdown * 10));
					$bar.css("width",w+"px");
				},100);
				LENOVO.com.countdown.init('countdown',function(){
					alert("时间到");
					resetGame();
				});
			}
		});	
	},
	lottery = function(){
		var
		status = true, 
		minScore = BASE.minScoreLottery,
		$score_box = $("#score"),
		$ledou_box = $("#ledou");
		$(".pool .bottle").click(function(){
			if(parseInt($score_box.html())>=minScore){
				if(status==true){
					LENOVO.win.pop.init(9);
					status = false;
					LENOVO.com.ajax.get('chancePuzzle.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
						if(data.ret == true){
							if(data.prizeInfo.exchangeType==3){
								LENOVO.win.pop.init(4,{},{
									"ledou" : data.prizeInfo.prizeDesc
								});
								ledouChange(data.hbNum);
							}else{
								LENOVO.win.pop.init(3,{},{
									"name" : data.prizeInfo.prizeDesc,
									"img" : data.prizeInfo.imgUrl,
									"type" : data.prizeInfo.exchangeType,
									"logid" : data.logId	
								});
							}
							scoreChange(data.userScore);
						}else{
							LENOVO.win.pop.init(5);
						}
						status = true;
					});
				}
			}else{
				showToast("亲，您没有足够的机会");	
			}
		});
	},
	game = function(){
		var puzzleGame = function(options){
			this.img = options.img || "";
			this.e_playArea = $("#play_area");
			this.e_startBtn = $("#play_btn_start");
			this.areaWidth = parseInt(this.e_playArea.css("width"));
			this.areaHeight = parseInt(this.e_playArea.css("height"));
			this.offX = this.e_playArea.offset().left;
			this.offY = this.e_playArea.offset().top;
			this.levelArr = [[3,3],[4,4],[6,6]];
			this.level = 0;
			this.scoreArr = [100,200,400];
			this.score = 0;
			this.playCount = 0;
			this.cellRow = this.levelArr[this.level][0];
			this.cellCol = this.levelArr[this.level][1];
			this.cellWidth = this.areaWidth/this.cellCol;
			this.cellHeight = this.areaHeight/this.cellRow;
			this.imgArr = [];
			this.ranArr = [];
			this.cellArr = [];
			this.easing = 'swing';
			this.time = 400;
			this.thisLeft = 0;
			this.thisTop = 0;
			this.nextIndex;
			this.thisIndex;
			this.cb_cellDown = $.Callbacks();
			this.isInit = false;
			this.isBind = false;
			this.start();
		};
		puzzleGame.prototype = {
			start:function(){
				this.init();
				this.menu();
			},
			set: function(options){
				this.level = options.level === 0 ? 0 : (options.level || 1);
			},
			menu:function(){
				var self = this;
				this.e_startBtn.click(function(){
					if(!self.isBind){
						self.bindCell();
					}
					self.play();
				});
			},
			play:function(){
				if(this.isInit){
					this.isInit = false;
					this.cellRow = this.levelArr[this.level][0];
					this.cellCol = this.levelArr[this.level][1];
					this.cellWidth = this.areaWidth/this.cellCol;
					this.cellHeight = this.areaHeight/this.cellRow;
					this.init();
				}
				this.randomImg();
				if(!this.isBind)this.bindCell();
			},
			init:function(){
				var _cell;
				this.cellArr = [];
				this.imgArr = [];
				this.e_playArea.html("");
				for(var i = 0; i<this.cellRow; i++){
					for(var j = 0; j<this.cellCol; j++){
						this.imgArr.push(i*this.cellCol + j);
						_cell = document.createElement("div");
						_cell.className = "play_cell";
						$(_cell).css({
							"width": this.cellWidth-2,
							"height": this.cellHeight-2,
							"left": j * this.cellWidth,
							"top": i * this.cellHeight,
							"background": "url(" + this.img + ")",
							"backgroundPosition": (-j) * this.cellWidth + "px " + (-i) * this.cellHeight + "px"
						});
						this.cellArr.push($(_cell));
						this.e_playArea.append(_cell);
					}
				}
			},
			randomImg:function(){
				var ran,arr;
				arr = this.imgArr.slice();
				this.ranArr = [];
				for(var i = 0, ilen = arr.length; i < ilen; i++){
					ran = Math.floor(Math.random() * arr.length);
					this.ranArr.push(arr[ran]);
					this.cellArr[i].css({
						"backgroundPosition": (-arr[ran]%this.cellCol) * this.cellWidth + "px " + (-Math.floor(arr[ran]/this.cellCol)) * this.cellHeight + "px"
					})
					arr.splice(ran,1);
				}
				$("#p").html(this.ranArr.join())
			},
			browserRedirect:function(){
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
					return true;
				} else {
					return false;
				}
			},
			bindCell:function(){
				var self = this;
				this.isBind = true;
				this.cb_cellDown.add(self.cellDown);
				for(var i = 0, len = this.cellArr.length; i<len; i++){
					if(this.browserRedirect()){
						this.cellArr[i].on({
							"touchmove": function(){
								$(this).addClass("hover");
							},
							"touchend": function(){
								$(this).removeClass("hover");
							},
							"touchstart": function(e){
								e = e.originalEvent ? e.originalEvent.targetTouches[0] : e.touches[0];
								self.cb_cellDown.fire(e, $(this), self);
								return false;
							}
						});
					}else{
						this.cellArr[i].on({
							"mouseover": function(){
								$(this).addClass("hover");
							},
							"mouseout": function(){
								$(this).removeClass("hover");
							},
							"mousedown": function(e){
								self.cb_cellDown.fire(e, $(this), self);
								return false;
							}
						});	
					}
				}
			},
			cellDown:function(e,_cell,self){
				var //self = this,
				_x = e.pageX - _cell.offset().left,
				_y = e.pageY - _cell.offset().top;
				self.thisLeft = _cell.css("left");
				self.thisTop = _cell.css("top");
				self.thisIndex = Math.floor(parseInt(self.thisTop)/self.cellHeight)*self.cellCol;
				self.thisIndex += Math.floor(parseInt(self.thisLeft)/self.cellWidth);
				_cell.css("zIndex",99);
				if(self.browserRedirect()){
					$(document).on({
						"touchmove": function(e){
							e = e.originalEvent ? e.originalEvent.targetTouches[0] : e.touches[0];
							_cell.css({
								"left": e.pageX - self.offX - _x,
								"top": e.pageY - self.offY - _y
							})
						},
						"touchend": function(e){
							e = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0];
							$(document).off("touchend");
							$(document).off("touchmove");
							self.cb_cellDown.empty();
							if( e.pageX - self.offX < 0 || e.pageX - self.offX > self.areaWidth || e.pageY - self.offY < 0 || e.pageY - self.offY > self.areaHeight ){
								self.returnCell();
								return;
							}
							var _tx, _ty, _ti, _tj;
							_tx = e.pageX - self.offX;
							_ty = e.pageY - self.offY;
							_ti = Math.floor( _ty / self.cellHeight );
							_tj = Math.floor( _tx / self.cellWidth );
							self.nextIndex = _ti*self.cellCol + _tj;
							if(self.nextIndex == self.thisIndex){
								self.returnCell();
							}else{
								self.changeCell();
							}
						}
					});
				}else{
					$(document).on({
						"mousemove": function(e){
							_cell.css({
								"left": e.pageX - self.offX - _x,
								"top": e.pageY - self.offY - _y
							})
						},
						"mouseup": function(e){
							$(document).off("mouseup");
							$(document).off("mousemove");
							self.cb_cellDown.empty();
							if( e.pageX - self.offX < 0 || e.pageX - self.offX > self.areaWidth || e.pageY - self.offY < 0 || e.pageY - self.offY > self.areaHeight ){
								self.returnCell();
								return;
							}
							var _tx, _ty, _ti, _tj;
							_tx = e.pageX - self.offX;
							_ty = e.pageY - self.offY;
							_ti = Math.floor( _ty / self.cellHeight );
							_tj = Math.floor( _tx / self.cellWidth );
							self.nextIndex = _ti*self.cellCol + _tj;
							if(self.nextIndex == self.thisIndex){
								self.returnCell();
							}else{
								self.changeCell();
							}
						}
					});
				}
			},
			changeCell:function(){
				var self = this,
				_tc = this.cellArr[this.thisIndex],
				_tl = this.thisLeft,
				_tt = this.thisTop,
				_nc = this.cellArr[this.nextIndex],
				_nl = (this.nextIndex % this.cellCol) * this.cellWidth,
				_nt = Math.floor(this.nextIndex / this.cellCol) * this.cellHeight;
				_nc.css("zIndex",98);
				this.cellArr[this.nextIndex] = _tc;
				this.cellArr[this.thisIndex] = _nc;
				this.ranArr[this.nextIndex] = this.ranArr[this.nextIndex] + this.ranArr[this.thisIndex];
				this.ranArr[this.thisIndex] = this.ranArr[this.nextIndex] - this.ranArr[this.thisIndex];
				this.ranArr[this.nextIndex] = this.ranArr[this.nextIndex] - this.ranArr[this.thisIndex];
				_tc.animate({
					"left": _nl,
					"top": _nt
				},self.time,self.easing,function(){
					_tc.removeClass("hover");
					_tc.css("zIndex","");
				})
				_nc.animate({
					"left": _tl,
					"top": _tt
				},self.time,self.easing,function(){
					_nc.removeClass("hover");
					_nc.css("zIndex","");
					self.check();
					if(!self.cb_cellDown.has(self.cellDown)) self.cb_cellDown.add(self.cellDown);
				})
			},
			returnCell:function(){
				var self = this;
				this.cellArr[this.thisIndex].animate({
					"left": self.thisLeft,
					"top": self.thisTop
				},self.time,self.easing,function(){
					$(this).removeClass("hover");
					$(this).css("zIndex","");
					if(!self.cb_cellDown.has(self.cellDown)) self.cb_cellDown.add(self.cellDown);
				});
			},
			check:function(){
				if(this.ranArr.join() == this.imgArr.join()){
					this.success();
				}
			},
			success:function(){
				$(".play_cell").off("mousedown");
				$(".play_cell").off("mouseover");
				$(".play_cell").off("touchstart");
				$(".play_cell").off("touchmove");
				this.isBind = false;
				LENOVO.act.puzzle.resetGame();
				
			}
		};
		
		new puzzleGame({
			img: "images/1.jpg"
		});
		
	},
	init = function(){
		gameEnter();
		startBtn();
	}
	return {init:init,resetGame:resetGame}	
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
	get = function(){
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
	},
	
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
				<em>'+
					(function(){
						return '<img src="images/score'+_data[i].number+'.png" />';	
					})()
				+'</em>\
				<a name="' +_data[i].appName+ '" iu="/' +_data[i].icon+ '" pn="'+_data[i].pkgName+'" vc="'+String(_data[i].versionCode)+'" lcaid="'+_data[i].lcaid+'" status="'+_data[i].status+'">\
					<img src="http://img.lenovomm.com/'+_data[i].icon+'" />'+
					(function(){
						return _data[i].status == 2 ? '<span class="selected">'+_data[i].appName+'</span>' : '<span>'+_data[i].appName+'</span>'
					})()
				+'<div class="appStatus">'+
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
										LENOVO.com.node.removeClass(btns[i].querySelector('div.appStatus'),"btn");
										LENOVO.com.node.addClass(btns[i].querySelector('div.appStatus'),"btn_grey");
										
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
	changeList = function(){
		changeBtn.addEventListener("click",function(){
			get();
		},false);
	},
	//轮询获取当前瓶子数
	checkDownload = function(){
		var activitionArr = [];
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
			
			LENOVO.com.ajax.get('getUserScoreNum.do','lcaid='+lcaidStr, {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
				//更新当前积分
				if(data.ret==true){
					//scoreChange(data.userScore);
					ledouChange(data.hbNum);
					for(i=0;i<len;i++){
						var pn = btns[i].getAttribute('pn'),vc = btns[i].getAttribute('vc'),loaded = '';
						if(global){loaded = global.getApp5Status(pn,vc);}
						if(data.appStatus[i] == 0 && loaded === 'run'){
							btns[i].querySelector("div.appStatus i").innerHTML = '打开';
							LENOVO.com.node.removeClass(btns[i].querySelector('div.appStatus'),"btn_grey");
							LENOVO.com.node.addClass(btns[i].querySelector('div.appStatus'),"btn");
						}else if(data.appStatus[i] == 0 && (loaded === 'download' || loaded === 'update') || typeof(global)=='undefined' ){
							btns[i].querySelector("div.appStatus i").innerHTML = '安装';
							btns[i].setAttribute('status',0);
						}else if(data.appStatus[i] == 1 && loaded === 'run'){
							btns[i].querySelector("div.appStatus i").innerHTML = '激活';
							btns[i].setAttribute('status',1);
							if(activitionArr.indexOf(btns[i].getAttribute('name')) == -1){
								activitionArr.push(btns[i].getAttribute('name'));
							}
							LENOVO.com.node.removeClass(btns[i].querySelector('div.appStatus'),"btn_grey");
							LENOVO.com.node.addClass(btns[i].querySelector('div.appStatus'),"btn");
						}else if(data.appStatus[i] == 2 && loaded === 'run'){
							if(activitionArr.indexOf(btns[i].getAttribute('name')) != -1){
								showToast(btns[i].getAttribute('name')+'激活成功');
								activitionArr.remove(btns[i].getAttribute('name'));
							}
							btns[i].querySelector("div.appStatus i").innerHTML = '打开';
							btns[i].setAttribute('status',2);
							//btns[i].querySelector("span").className = 'selected';
							LENOVO.com.node.removeClass(btns[i].querySelector('div.appStatus'),"btn_grey");
							LENOVO.com.node.addClass(btns[i].querySelector('div.appStatus'),"btn");
						}else{
							btns[i].querySelector("div.appStatus i").innerHTML = '安装';
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
				
				LENOVO.com.ajax.post('shareToFriendForScore.do','',{"clientid":getclientid(),"lpsust":getLpsUst()},function(jdata){
					if(jdata.ret==true){
						shareBox.innerHTML = '<span class="btn_grey">已分享</span>';
						//scoreChange(jdata.userScore);
						ledouChange(data.hbNum);
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