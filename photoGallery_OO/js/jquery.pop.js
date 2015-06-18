//--------coding by chenyan
//2011.12.21

(function($) {	
	jQuery.fn.extend({
		
		popOn: function(popY,popNoFlow,isNext,fadeTime) {	
			popY=popY || 100; //默认赋值
			popNoFlow=popNoFlow || false;//默认赋值
			isNext=isNext || false;//默认赋值
			fadeTime=fadeTime||250;
			var isIE6=$.browser.msie && $.browser.version=="6.0";
			var _this=$(this);
			var popClose=_this.find(".close");
			var popMask;
			
			if(isNext){
				$(this).wrap("<div class='popMask'></div>");
				popMask=$(this).parent();	
			}//end if
			else{
				popMask=$("#popMask");	
			}//end else
	
			if(isIE6){
				_this.css("position","absolute");
				popMask.css({"position":"absolute","left":0,"top":0});
			}//end ie6
			else{
				if(popNoFlow){
					_this.css("position","absolute");
					popMask.css({"position":"absolute","left":0,"top":0});
				}//end if
				else{
					_this.css({"position":"fixed"});
					popMask.css({"position":"fixed","left":0,"top":0});
				}//end else
			}//end not ie6
			
			popMask.show();	
			_this.fadeIn(fadeTime);
			maskReset();
			
			_this.bind('resize',popReset);//end bind
			_this.one('close',popHide);//end bind
			popClose.one('click',popHide);//end bind
			$(window).bind('resize',windowReset);//end bind
			$(window).bind('scroll',popReset);//end bind
			
			function popHide(){
				$(window).unbind('resize',windowReset);
				$(window).unbind('scroll',popReset);
				_this.unbind('resize',popReset);
				if(isNext){_this.unwrap();}else{$("#popMask").hide();}
				_this.hide();
			}//end func
			
			function windowReset(){
				//alert("window resize");//测试bind用
				maskReset();
			}//end func
			
			function maskReset(){
				popMask.width($(window).width()).height($("body").height()>$(window).height()?$("body").height():$(window).height());	
				popReset();
			}//end func
			function popReset(){
				_this.css("left",Math.floor($(window).width()/2-_this.outerWidth()/2));
				if(isIE6){
					if(popNoFlow){_this.css("top",popY);}else{_this.css("top",$(document).scrollTop()+popY);}
				}//end ie6
				else{_this.css("top",popY);}//end not ie6
			}//end func
		},//end fn
		
		popOff: function() {
			$(this).trigger('close');
		}//end fn		
			
	});//end extend	
})(jQuery);//闭包