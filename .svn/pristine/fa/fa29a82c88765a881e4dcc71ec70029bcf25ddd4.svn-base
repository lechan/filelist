define(["app/tool","app/dialog","app/toast","app/login","app/lazyload","lib/swipe","lib/fastclick"],function(t,dialog,toast,login,lazy) {
	"use strict";
	var App = {
		config : {
			indexUrl : 'view/home.do'+'?t='+new Date().getTime(),
			countdownUrl : 'view/bytopic.do'+'?t='+new Date().getTime()
		},
		MOCK : {
			indexUrl : 'MOCK/index.json'+'?t='+new Date().getTime(),
			countdownUrl : 'MOCK/countdown.json'+'?t='+new Date().getTime()	
		},
		tpl : {
			userCon : '<div id="user" class="user"></div>',
			lvCon : '<div id="lv" class="lv"></div>',
			bannerCon : '\
			<div id="banner" class="banner">\
				<div class="banner_wrap"></div>\
				<div class="banner_dot_wrap"></div>\
			</div>',
			tagCon : '<div id="tag" class="tag"><ul></ul></div>',
			topicCon : '<div class="topicItem"></div>',
			beforeLogin : '\
			<div class="beforeLogin" id="beforeLogin">\
				<div class="fl">\
					<h2>登录积分商城享专属折扣</h2>\
				</div>\
				<div class="fr">\
					<a class="more"></a>\
				</div>\
			</div>',
			user : '\
			<div class="fl">\
				<div class="username"><i>Lv#{level}</i>#{userName}</div>\
				<div class="score">#{userScore}</div>\
			</div>\
			<div class="fr">\
				<ul class="userBtn">\
					<li>\
						<a href="order.html">\
							<div class="icon1"></div>\
							<h2>订单</h2>\
						</a>\
					</li>\
					<li>\
						<a href="favorite.html">\
							<div class="icon2"></div>\
							<h2>收藏</h2>\
						</a>\
					</li>\
					<li>\
						<a href="http://test2.surepush.cn/usercenter/msg.html">\
							<div class="icon3">#{newMsg}</div>\
							<h2>消息</h2>\
						</a>\
					</li>\
				</ul>\
			</div>',
			newMsg : '<i class="notice"></i>',
			lv : '\
			<div class="lv_left lv_border_right"><a href="#{href1}"><img src="#{iconUrl1}" /></a></div>\
			<div class="lv_right lv_border_left">\
				<div class="lv_top lv_border_bottom">\
					<a href="#{href2}"><img src="#{iconUrl2}" /></a>\
				</div>\
				<div class="lv_bottom lv_border_top">\
					<div class="lv_bottom_item lv_border_right"><a href="#{href3}"><img src="#{iconUrl3}" /></a></div>\
					<div class="lv_bottom_item lv_border_left"><a href="#{href4}"><img src="#{iconUrl4}" /></a></div>\
				</div>\
			</div>',
			bannerItem : '<div><a href="#{url}"><img src="#{imgUrl}" /></a></div>',
			bannerDotItem : '<i></i>',
			tagItem : '<li><a href="#{moreUrl}"><h2>#{name}</h2><div class="listImg"><img src="images/grey.png" class="lazy" dataimg="#{imgUrl}" /></div></a></li>',
			topicItem : '\
			<h2>\
				<span class="fl">#{name}</span>\
				<span class="fr">#{more}</span>\
			</h2>\
			<ul class="listWrap">#{list}</ul>\
			',
			listItem : '\
			<li>\
            	<a href="#{url}">\
                	#{topItem}\
                    <div class="listImg"><img class="lazy" dataimg="#{iconAddr}" src="images/grey.png" /></div>\
                    <h3>#{name}</h3>\
                    <h4><strong>#{scorePrice}</strong></h4>\
                    #{bottomItem}\
                </a>\
            </li>\
			',
			listItemType : [{
				"isCountdown" : true,
				"topItem" : '<div class="countdown" id="countdown#{num}"><i>00</i>:<i>00</i>:<i>00</i></div>',
				"bottomItem" : '<div class="bottomTxt1">仅剩#{remainAmount}件</div>'	
			},{
				"topItem" : '',
				"bottomItem" : ''	
			},{
				"topItem" : '',
				"bottomItem" : '<div class="bottomTxt1">仅剩#{remainAmount}件</div>'	
			},{
				"topItem" : '<div class="rank">HOT</div>',
				"bottomItem" : '<div class="bottomTxt2"><strong>#{saleAmount}人</strong>已兑</div>'	
			},{
				"topItem" : '',
				"bottomItem" : '<div class="bottomTxt2"><strong>#{saleAmount}人</strong>已兑</div>'	
			}],
			more : '<a class="more" href="#{moreUrl}"></a>',
			popbox : {
				"test" : '\
				<section class="pop_wrap">\
					<h2 style="padding:20px 0px;">测试弹窗</h2>\
				</section>'	
			}
		},
		getData : function(){
			var self = this;
			t.debugMode(self.config,self.MOCK);
			$.ajax({
				url:self.config.indexUrl,
				type:"GET",
				dataType:"json",
				success: function(data){
					if(data.status==true){
						self.data = data;
						self.renderMainCon();
					}else{
						toast.show("网络异常，请稍后再试");	
					}
				},
				error: function(){
					toast.show("网络异常，请稍后再试");	
				}	
			});	
		},
		renderMainCon : function(){
			var self = this,i,topicNum = self.data.normalTopics.length;
			$("#mainPage").append(self.tpl.userCon).append(self.tpl.lvCon);
			for(i=0;i<topicNum;i++){
				$("#mainPage").append(self.tpl.topicCon);
				self.topicItem(i);	
			}
			$(self.tpl.bannerCon).insertBefore($("#mainPage div.topicItem").eq(1));
			$(self.tpl.tagCon).insertBefore($("#mainPage div.topicItem").eq(1));
			
			self.user();
			self.lv();
			self.banner();
			self.tag();
			self.countdownHandler();
			lazy.init();
		},
		user : function(){
			var
			self = this,
			render = function(){
				var userHtml = '';
				login.checkLogin(function(data){
					var obj = {
						"level" : data.userInfo.lvLevel,
						"userName" : data.userInfo.lenovoId,
						"userScore" : data.userInfo.score,
						"userId" : data.userInfo.id
					};
					userHtml = t.formatTpl(self.tpl.user,{
						"newMsg" : function(){return data.newMsg ? self.tpl.newMsg : ''}	
					},obj);
					t.cookie.set("lvLevel",obj["level"]);
					t.cookie.set("userId",obj["userId"]);
					$("#user").html(userHtml);
				},function(){
					$("#user").html(self.tpl.beforeLogin);
					$("#beforeLogin").on("click",function(){
						login.login(function(){
							self.user();	
						},function(){
							toast.show("登录失败");
							return false;
						});	
					});
				});	
			},
			init = function(){
				render();
			}
			init();	
		},
		lv: function(){
			var
			self = this,
			render = function(){
				var lvData = self.data.lvTopics;
				var lvHtml = '';
				var map = [{"url":"href1","img":"iconUrl1"},{"url":"href2","img":"iconUrl2"},{"url":"href3","img":"iconUrl3"},{"url":"href4","img":"iconUrl4"}];
				var obj = {};
				if(lvData.length>0){
					$.each(lvData,function(index){
						obj[map[index]["url"]] = lvData[index]["moreUrl"];
						obj[map[index]["img"]] = lvData[index]["iconUrl"];
					});
					lvHtml = t.formatTpl(self.tpl.lv,{},obj);
					$("#lv").html(lvHtml);
				}
			},
			init = function(){
				render();
			}
			init();	
		},
		banner : function(){
			var
			self = this,
			render = function(){
				var bannerData = self.data.banners;
				var bannerList = '';
				var bannerDotList = '';
				$.each(bannerData,function(index){
					bannerList += t.formatTpl(self.tpl.bannerItem,{},bannerData[index]);
					bannerDotList += t.formatTpl(self.tpl.bannerDotItem,{},{});	
				});
				$(".banner_wrap").html(bannerList);
				if(bannerData.length>1){
					$(".banner_dot_wrap").html(bannerDotList).find("i").eq(0).addClass("active");
					handler();
				}
			},
			handler = function(){
				var bannerObj = document.getElementById("banner");
				var bannerSwipe = Swipe(bannerObj, {
					startSlide: 0,
					auto: 5000,
					continuous: true,
					disableScroll: false,
					stopPropagation: true,
					callback: function(index, element) {},
					transitionEnd: function(index, element) {
						if(self.data.banners.length>2){
							$(".banner_dot_wrap i").removeClass("active");
							$(".banner_dot_wrap i").eq(index).addClass("active");
						}else{
							$(".banner_dot_wrap i").removeClass("active");
							$(".banner_dot_wrap i").eq(index%2).addClass("active");	
						}
					}
				});	
			},
			init = function(){
				render();
			}
			init();
		},
		tag : function(){
			var
			self = this,
			render = function(){
				var tagData = self.data.tags;
				var tagList = '';
				$.each(tagData,function(index){
					tagList += t.formatTpl(self.tpl.tagItem,{},tagData[index]);
				});
				$("#tag ul").html(tagList);
			},
			init = function(){
				render();
			}
			init();	
		},
		countdownIndex : 0,
		countdownTimeArr : [],
		topicItem : function(index){
			var
			self = this,
			render = function(index){
				var topicData = self.data.normalTopics[index];
				var listData = self.data.normalTopics[index]["list"];
				var topicHtml = '';
				var topicList = '';
				var topItem;
				var bottomItem;
				var more = self.data.normalTopics[index]["moreUrl"];
				more = more == "" ? "" : 
				(function(){
					return t.formatTpl(self.tpl.more,{},{"moreUrl" : more});
				})();
				var listItemIndex = (function(){
					var listItemLen = self.tpl.listItemType.length;
					return index>listItemLen-1 ? listItemLen-1 : index;
				})()
				$.each(listData,function(listIndex){
					topItem = function(){return t.formatTpl(self.tpl.listItemType[listItemIndex]["topItem"],{"num":function(){return listIndex+1}},listData[listIndex])};
					bottomItem = function(){return t.formatTpl(self.tpl.listItemType[listItemIndex]["bottomItem"],{},listData[listIndex])};
					topicList += t.formatTpl(self.tpl.listItem,{
						"topItem" : topItem,
						"bottomItem" : bottomItem
					},listData[listIndex]);
					if(self.tpl.listItemType[listItemIndex]["isCountdown"]){
						self.countdownTimeArr.push(listData[listIndex]["endTime"]);	
					}
				});
				topicHtml = t.formatTpl(self.tpl.topicItem,{},{
					"name" : topicData["name"],
					"more" : more, 
					"list" : topicList	
				});
				$(".topicItem").eq(index).html(topicHtml);
				if(index==0){
					$(".topicItem").eq(index).find("h3").addClass("lineOne");
					$(".topicItem").eq(index).find("a.more").hide();	
				}
			},
			init = function(index){
				render(index);
			}
			init(index);		
		},
		countdownList : function(){
			var
			self = this,
			render = function(){
				var listData = self.countdownData["merchs"];
				var topicList = '';
				var topItem;
				var bottomItem;
				$.each(listData,function(listIndex){
					topItem = function(){return t.formatTpl(self.tpl.listItemType[0]["topItem"],{"num":function(){return listIndex+1}},listData[listIndex])};
					bottomItem = function(){return t.formatTpl(self.tpl.listItemType[0]["bottomItem"],{},listData[listIndex])};
					topicList += t.formatTpl(self.tpl.listItem,{
						"topItem" : topItem,
						"bottomItem" : bottomItem
					},listData[listIndex]);
					self.countdownTimeArr.push(listData[listIndex]["endTime"]);	
				});
				$(".topicItem").eq(0).find(".listWrap").html(topicList);
				$(".topicItem").eq(0).find("h3").addClass("lineOne");
				var liArr = $(".topicItem").eq(0).find("li");
				$.each(liArr,function(imgIndex){
					var imgObj = liArr.eq(imgIndex).find("img.lazy");
					var src = imgObj.attr("dataimg");
					imgObj.attr("src",src);
				});
			},
			init = function(){
				render();
				self.countdownHandler();
			}
			init();
		},
		countdownHandler : function(){
			var self = this,i,len = self.countdownTimeArr.length,topicId = self.data.normalTopics[0]["id"];
			if(len!=0){
				for(i=0;i<len;i++){
					t.countdown.init('countdown'+(i+1),t.formatDate(self.countdownTimeArr[i],'yyyy/MM/dd hh:mm:ss'),function(){
						$.ajax({
							url:self.config.countdownUrl+"&topicId="+topicId+"&start=0&end=3",
							type:"GET",
							dataType:"json",
							success: function(data){
								self.countdownData = data;
								self.countdownList();
							},
							error: function(){
								toast.show("网络异常，请稍后再试");	
							}	
						});	
						self.countdownTimeArr = [];
					});
					
				}
			}
		},
		recommendList : function(){
			var myScroll = new IScroll('#recommend_wrapper', { scrollX: true, scrollY: false, eventPassthrough: true, preventDefault: false });	
		},
		init : function(){
			this.getData();
			dialog.ready();
			toast.ready();
			//dialog.open(this.tpl.popbox.test);
			$("#dialogWrapper").click(function(){
				dialog.close();
			});
			//toast.show("测试");
			console.log(t.formatDate('1437370000000','yyyy/MM/dd hh:mm:ss'));
			
		}
	}
		
	App.init();
	
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
});