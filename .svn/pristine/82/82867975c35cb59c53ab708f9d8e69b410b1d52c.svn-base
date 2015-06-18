define([],function() {
	"use strict";
	/**
	 * 自定义弹窗
	 * @return {Function} ready() [渲染弹窗容器]
	 * @return {Function} open(_html,fn) [打开弹窗] @param {String} [弹窗html内容] @param {Function} [弹窗open后的回调函数]
	 * @return {Function} close() [关闭弹窗]
	 */
	var dialog = (function(){
		var 
		mask,
		dialogWrapper,
		userAgent = navigator.userAgent,
		index = userAgent.indexOf("Android"),
		androidVersion = parseFloat(userAgent.slice(index+8)),
		render = function(allowScroll){
			mask = document.createElement("div");
			mask.id = "mask";
			mask.className = "pa";
			dialogWrapper = document.createElement("div");
			dialogWrapper.id = "dialogWrapper";
			dialogWrapper.className = index >= 0 ? (androidVersion < 4 ? "pa" : "pf") : "pf";
			document.body.appendChild(mask);
			document.body.appendChild(dialogWrapper);
			if(!allowScroll || allowScroll==false){
				document.addEventListener('touchmove', function(_e){
					if(window.getComputedStyle(mask,null).display === 'block'){
						_e.preventDefault();
						_e.stopPropagation();
					}
				},false);
			}
			//mask.onclick = function(){close(); }
			render = function(){
				mask.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + "px";
				mask.style.display = 'block';
				/*if(index >= 0){  
					var androidVersion = parseFloat(userAgent.slice(index+8));   
					if(androidVersion<4){  
						// 版本小于4
						mask.style.display = 'none';
					}else{
						mask.style.display = 'block';
					}
				}else{
					mask.style.display = 'block';
				}*/
				
			};
		},
		
		open = function(_html,fn){
			var sectionStyle,
			goCenter = function(h){
				dialogWrapper.style.top = (document.documentElement.clientHeight - parseFloat(h))/2 + 'px';
				dialogWrapper.style.left = "50%";
				dialogWrapper.style.marginLeft = - dialogWrapper.offsetWidth / 2 +'px';
			}
			//var scrollTop = parseInt(document.body.scrollTop, 10);
			render();
			if(_html){
				dialogWrapper.innerHTML = _html;
				dialogWrapper.style.display = 'block';		
				sectionStyle = window.getComputedStyle(dialogWrapper, null);
				goCenter(sectionStyle.height);
				if(fn){
					fn();
				}
				//console.log(scrollTop + document.documentElement.clientHeight - parseFloat(sectionStyle.height))
			}
			window.onresize = function(){
				//goCenter(sectionStyle.height);
				mask.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 'px';
			}
			////todo 包装wrapper
		},
		
		close = function(){
			mask.style.display = 'none';
			dialogWrapper.style.display = 'none';
		};
		
		return {
			ready: render,
			open: open,
			close: close
		};
		
	}());
	return dialog
	//module.exports = dialog;
});