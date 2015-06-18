define(["app/tool","app/dialog","app/toast","app/login","lib/swipe","lib/fastclick"],function(t,dialog,toast,login) {
	"use strict";
	var global = window.lestore || window.App5 || window.newxb;
	var App = {
		config : {
			detailUrl : 'view/merchDetail.do'+'?t='+new Date().getTime(),
			validateUrl : 'validatemerchsale.do'+'?t='+new Date().getTime(),
			exchangeUrl : 'salemerch.do'+'?t='+new Date().getTime(),
			addFavoriteUrl : 'addmerchfavorite.do'+'?t='+new Date().getTime(),
			timeUrl : 'systime.do'+'?t='+new Date().getTime(),
			isLogin : false,
			isLv : false,
			isLvLevel : false,
			lvLevel : null,
			userScore : null,
			userId : null
		},
		MOCK : {
			detailUrl : 'MOCK/detail.json'+'?t='+new Date().getTime(),
			validateUrl : 'MOCK/exchange2.json'+'?t='+new Date().getTime(),
			exchangeUrl : 'MOCK/exchangeSucc.json'+'?t='+new Date().getTime(),
			addFavoriteUrl : 'MOCK/addFavorite.json'+'?t='+new Date().getTime(),
			timeUrl : 'MOCK/time.json'+'?t='+new Date().getTime()
		},
		tpl : {
			lvIcon : '<div class="lvIcon"><i></i><span>Lv特供</span></div>',
			detailImgItem : '<div><span style="background-image:url(#{url})"></span></div>',
			detailImgDotItem : '<i></i>',
			merchInfo : '\
			<div class="merchTitle">\
				<h1>#{name}</h1>\
				<div class="collection">\
					<i class="#{isFavorite}"></i>\
					<span>收藏</span>\
				</div>\
			</div>\
			<h2><strong id="scorePrice">#{scorePrice}</strong><span>#{promotionWords}</span></h2>\
			<div class="lvInfo">#{lvInfo}</div>\
			<div class="lvScore">\
				<ul>#{lvScoreList}</ul>\
			</div>\
			<h3>\
				<span>#{saleAmount}人已兑</span>\
				<span><i id="favoriteNum">#{favoriteAmount}</i>人已收藏</span>\
				<span>剩#{remainAmount}件</span>\
			</h3>',
			lvInfo : {
				"beforeLogin" : '<i>Lv专享价最高省<strong>#{savePrice}</strong></i><b></b>',
				"login" : '<span>Lv#{lvLevel}专享价</span><i>已省<strong>#{lvSavePrice}</strong></i><b></b>'	
			},
			lvScoreItem : '<li><span min="#{min}" max="#{max}"><strong>#{lvPrice}</strong>#{lvRange}</span></li>',
			relativeRecommendItem : '<li><a href="#{moreUrl}">#{name}</a></li>',
			exchangeBtn : {
				"able" : '<div class="exchangeBtn">兑换<span>#{scorePrice}</span></div>',
				"disable" : '<div class="exchangeBtnGrey">暂无库存，可收藏后，有库存再购买</div>'
			},
			popbox : {
				"tips" : '\
				<section class="pop_wrap">\
					<h2>#{title}</h2>\
					<h3>#{msg}</h3>\
					<div class="pop_btn_wrap">\
						<div class="pop_btn_item" id="#{leftBtn}">#{leftBtnTxt}</div>\
						<div class="pop_btn_item" id="#{rightBtn}">#{rightBtnTxt}</div>\
					</div>\
				</section>'	
			}
		},
		/**
		 *	code:
		 *	DISTRIBUTOR_NOT_FOUND   当传入分销商CODE时会检查分销商CODE有效性
		 *	MERCHANDISE_SS_NOT_FOUND  指定商品不存在
		 *	NO_INVENTORY  没有库存
		 *	NOT_ENOUGH_INVENTORY 库存数量不够
		 *	SPECIAL_LV_MERCHANDISE  该商品是LV特供
		 *	NOT_ENOUGH_SCORE  用户积分不够
		 *	DELIVERY_ADDR_REQUIRED 递送信息不完善
		 *	ORDER_CONFIRM 有信息的订单确认
		 *	EXCHANGE_SUCCESS 兑换成功
		 *	EXCHANGE_FAIL 兑换失败
		 */
		popCodeMap : [{
			"id" : 0,
			"code" : "NOT_ENOUGH_SCORE",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "您还差#{score}积分就可以兑换当前商品,去看看其他热门商品吧！",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "热门商品",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "goToHot"
			}	
		},{
			"id" : 1,
			"code" : "SPECIAL_LV_MERCHANDISE",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "该商品属于指定等级购买，去Lv专区兑换您的等级专属吧！",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "去Lv专区",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "goToLv"
			}	
		},{
			"id" : 2,
			"code" : "NEED_APP",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "你还没有安装#{appName}，无法使用该特权，赶紧下载吧！",
				"leftBtnTxt" : "查看订单",	
				"rightBtnTxt" : "先安装",
				"leftBtn" : "goToOrder",
				"rightBtn" : "installBtn"
			}
		},{
			"id" : 3,
			"code" : "DELIVERY_ADDR_REQUIRED",
			"type" : "pop",
			"popInfo" : {
				"title" : "收货信息完善",
				"msg" : "您还未填写收货信息，请先填写收货信息，以便我们将宝贝邮寄给您",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "填写收货信息",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "goToAddr"
			}	
		},{
			"id" : 4,
			"code" : "ORDER_CONFIRM",
			"type" : "pop",
			"popInfo" : {
				"title" : "订单确认",
				"msg" : "#{confirm}",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "确认",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "confirmBtn"
			}	
		},{
			"id" : 5,
			"code" : "EXCHANGE_SUCCESS",
			"type" : "pop",
			"popInfo" : {
				"title" : "兑换成功",
				"msg" : "兑换已成功，商城将尽快安排发货，可在我的订单查看详情。",
				"leftBtnTxt" : "查看订单",	
				"rightBtnTxt" : "继续兑换",
				"leftBtn" : "goToOrder",
				"rightBtn" : "cancelBtn"
			}	
		},{
			"id" : 6,
			"code" : "EXCHANGE_FAIL",
			"type" : "toast",
			"msg" : "兑换失败"
		},{
			"id" : 7,
			"code" : "NOT_ONSALE_TIMERANGE",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "亲，该商品只能在#{timeRange}期间兑换，请在指定之间内兑换哦！",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "查看热门商品",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "goToHot"
			}	
		},{
			"id" : 8,
			"code" : "NOT_ONSALE",
			"type" : "toast",
			"msg" : "该商品未上架"
		},{
			"id" : 9,
			"code" : "NOT_LESTORE",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "发现你已卸载应用中心，无法获得该应用的特权版，请一键恢复吧！",
				"leftBtnTxt" : "查看订单",	
				"rightBtnTxt" : "一键恢复",
				"leftBtn" : "goToOrder",
				"rightBtn" : "checkWifi"
			}
		},{
			"id" : 10,
			"code" : "NOT_WIFI",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "亲，您当前不是wifi网络，继续下载会消耗您的流量，请确认是否下载",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "确认",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "downloadLestore"
			}
		},{
			"id" : 11,
			"code" : "WRONG_EXCHANGE_TYPE",
			"type" : "toast",
			"msg" : "错误的兑换状态"
		},{
			"id" : 12,
			"code" : "MERCHANDISE_SS_NOT_FOUND",
			"type" : "toast",
			"msg" : "亲，商品已经被抢兑，请兑换其他商品！"
		},{
			"id" : 13,
			"code" : "NO_INVENTORY",
			"type" : "toast",
			"msg" : "亲，商品已经被抢兑，请兑换其他商品！"
		},{
			"id" : 14,
			"code" : "PHONE_BIND",
			"type" : "toast",
			"msg" : "您的账号没有绑定手机，请去个人中心绑定"
		},{
			"id" : 15,
			"code" : "PHONE_NOT_VERIFY",
			"type" : "toast",
			"msg" : "您的手机号未通过验证，请去个人中心验证"
		},{
			"id" : 16,
			"code" : "LENOVOID_ILLEGAL_BIND",
			"type" : "toast",
			"msg" : "您的手机号已绑定过其他账号"
		},{
			"id" : 17,
			"code" : "NET_ERROR",
			"type" : "toast",
			"msg" : "网络异常，请稍后再试"
		}],
		getServerTimeDiff : function(){
			var self = this,startTime,endTime;
			startTime = new Date().getTime();
			$.ajax({
				url:self.config.timeUrl,
				type:"GET",
				dataType:"json",
				success: function(data){
					endTime = new Date().getTime();
					//console.log(data.time+' '+t.formatDate(data.time,'yyyy/MM/dd hh:mm:ss'));
					//console.log(endTime+' '+t.formatDate(endTime,'yyyy/MM/dd hh:mm:ss'));
					self.serverTimeDiff = data.time-startTime+parseInt((endTime-startTime)/2);
				}
			});	
		},
		getDetailData : function(){
			var self = this , id = t.getURLParam("id");
			t.debugMode(self.config,self.MOCK);
			$.ajax({
				url:self.config.detailUrl+"&id="+id,
				type:"GET",
				dataType:"json",
				success: function(data){
					if(data.status==true){
						$("#detailImg").show();
						$("#merchInfo").show();
						$(".merchItem").show();
						self.data = data["data"];
						self.detailImg();
						self.merchInfo();
						self.detailTxt();
						self.relativeRecommend();
						self.exchangeBtnStatus(self.data["scorePrice"]);
					}else{
						if(data.code=="NET_ERROR"){
							toast.show("网络异常，请稍后再试");	
						}
						$("#mainPage").hide();
						$(".blankPage").show();
					}
				},
				error: function(){
					toast.show("网络异常，请稍后再试");	
				}	
			});	
		},
		detailImg : function(){
			var
			self = this,
			render = function(){
				var detailImgData = self.data.imgs;
				var detailImgList = '';
				var detailImgDotList = '';
				$.each(detailImgData,function(index){
					detailImgList += t.formatTpl(self.tpl.detailImgItem,{},detailImgData[index]);
					detailImgDotList += t.formatTpl(self.tpl.detailImgDotItem,{},{});	
				});
				$("#detailImg").height(parseInt($("#detailImg").width()*0.618));
				$(".detailImgWrap div span").height(parseInt($("#detailImg").width()*0.618));
				$(".detailImgWrap").html(detailImgList);
				if(detailImgData.length>1){
					$(".detailImgDotWrap").html(detailImgDotList).find("i").eq(0).addClass("active");
				}
				handler();
			},
			handler = function(){
				var bannerObj = document.getElementById("detailImg");
				var bannerSwipe = Swipe(bannerObj, {
					startSlide: 0,
					//auto: 5000,
					continuous: true,
					disableScroll: false,
					stopPropagation: true,
					callback: function(index, element) {},
					transitionEnd: function(index, element) {
						if(self.data.imgs.length>2){
							$(".detailImgDotWrap i").removeClass("active");
							$(".detailImgDotWrap i").eq(index).addClass("active");
						}else{
							$(".detailImgDotWrap i").removeClass("active");
							$(".detailImgDotWrap i").eq(index%2).addClass("active");	
						}
					}
				});	
			},
			init = function(){
				render();
			}
			init();
		},
		exchangeBtnStatus : function(scorePrice){
			var html,self = this;
			if(self.data.remainAmount>0){
				html = t.formatTpl(self.tpl.exchangeBtn.able,{},{"scorePrice":"（<strong id='scorePriceShow'>"+scorePrice+"</strong>）"});
			}else{
				html = t.formatTpl(self.tpl.exchangeBtn.disable,{},{});
			}
			$("#exchangeBtn").html(html);
			self.exchange();
		},
		merchInfo : function(){
			var
			self = this,
			lvLoginInfo = function(){
				var lvInfoHtml = '';
				login.checkLogin(function(data){
					var isLv = self.data.lv;
					var lvLevel = data.userInfo.lvLevel;
					var lvList = self.data.lvs;
					var scorePrice = self.data.scorePrice;
					var lvScore;
					var isLvRange = false;
					var lvSavePrice = (function(){
						if(lvList.length>0){
							var i,len = lvList.length;
							for(var i=0;i<len;i++){
								if(lvLevel == lvList[i]["lv"]){
									lvScore = lvList[i]["scorePrice"];
									self.config.isLvLevel = true;
									isLvRange = true;
									break;	
								}
							}
							return scorePrice - lvScore;
						}else{
							return 0;	
						}
					}());
					self.config.isLv = isLv;
					self.config.isLogin = true;
					self.config.lvLevel = data.userInfo.lvLevel;
					self.config.userScore = data.userInfo.score;
					self.config.userId = data.userInfo.id;
					
					if(!isLv){
						lvInfoHtml = t.formatTpl(self.tpl.lvInfo.beforeLogin,{},{"savePrice":self.data.savePrice});
						$(".lvInfo").html(lvInfoHtml);
						return false;
					};
					if(isLvRange){
						lvInfoHtml = t.formatTpl(self.tpl.lvInfo.login,{},{
							"lvLevel" : lvLevel,
							"lvSavePrice" : lvSavePrice
						});
						$(".lvInfo").html(lvInfoHtml);
						$("#scorePrice").html(lvScore);
						$("#scorePriceShow").html(lvScore);
						$.each($(".lvScore ul li"),function(index){
							var li = $(".lvScore ul li").eq(index);
							var span = li.find("span");
							var min = parseInt(span.attr("min"));
							var max = parseInt(span.attr("max"));
							if(max!=NaN){
								if(lvLevel >= min && lvLevel <= max){
									li.addClass("active");
								}
							}else{
								if(lvLevel == min){
									li.addClass("active");
								}
							}
						});
						
					}else{
						lvInfoHtml = t.formatTpl(self.tpl.lvInfo.beforeLogin,{},{"savePrice":self.data.savePrice});
						$(".lvInfo").html(lvInfoHtml);
					}
				},function(){
					lvInfoHtml = t.formatTpl(self.tpl.lvInfo.beforeLogin,{},{"savePrice":self.data.savePrice});
					$(".lvInfo").html(lvInfoHtml);
				});	
			},
			lvScoreList = function(){
				var lvScoreListHtml = '';
				var lvScoreData = self.data.lvs;
				var i,len = lvScoreData.length;
				var lvScoreObj = [],currentScore,minLv,maxLv;
				if(len==0){
					return;	
				}
				minLv = parseInt(lvScoreData[0]["lv"]);
				for(i=0;i<len;i++){
					if(lvScoreData[i+1]){
						if(parseInt(lvScoreData[i]["lv"])+1==parseInt(lvScoreData[i+1]["lv"])){
							if(lvScoreData[i]["scorePrice"]!=lvScoreData[i+1]["scorePrice"]){
								if(!maxLv || maxLv == null){
									lvScoreObj.push({
										"lvPrice":lvScoreData[i]["scorePrice"],
										"lvRange":"LV"+minLv,
										"min" : minLv
									});
									minLv = parseInt(lvScoreData[i+1]["lv"]);
								}else{
									lvScoreObj.push({
										"lvPrice":lvScoreData[i]["scorePrice"],
										"lvRange":"LV"+minLv+"-"+"LV"+maxLv,
										"min" : minLv,
										"max" : maxLv
									});
									minLv = maxLv+1;
									maxLv = null;
								}
							}else{
								maxLv = parseInt(lvScoreData[i+1]["lv"]);	
							}
						}else{
							//alert(1);	
						}
					}else{
						if(!maxLv || maxLv == null){
							lvScoreObj.push({
								"lvPrice":lvScoreData[i]["scorePrice"],
								"lvRange":"LV"+lvScoreData[i]["lv"],
								"min" : lvScoreData[i]["lv"]
							});	
						}else{
							lvScoreObj.push({
								"lvPrice":lvScoreData[i]["scorePrice"],
								"lvRange":"LV"+minLv+"-"+"LV"+maxLv,
								"min" : minLv,
								"max" : maxLv
							});	
						}
					}
				}
				$.each(lvScoreObj,function(index){
					lvScoreListHtml += t.formatTpl(self.tpl.lvScoreItem,{},lvScoreObj[index]);
				});
				return lvScoreListHtml;	
			},
			lvMore = function(){
				$(".lvInfo").on("click",function(){
					$(this).find("b").toggleClass("active");
					$(".lvScore").toggle(); 	
				});	
			},
			isFavorite = function(){
				return self.data.isFavorite == true ? "active" : ""	
			},
			collection = function(){
				$(".collection").on("click",function(){
					if(!$(this).find("i").hasClass('active')){
						var This = this, id = t.getURLParam("id");
						$.ajax({
							url:self.config.addFavoriteUrl+"&merchId="+id,
							type:"GET",
							dataType:"json",
							success: function(data){
								if(data.status==true){
									$(This).find("i").addClass("active");
									$("#favoriteNum").html(parseInt($("#favoriteNum").html())+1);
									toast.show("收藏成功");	
								}else{
									if(data.code=="NOT_LOGIN"){
										login.login(function(){
											self.merchInfo();
										},function(){
											toast.show("登录失败");
										});	
									}else if(data.code=="NET_ERROR"){
										toast.show("网络异常");	
									}else{
										toast.show("请求错误");	
									}
								}
							},
							error: function(){
								toast.show("网络异常，请稍后再试");	
							}	
						});	
						
					}else{
						toast.show("您已收藏，可去收藏夹管理商品！");	
					}
				});	
			},
			render = function(){
				var merchInfoData = self.data;
				var merchInfoHtml = '';
				merchInfoHtml += t.formatTpl(self.tpl.merchInfo,{
					"isFavorite" : isFavorite,
					"lvScoreList" : lvScoreList
				},merchInfoData);
				$("#merchInfo").html(merchInfoHtml);
				lvLoginInfo();
				if(merchInfoData.lv==true){
					$(".lvIcon").show();
				}else{
					$(".lvInfo").remove();
					$(".lvScore").remove();	
				}
			},
			init = function(){
				render();
				lvMore();
				collection();
			}
			init();
		},
		detailTxt : function(){
			var self = this;
			var txt = self.data.detail.replace(/\n/g,"<br/>");
			$("#merchDetail").html(txt);
			self.detailMore();	
		},
		detailMore : function(){
			if(parseInt($("#merchDetail").height())<parseInt($("#merchDetail")[0].scrollHeight)){
				$(".merchDetailMore").show();
			}
			$(".merchDetailMore").on("click",function(){
				$(this).find("i").toggleClass("active");
				$(".merchDetail").toggleClass("merchDetailActive"); 	
			});	
		},
		relativeRecommend : function(){
			var html = '',self = this,relativeData = self.data.tags;
			$.each(relativeData,function(index){
				html += t.formatTpl(self.tpl.relativeRecommendItem,{},relativeData[index]);
			});
			$("#relativeRecommend").html(html);	
		},
		exchange : function(){
			var self = this,popHtml,ajaxTag = true;
			$("#exchangeBtn").on("click",function(){
				if($("#exchangeBtn div").hasClass("exchangeBtn") && ajaxTag){
					
					//判断登录
					if(!self.config.isLogin){
						login.login(function(){
							self.merchInfo();
						},function(){
							toast.show("登录失败");
						});
						return false;	
					}
					//判断当前兑换时间是否在时间区间内
					if(self.data.subType==1){
						var curTime = self.serverTimeDiff ? self.serverTimeDiff+new Date().getTime() : new Date().getTime();
						var startTime = self.data.startTime;
						var endTime = self.data.endTime;
						var formatTime = function(timestamp){
							var time = t.formatDate(timestamp,'hh:mm:ss');
							if(time=="00:00:00"){
								time = t.formatDate(timestamp-1,'hh:mm:ss');	
							}
							var arrNum = time.split(':');
							return arrNum[0]*3600+arrNum[1]*60+arrNum[2];
						}
						var s,e,c;
						s = formatTime(startTime);
						e = formatTime(endTime);
						c = formatTime(curTime);
						if(
							//未跨天
							(s<e && ( c<s || c>e ))
							||
							//跨天
							(s>e && ( c<s || c>e ))
						){
							popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[7]["popInfo"]);
							popHtml = t.formatTpl(popHtml,{},{
								"timeRange" : t.formatDate(startTime,'hh:mm')+" - "+t.formatDate(endTime,'hh:mm')	
							});
							dialog.open(popHtml);
							self.popbox();
							return false;			
						}
					}
					
					//判断是否是lv等级
					if(self.config.isLv && !self.config.isLvLevel){
						popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[1]["popInfo"]);
						dialog.open(popHtml);
						self.popbox();
						return false;
					}
					//判断积分是否够
					if(self.config.userScore<parseInt($("#scorePrice").html())){
						popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[0]["popInfo"]);
						popHtml = t.formatTpl(popHtml,{},{"score":parseInt($("#scorePrice").html()) - self.config.userScore});
						dialog.open(popHtml);
						self.popbox();	
						return false;
					}
					
					ajaxTag = false;
								
					$.ajax({
						url:self.config.validateUrl,
						type:"POST",
						data:{"merchId":t.getURLParam("id"),"num":1},
						dataType:"json",
						success: function(data){
							var arr = self.popCodeMap,i,len = arr.length;
							for(i=0;i<len;i++){
								if(data.code==arr[i]["code"]){
									if(arr[i]["type"]=="pop"){
										if(data.code=="ORDER_CONFIRM" && self.data.appInfo!=""){
											var appName = self.data.appInfo.split('|')[2];
											popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[i]["popInfo"]);
											popHtml = t.formatTpl(popHtml,{},{
												"confirm" : "订单价格：<strong>"+(data["data"]["scorePrice"]||0)+"</strong><br/>使用应用："+appName+"（应用中心版本）"
											});
										}else{
											popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[i]["popInfo"]);
											popHtml = t.formatTpl(popHtml,{},{
												"confirmWithoutAddress" : "订单价格：<strong>"+(data["data"]["scorePrice"]||0)+"</strong><br/>您还未填写收货地址，兑换后请在订单列表页填写收货信息，以便于我们将宝贝邮寄给你哦！",
												"confirm" : "订单价格：<strong>"+(data["data"]["scorePrice"]||0)+"</strong><br/>收货人："+data["data"]["userName"]+"<br/>联系电话："+data["data"]["phoneNum"]+"<br/>收货地址："+data["data"]["address"]+"（修改地址可以进入我的订单）",
												"timeRange" : "时间有效"
											});
										}
										dialog.open(popHtml);
										self.popbox();	
									}else{
										toast.show(arr[i]["msg"]);
										if(data.code=="NO_INVENTORY"){
											$("#merchInfo h3 span").eq(2).html("剩0件");	
											$("#exchangeBtn").html(self.tpl.exchangeBtn.disable);
										}
									}
									break;
								}
							}
							ajaxTag = true;
						},
						error: function(){
							toast.show("网络异常，请稍后再试");
							ajaxTag = true;	
						}	
					});	
				}
			});	
		},
		popbox : function(obj){
			var self = this;
			$("#cancelBtn,#mask").on("click",function(){
				dialog.close();	
			});
			$("#goToLv").on("click",function(){
				window.location.href = "lv.html";	
			});
			$("#goToHot").on("click",function(){
				window.location.href = "list.html?orderType=sale";	
			});
			$("#installBtn").on("click",function(){
				//alert(global.isAppInstalled);
				//alert(global.isAppInstalled("com.lenovo.leos.appstore"))
				var url,popHtml;
				if(global){
					if(global.isAppInstalled){
						if(global.isAppInstalled("com.lenovo.leos.appstore")){
							url = "leapp://ptn/appinfo.do?packagename="+obj.pn+"&versioncode="+obj.vc;
						}else{
							popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[9]["popInfo"]);
							dialog.open(popHtml);
							self.popbox();
							return false;
						}
					}else{
						if(global.startDownload){
							url = "leapp://ptn/appinfo.do?packagename="+obj.pn+"&versioncode="+obj.vc;	
						}else{
							url = "http://3g.lenovomm.com/appdetail/"+obj.pn+"/0";
						}
					}
				}else{
					url = "http://3g.lenovomm.com/appdetail/"+obj.pn+"/0";
				}
				//alert("测试跳转链接："+url);
				window.location.href = url;
			});
			$("#goToOrder").on("click",function(){
				window.location.href = "order.html";	
			});
			$("#goToAddr").on("click",function(){
				window.location.href = "address.html?from=detail&id="+t.getURLParam("id");
			});
			$("#checkWifi").on("click",function(){
				if(global && global.getNetworkType && global.getNetworkType()!="wifi"){
					var popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[10]["popInfo"]);
					dialog.open(popHtml);
					self.popbox();	
					return false;	
				}else{
					window.location.href = "http://www.lenovomm.com/appstore/psl/com.lenovo.leos.appstore/0?cnum=";	
				}
			});
			$("#downloadLestore").on("click",function(){
				window.location.href = "http://www.lenovomm.com/appstore/psl/com.lenovo.leos.appstore/0?cnum=";	
			});
			$("#confirmBtn").on("click",function(){
				$.ajax({
					url:self.config.exchangeUrl,
					type:"POST",
					data:{"merchId":t.getURLParam("id"),"num":1},
					dataType:"json",
					success: function(data){
						var arr = self.popCodeMap,i,len = arr.length,popHtml;
						for(i=0;i<len;i++){
							if(data.code==arr[i]["code"]){
								if(arr[i]["type"]=="pop"){
									
									//判断是否需要安装应用
									if(/*global && */self.data.appInfo!=""){
										var appInfoArr = self.data.appInfo.split('|');
										var pn = appInfoArr[0],vc = appInfoArr[1],appName = appInfoArr[2];
										if(global){
											//个人中心
											if(global.isAppInstalled){
												if(global.isAppInstalled("com.lenovo.leos.appstore")){
													popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[2]["popInfo"]);
												}else{
													if(global.isAppInstalled(pn)){
														popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[i]["popInfo"]);
														dialog.open(popHtml);
														self.popbox();
														return false;
													}else{
														popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[9]["popInfo"]);
													}
												}
											//乐商店
											}else if(global.startDownload){
												if(global.getApp5Status && gloabal.getApp5Status(pn,vc) == "run"){
													popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[i]["popInfo"]);
													dialog.open(popHtml);
													self.popbox();
													return false;
												}else{
													popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[2]["popInfo"]);
												}
											//其他
											}else{
												popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[2]["popInfo"]);	
											}
										}else{
											popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[2]["popInfo"]);
										}
										popHtml = t.formatTpl(popHtml,{},{"appName":appName});
										dialog.open(popHtml);
										self.popbox({"pn":pn,"vc":vc});	
										return false;
									}else{
										popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[i]["popInfo"]);
										dialog.open(popHtml);
										self.popbox();	
									}
								}else{
									toast.show(arr[i]["msg"]);	
								}
								break;
							}
						}
						
					},
					error: function(){
						toast.show("网络异常，请稍后再试");	
					}	
				});	
			});
		},
		init : function(){
			t.setMinHeight();
			dialog.ready();
			toast.ready();
			this.getServerTimeDiff();
			this.getDetailData();
			
			//toast.show("测试");
			//console.log(t.formatDate('1437370000000','yyyy/MM/dd hh:mm:ss'));
			
		}
	}
		
	App.init();
	//alert("测试本地接口是否存在："+global);
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
});