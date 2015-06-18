define(["app/tool","app/lazyload","app/toast","app/dialog","lib/fastclick"],function(t,lazy,toast,dialog) {
	"use strict";
	var App = {
		loadingComplete : true,
		config : {
			listUrl : 'listmerchfavorite.do'+'?t='+new Date().getTime(),
			cancelFavoriteUrl : 'removemerchfavorite.do'+'?t='+new Date().getTime()
		},
		MOCK : {
			listUrl : 'MOCK/favorite.json'+'?t='+new Date().getTime(),
			cancelFavoriteUrl : 'MOCK/cancelFavor.json'+'?t='+new Date().getTime()
		},
		tpl : {
			listItem : '\
			<li class="#{islv}">\
                <a href="#{url}">\
                	#{lvIcon}\
                    <div class="listImg"><img src="#{iconAddr}"></div>\
                    <h3>#{name}</h3>\
                    <h4><strong>#{scorePrice}</strong></h4>\
                    #{lvTips}\
                    <h5>仅剩#{remainAmount}件</h5>\
                </a>\
				<div class="cancelFavor" data-merchId="#{merchId}">取消收藏</div>\
            </li>\
			',
			lvIcon : '<div class="lvIcon"><i></i><span>Lv特供</span></div>',
			lvTips : '<div class="lvTips"><i>Lv专享价最高省<strong>#{savePrice}</strong></i></div>',
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
			"type" : "pop",
			"popInfo" : {
				"title" : "温馨提示",
				"msg" : "删除后，该商品将移除收藏夹！",
				"leftBtnTxt" : "取消",	
				"rightBtnTxt" : "确认",
				"leftBtn" : "cancelBtn",
				"rightBtn" : "confirmBtn"
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
					if(self.data.merchFavorites.length>0){
						self.renderList();
					}else{
						if($("#start").val()==$("#start").attr("data-pagenum")){
							$(".blankPage").show();	
						}
					}
				},
				error: function(){
					toast.show("网络异常，请稍后再试");	
				}	
			});	
		},
		renderList : function(){
			var self = this;
			var listData = self.data.merchFavorites;
			var listHtml = '';
			var lvIcon,lvTips;
			$.each(listData,function(index){
				lvIcon = t.formatTpl(self.tpl.lvIcon,{},{});
				lvTips = t.formatTpl(self.tpl.lvTips,{},listData[index]);
				listHtml += t.formatTpl(self.tpl.listItem,{
					"islv" : function(){return listData[index]["lv"] ? "lvItem" : ""},
					"lvIcon" : function(){return listData[index]["lv"] ? lvIcon : ""},
					"lvTips" : function(){return listData[index]["lv"] ? lvTips : ""}
				},listData[index]);
			});
			
			$(".mainList ul").append(listHtml);
			//lazy.init();
			self.scrollList();
			self.cancelFavorite();	
			self.loadingComplete = true;
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
		cancelFavorite : function(){
			var self = this;
			$(".cancelFavor").on("click",function(){
				var cancelBtn = this,popHtml,merchId = $(cancelBtn).attr("data-merchId");
				$("#merchId").val(merchId);
				$(cancelBtn).addClass("curCancelFavor");
				popHtml = t.formatTpl(self.tpl.popbox.tips,{},self.popCodeMap[0]["popInfo"]);
				dialog.open(popHtml);
				self.popbox();
			});
		},
		popbox : function(){
			var self = this;
			$("#cancelBtn,#mask").on("click",function(){
				dialog.close();	
			});
			$("#confirmBtn").on("click",function(){
				var merchId = $("#merchId").val();
				$.ajax({
					url:self.config.cancelFavoriteUrl,
					type:"POST",
					data:{"merchId":merchId},
					dataType:"json",
					success: function(data){
						if(data.status==true){
							dialog.close();	
							$(".curCancelFavor").parent("li").addClass("cancelFavorSucc");
							$(".curCancelFavor").parent("li").remove();
							if($(".mainList ul li").length==0){
								$(".blankPage").show();	
							}
							toast.show("取消收藏成功");
						}
					},
					error: function(){
						toast.show("取消收藏失败");	
					}	
				});		
			});	
		},
		init : function(){
			$("#start").val(0);
			this.getListData();
			toast.ready();
			dialog.ready();
		}
	}
		
	App.init();
	
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
	
});