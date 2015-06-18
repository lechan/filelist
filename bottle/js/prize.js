//全部奖品列表
LENOVO.namespace('LENOVO.prize.list');
LENOVO.prize.list = (function(){
	var
	get = function(){
		var url = 'globalPrize.do',
		param = 't='+new Date().getTime(),
		html = '',
		score1 = document.querySelector("#scoreNum"),
		prizelist,
		len,
		i;
		LENOVO.com.ajax.get(url,param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
			score1.innerHTML = data.userScore;
			prizelist = data.globalPrizeList;
			if(prizelist){
				len = prizelist.length;
				for(i=0;i<len;i++){
					html +=	'\
					<li>\
                    	<div class="fl prize_list_l">\
                        	<h2>'+prizelist[i].prizeDesc+'</h2>\
                            <h3>点数：'+prizelist[i].minScore+'</h3>\
							<h4><span>剩余：'+prizelist[i].retainedAmount+'份</span>'+
							(function(){
								return prizelist[i].retainedAmount==0 ? '<span>上新时间：'+prizelist[i].nextSupplyTime+'</span>' : '';
							})()
							+'</h4>\
                        </div>\
                        <div class="fr prize_list_r">'+
							(function(){
								if(data.userScore < prizelist[i].minScore){
									return '<span class="btn_grey">抢兑</span>';
								}else{
									return prizelist[i].retainedAmount>0 ? '<a class="btn" data-type="'+prizelist[i].exchangeType+'" data-prizename="'+prizelist[i].prizeDesc+'" data-prizeid="'+prizelist[i].prizeId+'" data-prizescore="'+prizelist[i].minScore+'" onclick="getPrize(this)">抢兑</a>' : '<span class="btn_grey">已兑完</span>';	
								}
							})()
							+'</div>\
                    </li>';
				}
				
				if(document.querySelector("#allprize")){
					document.querySelector("#allprize").innerHTML = html;
				}
			}
			
		});
	},
	init = function(){
		get();
	};
	return {init:init}	
})()


//我的奖品列表
LENOVO.namespace('LENOVO.prize.mine');
LENOVO.prize.mine = (function(){
	var
	get = function(){
		var url = 'prize.do',
		param = 't='+new Date().getTime(),
		lotteryhtml = '',
		lotterylist,
		lotterylen,
		minScore = BASE.minScoreLottery,
		prizeTips = document.querySelector("#prizeTips"),
		faceImg = document.querySelector("#face_img"),
		i;
		LENOVO.com.ajax.get(url,param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){

			lotterylist = data.chancePrizeList;
			
			if(typeof(lotterylist)=="undefined"){
				return false;	
			}
			
			document.querySelector("#score").innerHTML = data.userScore;
			if(data.userScore < minScore){
				prizeTips.innerHTML = '<h2>快去参与活动，才有机会拿3000元旅游基金！</h2><a class="btn" href="activity.html#score_anchor">参加活动</a>';
				faceImg.innerHTML = '<img src="'+BASE.domain+'/promotion/images/icon10.png" />';
			}else{
				prizeTips.innerHTML = '<h2>亲，你离大奖只差一步！</h2><a class="btn" href="lottery.html">去抽奖</a>';
				faceImg.innerHTML = '<img src="'+BASE.domain+'/promotion/images/icon11.png" />';
			}
			
			
			if(lotterylist.length==0){
				document.querySelector("#allprize_none").style.display = 'block';
			}else{
								
				//抽奖列表
				if(lotterylist.length>0){
					document.querySelector("#allprize_none").style.display = 'none';
					document.querySelector("#lottery_box").style.display = 'block';
					lotterylen = lotterylist.length;	
					for(j=0;j<lotterylen;j++){
						lotteryhtml +=	'\
						<li>\
							<div class="fl prize_list_l">'+
							(function(){
								if(lotterylist[j].exchangeType==1){
									if(lotterylist[j].exchangeInfo.cardNumber.indexOf(';')!=-1){
										return '<h2>'+lotterylist[j].prizeDesc+'<br/>'+lotterylist[j].exchangeInfo.cardNumber.split(';')[0]+'<br/>'+lotterylist[j].exchangeInfo.cardNumber.split(';')[1]+'</h2>';
									}else{
										return '<h2>'+lotterylist[j].prizeDesc+'<br/>'+prizeDescFormat(lotterylist[j].exchangeInfo.cardNumber)+'</h2>';
									}
								}else{
									return '<h2>'+lotterylist[j].prizeDesc+'<br/>活动结束后15个工作日发奖</h2>';
								}
							})()
							+'<h3>时间：'+lotterylist[j].exchangedTime+'</h3>\
							</div>\
							<div class="fr prize_list_r">'+
							(function(){
								if(lotterylist[j].exchangeType==1){
									return '';
								}else{
									return '<a class="btn" onClick="win_edit(this)" data-type="'+lotterylist[j].exchangeType+'" data-info=\''+JSON.stringify(lotterylist[j].exchangeInfo)+'\' data-prizeinfo="'+lotterylist[j].prizeDesc+'" data-logid="'+lotterylist[j].exchangeInfo.logId+'">领奖信息</a>';
								}
							})()
							+'</div>\
						</li>';
					}
					if(document.querySelector("#lotteryprize")){
						document.querySelector("#lotteryprize").innerHTML = lotteryhtml;
					}
				}
								
			}
		});
	},
	init = function(){
		get();
	};
	return {init:init}	
})()


//分享弹窗
LENOVO.namespace('LENOVO.act.share');
LENOVO.act.share = (function(){
	var 
	init = function(){
		var
		defaultInfo = {
			url : window.location.href,
			title : encodeURIComponent('OOXX——哪里才是你的极限！'),
			content : encodeURIComponent('我击败全球的玩家，成为，测测你是哪一型？'),
			icon : BASE.domain+'/dayactivities/images/ox2.jpg',
			pic : BASE.domain+'/dayactivities/images/ox1.jpg'
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
				srcUrl : encodeURIComponent(defaultInfo.url),
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
						showToast("亲，请升级到最新版乐商店");
					}
				}else if(conf.device === 'pad'){
					global.share(decodeURIComponent(defaultInfo.title+' '+defaultInfo.content+' '+defaultInfo.url));	
				}
			
			//微信平台
			}else{
				//弹出自定义分享框
				showToast("请在乐商店里进行分享");
				
			}
		}
		
		document.getElementById("actionBtn").onclick = share;
	};
	return {
		init:init
	}
})();



//兑奖弹窗
function getPrize(e){
	
	//判断登录
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==false){
			showToast("请登录");	
			LENOVO.com.lenovoid.login();
			return false;
		}else{
			var info = {
				"type" : e.getAttribute("data-type"),
				"prizeid" : e.getAttribute("data-prizeid"),
				"name" : e.getAttribute("data-prizename")
			}
			if(parseInt(document.querySelector("#scoreNum").innerHTML) >= e.getAttribute("data-prizescore") ){
				LENOVO.win.pop.init(7,{},info);
			}else{
				showToast("您的点数不够，请先去赚点数");		
			}
		}
	});
}

//验证码兑奖
function confirmPrize(e){
	var bBtn = true;
	var type = e.getAttribute("data-type");
	var prizeid = e.getAttribute("data-prizeid");
	var info = {
		"name" : e.getAttribute("data-prizename")
	}
	var code = document.querySelector("#verify_box").value;
	var vc_btn = document.querySelector("#vc_btn");
	var url = 'exchangeprize.do';
	var param = 'prizeId='+prizeid+'&vc='+code+'&t='+global_t+'&cid='+getclientid();
	if(bBtn){
		bBtn = false;
		vc_btn.innerHTML = '<span class="btn_grey">确定</span>';
		LENOVO.com.ajax.get(url,param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
			setTimeout(function(){
				bBtn = true;
				vc_btn.innerHTML = '<a class="btn" onclick="confirmPrize(this)" data-type="'+type+'" data-prizeid="'+prizeid+'" data-prizename="'+info.name+'">确定</a>';
			},500);
			closePop();
			if(data.ret==true){
				var logId = data.logId;
				info['logId'] = logId;
				if(data.chargeCardNum){
					if(data.chargeCardNum.indexOf(';')==-1){
						info['cardNumber'] = prizeDescFormat(data.chargeCardNum);
						info['cardPassword'] = '';
					}else{
						info['cardNumber'] = data.chargeCardNum.split(';')[0];
						info['cardPassword'] = data.chargeCardNum.split(';')[1];	
					}
				}
				LENOVO.win.pop.init(type,{},info);
				LENOVO.prize.list.init();
				scoreChange(data.userScore);
			}else{
				//showToast(data.msg);	
				LENOVO.win.pop.init(6,{},{
					"msg" : data.msg	
				});
			}
		},function(){
			closePop();	
		});
	}
}



//奖品使用说明弹窗
function prizeUseDesc(){
	LENOVO.win.pop.init(5);	
}

//兑奖用户列表
function getPrizeList(){
	LENOVO.com.ajax.get("accessPrizeForExchangeList.do","",{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
		var
		i,
		len,
		html = '';
		if(data!=null && data.length>0){
			len = data.length;
			for(i=0;i<len;i++){
				html += '<span>乐友'+formatUserName(data[i].userName)+'：抢兑'+ data[i].prizeDesc +'    '+ data[i].format +'</span>';	
			}
			document.querySelector(".scrollList_con").innerHTML = html;
			if(len>8){
				LENOVO.act.scrollList.init("scrollList");
			}
		}else{
			document.querySelector(".scrollList_con").innerHTML = "<span>该环节暂无中奖信息</span>";	
		}
	});
}

//获奖球队电话卡
function teamTelCard(cardNumber){
	LENOVO.win.pop.init(14,{},{
		"cardNumber" : prizeDescFormat(cardNumber)	
	});		
}

//序列号替换成卡密
function prizeDescFormat(str){
	return str.replace("序列号","卡密");	
}