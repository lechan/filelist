//2015.1.6



(function($) {	
	var os=detectOS();
	function detectOS() {
		var	userAgent=navigator.userAgent;
		console.log(userAgent);
		var os = {};
		os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
		os.androidICS = os.android && userAgent.match(/(Android)\s4/) ? true : false;
		os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
		os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
		os.ios = os.ipad || os.iphone;
		os.wp=userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
		os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
		if(os.ios) os.iosVer=parseInt(userAgent.match(/OS \d_/)[0].match(/\d/)[0]);
		else os.iosVer=0;
		return os;
	}
	function randomRange(min, max) {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	}
	function randomPlus() {
		return Math.random()<0.5?-1:1;
	}
	function getDeg(pos1,pos2){
		var deg;
		if(pos1[0]==pos2[0] && pos1[1]==pos2[1]){deg=0;}
		else{
			var dis_y=pos2[1]-pos1[1];
			var dis_x=pos2[0]-pos1[0];	
			deg=Math.atan(dis_y/dis_x)*180/Math.PI;
			if (dis_x<0) {deg=180+deg;}
			else if (dis_x>=0 && dis_y<0) {deg=360+deg;}
		}//end else
		return deg;
	}
	
	$.fn.extend({
		leafOn: function(option) {	
			var _this=$(this);
			var _x=-1,_y=-1,_box,_num=20,_speed=1,_ratio=5,_roll=true,_skew=true,_type=1,_style='style',_timer,_data=[];
			var isIphone4=os.ios && screen.width==320 && screen.height==480;
			if(option){
				_num = option.number!=null?option.number:20;
				_speed = option.speed!=null?option.speed:1;
				_ratio = option.ratio!=null?option.ratio:5;
				_roll = option.roll!=null?option.roll:true;
				_skew = option.skew!=null?option.skew:true;
				_type = option.type!=null?option.type:1;
				_style = option.style!=null?option.style:'style';
				_x=option.x!=null?option.x:-1;
				_y=option.y!=null?option.y:-1;
			}//end if
			if(isIphone4) _num=Math.floor(_num/2);
			
			init();
			
			function init(){
				_this.on('off',_this_off);
				box_creat();
			}//end func	
			
			function _this_off(e){
				_this.off('off',_this_off);
				_this.empty();
				clearInterval(_timer);
			}//end func
			
			function box_creat() {
				for(var i=0; i<_num; i++) $('<i></i>').appendTo(_this);
				_box=_this.children();
				_box.each(function(i) {
					box_set($(this),i,true);
				});
				_timer=setInterval(_timerFunc,50);
			}//end func
			
			function box_set(box,i,start){
				start=start||false;
				if(_type>1) box.removeClass().addClass(_style+randomRange(1,_type));
				var ratio=randomRange(1,_ratio);//远近比例参数,10 LEVEL
				if(_ratio>1) var scale=0.1+ratio*0.18;
				else var scale=1;
				var x_tar=randomRange(0,_this.width());
				if(_x!=-1) var x=_x;
				else var x=randomRange(0,_this.width());
				if(_y!=-1) var y=_y;
				else{
					if(start) var y=randomRange(-box.height(),_this.height());
					else var y=-box.height();
				}//end else
				var deg=getDeg([_x,_y],[x_tar,_this.height()]);
				var css={x:x,y:y,scale:scale,rotate:0,perspective: 400,rotateX:randomRange(0,45),rotateY:randomRange(0,45)};
				if(_skew){
					css.skewX=randomRange(-30,30);
					css.skewY=randomRange(-30,30);
				}//end if
				_data[i]={deg:deg,x:x,y:y,orgX:x,spX:2+ratio*5,spY:_speed+ratio*0.5*randomRange(1,2),ang:randomRange(0,360),angSp:2+ratio*0.5*randomRange(1,2),timeNow:0,timeMax:randomRange(100,200),rotate:0,rotateMax:randomRange(30,60),rotateSpeed:randomRange(2,4),rotateDir:randomPlus(),rotateXSpeed:randomRange(5,10),rotateXDir:randomPlus()};
				box.css(css);
			}//end func
			
			function _timerFunc(){
				_box.each(function(i) {
					_data[i].ang+=_data[i].angSp;
					if(_x!=-1 && _y!=-1) _data[i].orgX+=_data[i].spX*0.5*Math.cos(_data[i].deg* Math.PI / 180);
					_data[i].x=_data[i].orgX+_data[i].spX*Math.sin(_data[i].ang* Math.PI / 180);
					_data[i].y=_data[i].y+_data[i].spY;
					if(_roll){
						_data[i].timeNow++;
						if(_data[i].timeNow>=_data[i].timeMax){
							_data[i].timeNow=0;
							_data[i].timeMax=randomRange(100,200)
							_data[i].rotateXDir=randomPlus();
							_data[i].rotateXSpeed=randomRange(5,10);
							_data[i].rotateMax=randomRange(30,60);
						}//end if
						_data[i].rotate+=_data[i].rotateDir*_data[i].rotateSpeed;
						if(_data[i].rotate>_data[i].rotateMax || _data[i].rotate<-_data[i].rotateMax) _data[i].rotateSpeed=-_data[i].rotateSpeed;
						$(this).css({rotate:_data[i].rotate,rotateX:'+='+_data[i].rotateXDir*_data[i].rotateXSpeed});
					}//end if
					$(this).css({x:_data[i].x,y:_data[i].y});
					if (_data[i].y>=_this.height()) box_set($(this),i);
				});
			}//end func
			
		},//end fn
		leafOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend	
})(jQuery);//闭包