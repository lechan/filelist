/*
 * 跨栏广告
Couplet.init({
	l : '左素材地址',
	r : '右素材地址',
	m : '触发通栏地址',
	startTime : '开始时间(例：2013-01-01)',
	endTime : '结束时间(例：2013-02-01)'	
});
 */
(function(){
var Couplet = {
	init : function(option){
		with(option){
			this.timeLimit(l,r,m,startTime,endTime);
		}
	},
	timeLimit : function(l,r,m,start,end){
		var start = this.strToDate(start);
		var end = this.strToDate(end);
		var date = new Date();
		var date_year = date.getFullYear(),
			date_month = date.getMonth(),
			date_day = date.getDate();
		date = this.strToDate(date_year + '-' + (parseInt(date_month) + 1) + '-' + date_day);
		if(date>=start && date<=end){
			this.createLeft(l);
			this.createRight(r);
			this.createMiddle(m);
			this.closeEvent_LR();
			this.closeEvent_M();
			this.mouseoverEvent();	
		}
	},
	createLeft : function(l_data){
		var left = document.createElement('div');
		left.id = 'coupletLeft';
		left.className = 'coupletAd';
		var cssText = 'width:25px; height:300px; position:fixed; _position:absolute; top:0px; left:0px; z-index:100;';
		this.loadCss(left,cssText);
		var flashBoxLeft = document.createElement('div');
		flashBoxLeft.id = 'flashLeft';
		left.appendChild(flashBoxLeft);
		this.createLRClose(left);
		document.body.appendChild(left);
		this.loadFlash(flashBoxLeft,l_data,'flash-left','25','300','transparent');
	},
	createRight : function(r_data){
		var right = document.createElement('div');
		right.id = 'coupletRight';
		right.className = 'coupletAd';
		var cssText = 'width:25px; height:300px; position:fixed; _position:absolute; top:0px; right:0px; z-index:100;';
		this.loadCss(right,cssText);
		var flashBoxRight = document.createElement('div');
		flashBoxRight.id = 'flashRight';
		right.appendChild(flashBoxRight);
		this.createLRClose(right);
		document.body.appendChild(right);
		this.loadFlash(flashBoxRight,r_data,'flash-right','25','300','transparent');
	},
	createMiddle : function(m_data){
		var middle = document.createElement('div');
		var timer = null;
		clearTimeout(timer);
		middle.id = 'coupletMiddle';
		middle.className = 'middleShow';
		var clientWidth = document.documentElement.clientWidth;
		var cssText = 'width:950px; height:90px; position:fixed; _position:absolute; top:0px; left:'+parseInt((clientWidth-950)/2)+'px; z-index:10000;';
		this.loadCss(middle,cssText);
		var flashBoxMiddle = document.createElement('div');
		flashBoxMiddle.id = 'flashMiddle';
		middle.appendChild(flashBoxMiddle);
		this.createMClose(middle);
		document.body.appendChild(middle);
		this.loadFlash(flashBoxMiddle,m_data,'flash-middle','950','90','transparent');
		timer = setTimeout(function(){
			document.getElementById('coupletMiddle').style.display = 'none';
			middle.className = '';
		},8000);
	},
	loadFlash : function(obj,src,id,w,h,wmode){
		var flash_obj ='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="'+ id +'" name="'+ id +'" width="'+ w +'" height="'+ h +'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="'+ src +'" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="allowScriptAccess" value="always" /><param name="wmode" value="'+ wmode +'" /><embed src="'+ src +'" quality="high" bgcolor="#ffffff" width="'+ w +'" height="'+ h +'" id="'+ id +'" name="'+ id +'" align="middle" play="true" loop="true" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="'+ wmode +'"></embed></object>';
		obj.innerHTML = flash_obj;	
	},
	loadCss : function(obj,cssText){
		obj.style.cssText = cssText;
	},
	createLRClose : function(parent){
		var _this = this;
		var oA = document.createElement("a");
		oA.className = 'closeBtnCouplet';
		oA.innerHTML = '<img src="http://d1.sina.com.cn/d1images/lmt/close2.gif" width="25" height="48" style="position:absolute; left:0px; bottom:-48px; z-index:10;" />';
		oA.href = 'javascript:void(0)';
		parent.appendChild(oA);
	},
	closeEvent_LR : function(){
		var closeArr = this.getClass(document,'closeBtnCouplet');
		var coupletArr = this.getClass(document,'coupletAd');
		for(var i=0;i<closeArr.length;i++){
			closeArr[i].onclick = function(){
				for(var j=0;j<coupletArr.length;j++){
					document.body.removeChild(coupletArr[j]);	
				}
			}
		}
	},
	createMClose : function(parent){
		var _this = this;
		var oA = document.createElement("a");
		oA.id = 'closeM';
		oA.innerHTML = '<img src="http://d2.sina.com.cn/d1images/lmt/cls_66x22.gif" width="66" height="22" style="position:absolute; right:0px; bottom:-22px; z-index:10;" />';
		oA.href = 'javascript:void(0)';
		parent.appendChild(oA);
	},
	closeEvent_M : function(){
		var closeM = document.getElementById('closeM');
		var coupletMiddle = document.getElementById('coupletMiddle');
		closeM.onclick = function(){
			coupletMiddle.style.display = 'none';
			coupletMiddle.className=='';
		}
	},
	mouseoverEvent : function(){
		var coupletArr = this.getClass(document,'coupletAd');
		
		for(var i=0;i<coupletArr.length;i++){
			coupletArr[i].onmouseover = function(){
				var timer = null;
				clearTimeout(timer);
				var coupletMiddle = document.getElementById('coupletMiddle');
				if(coupletMiddle.className==''){
					coupletMiddle.style.display = 'block';
					coupletMiddle.className=='middleShow';
					timer = setTimeout(function(){
						coupletMiddle.style.display = 'none';
						coupletMiddle.className=='';
					},8000);
				}
			}
		}
		
	},
	
	getClass : function(oParent,sClass){
		var parent = oParent || document;
		var re = new RegExp('\\b'+sClass+'\\b');
		var aEles = parent.getElementsByTagName('*');
		var arr = [];
		for(var i=0; i<aEles.length; i++){
			if(re.test(aEles[i].className)){arr.push(aEles[i]);}
		}
		return arr;
	},
	strToDate : function(str,ext){
		var arys = new Array();
		arys = str.split('-');
		var newDate = new Date(arys[0],arys[1]-1,arys[2],0,0,0);
		if(ext){
			newDate = new Date(newDate.getTime()+1000*60*60*24);
		}
		return newDate;
	}
}

window.Couplet = Couplet;

})()