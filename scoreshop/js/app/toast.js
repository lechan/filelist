define(['zepto'],function() {
	"use strict";
	var global = window.lestore || window.App5 || window.newxb;
	/**
	 * 消息弹窗
	 * @return {Function} ready() [渲染弹窗容器]
	 * @return {Function} show(txt) [打开弹窗] @param {String} [消息文字] 
	 */
	var toast = (function(){
		var toastNode, toastObj,
		
		render = function(){
			
			toastObj = document.createElement("span");
			toastObj.id = "toast";
			toastObj.className = "tcenter pf";
			document.body.appendChild(toastObj);
			toastObj.innerHTML = "默认消息";
			//toastNode = document.getElementById('toast');
			render = function(_txt){
				////console.log(toastNode === toast); todo 研究为什么会不等
				//console.log(toastNode,document.getElementById('toast'),toast);
				toastObj.innerHTML = _txt;
				toastObj.style.marginLeft = - toastObj.offsetWidth / 2 +'px';
				$(toastObj).addClass('toastAnimation');
				toastObj.addEventListener("webkitAnimationStart",function(){
					////hard coding
					toastObj.style.bottom = '65px';
				});
				toastObj.addEventListener("webkitAnimationEnd",function(){
					toastObj.style.bottom = '-10em';
					$(toastObj).removeClass('toastAnimation');
				});
			};
		},
		
		show = function(_txt){
			if(global && global.showToast){
				global.showToast(_txt);	
			}else{
				render(_txt);
			}
		};
		
		return {
			////ready只包含了第一次render的引用,参考js模式
			ready: render,
			show: show
		};
	}());
	return toast;
	//module.exports = toast;
});