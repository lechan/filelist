define(["app/tool","app/lazyload","app/toast","app/login","lib/fastclick"],function(t,lazy,toast) {
	"use strict";
	var global = window.lestore || window.App5 || window.newxb;
	var App = {
		loadingComplete : true,
		config : {
			listUrl : 'listmyorder.do'+'?t='+new Date().getTime()
		},
		MOCK : {
			listUrl : 'MOCK/order.json'+'?t='+new Date().getTime()
		},
		tpl : {
			listItem : '\
			<li>\
            	<div class="orderInfo">\
                	<span class="fl">订单号：#{orderId}</span>\
                    <span class="fr">#{orderDate}</span>\
                </div>\
                <div class="orderMain">\
                	<div class="orderMainLeft">\
                        <div class="listImg"><a href="detail.html?id=#{merchId}"><img src="#{merchPic}"></a></div>\
                        <h3><a href="detail.html?id=#{merchId}">#{merchName}</a></h3>\
						<h5><strong>#{scorePrice}</strong>#{merchNum}个</h5>\
                        #{orderType}\
                    </div>\
					<div class="orderMainRight">\
                    	#{isNeedAddr}\
                    </div>\
					#{cardNum}\
                </div>\
                <div class="orderStatus"><span class="#{orderStatus}"></span></div>\
            </li>\
			',
			isNeedAddr : '<span class="orderBtn"><a href="address.html?from=order&orderId=#{orderId}">填写地址</a></span>',
			orderType : {
				"normal" : '<h4></h4>',
				"game" : '<h4>该兑换码只支持“应用中心”下载的<a class="goToApp" data-pn="#{pn}" data-vc="#{vc}">#{appName}</a>！</h4>',
				"auditFail" : '<h4 class="caution">订单审核未通过，请联系客服QQ：891832589</h4>' 
			},
			cardNum : '\
			<div class="cardNum">\
				<h3 class="fl">#{cardNum}</h3>\
				<span class="orderBtn fr copyBtn">复制</span>\
			</div>\
			',
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
		popCodeMap : [{
			"id" : 0,
			"code" : "NOT_LESTORE",
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "发现你已卸载应用中心，无法获得该应用的特权版，请一键恢复吧！",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "一键恢复",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "checkWifi"
			}
		},{
			"id" : 1,
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
		}],
		getListData : function(){
			var self = this;
			var paramObj = {
				"start" : $("#start").val(),
				"end" : (function(){
					var endNum = parseInt($("#start").val())+parseInt($("#start").attr("data-pagenum"));
					$("#start").val(endNum);
					return endNum;
				})()
			}
			var paramStr = (function(){
				var str = '';
				for(var i in paramObj){
					if(paramObj[i] && paramObj[i] !=""){
						str += "&"+i+"="+paramObj[i];	
					}
				}
				//str = str.substring(0,str.length-1);
				return str;
			}());
			self.loadingComplete = false;
			t.debugMode(self.config,self.MOCK);
			$.ajax({
				url:self.config.listUrl+paramStr,
				type:"GET",
				dataType:"json",
				success: function(data){
					self.data = data;
					if(self.data.status==true){
						$("#orderCount").html(self.data.count);
						if(self.data.orders.length>0){
							self.renderList();
						}else{
							if($("#start").val()==$("#start").attr("data-pagenum")){
								$(".blankPage").show();	
							}	
						}
					}else{
						$(".blankPage").show();	
					}
				},
				error: function(){
					toast.show("网络异常，请稍后再试");	
				}	
			});	
		},
		renderList : function(){
			var self = this;
			var listData = self.data.orders;
			var listHtml = '',appInfoArr,appInfo={"pn":"","vc":"","appName":""};
			$.each(listData,function(index){
				listHtml += t.formatTpl(self.tpl.listItem,{
					"orderType" : function(){
						if(listData[index]["prizeType"]	== 1 && listData[index]["appInfo"]!=""){
							appInfoArr = listData[index]["appInfo"].split('|');
							appInfo["pn"] = appInfoArr[0];
							appInfo["vc"] = appInfoArr[1];
							appInfo["appName"] = appInfoArr[2];
							return t.formatTpl(self.tpl.orderType.game,{},appInfo);
						}else if(listData[index]["saleState"] == 3){
							return self.tpl.orderType.auditFail; 
						}else{
							return self.tpl.orderType.normal; 
						}
					},
					"isNeedAddr" : function(){
						if(listData[index]["saleState"]==2 || listData[index]["saleState"]==3 || listData[index]["saleState"]==4){
							return "";
						}else if(listData[index]["actionType"]==2){
							return "";	
						}else{
							return listData[index]["prizeType"]	== 1 ? "" : t.formatTpl(self.tpl.isNeedAddr,{},listData[index]);	
						}
						
					},
					"orderStatus" : function(){
						switch(listData[index]["saleState"]){
							case 1 : return "wait"; break;
							case 2 : return "delivery"; break;
							case 3 : return "fail"; break;
							case 4 : return "complete"; break;
						}
					},
					"cardNum" : function(){
						var extraInfoData = listData[index]["extraInfo"],extraInfoHtml = '';
						if(extraInfoData.length>0){
							$.each(extraInfoData,function(i){
								extraInfoHtml += t.formatTpl(self.tpl.cardNum,{},{"cardNum":extraInfoData[i]});
							});
						}
						return extraInfoHtml;
					}
				},listData[index]);
			});
			
			$(".orderList ul").append(listHtml);
			//lazy.init();
			self.scrollList();
			self.copyCardNum();
			self.goToApp();
			self.loadingComplete = true;
		},
		goToApp : function(){
			$(".goToApp").on("click",function(){
				var pn = $(this).attr("data-pn"),vc = $(this).attr("data-vc"),url,popHtml;
				if(global){
					if(global.isAppInstalled){
						if(global.isAppInstalled("com.lenovo.leos.appstore")){
							url = "leapp://ptn/appinfo.do?packagename="+obj.pn+"&versioncode="+obj.vc;
						}else{
							popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[0]["popInfo"]);
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
		},
		popbox : function(obj){
			var self = this;
			$("#cancelBtn,#mask").on("click",function(){
				dialog.close();	
			});
			$("#checkWifi").on("click",function(){
				if(global && global.getNetworkType && global.getNetworkType()!="wifi"){
					var popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[1]["popInfo"]);
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
		},
		scrollList : function(){
			var self = this;
			//获取滚动条当前的位置 
			var getScrollTop = function() { 
				var scrollTop = 0; 
				if (document.documentElement && document.documentElement.scrollTop) { 
					scrollTop = document.documentElement.scrollTop; 
				} 
				else if (document.body) { 
					scrollTop = document.body.scrollTop; 
				} 
				return scrollTop; 
			} 
			
			//获取当前可视范围的高度 
			var getClientHeight = function() { 
				var clientHeight = 0; 
				if (document.body.clientHeight && document.documentElement.clientHeight) { 
					clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
				}else{ 
					clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
				} 
				return clientHeight; 
			} 
			
			//获取文档完整的高度 
			var getScrollHeight = function() { 
				return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
			} 
			window.onscroll = function(){
				if (getScrollTop() + getClientHeight() == getScrollHeight() && self.loadingComplete == true) { 
					self.getListData();
				} 
			};	
		},
		copyCardNum : function(){
			if(global && global.copyToClipboard){
				$(".copyBtn").on("click",function(){
					var cardNum = $(this).siblings("h3").html();
					global.copyToClipboard(cardNum);
					toast.show("已复制到剪贴板");	
				});
			}else{
				$(".copyBtn").hide();	
			}
		},
		init : function(){
			$("#start").val(0);
			this.getListData();
		}
	}
		
	App.init();
	
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
	
});