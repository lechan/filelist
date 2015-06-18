document.addEventListener('DOMContentLoaded', function(){
	LENOVO.com.lenovoid.init('login_box');
	startBtnAnime();
	lottery();
	lotteryList();
});


//奖品使用说明弹窗
function prizeUseDesc(){
	LENOVO.win.pop.init(5);	
}


//抽奖逻辑
function lottery(){
	
	var 
	status = true, 
	minScore = BASE.minScoreLottery,
	score_box = document.querySelector("#score");
	LENOVO.com.ajax.get('index.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		score_box.innerHTML = data.userScore;
	});
	
	var box = new RandomBox({
		list:["#b1","#b2","#b3","#b6","#b9","#b8","#b7","#b4"]
	}, function(){
		//alert(this.finalId);
		var self = this;
		
		setTimeout(function(){
			//谢谢
			if(self.finalId=="#b6"){
				LENOVO.win.pop.init(10);
				
			//话费	
			}else if(self.finalId=="#b4" || self.finalId=="#b8"){
				LENOVO.win.pop.init(2,{},{
					"name":self.prizeInfo.prizeDesc,
					"logId":self.logId
				});	
				
			//q币或jd卡
			}else if(self.finalId=="#b2" || self.finalId=="#b3" || self.finalId=="#b7"){
				LENOVO.win.pop.init(1,{},{
					"name":self.prizeInfo.prizeDesc,
					"cardNumber":self.chanceInfo.split(';')[0],
					"cardPassword":self.chanceInfo.split(';')[1]
				});
			
			//实体奖	
			}else if(self.finalId=="#b1" || self.finalId=="#b9"){
				LENOVO.win.pop.init(0,{},{
					"name":self.prizeInfo.prizeDesc,
					"logId":self.logId
				});	
			}
			
			status = true;
			
		},400);
	});
	
	document.querySelector("#start").addEventListener('click', function(){
		
		if(!dateCheck(BASE.lotteryTime)){
			showToast("抽奖活动还未开始");
			return false;	
		}
		
		if(status==true){
			status = false;
			LENOVO.com.ajax.get('getUserScoreLatestInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
				if(data.ret == true){
					if(data.userScore>=minScore){
						//开始摇奖
						box.reset();
						box.start();
					}else{
						LENOVO.win.pop.init(11);
						status = true;
					}
				}else{
					
					showToast(data.msg);
					if(data.msg=="请登录"){
						LENOVO.com.lenovoid.login();	
					}
					status = true;	
				}
			});
		}
		
	});	
}

//按钮动画效果
function startBtnAnime(){
	
	document.querySelector("#start").addEventListener('click', function(){
		document.querySelector("#start_btn").style.webkitTransform = 'scale(0.9,0.9)';
		timer = setTimeout(function(){
			document.querySelector("#start_btn").style.webkitTransform = 'scale(1,1)';
		},50);
	});
}

function RandomBox(cfg , callback){
	var self = this,
		DefaultCfg = {
			wrapCls : '.ks-randombox-default',
			rollTimes:4,
			cls:"sel-item",
			duration:80,
			speedSteps:[1,2,3]
		},
		extend = function (target, source) {
			for (var p in source) {
				if (source.hasOwnProperty(p)) {
					target[p] = source[p];
				}
			}
			return target;
		};
		
	//合并配置
	self.config = extend(DefaultCfg,cfg);
	//id 数组
	self.list = self.config.list;
	//dom数量
	self.domNum = self.list.length;
	//旋转圈数
	self.rollTimes = self.config.rollTimes;
	//样式类名
	self.cls = self.config.cls;
	//容器
	self.wrap = document.querySelector(self.config.wrapCls);
	//其实索引
	self.beginIndex = 0;
	//正常速度
	self.duration = self.config.duration;
	//速度倍率
	self.speedSteps = self.config.speedSteps;
	//开始索引位置
	self.beginIndex = 0;
	//ajax请求抽奖结果
	self.queryurl = self.config.queryurl;

	//初始化
	self._init();
	//self.finalNum = 75;
	//定义回调函数
	self.callback = typeof callback == "function" ? callback : undefined;
}

RandomBox.prototype = {
	_init : function(){
		//初始化数据
		var self = this,
			domNums = self.domNum;
		self.$domLists = [];
		self.changeTimes = self.rollTimes  * domNums;
		self.finalId = null;
		self.beginIndex = 0;
		self.finalNum = 0;
		//是否请求抽奖结果
		self.requested = false;
		for(var i = 0; i < domNums; i++) {
			self.$domLists.push(document.querySelector(self.list[i]));
		}
	},
	rolling : function(){
		var self = this;
	   // console.log(self.beginIndex % self.domNum);
		self.choose(self.$domLists[self.beginIndex % self.domNum]);
		self.beginIndex += 1;
		self.start();
		//console.log(self.beginIndex, self.finalNum);
		if(self.beginIndex == self.finalNum){
			self.stop();
			self.callback();
		}
	},
	start : function(){
		var self = this,
			duration = self.duration,
			speedSteps = self.speedSteps;
		if(!self.requested) {
			setTimeout(function(){
				self.query();
			},4000);
			self.requested = true;
		}
		if(self.finalId && !self.finalNum) {
			//根据 self.finalId 求 self.finalNum
			self.finalNum = self.indexOfArray(self.list, self.finalId);
			self.changeTimes = Math.floor(self.beginIndex/self.domNum) * self.domNum;
			self.finalNum = self.changeTimes + self.domNum + self.indexOfArray(self.list,self.finalId)+1;
		}
		//停止旋转
		self.stop();
		if(!self.finalNum) {
			self._setInterval(duration * speedSteps[0]);
		} else if(self.beginIndex > self.finalNum - 10){
			self._setInterval(duration * speedSteps[2]);
		}
		else if(self.beginIndex <= self.finalNum - 10 && self.beginIndex >= self.finalNum - 20){
			self._setInterval(duration * speedSteps[1]);
		}else{
			self._setInterval(duration * speedSteps[0]);
		}
	},
	reset : function(){
		//复位
		var self = this;
		self.stop();
		self._init();
		//样式重置
		var spanNodes = self.wrap.getElementsByTagName('span');
		var len = spanNodes.length;
		for(var i=0;i<len;i++){
			LENOVO.com.node.removeClass(spanNodes[i],self.cls);
		}
	},
	query : function(){
		var self = this;
		
		
		LENOVO.com.ajax.get('chance.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
			if(data.ret==false){
				showToast("亲，请按规则进行游戏");
				self.finalId = "#b6";
			}else{
				document.querySelector("#score").innerHTML = data.userScore;
				lotterydata = {
					'finalId': data.fpPrizeInfo,
					'userScore':data.userScore,
					'prizeInfo':data.prizeInfo,
					'chanceInfo':data.chanceInfo,
					'logId':data.logId
				};
				if(lotterydata) {
					self.finalId = (lotterydata.finalId.slice(0,1) != '#' ? '#' : '') + lotterydata.finalId;
					self.userScore = lotterydata.userScore;
					self.prizeInfo = lotterydata.prizeInfo;
					self.chanceInfo = lotterydata.chanceInfo;
					self.logId = lotterydata.logId;
				}
			}
		},function(){
			self.finalId = "#b6";	
		});
		
		
		/*$.ajax({
			url: self.queryurl,
			type : 'POST',
			dataType : 'json',
			success: function(data){
				self.finalNumId = data.finalNumId;
			},
			error: function() {

			}
		});*/
	},
	stop  : function(){
		var self = this;
		self._clearInterval();
	},
	//设置定时器
	_setInterval:function(duration){
		var self = this;
		self.interval = setInterval(function(){self.rolling();}, duration);
	},
	//清除定时器
	_clearInterval:function(){
		var self = this;
		clearInterval(self.interval);
	},
	choose : function(obj){
		var self = this;
		var spanNodes = self.wrap.getElementsByTagName('span');
		var len = spanNodes.length;
		for(var i=0;i<len;i++){
			LENOVO.com.node.removeClass(spanNodes[i],self.cls);
		}
		LENOVO.com.node.addClass(obj,self.cls);
	},
	indexOfArray : function(arr, str){
		for(var i = 0, len = arr.length; i < len; i++) {
			if(arr[i] == str) {
				return i;
			}
		}
		return -1;
	}
};

//抽奖用户列表
function lotteryList(){
	LENOVO.com.ajax.get("accessPrizeForChance.do","",{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
		var
		i,
		len,
		html = '';
		if(data!=null && data.length>0){
			len = data.length;
			for(i=0;i<len;i++){
				html += '<span>乐友'+formatUserName(data[i].userName)+'：获得'+ data[i].prizeDesc +'   '+ data[i].format +'</span>';	
			}
			document.querySelector(".scrollList_con").innerHTML = html;
			if(len>5){
				LENOVO.act.scrollList.init("scrollList");
			}
		}else{
			document.querySelector(".scrollList_con").innerHTML = "<span>该环节暂无中奖信息</span>";	
		}
	});
}