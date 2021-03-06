define([],function() {
	"use strict";
	var tool = {
		/**
		 * 数据模板
		 * @param {String} tpl [html字符串，模板格式：#{id} ]
		 * @param {Object} stub [自定义方法集，返回需要进行替换的字符串]
		 * @param {Object} data [json数据]
		 * @return {String}
		 * @usage
		 *		formatTpl(tpl, stub, data)
		 * @e.g.
			var liTpl = '<li style="width:#{liWidth}px">\
							<a target="_blank" href="#{monitor}" style="width:#{liWidth}px">\
								<span class="logo" style="width:#{liWidth}px"></span>\
								<span class="txt" style="width:#{liWidth}px">#{ename}</span>\
							</a>\
						 </li>';
			var data = {
				liWidth: 73,
				name: "宝马",
				src: "http://d1.sina.com.cn/zhuyan/auto/haopin/201201/bmw.jpg",
				monitor: "http://www.sina.com.cn/",
				wbId: "1698264705",
				fullName: "宝马中国",
				mointorPrefix: "",
				gzmonitorPrefix: ""
			}
			var ename = function(){return 'BMW'};
			toast.show(formatTpl(liTpl, {"ename": ename}, data));
		 */
		formatTpl : function(tpl, stub, data) {
			return tpl.replace(/#\{(.+?)\}/g, function (match, key) {
				var result = '',
					replacer = stub[key];
				if (typeof replacer === 'undefined') {
					replacer = key;
				}
				if('[object Function]' === Object.prototype.toString.call(replacer)){
					result = replacer(data);
				} else {
					result = data[replacer];
				}
				return ('undefined' === typeof result ? '' : result);
			});
		},
		/**
		 * 滚动状态
		 * @return {Boolean} status[true:可以滚动，false：不能滚动]
		 * @return {Function} init[滚动状态初始化，默认可以滚动]
		 */
		scrollStatus : (function(){
			var
			status = true,
			init = function(){
				var self = this;
				document.addEventListener('touchmove', function(_e){
					if(!self.status){
						_e.preventDefault();
						_e.stopPropagation();
					}
				},false);
			};
			return {status : status,init : init}
		}()),
		/**
		 * 获取url的参数值
		 * @param {String} key [参数名]
		 */
		getURLParam : function(_key){
			var searchStr = window.location.search,
				paramStr, paramObj={}, paramArr, splitArr;
			if(!searchStr){return '';}
			paramStr = searchStr.slice(1);
			//单个参数
			if(paramStr.indexOf('&') === -1){
				splitArr = paramStr.split('=');
				paramObj[splitArr[0]] = splitArr[1];
			}
			//多个
			paramArr = paramStr.split('&');
			for(var i=0;i<paramArr.length;i+=1){
				splitArr = paramArr[i].split('=');
				paramObj[splitArr[0].toLowerCase()] = splitArr[1];
			}
			this.getURLParam = function(_key){
				_key=_key.toLowerCase();
				return paramObj[_key];
			};
			return this.getURLParam(_key);
		},
		/**
		 * cookie获取和设置
		 * cookie.get(_name)
		 * cookie.set(_name,_value,_day,_domain)
		 */
		cookie : (function(){
			var 
			domain = window.location.host,
			get = function(_name){
				var arr,reg=new RegExp("(^| )"+_name+"=([^;]*)(;|$)");
				if(arr=document.cookie.match(reg))
					return arr[2];
				else
					return "";
			},
			set = function(_name,_value,_day){
				var Days = _day || 1;
				var exp = new Date();
				exp.setTime(exp.getTime() + Days*24*60*60*1000);
				document.cookie = _name + "="+ _value + ";path=/;domain="+domain+";expires=" + exp.toGMTString();
			};
			return {
				get:get,
				set:set
			};
		}()),
		/**
		 * 动态加载js
		 * @param {String} url [接口地址]
		 * @param {Function} fn [回调函数]
		 */
		loadJS : function(_url,_callback){
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.onload = function(){ if(_callback){ _callback(); } };
			script.src = _url;
			document.getElementsByTagName('head')[0].appendChild(script);	
		},
		/**
         * 获取[min, max]区间内任意整数
         * @param  {Number} min 最小值
         * @param  {Number} max 最大值
         * @return {Number}     
         */
        rand : function (min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        },
		/**
		 * 格式化日期
		 * @param {String} nS [时间戳：e.g. 1430370000000]
		 * @param {String} Ft [日期格式：默认yyyy-MM-dd hh:mm:ss]
		 * @usage
		 *		formatDate(nS,Ft)
		 */
		formatDate : function(nS,Ft){
			Date.prototype.format = function(fmt){
				var o = {
					"M+" : this.getMonth()+1,                 //月份
					"d+" : this.getDate(),                    //日
					"h+" : this.getHours(),                   //小时
					"m+" : this.getMinutes(),                 //分
					"s+" : this.getSeconds(),                 //秒
					"q+" : Math.floor((this.getMonth()+3)/3), //季度
					"S"  : this.getMilliseconds()             //毫秒
				};
				if(/(y+)/.test(fmt))
					fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
				for(var k in o)
					if(new RegExp("("+ k +")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				return fmt;
			}
			Ft=Ft || "yyyy-MM-dd hh:mm:ss";
			return new Date(parseInt(nS)).format(Ft);		 
		},
		/**
		 * 倒计时
		 * @param {String} id [倒计时容器id]
		 * @param {String} deadtime [最终日期：e.g. 2014/5/26 10:00:00]
		 * @param {Function} fn [回调函数]
		 * @usage
		 *		countdown.init(id,deadtime,fn)
		 */
		countdown : (function(){
			var
			serverTime = {
				//netUrl : "showtime.do",//服务器接口
				netUrl : "http://all.vic.sina.com.cn/201301smart_app/show_time.php",
				begin : function(id,deadtime,fn){
					if(!window.diffTime){
						var startTime = new Date().getTime();
						tool.loadJS(this.netUrl,function(){
							var endTime = new Date().getTime();
							window.diffTime = ServerSeconds*1000 - startTime+parseInt((endTime-startTime)/2);
							play(id,deadtime,fn);
						});
					}else{
						play(id,deadtime,fn);
					}
				}
			},
			doubleNum = function(num){ 
				num<10?num = '0'+num:num = ''+num;
				return num;
			},
			timeCalc = function(timing){
				var
				days = Math.floor(timing / (1000 * 60 * 60 * 24)),
				hours = Math.floor(timing/(1000 * 60 * 60))%24,
				minutes = Math.floor(timing/(1000 * 60))%60,
				seconds = Math.floor((timing/1000))%60,
				numString = "<i>"+doubleNum(days*24+hours)+"</i>:<i>"+doubleNum(minutes)+"</i>:<i>"+doubleNum(seconds)+"</i>";
				return numString;
			},
			play = function(id,deadtime,fn){
				//deadtime = '2013/1/18 10:00:00';
				var 
				timer = null,
				timing = 0,
				t = new Date(deadtime).getTime(),
				curTime = new Date().getTime() + parseInt(window.diffTime),
				//curTime = new Date().getTime(),
				clock_con = document.querySelector('#'+id);
				if(clock_con && t - curTime>0){
					timer = setInterval(function(){
						timing = t - curTime;
						if(timing>=0){
							clock_con.innerHTML = timeCalc(timing);
						}else{
							clearInterval(timer);
							if(fn && '[object Function]' === Object.prototype.toString.call(fn)){
								fn();
								return false;
							}
						}
						curTime = curTime + 1000;
					},1000);
				}else{
					clock_con.innerHTML = timeCalc(timing);	
					fn();
				}
			},
			init = function(id,deadtime,fn){
				serverTime.begin(id,deadtime,fn);
				//play(id,deadtime,fn);
			};
			return {init:init};
		}()),
		debugMode : function(config,MOCK){
			var self = this;
			var debugTag = self.getURLParam("debug");
			if(debugTag && debugTag == "true"){
				for(var i in MOCK){
					if(i in config){
						config[i] = MOCK[i];	
					}
				}
			}
		},
		setMinHeight : function(){
			var h = document.documentElement.clientHeight;
			document.querySelector(".wrap").style.minHeight = h + "px";
		}
	};
	//module.exports = tool;
	return tool;
});