(function(){
	var localData={hname:location.hostname?location.hostname:'localStatus',isLocalStorage:window.localStorage?true:false,dataDom:null,initDom:function(){if(!this.dataDom){try{this.dataDom=document.createElement('input');this.dataDom.type='hidden';this.dataDom.style.display="none";this.dataDom.addBehavior('#default#userData');document.body.insertBefore(this.dataDom,document.body.firstChild)}catch(ex){return false}}return true},set:function(config){if(this.isLocalStorage){window.localStorage.setItem(config.key,config.value);if(config.expires){var expires;if(typeof config.expires=='number'){expires=new Date();expires.setTime(expires.getTime()+config.expires*60000)}window.localStorage.setItem(config.key+".expires",expires)}}else{if(this.initDom()){this.dataDom.load(this.hname);this.dataDom.setAttribute(config.key,config.value);this.dataDom.save(this.hname);if(config.expires){var expires;if(typeof config.expires=='number'){expires=new Date();expires.setTime(expires.getTime()+config.expires*60000)}this.dataDom.expires=expires.toUTCString()}}}},get:function(config){if(this.isLocalStorage){var result=window.localStorage.getItem(config.key);if(result){var expires=window.localStorage.getItem(config.key+".expires");result={value:result,expires:expires?new Date(expires):null};if(result&&result.expires&&result.expires<new Date()){result=null;window.localStorage.removeItem(config.key)}else{return result.value}}}else{if(this.initDom()){this.dataDom.load(this.hname);var result=this.dataDom.getAttribute(config.key);if(result){var expires=this.dataDom.expires;result={value:result,expires:expires?new Date(expires):null};if(result&&result.expires&&result.expires<new Date()){result=null;this.remove(config)}else{return result.value}}}}},remove:function(config){if(this.isLocalStorage){localStorage.removeItem(config.key)}else{if(this.initDom()){this.dataDom.load(this.hname);this.dataDom.removeAttribute(config.key);var expires=new Date();expires.setTime(expires.getTime()-1);this.dataDom.expires=expires.toUTCString();this.dataDom.save(this.hname)}}}}

	var url,cssText,media_tag=$SCOPE.video.media_tag;

	var addStyle = function(cssText){
		var style = document.createElement('style');
		style.type = "text/css";
		if(style.styleSheet) { //IE
			style.styleSheet.cssText = cssText;
		} else { //w3c
			style.innerHTML = cssText;
		}
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	if(media_tag){

		switch (media_tag){

			/*素材投放 begin*/

			//单素材投放方式：url = "a.jpg"
			//轮播素材投放方式：url = ["a.jpg","b.jpg","c.jpg"]

			//NBA直播台：361,adidas
			case '684_16841017' : 
			url = 'http://d1.sina.com.cn/201311/29/525101.jpg'; 
			cssText = '.VM_title .headtitle a.txt{ color:#fff;}.VM_title .headtitle a.txt:hover{color:#fff;}.VM_title .title{color:#fff;}';
			break;

			//中超直播台：嘉士伯
			case '684_16841011' : 
			url = 'http://d2.sina.com.cn/201306/20/497797_1920x1280news.jpg'; 
			cssText = '.VM_title .headtitle a.txt{ color:#fff;}.VM_title .headtitle a.txt:hover{color:#fff;}.VM_title .title{color:#fff;}';
			break;

			//清扬
			case '684_168410111' : 

			var client_w = document.documentElement.clientWidth;
			if(client_w<=1024){
				url = 'http://d4.sina.com.cn/shh/lechan/videolive/clear/video-BG_1024768.jpg'; 
			}else if(client_w>1024&&client_w<=1680){
				url = 'http://d5.sina.com.cn/shh/lechan/videolive/clear/video-BG_16801280.jpg'; 
			}else{
				url = 'http://d4.sina.com.cn/shh/lechan/videolive/clear/video-BG_1029.jpg'; 	
			}
			cssText = '.VM_title .headtitle a.txt{ color:#fff;}.VM_title .headtitle a.txt:hover{color:#fff;}.VM_title .title{color:#fff;}';
			break;

			/*素材投放 end*/

		}
		if(url&&url!=''){
			if(url instanceof Array){
				var bgads_num = localData.get({key:"bgads"});
				if(bgads_num){
					if(bgads_num==url.length-1){
						bgads_num =0;
					}else{
						bgads_num++;	
					}
				}else{
					bgads_num =0;
				}
				localData.set({key:"bgads",value:bgads_num});	
				document.getElementById("live_page_container").style.cssText = 'background:url('+ url[bgads_num] +') fixed no-repeat center top;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;';
			}else{

				document.getElementById("live_page_container").style.cssText = 'background:url('+ url +') fixed no-repeat center top;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;';
			}
		}
		if(cssText&&cssText!=''){
			addStyle(cssText);
		}
	}
})()