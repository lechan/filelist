var ipLimit = {
	init : function(cookiename,num){
		var cookie_value = this.cookie.get(cookiename);
		if(cookie_value==null){
			this.cookie.set(cookiename,1,{"path":"/","domain":".lechan.sinaapp.com","expires":24*3600000});
		}else{
			this.cookie.set(cookiename,parseInt(cookie_value)+1,{"path":"/","domain":".lechan.sinaapp.com","expires":24*3600000});	
		}
		if(cookie_value<num){
			return true;
		}else{
			return false;	
		}
	},
	cookie : {
		_isValidKey : function (key) {
            return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
        },
		get : function(key){
			if (this._isValidKey(key)) {
                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                    result = reg.exec(document.cookie);
                     
                if (result) {
                    return result[2] || null;
                }
            }
            return null;
		},
		set : function(key, value, options){
			options = options || {};

			// 计算cookie过期时间
			var expires = options.expires;
			if ('number' === typeof options.expires) {
				expires = new Date();
				expires.setTime(expires.getTime() + options.expires);
			}
			document.cookie =
				key + "=" + value +
				(options.path ? "; path=" + options.path : "") +
				(expires ? "; expires=" + expires.toGMTString() : "") +
				(options.domain ? "; domain=" + options.domain : "") +
				(options.secure ? "; secure" : '');
		},
		remove : function(key, options){
			options = options || {};
            options.expires = new Date(0);
            this.set(key, '', options);
		}	
	}
}