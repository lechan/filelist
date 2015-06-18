(function() {
	var attachURL2Window = function() {
		var links = document.getElementsByTagName("a");
		var keywords = ["uclvideo/","g/ucl/"];
		for (var i = 0, len = links.length; i < len; i++) {
			links[i].onclick = function(){
				var href = this.href;
				for(var j=0;j<keywords.length;j++){				
					if(href.indexOf(keywords[j])!=-1){
						var writeCookie = function(O, o, l, I, p) {
						var i = "",
						c = "",
						path = "";
						if (l != null) {
							if(l == "NaN"){
								i = ";";
							}else{
								i = new Date((new Date).getTime() + l * 3600000);
								i = "; expires=" + i.toGMTString();
							}
						};
						if (I != null) {
							c = ";domain=" + I
						};
						if(p != null){
							path = ";path=" + p;
						};
						document.cookie = O + "=" + escape(o) + i + c + path;
						};
						writeCookie("uclAd","true",1,".sina.com.cn","/");
					}
				}
			};
		}
	};

	attachURL2Window();

})()