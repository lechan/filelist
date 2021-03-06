////配置conf
(function(){
	var global = LENOVO.conf.global;
	var __device = 'amp';
	if(global){
		////alert(window.lestore +'   ' +window.App5+'    '+ window.newxb);
		if(global.getPackageName){
			LENOVO.conf.device = global.getPackageName().indexOf('pad') === -1 ? 'phone' : 'pad';
		}else{
			LENOVO.conf.device = __device;
		}
		
		LENOVO.conf.clientID = global.getClientID ? global.getClientID() : global.getClientId();
	}else{
		LENOVO.conf.device = __device;
	}
})();


/**
 * 倒计时
 * @param {String} id [倒计时容器id]
 * @param {Function} fn [回调函数]
 * @usage
 *		LENOVO.com.countdown.init(id,fn)
 */
LENOVO.namespace('LENOVO.com.countdown');
LENOVO.com.countdown = (function(){

var 
timer = null,
doubleNum = function(num){ 
	num<10?num = '0'+num:num = ''+num;
	return num;
},
play = function(id,fn){
	
	timing = 60 * 100,
	curTime = 1,
	clock_con = $('#'+id);
	if(clock_con){
		clearInterval(timer);
		timer = setInterval(function(){
			timing = timing - curTime;
			if(timing>=0){
				clock_con.html(doubleNum(parseInt(timing/100))+"&prime;"+doubleNum(parseInt(timing%100))+"&Prime;");
			}else{
				clearInterval(timer);
				clock_con.html("00&prime;00&Prime;");	
				if(fn && '[object Function]' === Object.prototype.toString.call(fn)){
					fn();
					return false;
				}
			}
		},10);
	}
},
stopCountDown = function(){
	clearInterval(timer);	
},
init = function(id,fn){
	play(id,fn);
};
return {
	init : init,
	stopCountDown : stopCountDown
};

})()


/**
 * 数据模板
 * @param {String} tpl [html字符串，模板格式：#{id} ]
 * @param {Object} stub [自定义方法集，返回需要进行替换的字符串]
 * @param {Object} data [json数据]
 * @return {String}
 * @usage
 *		LENOVO.com.tpl.format(tpl, stub, data)
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
	alert(LENOVO.com.tpl.format(liTpl, {"ename": ename}, data));
 */
LENOVO.namespace('LENOVO.com.tpl');
LENOVO.com.tpl = (function(){
var 
format = function(tpl, stub, data) {
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
};
return {format:format};
})();


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

//分享弹窗
LENOVO.namespace('LENOVO.act.share');
LENOVO.act.share = (function(){
	var 
	shareBtn = $('#actionBtn'),
	shareDialog = $('#share'),
	updateDialog = $('#updateDialog'),
	wxDialog = $('#mmTip'),
	wxMask = $('#wxmask'),
	UPDATE_TIP_3 = '亲，更新至最新版本可分享哦！',
	conf = LENOVO.conf,
	global = conf.global,
	score = $("#score"),
	percent = $("#percent"),
	rank = $("#rank"),
	dialog = LENOVO.com.ui.dialog,
	init = function(){
		var
		defaultInfo = {
			url : window.location.href,
			title : encodeURIComponent('测试title'),
			content : encodeURIComponent('我答对了'+score.html()+'道题，击败了'+percent.html()+'的人，获得'+rank.html()+'称号'),
			icon : 'http://dl.lenovomm.com/ams/fileman/img/icon/2014-06-25042623-14036847839712221.png',
			pic : 'http://img.lenovomm.com/crawler@cluster-1/editor/fileman/img/icon/1413020539455_.jpg'
		},
		
		shareInfo = {
			sina:{//分享到新浪微博 
				url : encodeURIComponent(defaultInfo.url+'#com.sina.weibo'),	
				title : defaultInfo.title+' '+defaultInfo.content,	
				appkey : 3826691734,
				pic : defaultInfo.pic
			},
			renren:{//分享到人人网
				resourceUrl: encodeURIComponent(defaultInfo.url+'#com.renren.mobile.android'),
				srcUrl : defaultInfo.url,
				title : defaultInfo.title,
				description : defaultInfo.content,
				pic : defaultInfo.pic
			},
			tqq:{//分享到腾讯微博
				url : encodeURIComponent(defaultInfo.url+'#com.tencent.WBlog'),
				title : defaultInfo.title+' '+defaultInfo.content,	
				pic : defaultInfo.pic
			},
			qzone:{//分享到QQ空间
				url : encodeURIComponent(defaultInfo.url+'#com.qzone'),
				title : defaultInfo.title,
				content : defaultInfo.content,
				pic : defaultInfo.pic
			},
			douban:{//分享到豆瓣
				url : encodeURIComponent(defaultInfo.url+'#com.douban.frodo'),
				title : defaultInfo.title,
				content : defaultInfo.content,
				pic : defaultInfo.pic
			}
		},
		
		shareUrl = {
			sina : 'http://service.weibo.com/share/share.php?url={url}&title={title}&appkey={appkey}&pic={pic}',
			renren : 'http://widget.renren.com/dialog/share?resourceUrl={resourceUrl}&srcUrl={srcUrl}&title={title}&description={description}&pic={pic}',
			tqq : 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&pic={pic}',
			qzone : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&pics={pic}&title={title}&summary={content}',
			douban : 'http://www.douban.com/share/service?image={pic}&href={url}&name={title}&text={content}&title={title}&comment='
		},
		
		formatmodel = function(str,model){
			for(var k in model){
				var re = new RegExp("{"+k+"}","g");
				str = str.replace(re,model[k]);
			}
			return str;
		},
		
		openWindow = function(str){
			navigator.userAgent.indexOf('UCBrowser') !=-1 ? window.location.href = formatmodel(shareUrl[str],shareInfo[str]) : window.open(formatmodel(shareUrl[str],shareInfo[str]));
		},
		
		wxshare = function(){
			WeixinJSBridge.on('menu:share:appmessage', function(argv){
				WeixinJSBridge.invoke('sendAppMessage',{
					//'appid': defaultInfo.appid ||'',
					'img_url': defaultInfo.icon,
					//'img_width': 100,
					//'img_height': 100,
					'link': defaultInfo.url,
					'desc': decodeURIComponent(defaultInfo.content),
					'title': decodeURIComponent(defaultInfo.title)
				},function(res){});
			});
			WeixinJSBridge.on('menu:share:timeline', function(argv){
				WeixinJSBridge.invoke('shareTimeline',{
					'img_url': defaultInfo.icon,
					//'img_width': 100,
					//'img_height': 100,
					'link': defaultInfo.url,
					'desc': decodeURIComponent(defaultInfo.content),
					'title': decodeURIComponent(defaultInfo.title)
				},function(res){});
			});
			
			$("#shareToFriend,#shareToCircle").click(function(){
				wxDialog.css("display","block");
				wxMask.css("display","block");
			});
			wxMask.click(function(){
				wxDialog.css("display","none");
				wxMask.css("display","none");	
			});
		},
		
		share = function(){
			if(global){
				if(conf.device === 'phone'){
					if(parseInt(global.getVersionCode()) >= 61300 && typeof(global.share)!=="undefined"){
						var 
						title = decodeURIComponent(defaultInfo.title),
						content = decodeURIComponent(defaultInfo.content),
						url = defaultInfo.url,
						icon = defaultInfo.icon,
						pic = defaultInfo.pic;
						/*
							*title 标题 （必填）
							*body  文本  （必填）
							*mimeType 暂时无用
							*streamUrl 内容链接 （必填）
							*appName  暂时无用
							*iconUrl  大图远程链接（非必填参数）
							*imageUrl  大图远程链接（非必填参数）
							void share(String title, String body, String mimeType, String streamUrl, String appName, String iconUrl, String imageUrl);
						*/
						global.share(title,content,"text/plain",url,"",icon,pic);
					}else{
						//global.share(decodeURIComponent(defaultInfo.title+' '+defaultInfo.content+' '+defaultInfo.url));
						shareDialog.find("ul").css("height","204px");
						shareDialog.find("li").hide();
						shareDialog.find("li.none").show();
						dialog.show(shareDialog);
					}
				}else if(conf.device === 'pad'){
					global.share(decodeURIComponent(defaultInfo.title+' '+defaultInfo.content+' '+defaultInfo.url));	
				}
			
			//微信平台
			}else if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger"){
				dialog.show(shareDialog);
				shareDialog.find("li.wxshare").show();	
				wxshare();
			}else{
				//弹出自定义分享框
				dialog.show(shareDialog);
				
			}
		}
		
		shareBtn.click(share);
		shareDialog.find('.cancel').click(function(){ /*dialog.hide(shareDialog);*/shareDialog.hide().removeClass('animate_popOn'); });
		shareDialog.find('a').on('click', function(){
			var type = $(this).data("type");
			//dialog.hide(shareDialog);
			shareDialog.hide().removeClass('animate_popOn');
			if(type=="update"){
				updateDialog.find('.content').html(UPDATE_TIP_3);
				setTimeout(function(){dialog.show(updateDialog);},200);
			}else{
				openWindow(type);
			}
			
		});
	};
	return {
		init:init
	}
})();

//升级乐商店
LENOVO.namespace('LENOVO.act.updateStore');
LENOVO.act.updateStore = (function(){
	init = function(){
		var 
		conf = LENOVO.conf,
		global = conf.global,
		updateDialog = $('#updateDialog'),
		dialog = LENOVO.com.ui.dialog;
		$("#updateDialog .cancel").click(function(){
			//dialog.hide(updateDialog);
			updateDialog.hide().removeClass('animate_popOn');
		});
		
		$("#updateDialog .confirm").click(function(){
			if(global){
				$.ajax({
					url:'/error/queryappvc.do',
					dataType:'text',
					data:'pn=com.lenovo.leos.appstore' + (conf.device === 'pad' ? '.pad' : ''),
					type: 'GET',
					timeout: 15000,
					success: function(vc){	
						var packageName = 'com.lenovo.leos.appstore',
						versionCode = String(vc),
						downloadurl = 'http://www.lenovomm.com/appstore/psl/com.lenovo.leos.appstore?cnum=17407',
						name = '乐商店',
						iconurl = 'http://img.lenovomm.com/crawler@cluster-1/ams/fileman/img/icon/2014-05-21100237-_1400680957981_8905.png';
						if(conf.device === 'phone'){
							global.startDownload(packageName,versionCode,downloadurl,name,iconurl);	
						}else if(conf.device === 'pad'){
							global.startDownload(packageName+'.pad', versionCode, '', name);
						}
						//dialog.hide(updateDialog);
						updateDialog.hide().removeClass('animate_popOn');
					},
					error: function(xhr, status, thrown){
						//toast(status);
					}
				});
				
			}	
		});
	};
	return {init:init}
})()

//初始化页面展现
LENOVO.namespace('LENOVO.act.initail');
LENOVO.act.initail = (function(){
	var
	timeUpDialog = $('#time_up'),
	dialog = LENOVO.com.ui.dialog;
	adjustHeight = function(){
		var w = $(".wrap").width();
		$(".wrap").css("height",Math.ceil(w*1138/640)+"px");	
	},
	loadingImg = function(){
		var imgArr = ['bg.png','bg2.png','bg_pop.png','bg_pop2.png','icon_face.png','icon_face2.png','icon_o.png','icon_x.png','icons.png'];
		var i,len = imgArr.length,count = 0,timer = null;
		for(i=0;i<len;i++){
			var imgObj = new Image();
			imgObj.src = 'images/'+imgArr[i];
			imgObj.onload = function(){
				count++;	
			}	
		}
		timer = setInterval(function(){
			if(count>=len/* && LENOVO.conf.loadingFlag == true*/){
				clearInterval(timer);
				$("#main_loading").hide();	
				$(".start_box").show();	
				$(".content_box").show();	
			}
		},100);
	},
	startBtn = function(){
		$("#start_btn").click(function(){
			$(".start_box").hide();
			setTimeout(function(){
				LENOVO.com.countdown.init('countdown',function(){
					$(".list_item ul li").off("click");
					setTimeout(function(){
						dialog.show(timeUpDialog);	
					},200);
					setTimeout(function(){
						dialog.hide(timeUpDialog);	
					},1000);
					setTimeout(function(){
						LENOVO.act.result.init();	
					},1500);
				});
			},500);
			
			$.get('saveLogin.do');
			
		});	
	},
	init = function(){
		//LENOVO.act.result.init();	
		if(navigator.userAgent.indexOf("MSIE")>0){
			$("#main_loading").hide();	
			$(".start_box").show();	
			$(".content_box").show();
		}else{
			loadingImg();	
		}
		adjustHeight();
		startBtn();
	}
	return {
		init:init
	}
})()


//猜应用
LENOVO.namespace('LENOVO.act.guessApp');
LENOVO.act.guessApp = (function(){
	var
	app_list = $(".app_list"),
	pop_o = $("#right_answer"),
	pop_x = $("#wrong_answer"),
	dialog = LENOVO.com.ui.dialog,
	html = '',
	num = 1,
	randomData = function(arr){
		return arr.sort(function(){ return 0.5 - Math.random() });
	},
	listItemShow = function(num){
		$(".list_item").hide();
		$(".list_item").eq(num).show();
	},
	guess = function(appLen){
		$(".list_item ul li").on("click",function(){
			var guessTxt = $(this).html();
			var correctTxt = $(this).parent("ul").attr("data-correct");
			if(guessTxt == correctTxt){
				dialog.show(pop_o);
				LENOVO.conf.score++;
				setTimeout(function(){dialog.hide(pop_o);},1000);
			}else{
				dialog.show(pop_x);
				setTimeout(function(){dialog.hide(pop_x)},1000);
			}
			setTimeout(function(){
				if(num>=appLen){
					LENOVO.com.countdown.stopCountDown();
					LENOVO.act.result.init();
				}else{
					listItemShow(num);
					num++;	
				}
			},1200)
		});	
	},
	loading = function(num){
		var 
		$loading = $("#pic_loading"),
		currentClass = $loading.attr('class').split(' ')[1],
		currentPercentage = currentClass.substring(9,12),
		newClass = 'progress-' + num;
		$loading.removeClass(currentClass).addClass(newClass);	
	},
	getData = function(){
		$.ajax({
			url:'data.json',
			dataType:'json',
			data:'',
			type: 'GET',
			timeout: 15000,
			success: function(data){	
				data = randomData(data);
				var i, len = data.length, count = 0, timer = null;
				for(i = 0;i<len;i++){
					html += '\
						<div class="list_item">\
							<dl>\
								<dt><img src="'+data[i]["icon"]+'" /></dt>\
								<dd>猜应用第'+(i+1)+'题</dd>\
							</dl>\
							<ul data-correct="'+data[i]["correct"]+'">'+
								(function(){
									var j,itemHtml = '',itemLen = data[i]["item"].length;
									for(j=0;j<itemLen;j++){
										itemHtml += '<li>' +data[i]["item"][j]+ '</li>'	
									}
									return itemHtml;
								})()
							+'</ul>\
						</div>';
					var imgObj = new Image();
					imgObj.src = data[i]["icon"];
					imgObj.onload = function(){
						count++;	
					}
					
				}
				
				timer = setInterval(function(){
					loading(count*2);
					if(count>=len){
						clearInterval(timer);
						setTimeout(function(){
							$("#pic_loading").hide();
							$("#start_btn").show();
						},500);
						//LENOVO.conf.loadingFlag = true;
					}
					
				},100);
				app_list.html(html);
				app_list.find("div.list_item").eq(0).show();
				guess(len);
			},
			error: function(xhr, status, thrown){
				//toast(status);
			}
		});	
	},
	init = function(){
		getData();
	};
	return {init:init}		
})()


//结果页展现
LENOVO.namespace('LENOVO.act.result');
LENOVO.act.result = (function(){
	var
	resultDialog = $("#result"),
	dialog = LENOVO.com.ui.dialog,
	contentRender = function(){
		var 
		scoreNum = LENOVO.conf.score,
		rankTxt = (function(){
			var txt;
			if(scoreNum >= 0 && scoreNum <= 9){
				txt = 'OOXX模拟演练型';
			}else if(scoreNum >= 10 && scoreNum <= 19){
				txt = 'OOXX低调体贴型';
			}else if(scoreNum >= 20 && scoreNum <= 29){
				txt = 'OOXX刻苦耐劳型';
			}else if(scoreNum >= 30 && scoreNum <= 39){
				txt = 'OOXX翻云覆雨型';
			}else if(scoreNum >= 40 && scoreNum <= 50){
				txt = 'OOXX骁勇善战型';
			}
			return txt;
		})();
		$("#score").html(scoreNum);
		$("#rank").html(rankTxt);
		
		$.ajax({
			//url:'getMSNumber.do?number='+scoreNum,
			url:'percent.json',
			dataType:'json',
			data:'',
			type: 'GET',
			timeout: 15000,
			success: function(data){
				$("#result .loading").hide();
				$("#percent").html(data.ratio);
				setTimeout(function(){$("#step1").css("visibility","visible").addClass("animate_popOn");},400);
				setTimeout(function(){$("#step2").css("visibility","visible").addClass("animate_popOn");},800);
				setTimeout(function(){$("#step3").css("visibility","visible").addClass("animate_popOn");},1200);
				LENOVO.act.share.init();
				LENOVO.act.updateStore.init();
			},
			error: function(xhr, status, thrown){
				//toast(status);
			}	
		});
		
		
	},
	init = function(){
		contentRender();
		dialog.show(resultDialog);
	}
	return {init:init}	
})()