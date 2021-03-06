var tpl = {
	//顶部导航项
	"navItem" : '\
	<div class="swiper-slide" id="slide#{num}">\
		<div class="title #{isCur}" name="title" data-navid="#{nav_id}">#{nav_name}</div>\
	</div>\
	',
	//顶部二级导航项
	"subNavItem" : '\
	<div class="swiper-slide">\
		<div class="title #{isCur}">#{nav_name}</div>\
	</div>\
	',
	//订阅项
	"navSubscribe" : '\
	<li><span>#{nav_name}</span></li>\
	',
	//页面项
	"swiperItem" : '\
	<div class="swiper-slide">\
		<div id="wrapper#{item_num}"></div>\
	</div>\
	',
	//页面列表项
	"listItem" : '\
	<div class="list_item" data-newsid="#{newsid}">\
		#{listImg}\
		<div class="title_con">\
			<h2>#{title}</h2>\
		</div>\
		<div class="list_info">\
			<span class="fl">#{time}</span>\
			<span class="fr">#{from}</span>\
		</div>\
	</div>\
	',
	//页面列表图片项
	"listImg" : '\
	<div class="img_con"><img src="#{img_src}" /></div>\
	',
	//详情内容
	"detail" : '\
	<h1>#{title}</h1>\
    <div class="detail_info">\
    	<span class="fl">#{from}</span>\
        <span class="fr">#{time}</span>\
    </div>\
    <div class="detail_con">\
    	#{content}\
    </div>\
	',
	//评论内容
	"topic" : '\
	<h1>#{title}</h1>\
    <div class="topic_info">\
    	<span class="fl">#{from}</span>\
        <span class="fr">#{time}</span>\
    </div>\
	<div class="topic_list_wrap" id="topic_list">\
		<div class="topic_list">\
			<div class="loading_mask"></div>\
		</div>\
	</div>\
	',
	//评论列表项
	"topicListItem" : '\
	<li>\
		<h2>\
			<span class="fl">#{username}</span>\
			<span class="fr">#{createtime}</span>\
		</h2>\
		<p>#{content}</p>\
	</li>\
	',
	//默认列表项(搜索，收藏，推送，历史)
	"defaultListItem" : '\
	<li data-newsid="#{newsId}">\
		<p>#{title}</p>\
		<h2>\
			<span class="fl">#{time}</span>\
			<span class="fr">#{from}</span>\
		</h2>\
	</li>\
	'
}

var setting = {
	"nav_data" : ["家电","人力","财经","金融","战略","房地产","互联网","科技"],
	"nav_data_cancel" : [],
	"nav_id" : {
		"家电" : "31",
		"人力" : "1",	
		"财经" : "37",	
		"金融" : "2",	
		"战略" : "3",	
		"房地产" : "4",	
		"互联网" : "5",
		"科技" : "26"	
	}
}

/*localStorage封装
 *@param {Object} 需要存储的json
 *@usage
 *	localData.get({key:cookiename});
 *	localData.set({key:cookiename,value:curId,expires:timeout});
 *	localData.remove({key:cookiename});
 */
var localData = {
    isLocalStorage: window.localStorage ? true : false,
    set: function(config) {
        if (this.isLocalStorage) {
            window.localStorage.setItem(config.key, config.value);
            if (config.expires) {
                var expires;
                if (typeof config.expires == 'number') {
                    expires = new Date();
                    expires.setTime(expires.getTime() + config.expires * 60000);
                }
                window.localStorage.setItem(config.key + ".expires", expires);
            }
        } else {
            alert("不支持本地存储");
        }
    },
    get: function(config) {
        if (this.isLocalStorage) {
            var result = window.localStorage.getItem(config.key);
            //过期时间判断，如果过期了，则移除该项
            if (result) {
                var expires = window.localStorage.getItem(config.key + ".expires");
                result = {
                    value: result,
                    expires: expires ? new Date(expires) : null
                };
                if (result && result.expires && result.expires < new Date()) {
                    result = null;
                    window.localStorage.removeItem(config.key);
                } else {
                    return result.value;
                }
            }
        } else {
            alert("不支持本地存储");
        }
    },
    remove: function(config) {
        if (this.isLocalStorage) {
            localStorage.removeItem(config.key);
        } else {
            alert("不支持本地存储");
        }
    }
}

var 
host = "http://27.223.70.67:9081",
mySwiper1,
mySwiper2,
mySwiper,
navSwitch = true,
token = localData.get({key:"token"}) == null ? '' : localData.get({key:"token"}),
userId = localData.get({key:"userId"}) == null ? '' : localData.get({key:"userId"}),
loginUserName = localData.get({key:"username"}) == null ? '' : localData.get({key:"username"}),
currentFn = null,
currentNewsId = '',
nav_data = localData.get({key:"nav_data"}) == null ? setting.nav_data : localData.get({key:"nav_data"}).split(','),
nav_data_cancel= localData.get({key:"nav_data_cancel"}) == null ? setting.nav_data_cancel : localData.get({key:"nav_data_cancel"}).split(','),
nav_bg = localData.get({key:"nav_bg"}) == null ? "navtype1" : localData.get({key:"nav_bg"}),
font_size = localData.get({key:"font_size"}) == null ?  "fonttype2" : localData.get({key:"font_size"}),
backStatus = 0;

//初始化设置信息
function initLocalInfo(){
	$(".main_nav")[0].className = "main_nav "+nav_bg;
	$("#detail")[0].className = font_size;
	$("#setBg dl dd,#setFontsize dl dd").removeClass("pop_current");
	$("#setBg dl dd").each(function(index, element) {
        if($(element).attr("data-info")==nav_bg){
			$(".set_list li").eq(0).find("span").html($(element).html());
			$(element).addClass("pop_current");
		}
    });
	$("#setFontsize dl dd").each(function(index, element) {
        if($(element).attr("data-info")==font_size){
			$(".set_list li").eq(1).find("span").html($(element).html());
			$(element).addClass("pop_current");
		}
    });
	
	$(".set_list li").click(function(){
		var id = $(this).attr("data-name");
		$("#"+id).show();
	});	
	
	$(".close_pop").click(function(){
		$(".pop").hide();	
	});
		
	$("#setBg dl dd").click(function(){
		var info = $(this).attr("data-info");
		var txt = $(this).html();
		$(".main_nav")[0].className = "main_nav "+info;
		$(".set_list li").eq(0).find("span").html(txt);
		localData.set({key:"nav_bg",value:info});
		$(".pop").hide();
		$("#setBg dl dd").removeClass("pop_current");
		$(this).addClass("pop_current");
		
	});
	
	$("#setFontsize dl dd").click(function(){
		var info = $(this).attr("data-info");
		var txt = $(this).html();
		$("#detail")[0].className = info;
		$(".set_list li").eq(1).find("span").html(txt);
		localData.set({key:"font_size",value:info});
		$(".pop").hide();
		$("#setFontsize dl dd").removeClass("pop_current");
		$(this).addClass("pop_current");
	});
	
	$("#clearBuffer dl dd").click(function(){
		localData.remove({key:"nav_data"});	
		localData.remove({key:"nav_data_cancel"});	
		localData.remove({key:"font_size"});
		localData.remove({key:"nav_bg"});
		window.location.reload();	
	});
}

/**
 * 数据模板
 * @param {String} tpl [html字符串，模板格式：#{id} ]
 * @param {Object} stub [自定义方法集，返回需要进行替换的字符串]
 * @param {Object} data [json数据]
 * @return {String}
 * @usage
 *		formatData(tpl, stub, data)
 * @e.g.
 	var liTpl = '<li style="width:#{liWidth}px">\
					<a target="_blank" href="#{monitor}" style="width:#{liWidth}px">\
						<span class="logo" style="width:#{liWidth}px"></span>\
						<span class="txt" style="width:#{liWidth}px">#{ename}</span>\
					</a>\
				 </li>';
	var data = {
		liWidth: 73,
		name: "宝马",
		src: "http://d1.sina.com.cn/zhuyan/auto/haopin/201201/bmw.jpg",
		monitor: "http://www.sina.com.cn/",
		wbId: "1698264705",
		fullName: "宝马中国",
		mointorPrefix: "",
		gzmonitorPrefix: ""
	}
	var ename = function(){return 'BMW'};
	alert(formatData(liTpl, {"ename": ename}, data));
 */

function formatData(tpl, stub, data) {
	return tpl.replace(/#\{(.+?)\}/g, function (match, key) {
		var result = '',
			replacer = stub[key];
		if (typeof replacer === 'undefined') {
			replacer = key;
		}
		if('[object Function]' === Object.prototype.toString.call(replacer)){
			result = replacer(data);
		} else {
			result = data[replacer];
		}
		return ('undefined' === typeof result ? '' : result);
	});
}

//toast
function toast(txt){
	var toastNode;
	if($('#toast').length==0){
		$("body").append('<span id="toast"></span>');
	}
	toastNode = $('#toast');
	toastNode.html(txt);
	toastNode.addClass("toastAnimation");
	toastNode.css("margin-left","-"+ (toastNode.outerWidth(true)/2) +"px");
	toastNode.on("webkitAnimationStart",function(){
		toastNode.css("bottom","60px");
	});
	toastNode.on("webkitAnimationEnd",function(){
		toastNode.css("bottom","-100px");
		toastNode.removeClass("toastAnimation");
	});
}


//顶部导航初始化(联动list页wrap初始化)
function page_nav(){
	var i,len=nav_data.length,html='',pageHtml = '',isCur;
	for(i=0;i<len;i++){
		i!=0 ? isCur = "" : isCur = "current";
		html += formatData(tpl.navItem,{
			
		},{
			"num" : i,
			"isCur" : isCur,
			"nav_name" : nav_data[i],
			"nav_id" : setting["nav_id"][nav_data[i]]	
		});	
		pageHtml += formatData(tpl.swiperItem,{},{"item_num" : i});
	}
	html += '<span class="bar"></span>';
	$("#page_nav_con").html(html);
	$("#list_wrap").html(pageHtml);
		
	
	mySwiper1 = new Swiper('.nav_wrap', {
		pagination : '.pagination',
		paginationClickable : true,
		slidesPerView : 5
	});
	
	$("div[name='title']").each(function(index, el) {
		$(el).click(function(){
			goLocation(index);
			if($("#wrapper"+index+" .list_item").length==0){
				newsList(index,$(el).data("navid"));
			}
			var slidleft = $("#slide" + index).offset().left;
			$(".bar").offset({
				left : slidleft
			});
		});
	});
	
	$(".bar").css("width",$(".nav_wrap .swiper-slide").outerWidth(true)+"px");
	
	/*mySwiper2 = new Swiper('.sub_nav_wrap', {
		pagination : '.pagination',
		paginationClickable : true,
		slidesPerView : 5
	});*/
	
	$("#sub_nav_con .swiper-slide").on("click",function(){
		$("#sub_nav_con .swiper-slide .sub_title").removeClass("current");
		$(this).find(".sub_title").addClass("current");
	});
	
}

//设置导航current
function setNavCurrent(i) {
	$("div[name='title']").each(function(index, el) {
		if (index != i) {
			if ($(el).hasClass("current")) {
				$(el).removeClass("current");
			}
		} else {
			$(el).addClass("current");
		}
	});
}

//全屏切换
function goLocation(i){
	mySwiper.swipeTo(i, 300, function(){});
	setNavCurrent(i);
}

//页面切换初始化
function page_list(){
	mySwiper = new Swiper('.swiper-container', {
		pagination : '.pagination',
		paginationClickable : true
	});
	mySwiper.params.onSlideNext = function() {
		var index = mySwiper.activeIndex;
		mySwiper1.swipeTo(index, 300, function() {
			
		});
		var slidleft = $("#slide" + index).offset().left;
		$(".bar").offset({
					left : slidleft
				});
		setNavCurrent(index);
		
		if($("#wrapper"+index+" .list_item").length==0){
			//alert("navid:"+$("#slide"+index+" div").data("navid"));
			newsList(index,$("#slide"+index+" div").data("navid"));
		}
		// alert(slidleft);
	}
	mySwiper.params.onSlidePrev = function() {
		var index = mySwiper.activeIndex;
		mySwiper1.swipeTo(index, 300, function() {
				});
		var slidleft = $("#slide" + index).offset().left;
		$(".bar").offset({
					left : slidleft
				});
		setNavCurrent(index);
		if($("#wrapper"+index+" .list_item").length==0){
			newsList(index,$("#slide"+index+" div").data("navid"));
		}
	}
	
	//初始化第一页数据
	newsList(0,$("#slide0 div").data("navid"));
	
}

//list页列表展现
function newsList(id,navId){
	var page = 0;
	$("#wrapper"+id).html('<div id="scroll'+id+'"><div class="pullDown"><span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新</span></div><div class="list_con"><div class="loading_mask"></div></div><div class="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span></div></div>');
	//$("#YZHD_SUBMALL").val("APP;"+$("#slide" + id +" div.title").html());
	newsListData(id,navId);
	function newsListData(id,navId){
		$.ajax({
			type: "post",
			dataType: "json",
			timeout:5000,
			async:true,
			url: host+"/smappmsg/getAllNews?navId="+navId+"&userId="+userId+"&token="+token,
			data: {},
			complete :function(){$("#wrapper"+id+" .loading_mask").hide();},
			error:function(){
				$("#wrapper"+id+" .loading_mask")[0].className = "loading_failed";
				$("#wrapper"+id+" .loading_failed").click(function(){
					newsListData(id,navId);	
				});
			},
			success: function(jdata){
				
				//data = {"data":[{"data":[],"navId":32,"navName":"家电动态"},{"data":[],"navId":33,"navName":"竞品资讯"}],"status":"1"}
				var html = '',i=0,listImg;
				data = jdata["data"][page] ? jdata["data"][page]["data"] : jdata["data"];
				if(data.length>0){
					for(;i<data.length;i++){
						html += formatData(tpl.listItem,{
							"listImg": function(){
								return typeof(data[i].newsPic) == 'undefined' ? '' : formatData(tpl.listImg,{},{"imgurl" : data[i].newsPic});	
							}
						},{
							"newsid" : data[i].newsId,
							"title" : data[i].newsTitle,
							"from" : data[i].newsSource,
							"time" : data[i].newsTime
						});	
					}
					
					$("#wrapper"+id+" .list_con").html(html);
					detail();
					
					//下拉上拉回调
					mainConIscroll(id,function(myScroll){
						pullDownCallback(id,navId,myScroll);
					},function(myScroll){
						pullUpCallback(id,navId,myScroll);
					});
					
				}else{
					$("#wrapper"+id+" .list_con").html("该栏目暂时没有新闻");
				}
				
				
				
				
				
				function pullDownCallback(id,navId,myScroll){
					$.ajax({
						type: "post",
						dataType: "json",
						timeout:5000,
						async:true,
						url: host+"/smappmsg/getAllNews?navId="+navId+"&userId="+userId+"&token="+token,
						data: {},
						complete :function(){$("#wrapper"+id+" .loading_mask").hide();},
						error:function(){$("#wrapper"+id+" .loading_mask")[0].className = "loading_failed";},
						success: function(jdata){
							
							//data = {"data":[{"data":[],"navId":32,"navName":"家电动态"},{"data":[],"navId":33,"navName":"竞品资讯"}],"status":"1"}
							html = '',i=0,listImg;
							data = jdata["data"][0]["data"] || jdata["data"];
							for(;i<data.length;i++){
								html += formatData(tpl.listItem,{
									"listImg": function(){
										return typeof(data[i].newsPic) == 'undefined' ? '' : formatData(tpl.listImg,{},{"imgurl" : data[i].newsPic});	
									}
								},{
									"newsid" : data[i].newsId,
									"title" : data[i].newsTitle,
									"from" : data[i].newsSource,
									"time" : data[i].newsTime
								});	
							}
							
							$("#wrapper"+id+" .list_con").html(html);
							myScroll.refresh();	
							detail();
						}
					});
				}
				
				function pullUpCallback(id,navId,myScroll){
					if(++page<jdata["data"].length){
						$.ajax({
							type: "post",
							dataType: "json",
							timeout:5000,
							async:true,
							url: host+"/smappmsg/getAllNews?navId="+navId+"&userId="+userId+"&token="+token,
							data: {},
							complete :function(){$("#wrapper"+id+" .loading_mask").hide();},
							error:function(){$("#wrapper"+id+" .loading_mask")[0].className = "loading_failed";},
							success: function(jdata){
								
								//data = {"data":[{"data":[],"navId":32,"navName":"家电动态"},{"data":[],"navId":33,"navName":"竞品资讯"}],"status":"1"}
								html = '',i=0,listImg;
								data = jdata["data"][page]["data"];
								for(;i<data.length;i++){
									html += formatData(tpl.listItem,{
										"listImg": function(){
											return typeof(data[i].newsPic) == 'undefined' ? '' : formatData(tpl.listImg,{},{"imgurl" : data[i].newsPic});	
										}
									},{
										"newsid" : data[i].newsId,
										"title" : data[i].newsTitle,
										"from" : data[i].newsSource,
										"time" : data[i].newsTime
									});	
								}
								
								$("#wrapper"+id+" .list_con").append(html);
								myScroll.refresh();	
								detail();
							}
						});
					}else{
						toast("已经是最后一页");
						myScroll.refresh();		
					}
				}
				
			}
		});
	}
}

//详情数据展现
function detailData(newsId){
	$("#page_detail").show();
	$("#detail").css("background","url(images/loading.gif) no-repeat center");
	$("#detail").html('<div class="detail"><div class="loading_mask"></div></div>');
	detailDataLoad();
	function detailDataLoad(){	
		$.ajax({
			type: "post",
			dataType: "json",
			timeout:5000,
			async:true,
			url: host+"/smappmsg/getNews?newsId="+newsId+"&userId="+userId+"&token="+token,
			data: {},
			complete :function(){},
			error:function(){
				$("#detail").html('<div class="detail"><div class="loading_failed"></div></div>');
				$("#detail .loading_failed").click(function(){
					detailDataLoad();	
				});
			},
			success: function(data){
				
				//data = {"data":[{"data":[],"newsAbstract":"","newsContent":"","newsId":"AED46A8CCEDEC3268491DCB657842C59","newsSource":"电镀人才网","newsTime":"2014-05-07 10:55:09","newsTitle":"别忽略了员工心理援助","newsUrl":"http://www.platinghr.com/News/Info/9/5367.html"}],"status":"1"}
			
				var html = '';
				data = data["data"][0];
				html += formatData(tpl.detail,{
			
				},{
					"title" : data.newsTitle,
					"from" : data.newsSource,
					"time" : data.newsTime,
					"content" : data.newsContent
				});	
				
				$(".detail").html(html);
				$(".share_btn").attr({"data-content":data.newsAbstract,"data-newsid":data.newsId});
				$("#topic_list_btn,#topic_submit,#topic_submit2,#collect_btn").attr({"data-newsid":newsId});
				$("#topic_list_btn").html(data.commentCount);
				$("#collect_btn").attr({"data-collecttype":data.isCollect == 0 ? 1 : 2});	
				$("#collect_btn")[0].className = (data.isCollect == 0 ? 'fr collectNews_btn' : 'fr collectNews_btn_selected');
				
				topic_input();
				topic_list();
				share();
				topic_submit();
				collect();
				$("#detail").css("height",($(".page_item").outerHeight(true)-95)+"px");
				var myScroll = new iScroll('detail',{hideScrollbar:true,vScrollbar:false});
				$(".detail_con img").load(function(){
					$("#detail > div:eq(1)").remove();
					myScroll.refresh();
				});
				//alert(getImgSrc(data.newsContent).length);
				
				//setTimeout(function(){new iScroll('detail');},2000);
			}
		});
	}
	
}

//list点击详情页展现
function detail(){
	$(".list_item").click(function(){
		var newsId = $(this).attr("data-newsid");
		$(this).addClass("read");
		detailData(newsId);
		backStatus = 2;	
	});
	
	$("#page_detail_close").click(function(){
		$("#topic_before").show();
		$("#topic_after").hide();
		$("#topic_input").val('').blur();	
		$("#collect_btn").removeAttr("data-newsid").removeAttr("data-collecttype");
		$("#collect_btn").removeClass("collectNews_btn_selected").addClass("collectNews_btn");
		backStatus = 0;	
	});
	
}

//分享
function share(){
	var btn = $(".share_btn");
	
	
	btn.click(function(){
		var content = btn.attr("data-content");
		var newsId = btn.attr("data-newsid");
		if(navigator.userAgent.indexOf('iPhone') != -1){
			document.location="objc://share:/"+content+' http://27.223.70.67:9081/haieryuntu/index.html?newsId='+newsId;
		}else{
			if(window.xlzgweb && typeof(window.xlzgweb.share)=="function"){
				window.xlzgweb.share(content+' http://27.223.70.67:9081/haieryuntu/index.html?newsId='+newsId);
			}else{
				toast("不支持分享");	
			}
		}
		
		if(newsId!='' && token!=''){
			$.ajax({
				type: "post",
				dataType: "json",
				timeout:5000,
				async:true,
				url: host+"/appmsg/addShare?newsId="+newsId+"&token="+token+"&userId="+userId,
				data: {},
				complete :function(){},
				error:function(){toast("分享记录失败")},
				success: function(data){
					if(data.status == 1){
						toast("分享记录成功");
					}else{
						toast("分享记录失败");
					}
					
				}
			});
		}
	});
}

//收藏按钮
function collect(){
	$("#collect_btn").click(function(){
		var newsId = $(this).attr("data-newsid");
		var type = parseInt($(this).attr("data-collecttype"));
		if(userId==''||token==''){
			currentFn = detailData;
			currentNewsId = newsId;
			toast("请登录");
			setTimeout(function(){
				$("#page_login").show();	
			},1000);
		}else{
			$.ajax({
				type: "post",
				dataType: "json",
				timeout:5000,
				async:true,
				url: host+"/appmsg/newsCollect?newsId="+newsId+"&token="+token+"&userId="+userId+"&type="+type,
				data: {},
				complete :function(){},
				error:function(){toast("收藏失败")},
				success: function(data){
					if(data.status == 1){
						if(type==1){
							toast("收藏成功");
							$("#collect_btn").removeClass("collectNews_btn").addClass("collectNews_btn_selected");
							$("#collect_btn").attr("data-collecttype",2);	
						}else{
							toast("取消收藏");
							$("#collect_btn").removeClass("collectNews_btn_selected").addClass("collectNews_btn");
							$("#collect_btn").attr("data-collecttype",1);		
						}
					}
					
				}
			});
		}
	});
}

//发布评论
function topic_submit(){
	$("#topic_submit").click(function(){
		var content = $("#topic_input").val();
		var newsId = $(this).attr("data-newsid");
		if(content==''){
			toast("请输入内容");
		}else if(userId==''||token==''){
			toast("请登录");
			setTimeout(function(){
				$("#page_login").show();	
			},1000);
		}else{
			$.ajax({
				type: "post",
				dataType: "json",
				timeout:5000,
				async:true,
				url: host+"/smappmsg/sendComment?newsId="+newsId+"&userId="+userId+"&token="+token+"&content="+encodeURIComponent(content),
				data: {},
				complete :function(){},
				error:function(){toast("评论失败")},
				success: function(data){
					if(data.status==1){
						toast("评论成功");
						$("#topic_before").show();
						$("#topic_after").hide();
						$("#topic_input").val('').blur();
					}else{
						toast(data.msg);
					}
				}
			});
		}
	});
	
	$("#topic_submit2").click(function(){
		var content = $("#topic_input2").val();
		var newsId = $(this).attr("data-newsid");
		if(content==''){
			toast("请输入内容");
		}else if(userId==''||token==''){
			toast("请登录");
			setTimeout(function(){
				$("#page_login").show();	
			},1000);
		}else{
			$.ajax({
				type: "post",
				dataType: "json",
				timeout:5000,
				async:true,
				url: host+"/smappmsg/sendComment?newsId="+newsId+"&userId="+userId+"&token="+token+"&content="+encodeURIComponent(content),
				data: {},
				complete :function(){},
				error:function(){toast("评论失败")},
				success: function(data){
					if(data.status==1){
						toast("评论成功");
						$("#topic_before2").show();
						$("#topic_after2").hide();
						$("#topic_input2").val('').blur();	
						
						$.ajax({
							type: "post",
							dataType: "json",
							timeout:5000,
							async:true,
							url: host+"/smappmsg/getComments?newsId="+newsId+"&userId="+userId+"&token="+token+"&startNum=0&N=10",
							data: {},
							complete :function(){$("#page_topic .loading_mask").hide();},
							error:function(){$("#page_topic .loading_mask")[0].className = "loading_failed";},
							success: function(data){
								if(data.status==1){
									var html = '',i=0,len;
									data = data["data"];
									len = data.length;
									for(;i<len;i++){
										html += formatData(tpl.topicListItem,{},{
											"username" : data[i].userName,
											"createtime" : data[i].time,
											"content" : data[i].content
										});	
									}
									$("#topic_list").html('<div class="topic_list"><ul></ul></div>').css("height",($(".page_item").outerHeight(true)-188)+"px");
									$("#topic_list ul").html(html);
									var myscroll = new iScroll('topic_list',{hideScrollbar : true});
								}
							}
						});
						
						
					}else{
						toast(data.msg);
					}
				}
			});
		}
	});
}

//详情页评论input展现切换
function topic_input(){
	$("#topic_input_btn").click(function(){
		$("#topic_before").hide();
		$("#topic_after").show();
		$("#topic_input").focus();	
		backStatus = 3;
	});
	$("#topic_cancel").click(function(){
		$("#topic_before").show();
		$("#topic_after").hide();
		$("#topic_input").val('').blur();
		backStatus = 2;		
	});
	
}

//评论列表页展现
function topic_list(){
	$("#topic_list_btn").click(function(){
		var newsId = $(this).attr("data-newsid");
		var topic_con_html = formatData(tpl.topic,{},{
			"title" : $(".detail h1").html(),
			"from" : $(".detail .detail_info .fl").html(),
			"time" : $(".detail .detail_info .fr").html()
		});	
		$(".topic_con").html(topic_con_html);
		$("#page_topic").show();
		
		$.ajax({
            type: "post",
            dataType: "json",
			timeout:5000,
			async:true,
            url: host+"/smappmsg/getComments?newsId="+newsId+"&userId="+userId+"&token="+token+"&startNum=0&N=10",
            data: {},
            complete :function(){$("#page_topic .loading_mask").hide();},
			error:function(){$("#page_topic .loading_mask")[0].className = "loading_failed";},
            success: function(data){
				
				//data = {"data":[{"commentId":653,"content":"[委屈]","data":[{"content":"3","time":"2014-05-05 16:46:57.0","userName":"徐茂生"},{"content":"2","time":"2014-05-05 16:46:55.0","userName":"徐茂生"}],"time":"2014-05-05 16:46:46.0","userName":"徐茂生"},{"commentId":658,"content":"[草泥马]","data":[{"content":"456","time":"2014-05-07 14:22:31.0","userName":"test"},{"content":"456","time":"2014-05-07 14:22:31.0","userName":"test"},{"content":"456","time":"2014-05-07 14:22:31.0","userName":"test"},{"content":"123","time":"2014-05-07 14:22:25.0","userName":"test"},{"content":"123","time":"2014-05-07 14:22:25.0","userName":"test"}],"time":"2014-05-07 14:21:37.0","userName":"test"}],"status":"1"}
				if(data.status==1){
					var html = '',i=0,len;
					data = data["data"];
					len = data.length;
					if(len==0){
						$(".topic_list").html('这条新闻还没有评论，快去评论吧');
						return false;	
					}
					for(;i<len;i++){
						html += formatData(tpl.topicListItem,{},{
							"username" : data[i].userName,
							"createtime" : data[i].time,
							"content" : data[i].content
						});	
					}
					$(".topic_list").html('<ul></ul>');
					$(".topic_list ul").html(html);
					$("#topic_list").css("height",($(".page_item").outerHeight(true)-188)+"px");
					var myscroll = new iScroll('topic_list',{hideScrollbar : true});
				}
			}
        });
		
		
		topic_list_input();
	});
	$("#topic_list_close,#topic_back").click(function(){
		$("#page_topic").hide();
		$(".topic_con").html('');	
		$("#topic_before2").show();
		$("#topic_after2").hide();
		$("#topic_input2").val('').blur();	
	});
}

//评论列表页评论input展现切换
function topic_list_input(){
	$("#topic_input_btn2").click(function(){
		$("#topic_before2").hide();
		$("#topic_after2").show();
		$("#topic_input2").focus();	
	});
	$("#topic_cancel2").click(function(){
		$("#topic_before2").show();
		$("#topic_after2").hide();
		$("#topic_input2").val('').blur();		
	});
}


//订阅频道
function subscribe(){
	
	$("#subscribe_btn").click(function(){
		$("#chanel_subscribe").show();	
	});
	
	var bBtn = true;
	
	function renderSubscribeList(){
		var i,len=nav_data.length,html='',len_cancel=nav_data_cancel.length,html_cancel='';
		for(i=0;i<len;i++){
			html += formatData(tpl.navSubscribe,{
				
			},{
				"nav_name" : nav_data[i]	
			});	
		}
		for(i=0;i<len_cancel;i++){
			html_cancel += formatData(tpl.navSubscribe,{
				
			},{
				"nav_name" : nav_data_cancel[i]	
			});	
		}
		$("#chanel_subscribe_selected").html(html);
		$("#chanel_subscribe_cancel").html(html_cancel);
		
	}
	
	
	$("#chanel_subscribe_selected").on("click","li",function(){
		//$("#chanel_subscribe_selected li").unbind("click");
		if(nav_data.length>1 && bBtn){
			
			bBtn = false;
			var nav_name = $(this).find("span").html();
			nav_data.splice($.inArray(nav_name,nav_data),1);
			nav_data_cancel.push(nav_name);
			console.log(nav_data);
			console.log(nav_data_cancel);
			setTimeout(function(){
				renderSubscribeList();
				bBtn = true;
			},200);
		}
	});
	
	$("#chanel_subscribe_cancel").on("click","li",function(){
		var nav_name = $(this).find("span").html();
		nav_data_cancel.splice($.inArray(nav_name,nav_data_cancel),1);
		nav_data.push(nav_name);
		console.log(nav_data);
		console.log(nav_data_cancel);
		setTimeout(function(){
			renderSubscribeList();
		},200);
		
	});
	
	$('#chanel_subscribe_selected').sortable().on('sortupdate', function(){
		nav_data.length = 0;
		var i = 0,len = $("#chanel_subscribe_selected li").length;
		for(;i<len;i++){
			nav_data.push($("#chanel_subscribe_selected li").eq(i).find("span").html());	
		}
		console.log(nav_data);
		renderSubscribeList();		
	});
	$('#chanel_subscribe_selected').disableSelection();
	
	
	renderSubscribeList();
	chanel_subscribe_close();
	
	
	
	
	
	
	
	
	
}

//订阅频道返回按钮功能
function chanel_subscribe_close(){
	$("#chanel_subscribe_close").click(function(){
		page_nav();
		page_list();
		detail();
		$("#chanel_subscribe").hide();
		//nav数组写入localStorage
		localData.set({key:"nav_data",value:nav_data});
		localData.set({key:"nav_data_cancel",value:nav_data_cancel});
		window.location.reload();		
	});
}

//主导航
function main_nav(){
	$(".nav_btn").click(function(){
		if(navSwitch){
			$(".main_nav").offset({left : 0});
			$("#page_index").offset({left : 200});
			$(".nav_mask").show();
			navSwitch = false;
			backStatus = 1;
		}else{
			$(".main_nav").offset({left : -200});
			$("#page_index").offset({left : 0});	
			$(".nav_mask").hide();
			navSwitch = true;
			backStatus = 0;
		}
	});	
	
	$(".nav_mask,.main_nav_list li,#login_info").on("click",function(){
		if(navSwitch==false && !$(this).hasClass("quit_btn")){
			$(".main_nav").offset({left : -200});
			$("#page_index").offset({left : 0});	
			$(".nav_mask").hide();
			navSwitch = true;
			backStatus = 0;	
		}
	});
	
	$(".main_nav_list li").on("click",function(){
		var name = $(this).data("name");
		
		$("#page_"+name).show();
		
		if(name=="collect"){
			if(checklogin()){
				page_collect();
			}else{
				currentFn = page_collect;	
			}
		}else if(name=="push"){
			page_push();
		}else if(name=="history"){
			if(checklogin()){
				page_history();
			}else{
				currentFn = page_history;	
			}
		}
		
		backStatus = 4;	
		
	});
	
	
	
}

//判断是否登录
function checklogin(){
	if(userId==''||token==''){
		toast("请登录");
		setTimeout(function(){
			$(".main_nav").offset({left : -200});
			$("#page_index").offset({left : 0});	
			$(".nav_mask").hide();
			navSwitch = true;
			$("#page_login").show();	
		},1000);
		return false;
	}else{
		return true;	
	}
}

//页面返回按钮
function backBtn(){
	$(".back_btn").click(function(){
		
		$(this).parent().parent().parent(".page_item").offset({left : -$(document).outerWidth(true)}).fadeOut();
		var self = this;
		setTimeout(function(){
			$(self).parent().parent().parent(".page_item").css("left","0px");	
		},500);	
	});	
}

//登录注册页展现
function page_login_register(){
	$("#login_info").click(function(){
		$("#page_login").show();	
	});
	
	$("#register_page_btn").click(function(){
		$("#page_register").show();	
	});	
	
	if(loginUserName!=''){
		$("#login_info").html('<h2><img src="images/login.png" width="75" height="75" /></h2><h3>'+loginUserName+'</h3>');
		$("#page_login").hide();
		$(".quit_btn").show();	
	}
	
	
	//登录
	$("#login_submit").click(function(){
		var username = $("#login_box .username").val();
		var password = $("#login_box .password").val();
		$.ajax({
            type: "post",
            dataType: "json",
			timeout:5000,
			async:true,
            url: host+"/appmsg/userLogin",
            data: {"userName":username,"userPass":password},
            complete :function(){},
			error:function(){toast("登录失败")},
            success: function(data){
				var status = data.loginState;
				if(status == 1){
					toast("登录成功");
					userId = data.userId;
					token = data.token;
					localData.set({key:"userId",value:data.userId});
					localData.set({key:"token",value:data.token});
					localData.set({key:"username",value:username});
					$("#login_info").html('<h2><img src="images/login.png" width="75" height="75"></h2><h3>'+username+'</h3>');
					$("#page_login").hide();
					$(".quit_btn").show();
					navSwitch = true;
					if(currentFn != null){
						currentNewsId == '' ? currentFn() : currentFn(currentNewsId);
						currentFn = null;
					}
				}else if(status == 2){
					toast("用户不存在");
				}else if(status == 3){
					toast("密码不正确");
				}
				
			}
        });	
	});
	
	//注册
	$("#register_submit").click(function(){
		var username = $("#register_box .username").val();
		var password = $("#register_box .password").val();
		var password_again = $("#register_box .password_again").val();
		var email = $("#register_box .email").val();
		if(password!=password_again){
			toast("两次密码不一致");
			return false;	
		}
		$.ajax({
            type: "post",
            dataType: "json",
			timeout:5000,
			async:true,
            url: host+"/appmsg/userRegistor",
            data: {"userName":username,"userPass":password,"email":email},
            complete :function(){},
			error:function(){toast("注册失败")},
            success: function(data){
				var status = data.loginState;
				if(status == 1){
					toast("注册成功");
					$("#page_register").hide();
				}
				
			}
        });	
	});
	
	//退出
	$(".quit_btn").click(function(){
		toast("退出成功");
		userId = '';
		token = '';
		$("#login_info").html("点击登录");
		$(".quit_btn").hide();
		localData.remove({key:"userId"});
		localData.remove({key:"token"});
		localData.remove({key:"username"});
	});
	
}

//搜索
function page_search(){
	$("#search_input").focus();
	
	$("#search_btn").click(function(){
		$("#search_list_box").html('<div class="search_list_wrap"><ul id="search_list"><div class="loading_mask"></div></ul><div class="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span></div></div>');
		var keyword = $("#search_input").val();	
		var page = 1;
		if(keyword!=""){
			backStatus = 5;
			$("#page_search_list").show();
			$("#keyword").html(keyword);
			$("#search_list").html('<div class="loading_mask"></div>');
			$.ajax({
				type: "post",
				dataType: "json",
				timeout:5000,
				async:true,
				url: host+"/appmsg/searchMessageByKey?page=1&pageNum=10&token="+token+"&userId="+userId+"&key="+keyword,
				data: {},
				complete :function(){$("#page_search_list .loading_mask").hide();},
				error:function(){$("#page_search_list .loading_mask")[0].className = "loading_failed";},
				success: function(data){
					//{"rows":[{"msg_abstract":"","msg_id":"9F9B6356C15799BAEFA6C276B8328BE6","msg_pic":"http://img3.cache.netease.com/photo/0213/2013-08-12/962RDOQN6LT60213.jpg","msg_title":"历城楼盘钜惠开抢 交五千最高享10万特惠"}],"total":1}
					var html = '';
					if(data.total == 0){
						$("#search_list").html("<span>未搜索到结果</span>");
						return false;
					}
					for(var i=0;i<data.rows.length;i++){
						html += formatData(tpl.defaultListItem,{
					
						},{
							"newsId" : data.rows[i].msg_id,
							"title" : data.rows[i].msg_title,
							"from" : data.rows[i].msg_source,
							"time" : data.rows[i].msg_time
						});	
					}
					
					$("#search_list").html(html);
					
					defautIscroll("search_list_box",83,function(myScroll){
						page++;
						$.ajax({
							type: "post",
							dataType: "json",
							timeout:5000,
							async:true,
							url: host+"/appmsg/searchMessageByKey?page="+page+"&pageNum=10&token="+token+"&userId="+userId+"&key="+keyword,
							data: {},
							complete :function(){},
							error:function(){},
							success: function(data){
								html = '';
								for(var i=0;i<data.rows.length;i++){
									html += formatData(tpl.defaultListItem,{
								
									},{
										"newsId" : data.rows[i].msg_id,
										"title" : data.rows[i].msg_title,
										"from" : data.rows[i].msg_source,
										"time" : data.rows[i].msg_time
									});	
								}
								$("#search_list").append(html);
								myScroll.refresh();
							}
						});
					});
				}
			});
		}else{
			toast("请输入关键字");	
		}
		
		
	});	

	$("#search_list_box").on("click","li",function(){
		var newsId = $(this).attr("data-newsid");
		detailData(newsId);	
		backStatus = 6;
	});
	
	
}





//收藏
function page_collect(){
	$("#collect_list").html('<div class="loading_mask"></div>');
	$.ajax({
		type: "post",
		dataType: "json",
		timeout:5000,
		async:true,
		url: host+"/appmsg/getNewsCollects?page=1&pageNum=10&token="+token+"&userId="+userId,
		data: {},
		complete :function(){$("#page_collect .loading_mask").hide();},
		error:function(){$("#page_collect .loading_mask")[0].className = "loading_failed";},
		success: function(data){
			//{"news":[{"newsAbstract":"腾讯科技讯 8月16日，美国非盈利性监督机构“公平劳工协会”（以下简称FLA）发布的报告显示，苹果代工合作生产商在中国运营的两家工厂存在一系列问题，包括工作时间过长、薪资过低、健康状况不佳，安全措施不足等。FLA去年检查的广达工厂包括在我们今年2月份发布的2014年供应商责任报告里，我们自己的专家曾对这些工厂进行了16次检查，最近一次是在上个月。","newsId":"CFD533986014FE11EF2066633817037B","newsPic":"http://img1.gtimg.com/tech/pics/hv1/28/183/1681/109353718.jpg","newsTitle":"苹果两家代工厂又曝超时工作薪资过低等问题"}]}
			var html = '',len = data.news.length;
			var page = 1;
			if(len==0){
				$("#collect_list").html("您还没有收藏");
				return false;
			}
			for(var i=0;i<len;i++){
				html += formatData(tpl.defaultListItem,{
			
				},{
					"title" : data.news[i].newsTitle,
					"from" : data.news[i].newsSource,
					"time" : data.news[i].newsTime,
					"newsId" : data.news[i].newsId
				});	
			}
			
			$("#collect_list").html(html);
			
			defautIscroll("collect_list_box",42,function(myScroll){
				page++;
				$.ajax({
					type: "post",
					dataType: "json",
					timeout:5000,
					async:true,
					url: host+"/appmsg/getNewsCollects?page="+page+"&pageNum=10&token="+token+"&userId="+userId,
					data: {},
					complete :function(){},
					error:function(){},
					success: function(data){
						html = '',len = data.news.length;
						for(var i=0;i<len;i++){
							html += formatData(tpl.defaultListItem,{
						
							},{
								"title" : data.news[i].newsTitle,
								"from" : data.news[i].newsSource,
								"time" : data.news[i].newsTime,
								"newsId" : data.news[i].newsId
							});	
						}
						$("#collect_list").append(html);
						myScroll.refresh();
					}
				});
			});
		}
	});
	
	$("#collect_list").on("click","li",function(){
		var newsId = $(this).attr("data-newsid");
		detailData(newsId);	
		backStatus = 7;	
	});
}

//推送
function page_push(){
	$("#push_list").html('<div class="loading_mask"></div>');
	$.ajax({
		type: "post",
		dataType: "json",
		timeout:5000,
		async:true,
		url: host+"/appmsg/getNewNews",
		data: {},
		complete :function(){$("#page_push .loading_mask").hide();},
		error:function(){$("#page_push .loading_mask")[0].className = "loading_failed";},
		success: function(data){
			//{"news":[{"newsAbstract":"腾讯科技讯 8月16日，美国非盈利性监督机构“公平劳工协会”（以下简称FLA）发布的报告显示，苹果代工合作生产商在中国运营的两家工厂存在一系列问题，包括工作时间过长、薪资过低、健康状况不佳，安全措施不足等。FLA去年检查的广达工厂包括在我们今年2月份发布的2014年供应商责任报告里，我们自己的专家曾对这些工厂进行了16次检查，最近一次是在上个月。","newsId":"CFD533986014FE11EF2066633817037B","newsPic":"http://img1.gtimg.com/tech/pics/hv1/28/183/1681/109353718.jpg","newsTitle":"苹果两家代工厂又曝超时工作薪资过低等问题"}]}
			var html = '',len = data.rows.length;
			var page = 1;
			if(len==0){
				$("#push_list").html("还没有推送的信息");
				return false;
			}
			for(var i=0;i<len;i++){
				html += formatData(tpl.defaultListItem,{
			
				},{
					"title" : data.rows[i].title,
					"from" : data.rows[i].news_source,
					"time" : data.rows[i].msg_time,
					"newsId" : data.rows[i].news_id
				});	
			}
			
			$("#push_list").html(html);
			$("#push_list_box").css("height",($(".page_item").outerHeight(true)-42)+"px");
			var myscroll = new iScroll('push_list_box',{hideScrollbar : true});
			
		}
	});
	
	$("#push_list").on("click","li",function(){
		var newsId = $(this).attr("data-newsid");
		detailData(newsId);	
		backStatus = 7;	
	});
}
//历史
function page_history(){
	var 
	tabLi = $(".history_tab ul li"),
	type,
	url,
	page;
	
	tabLi.on("click",function(){
		page = 1;
		tabLi.removeClass("active");
		$(this).addClass("active");
		type = parseInt($(this).attr("data-type"));
		switch(type){
			case 1:
				url = host+'/appmsg/myShare?userId='+userId+'&token='+token+'&page='+page+'&pageNum=10';
			case 2:
				url = host+'/appmsg/userReaded?userId='+userId+'&token='+token+'&page='+page+'&pageNum=10';
			case 3:
				url = host+'/appmsg/myComment?userId='+userId+'&token='+token+'&page='+page+'&pageNum=10';
		}
		history_data(url);
	});
	
	history_data(host+'/appmsg/myShare?userId='+userId+'&token='+token+'&page=1&pageNum=10');
	
	function history_data(url){
		$("#history_list").html('<div class="loading_mask"></div>');
		$.ajax({
			type: "post",
			dataType: "json",
			timeout:5000,
			async:true,
			url: url,
			data: {},
			complete :function(){$("#page_history .loading_mask").hide();},
			error:function(){$("#page_history .loading_mask")[0].className = "loading_failed";},
			success: function(data){
				//{"news":[{"newsAbstract":"腾讯科技讯 8月16日，美国非盈利性监督机构“公平劳工协会”（以下简称FLA）发布的报告显示，苹果代工合作生产商在中国运营的两家工厂存在一系列问题，包括工作时间过长、薪资过低、健康状况不佳，安全措施不足等。FLA去年检查的广达工厂包括在我们今年2月份发布的2014年供应商责任报告里，我们自己的专家曾对这些工厂进行了16次检查，最近一次是在上个月。","newsId":"CFD533986014FE11EF2066633817037B","newsPic":"http://img1.gtimg.com/tech/pics/hv1/28/183/1681/109353718.jpg","newsTitle":"苹果两家代工厂又曝超时工作薪资过低等问题"}]}
				var html = '',len = data.length;
				var page = 1;
				if(len==0){
					$("#history_list").html("还没有相关的信息");
					return false;
				}
				for(var i=0;i<len;i++){
					html += formatData(tpl.defaultListItem,{
				
					},{
						"title" : data[i].msg_title,
						"from" : data[i].msg_source,
						"time" : data[i].msg_date,
						"newsId" : data[i].msg_id
					});	
				}
				
				$("#history_list").html(html);
				defautIscroll("history_list_box",83,function(myScroll){
					page++;
					$.ajax({
						type: "post",
						dataType: "json",
						timeout:5000,
						async:true,
						url: url,
						data: {},
						complete :function(){},
						error:function(){},
						success: function(data){
							html = '';
							for(var i=0;i<data.length;i++){
								html += formatData(tpl.defaultListItem,{
							
								},{
									"title" : data[i].msg_title,
									"from" : data[i].msg_source,
									"time" : data[i].msg_date,
									"newsId" : data[i].msg_id
								});	
							}
							$("#history_list").append(html);
							myScroll.refresh();
						}
					});
				});
				
			}
		});
		
		$("#history_list").on("click","li",function(){
			var newsId = $(this).attr("data-newsid");
			detailData(newsId);	
			backStatus = 7;	
		});
	}
}


//iscroll和下拉加载更多
function defautIscroll(id,h,pullUpCallback){
	var myScroll,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	function pullUpAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			if(typeof(pullUpCallback)=="function"){
				pullUpCallback(myScroll);
			}
			
			//myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
	}
	
	function loaded(id) {
		pullUpEl = document.querySelector('#'+id+' .pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		$(pullUpEl).css("visibility","visible");
		setTimeout(function(){
			$("#"+id).css("height",($(".page_item").outerHeight(true)-h)+"px");
			myScroll.refresh();	
		},200);
		
		myScroll = new iScroll(id, {
			useTransition: true,
			hideScrollbar : true,
			onRefresh: function () {
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = 'pullUp';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollMove: function () {
				if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载更多';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = 'pullUp';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';				
					pullUpAction();	// Execute custom function (ajax call?)
				}
			}
		});
		
	}
	loaded(id);
}


//iscroll和下拉、上拉刷新
function mainConIscroll(id,pullDownCallback,pullUpCallback){
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	function pullDownAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			if(typeof(pullDownCallback)=="function"){
				pullDownCallback(myScroll);
			}
			myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
	}
	
	function pullUpAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			if(typeof(pullUpCallback)=="function"){
				pullUpCallback(myScroll);
			}
			
			//myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
	}
	
	function loaded(id) {
		pullDownEl = document.querySelector('#wrapper'+id+' .pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.querySelector('#wrapper'+id+' .pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		$(pullDownEl).css("visibility","visible");
		$(pullUpEl).css("visibility","visible");
		setTimeout(function(){
			$(".swiper-container .swiper-wrapper,.swiper-container .swiper-slide").css("height",($(".page_item").outerHeight(true)-83)+"px");
			
			myScroll.refresh();	
		},200);
		
		myScroll = new iScroll("wrapper"+id, {
			useTransition: true,
			topOffset: pullDownOffset,
			hideScrollbar : true,
			onRefresh: function () {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = 'pullDown';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = 'pullUp';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放更新';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = 'pullDown';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载更多';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = 'pullUp';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';				
					pullDownAction();	// Execute custom function (ajax call?)
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';				
					pullUpAction();	// Execute custom function (ajax call?)
				}
			}
		});
		
		setTimeout(function () { 
			document.getElementById("wrapper"+id).style.left = '0';
		}, 800);
		
		
	}
	loaded(id);
}

//物理back键
function backAndroidBtn(){
	switch(backStatus){
		case 0 :
			window.xlzgweb.quit();
			return;
		
		//收回nav
		case 1 : 
			$(".main_nav").offset({left : -200});
			$("#page_index").offset({left : 0});	
			$(".nav_mask").hide();
			navSwitch = true;
			backStatus = 0;	
			return;
		//收回评论
		case 2 : 
			$("#topic_before").show();
			$("#topic_after").hide();
			$("#topic_input").val('').blur();	
			$("#collect_btn").removeAttr("data-newsid").removeAttr("data-collecttype");
			$("#collect_btn").removeClass("collectNews_btn_selected").addClass("collectNews_btn");
			$("#page_detail").offset({left : -$(document).outerWidth(true)}).fadeOut();
			setTimeout(function(){
				$("#page_detail").css("left","0px");	
			},500);
			backStatus = 0;	
			return;
		//收回评论发布框
		case 3 :
			$("#topic_before").show();
			$("#topic_after").hide();
			$("#topic_input").val('').blur();
			backStatus = 2;
			return;
		//左侧菜单点开功能页收回	
		case 4 : 
			$("#page_search").hide();
			$("#page_collect").hide();
			$("#page_push").hide();
			$("#page_history").hide();
			$("#search_input").val('');
			backStatus = 0;
			return;
		//收回搜索结果
		case 5 :
			$("#page_search_list").hide();
			backStatus = 4;
			return; 
		//返回到搜索结果
		case 6 : 
			$("#topic_before").show();
			$("#topic_after").hide();
			$("#topic_input").val('').blur();	
			$("#collect_btn").removeAttr("data-newsid").removeAttr("data-collecttype");
			$("#collect_btn").removeClass("collectNews_btn_selected").addClass("collectNews_btn");
			$("#page_detail").offset({left : -$(document).outerWidth(true)}).fadeOut();
			setTimeout(function(){
				$("#page_detail").css("left","0px");	
			},500);
			
			backStatus = 5;
			return;
		//返回到除搜索以外的左侧菜单功能页
		case 7 : 
			$("#topic_before").show();
			$("#topic_after").hide();
			$("#topic_input").val('').blur();	
			$("#collect_btn").removeAttr("data-newsid").removeAttr("data-collecttype");
			$("#collect_btn").removeClass("collectNews_btn_selected").addClass("collectNews_btn");
			$("#page_detail").offset({left : -$(document).outerWidth(true)}).fadeOut();
			setTimeout(function(){
				$("#page_detail").css("left","0px");	
			},500);
			backStatus = 4;	
			return;
	}
}

//根据url进行详情页加载
function pushDetail(){
	var newsId = window.location.search.split('=')[1];
	if(newsId){
		detailData(newsId);	
	}
}

$(function(){
	initLocalInfo();
	page_nav();
	page_list();
	subscribe();
	main_nav();
	backBtn();
	page_login_register();
	page_search();
	pushDetail();
});

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
