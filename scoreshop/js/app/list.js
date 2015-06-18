define(["app/tool","app/lazyload","app/toast","lib/fastclick"],function(t,lazy,toast) {
	"use strict";
	var App = {
		loadingComplete : true,
		config : {
			listUrl : 'view/bytag.do'+'?t='+new Date().getTime(),
			tagUrl : 'view/hotTagList.do'+'?t='+new Date().getTime()
		},
		MOCK : {
			listUrl : 'MOCK/list.json'+'?t='+new Date().getTime(),
			tagUrl : 'MOCK/tag.json'+'?t='+new Date().getTime()
		},
		listParam : {},
		tpl : {
			tagItem : '<li data-value="#{id}"><span>#{name}</span></li>',
			selectedItem : '<span data-key="#{key}">#{name}<i>×</i></span>',
			listItem : '\
			<li class="#{islv}">\
                <a href="#{url}">\
                	#{lvIcon}\
                    <div class="listImg"><img class="lazy" dataimg="#{iconAddr}" src="images/grey.png"></div>\
                    <h3><span class="topicTag">#{topicTag}</span>#{name}</h3>\
                    <h4><strong>#{scorePrice}</strong></h4>\
                    #{lvTips}\
                    <h5>#{saleAmount}人兑换</h5>\
                </a>\
            </li>\
			',
			topicTag : '<i style="color:#{frameColor}; border-color:#{frameColor}">#{topicName}</i>',
			lvIcon : '<div class="lvIcon"><i></i><span>Lv特供</span></div>',
			lvTips : '<div class="lvTips"><i>Lv专享价最高省<strong>#{savePrice}</strong></i></div>',
			popbox : {
				"test" : '\
				<section class="pop_wrap">\
					<h2 style="padding:20px 0px;">测试弹窗</h2>\
				</section>'	
			}
		},
		getTagData : function(){
			var self = this,tagHtml='';
			t.debugMode(self.config,self.MOCK);
			$.ajax({
				url:self.config.tagUrl,
				type:"GET",
				dataType:"json",
				success: function(data){
					tagHtml += t.formatTpl(self.tpl.tagItem,{},{"name" : "全部","id":""})
					$.each(data.tags,function(index){
						tagHtml += t.formatTpl(self.tpl.tagItem,{},data.tags[index]);
					});
					$("#nav_tag ul").html(tagHtml);
					self.navHandler();
					self.initSelect();
					toast.ready();
				},
				error: function(){
					toast.show("网络异常，请稍后再试");	
				}	
			});		
		},
		getParam : function(){
			var paramStr = window.location.search.substring(1).split('&'),self = this;
			var len = paramStr.length;
			for(var i=0;i<len;i++){
				(self.listParam)[paramStr[i].split('=')[0]] = paramStr[i].split('=')[1];
			};
			for(var i in self.listParam){
				if($("#"+i)){
					$("#"+i).val(self.listParam[i]);	
				}
			}
		},
		initSelect : function(){
			var self = this;
			var param = self.listParam;
			if(param["tagId"] && param["tagId"]!=""){
				$.each($("#nav_tag ul li"),function(index,obj){
					if($(obj).attr("data-value")==param["tagId"]){
						$(obj).addClass("active");
						$("#tagBtn span").eq(0).html($(obj).find("span").html());
						document.title = $(obj).find("span").html();
					}
				});
			}else{
				$("#nav_tag ul li").eq(0).addClass("active");	
			}
			if(param["orderType"] && param["orderType"]=="sale"){
				$("#salesBtn").addClass("active");
			}
		},
		getListData : function(){
			var self = this;
			t.debugMode(self.config,self.MOCK);
			var paramObj = {
				"tagId" : $("#tagId").val(),
				"orderType" : $("#orderType").val(),
				"orderCode" : $("#orderCode").val(),
				"prizeType" : $("#prizeType").val(),
				"isLv" : $("#isLv").val(),
				"lowScore" : $("#lowScore").val(),
				"highScore" : $("#highScore").val(),
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
			$(".blankPage").hide();	
			$.ajax({
				url:self.config.listUrl+paramStr,
				type:"GET",
				dataType:"json",
				success: function(data){
					self.data = data;
					if(self.data.merchs && self.data.merchs.length>0){
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
			var listData = self.data.merchs;
			var listHtml = '';
			var lvIcon,lvTips,topicTag;
			$.each(listData,function(index){
				lvIcon = t.formatTpl(self.tpl.lvIcon,{},{});
				lvTips = t.formatTpl(self.tpl.lvTips,{},listData[index]);
				topicTag = t.formatTpl(self.tpl.topicTag,{},listData[index]);
				listHtml += t.formatTpl(self.tpl.listItem,{
					"islv" : function(){return listData[index]["lv"] ? "lvItem" : ""},
					"lvIcon" : function(){return listData[index]["lv"] ? lvIcon : ""},
					"lvTips" : function(){return listData[index]["lv"] ? lvTips : ""},
					"topicTag" : function(){return listData[index]["topicName"] ? topicTag : ""}
				},listData[index]);
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
		navHandler : function(){
			var self = this;
			var selectObj = {};
			var resetSelect = function(){
				$("#salesBtn")[0].className = '';
				$("#priceBtn")[0].className = '';
				$(".selectItem ul li").removeClass("active");
				$("#lowScoreInput").val("");
				$("#highScoreInput").val("");
				$.each($(".selectItem"),function(index){
					$(".selectItem").eq(index).find("li").eq(0).addClass("active");
				});
			};
			var closeNavPop = function(){
				$("#nav_select").hide();
				$("#nav_tag").hide();
				$("#selectBtn")[0].className = "";
				$("#selectBtn").find("i")[0].className = "arrow_down pos1";
				$("#tagBtn")[0].className = "";
				$("#tagBtn").find("i")[0].className = "arrow_down pos1";
			};
			$("#tagBtn").on("click",function(){
				$(this).toggleClass("active up");
				$(this).find("i").toggleClass("arrow_down arrow_up");
				$("#nav_tag").toggle();
				$("#nav_select").hide();
				$("#selectBtn")[0].className = "";
				$("#selectBtn").find("i")[0].className = "arrow_down pos1";
			});	
			$("#salesBtn").on("click",function(){
				closeNavPop();
				$(this).toggleClass("active");
				$("#priceBtn")[0].className = '';
				if($(this).hasClass("active")){
					$("#orderType").val("sale");
				}else{
					$("#orderType").removeAttr("value");	
				}
				$("#orderCode").removeAttr("value");
				$("#start").val(0);
				$(".mainList ul").html("");
				self.getListData();
			});	
			$("#priceBtn").on("click",function(){
				closeNavPop();
				$("#salesBtn")[0].className = '';
				if($(this).hasClass("active")){
					if($(this).hasClass("up")){
						$(this).removeClass("up").addClass("down");
						$("#orderCode").val("desc");
					}else if($(this).hasClass("down")){
						$(this).removeClass("down").addClass("up");
						$("#orderCode").val("asc");
					}
				}else{
					$(this).addClass("active up");
					$("#orderCode").val("asc");
				}
				$("#orderType").val("price");
				$("#start").val(0);
				$(".mainList ul").html("");
				self.getListData();
			});	
			$("#selectBtn").on("click",function(){
				$(this).toggleClass("active up");
				$(this).find("i").toggleClass("arrow_down arrow_up");
				$("#nav_select").toggle();
				$("#nav_tag").hide();
				$("#tagBtn")[0].className = "";
				$("#tagBtn").find("i")[0].className = "arrow_down pos1";
			});	
			$(".nav_mask").on("click",function(){
				closeNavPop();	
			});
			
			$("#nav_tag ul li").on("click",function(){
				closeNavPop();
				resetSelect();
				$("#nav_tag ul li").removeClass("active");
				$(this).addClass("active");
				$("#tagBtn span").eq(0).html($(this).find("span").html());
				$(".blankbox input").removeAttr("value");
				$("#tagId").val($(this).attr("data-value"));
				$("#start").val(0);
				$(".mainList ul").html("");
				$(".selectedItemWrap").html("");
				$(".nav").removeClass("selected");
				$(".blankbox").removeClass("selected");	
				document.title = $(this).find("span").html();
				self.getListData();
			});
			
			$("#nav_select ul li").on("click",function(){
				$(this).parent("ul").find("li").removeClass("active");
				$(this).addClass("active");
			});
			
			$("#selectConfirmBtn").on("click",function(){
				var selectArr = {};
				$.each($("#prizeTypeSel li"),function(index){
					var selLi = $("#prizeTypeSel").find("li").eq(index);
					var val = selLi.find("span").html();
					if(selLi.hasClass("active") && val!="全部"){
						$("#prizeType").val(selLi.attr("data-value"));	
						selectArr["prizeType"] = val;
					}else if(selLi.hasClass("active") && val=="全部"){
						$("#prizeType").val("");		
					}
				});
				$.each($("#isLvSel li"),function(index){
					var selLi = $("#isLvSel").find("li").eq(index);
					var val = selLi.find("span").html();
					if(selLi.hasClass("active") && val!="全部"){
						$("#isLv").val(selLi.attr("data-value"));
						selectArr["isLv"] = val;	
					}else if(selLi.hasClass("active") && val=="全部"){
						$("#isLv").val("");		
					}
				});
				var lowScore = $("#lowScoreInput").val();
				var highScore = $("#highScoreInput").val();
				var re = /^[0-9]*]*$/;
				if(lowScore != "" && highScore !=""){
					if(re.test(lowScore) && re.test(highScore)){
						if(parseInt(lowScore)<parseInt(highScore)){
							$("#lowScore").val(lowScore);	
							$("#highScore").val(highScore);
							selectArr["scoreRange"] = lowScore+" - "+highScore+"元";	
						}else{
							toast.show("起始价大于终止价");	
							return false;
						}
					}else{
						toast.show("请输入整数数字");	
						return false;
					}
				}else if(lowScore != ""){
					if(re.test(lowScore)){
						$("#lowScore").val(lowScore);	
						selectArr["scoreRange"] = lowScore+"元及以上";	
					}else{
						toast.show("请输入整数数字");	
						return false;
					}
				}else if(highScore !=""){
					if(re.test(highScore)){
						$("#lowScore").val(0);
						$("#highScore").val(highScore);
						selectArr["scoreRange"] = "0 - "+highScore+"元";	
					}else{
						toast.show("请输入整数数字");	
						return false;
					}
				}
				closeNavPop();
				$("#start").val(0);
				$(".mainList ul").html("");
				self.selectedItem(selectArr);
				self.getListData();
			});
		},
		selectedItem : function(obj){
			var html = '',self = this;
			for(var i in obj){
				html += t.formatTpl(self.tpl.selectedItem,{},{"name":obj[i],"key":i});	
			}
			if(html!=""){
				$(".selectedItemWrap").html(html);
				$(".nav").addClass("selected");
				$(".blankbox").addClass("selected");
			}else{
				$(".nav").removeClass("selected");
				$(".blankbox").removeClass("selected");	
			}
			$(".selectedItemWrap span").on("click",function(){
				$(this).remove();
				var key = $(this).attr("data-key");
				if($(".selectedItemWrap").html()==""){
					$(".nav").removeClass("selected");
					$(".blankbox").removeClass("selected");	
				}
				if(key=="scoreRange"){
					$("#lowScore").removeAttr("value");
					$("#highScore").removeAttr("value");
					$("#lowScoreInput").val("");
					$("#highScoreInput").val("");
				}else{
					$("#"+key).removeAttr("value");
				}
				$("#"+key+"Sel").find("li").removeClass("active");
				$("#"+key+"Sel").find("li").eq(0).addClass("active");
				$("#start").val(0);
				$(".mainList ul").html("");
				self.getListData();
			});
		},
		init : function(){
			$("#start").val(0);
			this.getParam();
			this.getTagData();
			this.getListData();
		}
	}
		
	App.init();
	
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
	
});