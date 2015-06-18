/**
 * 省市级联（jsonp）
 * @param {String} id [容器id]
 * @param {Array} data [省市数据:cities.js]
 * @usage
 *		LENOVO.com.area.init(id,data)
 */
LENOVO.namespace('LENOVO.com.area');
LENOVO.com.area = (function(){
	var
	createElements = function(id){
		var area_box = document.querySelector("#"+id),
			html = '<select disabled="disabled" id="province" name="province"></select><select disabled="disabled" id="city" name="city"></select><select disabled="disabled" id="region" name="region"></select>';
		area_box.innerHTML = html;
	},
	initRender = function(data){
		var pstr = '',
			i=0,
			len = data.length;
			province = document.querySelector("#province");
		for(;i<len;i++){
			pstr +='<option value="'+data[i]["name"]+'" >'+data[i]["name"]+'</option>';	
		}
		province.innerHTML = pstr;
		changeProvince(data);
	},
	changeProvince = function(data){
		var 
		cstr='',
		i=0,
		j,
		index,
		plen = data.length,
		province = document.querySelector("#province"),
		city = document.querySelector("#city"),
		pValue = province.value,
		cArr,
		clen;
		for(;i<plen;i++){
			if(data[i]["name"]==pValue){
				cArr = data[i]["sub"];
				index = i;
				if(cArr){
					clen = cArr.length;
					for(j=0;j<clen;j++){
						cstr+='<option value="'+cArr[j]["name"]+'" >'+cArr[j]["name"]+'</option>';
					}
				}else{
					city.innerHTML = '<option value="/" >/</option>';
					area.innerHTML = '<option value="/" >/</option>';
					return false;
				}
			}
		}
		city.innerHTML = cstr;
		changeCity(data,index);
		return index;
	},
	changeCity = function(data,index){
		var 
		sstr='',
		i=0,
		j,
		city = document.querySelector("#city"),
		area = document.querySelector("#region"),
		cValue = city.value,
		cArr = data[index]["sub"],
		aArr,
		alen;
		if(cArr){
			clen = cArr.length;
			for(;i<clen;i++){
				if(cArr[i]["name"]==cValue){
					aArr = cArr[i]["sub"];
					if(aArr){
						alen = aArr.length;
						if(alen>0){
							for(j=0;j<alen;j++){
								sstr+='<option value="'+aArr[j]["name"]+'" >'+aArr[j]["name"]+'</option>';
							}
						}else{
							area.innerHTML = '<option value="/" >/</option>';
							return false;	
						}
					}else{
						area.innerHTML = '<option value="/" >/</option>';
						return false;
					}
				}
			}
		}else{
			city.innerHTML = '<option value="/" >/</option>';
			area.innerHTML = '<option value="/" >/</option>';
			return false;
		}
		area.innerHTML = sstr;
	},
	handler = function(data){
		var
		province = document.querySelector("#province"),
		city = document.querySelector("#city"),	
		area = document.querySelector("#region"),
		curIndex;
		province.onchange = function(){
			curIndex = changeProvince(data);
		};
		city.onchange = function(){
			changeCity(data,curIndex);
		};
	},
	init = function(id,data){
		createElements(id);
		initRender(data);
		handler(data);
	};
	return {init: init};	
})() 


/**
 * 倒计时
 * @param {String} id [倒计时容器id]
 * @param {String} deadtime [最终日期：e.g. 2014/5/26 10:00:00]
 * @param {Function} fn [回调函数]
 * @usage
 *		LENOVO.com.countdown.init(id,deadtime,fn)
 */
LENOVO.namespace('LENOVO.com.countdown');
LENOVO.com.countdown = (function(){

var 
ServerTime = {
	//netUrl : "showtime.do",//服务器接口
	netUrl : "http://all.vic.sina.com.cn/201301smart_app/show_time.php",
	begin : function(id,deadtime,fn){
		LENOVO.com.util.loadJS(this.netUrl,function(){
			play(id,deadtime,fn);
		});
	}
},
doubleNum = function(num){ 
	num<10?num = '0'+num:num = ''+num;
	return num;
},
timeCalc = function(timing){
	var
	days = Math.floor(timing / (1000 * 60 * 60 * 24)),
	hours = Math.floor(timing/(1000 * 60 * 60))%24,
	minutes = Math.floor(timing/(1000 * 60))%60,
	seconds = Math.floor((timing/1000))%60,
	numString = doubleNum(days*24+hours)+"小时"+doubleNum(minutes)+"分"+doubleNum(seconds)+"秒";
	return numString;
},
play = function(id,deadtime,fn){
	//deadtime = '2013/1/18 10:00:00';
	var timer = null,
	timing = 0,
	t = new Date(deadtime).getTime(),
	curTime = ServerSeconds * 1000,
	//curTime = new Date().getTime(),
	clock_con = document.querySelector('#'+id);
	if(clock_con && t - curTime>=0){
		timer = setInterval(function(){
			timing = t - curTime;
			if(timing>=0){
				clock_con.innerHTML = timeCalc(timing);
			}else{
				clearInterval(timer);
				if(fn && '[object Function]' === Object.prototype.toString.call(fn)){
					fn();
					return false;
				}
			}
			curTime = curTime + 1000;
		},1000);
	}else{
		clock_con.innerHTML = timeCalc(timing);	
		fn();
	}
},
init = function(id,deadtime,fn){
	ServerTime.begin(id,deadtime,fn);
	//play(id,deadtime,fn);
};
return {init:init};

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



/**
 * lenovoId登录相关
 * @param {String} id [容器id]
 * @usage
 *		LENOVO.com.lenovoid.init(id)
 */
LENOVO.namespace('LENOVO.com.lenovoid');
LENOVO.com.lenovoid = (function(){
var
bBtn = true,
logout = function(){
	if(global){
		global.logout();
	}
},
login = function(){
	if(global){
		if(bBtn == true){
			bBtn = false;
			setTimeout(function(){
				bBtn = true;
				
				if(typeof(global.getLpsUst)=="undefined"){
					LENOVO.com.cookie.set("lenovoIdBtn",1,1);
					LENOVO.win.pop.init(15);
					return false;
					//window.location.reload();
				}else{
					global.showLogin();	
					
					var timer = null;
					if(typeof(global.getLpsUst)!="undefined"){
						timer = setInterval(function(){
							//alert("lpsust:"+getLpsUst());
							if(getLpsUst()!=''){
								
								clearInterval(timer);
								loginDataChange();
								
								if(BASE.currentFn!=null){
									setTimeout(function(){
										eval(BASE.currentFn)();
										BASE.currentFn = null;
									},200);
								}
							}
						},500);
					}else{
						
						if(getLpsUst()!=''){
							LENOVO.com.cookie.set("lenovoIdBtn",0,1);
							loginDataChange();	
						}
					}	
				}
			},500);
			
		}
	}else{
		var fileurl = (function(){
            var url = window.location.pathname;
            while(url.indexOf("/") > -1) {
                url = url.substring(url.indexOf("/") + 1, url.length);
            }
            return url;
		})()
		window.location.href = 'lenovoLogin.do?toPath=/'+fileurl;
	}
},
checkLogin = function(id){
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==false){
			login(id);
			return false;
		}else{
			return true;
		}
	});	
},
loginDataChange = function(){
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==true){
			
			if(document.querySelector("#login_box")){
				document.querySelector("#login_box").innerHTML = '<em>欢迎</em>'+formatName(data.username);
			}
			
			if(document.querySelector("#myPrize")){
				document.querySelector("#myPrize").innerHTML = '<a href="myprize.html">我的奖品</a>';
			}
			
			/*if(document.querySelector("#intro_login")){
				document.querySelector("#intro_login").innerHTML = '<a href="javascript:showToast(\'已登录\')">登录/注册</a>';	
			}
			
			if(document.querySelector("#myScore_logout")){
				document.querySelector("#myScore_logout").style.display = 'none';
			}*/
			
			if(typeof(lottery)!='undefined'){
				//alert("测试弹窗");
				lottery();
			}
			
			if(typeof(LENOVO.act.initail.init)!='undefined'){
				LENOVO.act.initail.init();	
			}
		}
	});
},

refreshPage = function(){
	var btn = LENOVO.com.cookie.get("lenovoIdBtn");
	
	//alert("lpsust:"+getLpsUst());
	
	if(getLpsUst()!=''){
		LENOVO.com.cookie.set("lenovoIdBtn",0,1);
		loginDataChange();	
	}
	if(btn==1){
		setTimeout(function(){
			window.location.reload();
		},2000);		
	}
},

formatName = function(str){
	str = str.replace(/@.+/,'');
	if(str.length>=15){
		str = str.substring(0,10);
		return str + "...";
	}else{
		return str;	
	}
},

init = function(id){
	LENOVO.com.ajax.get('loginInfo.do','t='+new Date().getTime(), {"clientid":getclientid(),"lpsust":getLpsUst()}, function(data){
		if(data.status==false){
			if(document.querySelector("#login_box")){
				document.querySelector("#login_box").innerHTML = '<a href="javascript:LENOVO.com.lenovoid.login()">请登录</a>';
			}
			
			if(document.querySelector("#intro_login")){
				document.querySelector("#intro_login").innerHTML = '<a href="javascript:LENOVO.com.lenovoid.login()">登录/注册</a>';	
			}
			
			if(document.querySelector("#myPrize")){
				document.querySelector("#myPrize").innerHTML = '<a href="javascript:LENOVO.com.lenovoid.login()">我的奖品</a>';
			}
			
		}else{
			if(document.querySelector("#login_box")){
				document.querySelector("#login_box").innerHTML = "<em>欢迎</em>"+formatName(data.username);
			}
			
			if(document.querySelector("#myPrize")){
				document.querySelector("#myPrize").innerHTML = '<a href="myprize.html">我的奖品</a>';
			}
			
			/*if(document.querySelector("#myPrize_logout")){
				document.querySelector("#myPrize_logout").style.display = 'none';
				document.querySelector("#myPrize_login").style.display = 'block';
			}
			
			if(document.querySelector("#myScore_logout")){
				document.querySelector("#myScore_logout").style.display = 'none';
			}
			
			if(document.querySelector("#intro_login")){
				document.querySelector("#intro_login").innerHTML = '<a href="javascript:showToast(\'已登录\')">登录/注册</a>';	
			}*/
		}
	});	
}
return {
	init:init,
	checkLogin:checkLogin,
	login:login,
	logout:logout,
	refreshPage:refreshPage
}
})()

//LENOVO.com.lenovoid.refreshPage();


/**
 * 列表上下滚动
 * @param {String} id [容器id]
 * @usage
 *		LENOVO.act.scrollList.init(id)
 */
LENOVO.namespace('LENOVO.act.scrollList');
LENOVO.act.scrollList = (function(){
	var
	timer = null,
	autoPlay = function(id){
		var scrollList = document.querySelector("#"+id),
		scrollListCon = scrollList.querySelectorAll("div.scrollList_con"),
		scrollListHeight = scrollListCon[0].offsetHeight,
		wrapHeight = document.querySelector("div.scrollList_wrap").offsetHeight,
		top;
		scrollList.style.height = scrollListHeight*2 + "px";
		scrollListCon[1].innerHTML = scrollListCon[0].innerHTML;
		scrollList.style.top = "0px";
		timer = setInterval(function(){
			top = parseInt(scrollList.style.top);
			scrollList.style.top = (top - 1) + "px";
			if(Math.abs(top)>scrollListHeight *2 - wrapHeight){
				scrollList.appendChild(scrollListCon[0]);
				scrollList.style.top = "0px";
			}
		},70);
	},
	handler = function(id){
		var scrollList = document.querySelector("#"+id);	
		scrollList.onmouseover = function(){
			clearInterval(timer);
		};
		scrollList.onmouseout = function(){
			autoPlay(id);	
		}
	},
	init = function(id){
		if(document.querySelector("#"+id+" span")){
			document.querySelector("#"+id).style.top = "0px";
			autoPlay(id);
			//handler(id);
		}else{
			document.querySelector(".scrollList_wrap").style.display = "none";	
		}
	}
	return { init : init }
})() 


/* 弹窗相关
 * @param {Number} [弹窗类型]
 * 0. 兑换手机	 
 * 1. 兑换充值卡（有卡号）
 * 2. 兑换充值卡（提供信息）
 * 3. 分享
 * 4. 获取规则
 * 5. 奖品使用说明
 * 6. 兑奖失败
 * 7. 验证码
 * @param {Object} [弹窗初始信息]
	{
		"userName" : "lechan",
		"phoneNumber" : "131414145",
		"province" : "四川",
		"city" : "成都",
		"region" : "金牛区",
		"address" : "马鞍北路"	
	}
	or
	{
		"phoneNumber" : "131414145",
		"supplier" : "中国移动",
		"province" : "四川"
	}
 * @param {Object} [弹窗模板初始信息（奖品名等）]
 	{
		"name":"30元充值卡",
		"code":"1268966889668799668007"	
	}
 */
LENOVO.namespace('LENOVO.win.pop');
LENOVO.win.pop = (function(){
	var poptpl = {
		mob : '\
		<section class="pop_wrap">\
			<h2>恭喜您！<br/>获得<strong>#{name}</strong></h2>\
			<p>您的#{name}将在活动结束后<strong>15工作日内</strong>发放，请填写你的收货信息，填写错误或填写不完整将视为自动放弃奖品。</p>\
			<div class="winner_info" id="winner_tel">\
				<p><label>姓名：</label><input disabled="disabled" type="text" name="userName" /></p>\
				<p><label>手机号码：</label><input disabled="disabled" type="tel" name="phoneNumber" /></p>\
				<p><label>收货地址：</label></p>\
				<p id="area_box" class="select_type1"></p>\
				<p class="address"><input disabled="disabled" type="text" placeholder="详细地址" name="address" /><input disabled="disabled" type="hidden" name="logId" value="#{logId}" /></p>\
			</div>\
			<div class="btn_box">\
				<!--<a class="btn" href="javascript:;" onClick="closePop()">取消</a>\
				<a class="btn" href="javascript:;" onclick="submit_mob()">确认</a>-->\
				<a class="btn" href="javascript:;" onClick="closePop()">关闭</a>\
			</div>\
		</section>\
		',
		card1 : '\
		<section class="pop_wrap">\
			<h2>恭喜您！<br/>获得<strong>#{name}</strong></h2>\
			<p>请牢记你的#{name}卡密。关闭此页面后你可以在“我的奖品”页面查看。</p>\
			<h4>#{name}：</h4>\
			<h5>#{cardNumber}</h5>\
			<h5>#{cardPassword}</h5>\
			<p>请不要将卡密泄漏给他人，若因将卡密泄漏给他人导致充值不成功的，将由用户自己负责。</p>\
			<div class="btn_box">\
				<a href="javascript:;" class="btn" onClick="closePop()">关闭</a>\
			</div>\
		</section>\
		',
		card2 : '\
		<section class="pop_wrap">\
			<h2>恭喜您！<br/>获得<strong>#{name}</strong></h2>\
			<p>我们将会在活动结束后15个工作日把话费充值到你所填写的手机号。提交之前请仔细核查，信息填写错误将视为自动放弃奖品。</p>\
			<div class="winner_info" id="winner_card">\
				<p class="select_type2">\
					<label>运营商：</label>\
					<select disabled="disabled" name="supplier">\
						<option value="">请选择</option>\
						<option value="中国移动">中国移动</option>\
						<option value="中国联通">中国联通</option>\
						<option value="中国电信">中国电信</option>\
					</select>\
					<input disabled="disabled" type="hidden" name="logId" value="#{logId}" />\
				</p>\
				<p class="select_type2">\
					<label>省份：</label>\
					<select disabled="disabled" id="province_sel" name="province"><option value="请选择">请选择</option><option value="北京">北京</option><option value="广东">广东</option><option value="上海">上海</option><option value="天津">天津</option><option value="重庆">重庆</option><option value="辽宁">辽宁</option><option value="江苏">江苏</option><option value="湖北">湖北</option><option value="四川">四川</option><option value="陕西">陕西</option><option value="河北">河北</option><option value="山西">山西</option><option value="河南">河南</option><option value="吉林">吉林</option><option value="黑龙江">黑龙江</option><option value="内蒙古">内蒙古</option><option value="山东">山东</option><option value="安徽">安徽</option><option value="浙江">浙江</option><option value="福建">福建</option><option value="湖南">湖南</option><option value="广西">广西</option><option value="江西">江西</option><option value="贵州">贵州</option><option value="云南">云南</option><option value="西藏">西藏</option><option value="海南">海南</option><option value="甘肃">甘肃</option><option value="宁夏">宁夏</option><option value="青海">青海</option><option value="新疆">新疆</option><option value="香港">香港</option><option value="澳门">澳门</option><option value="台湾">台湾</option><option value="海外">海外</option><option value="其他">其他</option></select>\
				</p>\
				<p><label>手机号码：</label><input disabled="disabled" type="tel" name="phoneNumber" /></p>\
			</div>\
			<div class="btn_box">\
				<!--<a class="btn" href="javascript:;" onClick="closePop()">取消</a>\
				<a class="btn" href="javascript:;" onclick="submit_telcard()">确认</a>-->\
				<a class="btn" href="javascript:;" onClick="closePop()">关闭</a>\
			</div>\
		</section>\
		',
		share : '\
		<section class="pop_wrap">\
			<p>你可以将活动分享给您的朋友，分享后您的朋友将获得一个验证码，可用验证码兑换机会哟~~</p>\
			<div class="btn_box" id="share_btn_box">\
				<a class="btn" href="javascript:;" onClick="closePop()">取消</a>\
				<a class="btn" href="javascript:;" onclick="shareweixin()">分享给朋友</a>\
			</div>\
		</section>\
		',
		update : '\
		<section class="pop_wrap">\
			<p>为了更好的体验活动效果，请升级到最新版乐商店</p>\
			<div class="btn_box" id="share_btn_box">\
				<a class="btn" href="javascript:;" onClick="closePop()">取消</a>\
				<a class="btn" onclick="lestoreapp()">升级</a>\
			</div>\
		</section>\
		',
		getRule : '\
		<section class="pop_wrap">\
			<h3>点击“邀请”发送给好友，好友通过邀请码回到活动中并成功兑换机会（每人每日限兑换3次），同时邀请人获得一个机会（每人每日限得1个）。</h3>\
			<div class="btn_box">\
				<a class="btn" href="javascript:;" onClick="closePop()">关闭</a>\
			</div>\
		</section>\
		',
		prizeUseDesc : '\
		<section class="pop_wrap pop_intro">\
			<h2><strong>奖品使用说明</strong></h2>\
			<div class="line"></div>\
			<div class="prize_intro_wrap">\
				<h3><strong>3000元旅游基金，手机：</strong></h3>\
				<p>将在活动结束后15个工作日内邮寄。</p>\
				<h3><strong>京东卡：</strong></h3>\
				<p>在京东商城购物结算时使用，可抵现金。</p>\
				<h3><strong>30元及2元话费：</strong></h3>\
				<p>将在活动结束后15个工作日内充值到账。</p>\
				<h3><strong>10元Q币：</strong></h3>\
				<p>1.登录腾讯充值中心http://www.pay.qq.com/；<br/>2.选择充Q点/Q币-QQ卡；</p>\
			</div>\
			<div class="btn_box">\
				<a class="btn" href="javascript:;" onClick="closePop()">关闭</a>\
			</div>\
		</section>\
		',
		exchange_fail : '\
		<section class="pop_wrap">\
			<h2>#{msg}</h2>\
			<div class="btn_box">\
				<a class="btn" href="javascript:;" onClick="closePop()">关闭</a>\
			</div>\
		</section>\
		',
		verify_code : '\
		<section class="pop_wrap">\
			<h2>请输入验证码</h2>\
			<div class="winner_info">\
				<p><input disabled="disabled" type="text" id="verify_box" /><span id="verify_img"></span></p>\
			</div>\
			<div class="btn_box" id="vc_btn">\
				<a class="btn" onClick="confirmPrize(this)" data-type="#{type}" data-prizeid="#{prizeid}" data-prizename="#{name}">确定</a>\
			</div>\
		</section>\
		',
		lottery_qq : '\
		<section class="pop_wrap">\
			<h2>恭喜您<br/>获得<strong>#{name}</strong></h2>\
			<p>请牢记你的充值卡卡密。关闭此页面后你可以在“我的奖品”页面查看。</p>\
			<h5>#{cardNumber}</h5>\
			<h5>#{cardPassword}</h5>\
			<p>请登录腾讯官网，按 提示充值至你的QQ号中。</p>\
			<div class="btn_box">\
				<a class="btn" href="activity.html?score_anchor">赚机会</a>\
				<a class="btn" onClick="closePop()">再玩一次</a>\
			</div>\
		</section>\
		',
		lottery_fail : '\
		<section class="pop_wrap">\
			<h2>亲，再接再厉，不要灰心哦！</h2>\
			<div class="btn_box">\
				<a class="btn" href="activity.html?score_anchor">赚机会</a>\
				<a class="btn" onClick="closePop()">再玩一次</a>\
			</div>\
		</section>\
		',
		lottery_noscore : '\
		<section class="pop_wrap">\
			<h2>您已经没有抽奖机会了！</h2>\
			<div class="btn_box">\
				<a class="btn" href="activity.html?score_anchor">去赚机会</a>\
				<a class="btn" onClick="closePop()">随便看看</a>\
			</div>\
		</section>\
		'
	},
	initEle = function(){
		LENOVO.com.ui.dialog.ready();
		initEle = null;	
	},
	initData = function(obj){
		if(obj.userName){
			document.querySelector("input[name='userName']").value = obj.userName;	
		}
		if(obj.phoneNumber){
			document.querySelector("input[name='phoneNumber']").value = obj.phoneNumber;	
		}
		if(obj.province){
			var province_sel = document.querySelector("select[name='province']");
			for(i=0;i<province_sel.options.length;i++){//给select赋值  
				if(obj.province==province_sel.options[i].value){  
				  province_sel.options[i].selected=true;
				  if(province_sel.id=="province"){
				  	province_sel.onchange();
				  }
				}  
			}
			
		}
		if(obj.city){
			var city_sel = document.querySelector("select[name='city']");
			for(i=0;i<city_sel.options.length;i++){//给select赋值  
				if(obj.city==city_sel.options[i].value){  
				  city_sel.options[i].selected=true;
				  city_sel.onchange(); 
				}  
			}
		}
		if(obj.region){
			var area_sel = document.querySelector("select[name='region']");
			for(i=0;i<area_sel.options.length;i++){//给select赋值  
				if(obj.region==area_sel.options[i].value){  
				  area_sel.options[i].selected=true  
				}  
			}
		}
		if(obj.address){
			document.querySelector("input[name='address']").value = obj.address;	
		}
		if(obj.supplier){
			var operator_sel = document.querySelector("select[name='supplier']");
			for(i=0;i<operator_sel.options.length;i++){//给select赋值  
				if(obj.supplier==operator_sel.options[i].value){  
				  operator_sel.options[i].selected=true  
				}  
			}
		}
		if(obj.logId){
			document.querySelector("input[name='logId']").value = obj.logId;	
		}
	},
	winpop = function(type,obj,info){
		//兑换实物奖
		if(type==0){
			var tpl = poptpl.mob;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl,function(){
				LENOVO.com.util.loadJS("js/cities.js",function(){
					if(obj){
						initData(obj);	
					}
				});
					
			});
		
			
		//兑换充值卡（直接放卡号）
		}else if(type==1){
			var tpl = poptpl.card1;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl);
			
			
		
		//兑换充值卡（需要填）
		}else if(type==2){
			var tpl = poptpl.card2;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl);
			if(obj){
				initData(obj);	
			}	
			
		//分享
		}else if(type==3){
			LENOVO.com.ui.dialog.open(poptpl.share);	
			
		//获取规则
		}else if(type==4){
			LENOVO.com.ui.dialog.open(poptpl.getRule);	
		//奖品使用说明	
		}else if(type==5){
			LENOVO.com.ui.dialog.open(poptpl.prizeUseDesc);	
			
		//兑奖失败
		}else if(type==6){
			var tpl = poptpl.exchange_fail;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl);
		
		//兑换填验证码
		}else if(type==7){
			var tpl = poptpl.verify_code;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl,function(){
				LENOVO.ex.verifycode.init("verify_img");	
			});	
			
		//抽奖q币
		}else if(type==8){
			var tpl = poptpl.lottery_qq;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl);
			
		
		//抽奖失败
		}else if(type==10){
			LENOVO.com.ui.dialog.open(poptpl.lottery_fail);	
		
		//抽奖积分不够
		}else if(type==11){
			var tpl = poptpl.lottery_noscore;
			if(info){
				tpl = LENOVO.com.tpl.format(tpl, {}, info);	
			}
			LENOVO.com.ui.dialog.open(tpl);
		
		//升级弹窗
		}else if(type==12){
			LENOVO.com.ui.dialog.open(poptpl.update);	
		
		}
	},
	
	adjustTop = function(){
		var popbox = document.querySelector("#dialogWrapper");
		var inputList = document.querySelector(".pop_wrap").querySelectorAll("input");
		var len = inputList.length;
		var userAgent = navigator.userAgent;  
		var index = userAgent.indexOf("Android");
		var androidVersion;
		for(var i=0;i<len;i++){
			(function(i){
				inputList[i].addEventListener('click',function(){
					if(index >= 0){  
						androidVersion = parseFloat(userAgent.slice(index+8));   
						if(androidVersion>=4){  
							setTimeout(function(){
								if( inputList[i].name == "address"){
									popbox.style.top = "-50px";	
								}else{
									if(popbox.style.top != "20px"){
										popbox.style.top = "20px";
									}
								}
								this.focus();
							},200);
						}
					}
				});	
				
				inputList[i].addEventListener('blur',function(){
					if(index >= 0){  
						androidVersion = parseFloat(userAgent.slice(index+8));   
						if(androidVersion>=4){  
							setTimeout(function(){
								if( inputList[i].name == "address"){
									popbox.style.top = "20px";	
								}
							},200);
						}
					}
				});	
				
			})(i)
			
		}
	},
	
	init = function(type,obj,info){
		if(initEle){
			initEle();	
		}
		winpop(type,obj,info);
		adjustTop();
	}
	return {init:init}
})()


var global_t;

//验证码
LENOVO.namespace('LENOVO.ex.verifycode');
LENOVO.ex.verifycode = (function(){
	var
	get = function(id){
		var verify_img = document.querySelector("#"+id);
		global_t = new Date().getTime();
		verify_img.innerHTML = '<img src="captcha.do?t='+global_t+'" />';
	},
	change = function(id){
		verify_img.addEventListener('click',function(){
			get(id);	
		});
	},
	init = function(id){
		get(id);
		change(id);
	}
	return {init:init}	
})()


//实物奖获奖信息提交
LENOVO.namespace('LENOVO.win.mob');
LENOVO.win.mob = (function(){
	var
	elements = function(){
		return document.querySelectorAll("#winner_tel input,#winner_tel select");
	},
	validate = function(){
		var
		allEle = elements(),
		i=0,
		len = allEle.length,
		val,
		name,
		param = new Object;
		for(;i<len;i++){
			val = allEle[i].value;
			name = allEle[i].name;
			if(val==""||val=="请选择"){
				showToast("请填写相关内容");
				return false;
			}
			if(name=="phoneNumber" && !/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/.test(val)){
				showToast("请正确填写手机号");
				return false;	
			}
			param[name] = val;
		}
		return param;
	},
	submit = function(){
		var param = validate();
		if(param){
			param = JSON.stringify(param);
			param = param.substring(1,param.length-1).replace(/,/g,"&").replace(/:/g,"=").replace(/"/g,"");
			var bBtn = true;
			if(bBtn){
				bBtn = false;
				LENOVO.com.ajax.post('savePrizeTypeOneContactInfo.do',param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
					bBtn = true;
					if(data.ret==true){
						closePop();
						showToast("信息已提交");
						if(typeof(LENOVO.prize.mine.init)!='undefined'){
							LENOVO.prize.mine.init();
						}
						if(typeof(LENOVO.prize.list.init)!='undefined'){
							LENOVO.prize.list.init();
						}
						
					}else{
						showToast(data.msg);	
					}
				});
			}
		}
	},
	init = function(){
		submit();
	};
	return{init : init}	
})()

//电话卡获奖信息提交
LENOVO.namespace('LENOVO.win.card');
LENOVO.win.card = (function(){
	var
	elements = function(){
		return document.querySelectorAll("#winner_card input,#winner_card select");
	},
	validate = function(){
		var
		allEle = elements(),
		i=0,
		len = allEle.length,
		val,
		name,
		param = new Object;
		for(;i<len;i++){
			val = allEle[i].value;
			name = allEle[i].name;
			if(val==""||val=="请选择"){
				showToast("请填写相关内容");
				return false;
			}
			if(name=="phoneNumber" && !/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/.test(val)){
				showToast("请正确填写手机号");
				return false;	
			}
			param[name] = val;
		}
		return param;
	},
	submit = function(){
		var param = validate();
		if(param){
			param = JSON.stringify(param);
			param = param.substring(1,param.length-1).replace(/,/g,"&").replace(/:/g,"=").replace(/"/g,"");
			var bBtn = true;
			if(bBtn){
				bBtn = false;
				LENOVO.com.ajax.post('savePrizeTypeThreeContactInfo.do',param,{"clientid":getclientid(),"lpsust":getLpsUst()},function(data){
					bBtn = true;
					if(data.ret==true){
						closePop();
						showToast("信息已提交");
						if(typeof(LENOVO.prize.mine.init)!='undefined'){
							LENOVO.prize.mine.init();
						}
						if(typeof(LENOVO.prize.list.init)!='undefined'){
							LENOVO.prize.list.init();
						}
						
					}else{
						showToast(data.msg);	
					}	
				});
			}
		}
	},
	init = function(){
		submit();
	};
	return{init : init}	
})()


//实物提交信息
function submit_mob(){
	LENOVO.win.mob.init();	
}

//电话卡提交信息
function submit_telcard(){
	LENOVO.win.card.init();	
}

//改变机会数量
function diceNumChange(num){
	document.querySelector("#diceNum").innerHTML = num;
}

//改变积分数
function scoreChange(score){
	document.querySelector("#score").innerHTML = score;
}

//获奖弹窗
function win_edit(e){
	var type = e.getAttribute('data-type');
	var info = e.getAttribute('data-info');
	var prizeinfo = {
		'name' : e.getAttribute('data-prizeinfo')
	}
	LENOVO.win.pop.init(type,JSON.parse(info),prizeinfo);	
}


//获取lpsust
function getLpsUst(){
	var lpsust;
	if(global && typeof(global.getLpsUst)!="undefined"){
		if(parseInt(global.getVersionCode()) < 61000){
			lpsust = global.getLpsUst(0);
		}else{
			lpsust = global.getLpsUst(BASE.realm,0);
		}
		/*if(lpsust && lpsust != ''){
			LENOVO.com.cookie.set("lpsust",lpsust,1);	
		}*/
	}else{
		lpsust = LENOVO.com.cookie.get("lpsust");
		if(lpsust=="null"){
			lpsust = '';	
		}
	}
	
	return typeof(lpsust) == 'undefined' ? '' : lpsust;
	
}


//获取IMEI号
function getime(){
	if(global && typeof(global.getApp5IMEI) != 'undefined'){
		return global.getApp5IMEI();
	}else if(global && typeof global.getClientId != 'undefined'){
		return global.getClientId();
	}else{
		return '';	
	}
}

//获取clientId
function getclientid(){
	if(global && typeof(global.getClientId) != 'undefined'){
		return global.getClientId();
	}else{
		return '';	
	}
}

function closePop(){
	LENOVO.com.ui.dialog.close();	
}


if(global && typeof(global.setHeaderView) != 'undefined'){
	global.setHeaderView(document.title);
}

//最新版乐商店的app下载
function lestoreapp(){
	if(global){
		var packageName = 'com.lenovo.leos.appstore',
		//versionCode = '61110',
		versionCode = BASE.lastestvc,
		//downloadurl = 'http://ams.lenovomm.com/ams/3.0/appdownaddress.do?ic=0&dt=1&ty=2&pn=com.lenovo.leos.appstore&cid=17148&tcid=12346',
		downloadurl = BASE.downloadurl,
		name = '乐商店',
		iconurl = 'http://img.lenovomm.com/crawler@cluster-1/ams/fileman/img/icon/2014-05-21100237-_1400680957981_8905.png';
		global.startDownload(packageName,versionCode,downloadurl,name,iconurl);	
	}
	
	closePop();	
}

//版本低直接弹窗升级
function updateApp(){
	if(global && ( parseInt(global.getVersionCode()) < BASE.checkedvc || typeof(global.showLogin)=="undefined" )){
		LENOVO.win.pop.init(12);
		return false;
	}else{
		return true;	
	}
}

//格式化用户名
function formatUserName(str){
	str = str.replace(/@.+/,'');
	var reg = /(^.{2})(.*)(.{2})$/;
	if(str.length>=5){
		var match = reg.exec(str);
		str = match[1];
		str += '***';
		/*for(var i = 0; i <match[2].length; i++) {
			str += '*';
		}*/
		return str + match[3];
	}else{
		return str;	
	}
}

//判断日期时间是否到了(true：到了 false：没到)
//2014/9/7 00:00:00
function dateCheck(dateStr){
	var curTime = new Date().getTime();
	var targetTime = new Date(dateStr).getTime();
	return curTime < targetTime ? false : true;
}

//avatar打桩
function avatarTracker(category,action,label,ref,appName){
	var avatarData = [category,action,label],avatarParams=[];
	avatarParams.cpn = window.location.href;
	if(appName){
		avatarParams.app = appName;
	}
	avatarParams.act = "";
	avatarParams.ref = ref;
	avatarData.push(avatarParams);
	Avatar.track(avatarData, false);	
}


//活动结束弹窗
function ending(){
	LENOVO.win.pop.init(6,{},{"msg":"活动已结束<br/>感谢您的参与"});	
}

//底部链接打桩
setTimeout(function(){Avatar.push(["register",".bottomLink", TRACKER.enterBottomLink]);},5000);


//百度统计
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F04ffe61048b600908188038ff243dec8' type='text/javascript'%3E%3C/script%3E"));