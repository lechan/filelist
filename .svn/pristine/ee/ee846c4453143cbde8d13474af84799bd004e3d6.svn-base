/*
 * 作者 hyl
 * qq:623186518
 * 该列子仅供参考
 */
var mySwiper1;
var mySwiper;
function goLocation(i){
	mySwiper.swipeTo(i, 300, function(){});
	setClass(i);
}
$(document).ready(function(){
 mySwiper = new Swiper('.swiper-container', {
			pagination : '.pagination',
			paginationClickable : true
			,
		});
mySwiper1 = new Swiper('.swiper-container1', {
			pagination : '.pagination',
			paginationClickable : true,
			slidesPerView : 5
});
mySwiper.params.onSlideNext = function() {
	var index = mySwiper.activeIndex;
	mySwiper1.swipeTo(index, 300, function() {
			});
	var slidleft = $("#slide" + index).offset().left;
	$(".bar").offset({
				left : slidleft
			});
	setClass(index);
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
	setClass(index);
}
  $("div[name='title']").each(function(index, el) {
		$(el).click(function(){
			goLocation(index);
			var slidleft = $("#slide" + index).offset().left;
			$(".bar").offset({
						left : slidleft
					});
		});
	});
});

/*--------------------socroll---------------------------------------------------*/
var myScroll0;
var myScroll1;
var myScroll2;
var myScroll3;
var myScroll4;
var myScroll5;
var myScroll6;
var myScroll7;
var myScroll8;
var myScroll9;
function loaded() {
	myScroll0 = new iScroll('wapper0');
	myScroll1 = new iScroll('wapper1');
	myScroll2 = new iScroll('wapper2');
	myScroll3 = new iScroll('wapper3');
	myScroll4 = new iScroll('wapper4');
	myScroll5 = new iScroll('wapper5');
	myScroll6 = new iScroll('wapper6');
	myScroll7 = new iScroll('wapper7');
	myScroll8 = new iScroll('wapper8');
	myScroll9 = new iScroll('wapper9');
}

document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);

document.addEventListener('DOMContentLoaded', loaded, false);
/*--------------------socroll-----------------------------------------------------*/
function goto(url) {
	window.location.href = url;
}
function setClass(i) {
	$("div[name='title']").each(function(index, el) {
				if (index != i) {
					if ($(el).hasClass("cuurent")) {
						$(el).removeClass("cuurent");
					}
				} else {
					$(el).addClass("cuurent");
				}
			});

}
