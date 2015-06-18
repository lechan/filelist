define(["app/tool","app/lazyload","app/toast","lib/fastclick"],function(t,lazy,toast) {
	"use strict";
	var App = {
		loadingComplete : true,
		config : {
			listUrl : 'view/bytopic.do'+'?t='+new Date().getTime()
		},
		MOCK : {
			listUrl : 'MOCK/special.json'+'?t='+new Date().getTime()
		},
		tpl : {
			listItem : '\
			<li>\
                <a href="#{url}">\
                    <div class="listImg"><img class="lazy" dataimg="#{iconAddr}" src="images/grey.png"></div>\
                    <h3>#{name}</h3>\
					<div class="desc">#{descr}</div>\
                    <h4><strong>#{scorePrice}</strong></h4>\
                    <h5>#{saleAmount}人兑换</h5>\
                </a>\
            </li>\
			',
			popbox : {
				"test" : '\
				<section class="pop_wrap">\
					<h2 style="padding:20px 0px;">测试弹窗</h2>\
				</section>'	
			}
		},
		getListData : function(){
			var self = this,topicId = t.getURLParam("topicId");
			var paramObj = {
				"start" : $("#start").val(),
				"end" : (function(){
					var endNum = parseInt($("#start").val())+parseInt($("#start").attr("data-pagenum"));
					$("#start").val(endNum)
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
				url:self.config.listUrl+"&topicId="+topicId+paramStr,
				type:"GET",
				dataType:"json",
				success: function(data){
					self.data = data;
					if(self.data.status == true){
						if(self.data.merchs && self.data.merchs.length>0){
							self.renderList();
						}
						self.getBg();
					}else{
						if(self.data.code == "NET_ERROR"){
						toast.show("网络错误");	
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
			var listData = self.data.merchs;
			var listHtml = '';
			$.each(listData,function(index){
				listHtml += t.formatTpl(self.tpl.listItem,{},listData[index]);
			});
			
			$(".mainList ul").append(listHtml);
			lazy.init();
			self.scrollList();
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
		getBg : function(){
			var self = this,topicInfo = self.data.topicInfo;
			$("#mainPage").css({"background":topicInfo.bgColor});
			$("#topBanner").attr("src",topicInfo.imgUrl).show();
			document.title = topicInfo.name;	
		},
		init : function(){
			t.setMinHeight();
			$("#start").val(0);
			this.getListData();
			toast.ready();
		}
	}
		
	App.init();
	
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
	
});