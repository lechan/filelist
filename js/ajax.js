(function () {
	var Ajax = {
		_ajax : null,
		get : function (url, data, fn) {
			this.ajax({
					url : url,
					data : data,
					fn : fn,
					type : 'GET'
				});
		},
		post : function (url, data, fn) {
			this.ajax({
					url : url,
					data : data,
					fn : fn,
					type : 'POST'
				});
		},
		ajax : function (obj) {
			typeof obj.data == 'function' && (obj.fn = obj.data, obj.data = {});
			if (window.XMLHttpRequest) {
				this._ajax = new XMLHttpRequest();
			} else {
				this._ajax = new ActiveXObject('Microsoft.XMLHTTP');
			}
			var para = '';
			for (var i in obj.data) {
				para += i + '=' + obj.data[i] + '&';
			}
			para = para.substr(0, para.length - 1);
			this._ajax.open(obj.type || 'GET', obj.type == 'GET' ?
				obj.url.indexOf('?') != -1 ?
				(obj.url + '&' + para) :
				(obj.url + '?' + para) :
				obj.url, true);
			obj.type == 'POST' && this._ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			this._ajax.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					obj.fn(this.responseText);
				}
			};
			this._ajax.send(obj.type == 'POST' ? para : null);
		},
		abort : function () {
			this._ajax.abort();
		}
	};
	window.Ajax = Ajax;
})();