(function(win, loc){
    //var DEBUG=true;
    win.JSFILE=(typeof(DEBUG)=="undefined"?"":"avatar/")+"avatar.js";
    getQueryString=function(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1){
            return "";
        }
        return result[1];
    }

    win.TRACKER={
		
		//底部入口
		enterBottomLink:function(evt, trackTarget){
			var target=evt.target,
                data=["_NEWUA_","clickBottomLink","点击进入"],
                params={};
            params.cpn=loc.href;//cpn
            params.act="click";
            params.ref=loc.href+";"+document.referrer;
            data.push(params);
			return data;	
		}
    };
	
	
	var global = window.lestore || window.App5 || window.newxb;
	var avatar=window.Avatar||[];
	var pref=document.referer===undefined ? "" : document.referer;
	window.Avatar=avatar;
	setTimeout(function(){
		avatar.push({
			startTime:new Date().getTime(),
			PVInfo:{EVENT_ACTION:"act#"+EVENT_ACTION_PAGE,ref:window.location.href+";"+pref},
			appKey:"2RP9BIQ38FL9",
			delay:0,
			versionName: (global && typeof(global.getVersion) !="undefined") ? global.getVersion() : "1.0.0.55",
			versionCode: (global && typeof(global.getVersionCode) !="undefined") ? String(global.getVersionCode()) : "55"
		});//configs
		
		var scriptTag = document.createElement('script');
		scriptTag.type = 'text/javascript';
		scriptTag.async = true;
		//scriptTag.src = "js/"+JSFILE;
		scriptTag.src = "http://www.lenovomm.com/w3g/w3g/js/avatar.js";
		document.head.appendChild(scriptTag);
	},200);
		
		
})(window, window.location);

