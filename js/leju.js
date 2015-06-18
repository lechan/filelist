/**
 * leju ad
 * @author acelan(xiaobin8[at]staff.sina.com.cn)
 * @date   2013-03-25
 */
(function (glo, doc) {
    /**
     * 工具类
     */
    var util = {
        g : function (id) {
            return document.getElementById(id);
        },

        encodeHTML : function (str) {
            return str.replace(/&/g,"&amp;")
                .replace(/</g,"&lt;")
                .replace(/>/g,"&gt;")
                .replace(/"/g,"&quot;")
                .replace(/'/g,"&#39;");
        },

        forEach : Array.prototype.forEach
            ? function (arr, callback) {
                Array.prototype.forEach.call(arr, callback);
            }
            : function (arr, callback) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    callback(arr[i], i)
                }
            }
    };

    /**
     * Defered
     * promise应用类
     * @usage
     * var deferred = new Deferred();
     * deferred.then(resolve, reject);
     * deferred.done(callback);
     * deferred.fail(callback);
     * deferred.resolve(data);
     * deferred.reject();
     */
    var Deferred = (function (util) {
        function _pipe(original, deferred, callback, actionType) {
            return function () {
                if (typeof callback === 'function') {
                    try {
                        var returnValue = 
                            callback.apply(original, arguments);

                        if (Deferred.isPromise(returnValue)) {
                            returnValue.then(
                                function () {
                                    deferred.resolve.apply(deferred, arguments);
                                },
                                function () {
                                    deferred.reject.apply(deferred, arguments);
                                }
                            );
                        }
                        else {
                            deferred.resolve.call(deferred, returnValue);
                        }
                    }
                    catch (error) {
                        deferred.reject(error);
                    }
                }
                // `.then()`及`.then(done, null)`时使用
                // 直接使用原`Deferred`保存的参数将`deferred`改为对应状态
                else {
                    deferred[actionType].apply(deferred, original._args);
                }
            };
        }
        //判断promise状态决定指定回调方法
        function _flush(deferred) {
            if (deferred._state === 'pending') {
                return;
            }
            var callbacks = deferred._state === 'resolved'
                ? deferred._resolves.slice()
                : deferred._rejects.slice();

            setTimeout(function () {
                util.forEach(callbacks, function (callback, i) {
                    try {
                        callback.apply(deferred, deferred._args);
                    } catch (e) {
                    }
                });
            }, 0);

            deferred._resolves = [];
            deferred._rejects = [];
        }

        function Deferred() {
            this._state = 'pending'; //当前promise状态
            this._args = null;       //传递参数
            this._resolves = [];     //成功回调集合
            this._rejects = [];      //失败回调集合
        }
        
        Deferred.prototype = {
            resolve : function (args) {
                if (this._state !== "pending") {
                    return;
                }

                this._state = 'resolved';
                this._args = [].slice.call(arguments);

                _flush(this);
            },
            reject : function () {
                if (this._state !== 'pending') {
                    return;
                }
                this._state = 'rejected';
                this._args = [].slice.call(arguments);

                _flush(this);
            },
            then : function (resolve, reject) {
                var deferred = new Deferred();
                
                this._resolves.push(_pipe(this, deferred, resolve, 'resolve'));
                this._rejects.push(_pipe(this, deferred, reject, 'reject'));

                _flush(this);

                return deferred;
            },
            done : function (callback) {
                return this.then(callback);
            },
            fail : function (callback) {
                return this.then(null, callback);
            }
        };

        Deferred.isPromise = function (value) {
            return value && typeof value.then === 'function';
        };
        Deferred.when = function (/* promise1, promise2, ..., promiseN */) {
            //@TODO
        };

        return Deferred;

    })(util);
    
    /**
     * loader
     * @dependence Deferred.js
     * @useage
     * loader.callByServer(url, callback, opt);
     */
    var loader = (function (doc, Deferred) {
        function _createScriptTag(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            doc.getElementsByTagName('head')[0].appendChild(scr);
        }
        function _removeScriptTag(scr) {
            if(scr && scr.parentNode){
                scr.parentNode.removeChild(scr);
            }
            scr = null;
        }
        return {
            callByServer : function (url, callback, opt_options) {
                if (!url) return;
                var deferred = new Deferred(),
                    prefix = 'loader_cbs_',
                    callbackName = 'lejuDataCallback' || prefix + Math.floor(Math.random() * 2147483648).toString(36),
                    scr = doc.createElement('SCRIPT'),
                    options = opt_options || {},
                    charset = options['charset'] || 'utf-8',
                    queryField = 'callback',
                    timeOut = options['timeOut'] || 5000,
                    timer;
         
                glo[callbackName] = getCallBack(0);
         
                if( timeOut ){
                    timer = setTimeout(getCallBack(1), timeOut);
                }

                url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;

                _createScriptTag(scr, url, charset);

                return deferred;
     
                function getCallBack(onTimeOut){
                     
                    return function(){
                        try {
                            if( onTimeOut ){
                                deferred.reject();
                            } else {
                                deferred.resolve.apply(deferred, arguments);
                                clearTimeout(timer);
                            }
                            glo[callbackName] = null;
                            delete glo[callbackName];
                        } catch (exception) {
                            // ignore the exception
                        } finally {
                            _removeScriptTag(scr);
                        }
                    }
                }
            }
        };
    })(doc, Deferred);

    /**
     * leju
     * @useage
     * leju.text()
     * leju.text2()
     * leju.getData()
     */
    var cache = {
        data : null,
        defaultData : null,
        format : function (data) {
            var _d = {};
            if ('object' === typeof data && (data.status === true) && (data.data instanceof Array)) {
                var i = 0, d, pos;
                while (d = data.data[i++]) {
                    d.params && (d.params.sort = d.position);
                    pos = d.position.replace(/\-(\d)+$/, ''); //去掉-d
                    !_d[pos] && (_d[pos] = []);
                    _d[pos].push(d);
                }
                return _d;
            }
        } 
    };

    var leju = {
        conf : {},
        getData : function () {
            var deferred = new Deferred();
            if (cache.data) {
                deferred.resolve();
                return deferred;
            }
            if (!leju.conf.url) {
                deferred.reject();
                return deferred;
            }

            //获取正常数据
            loader
                .callByServer(leju.conf.url)
                .done(function (data) {
                    cache.data = cache.format(data);
                    deferred.resolve(cache.data);
                })
                .fail(function () {
                    if (cache.defaultData) {
                        deferred.resolve(cache.defaultData);
                        return deferred;
                    }
                    //如果有默认地址，则获取默认静态池数据
                    else if (!leju.conf.defaultUrl) {
                        deferred.reject();
                        return deferred;
                    }
                    else {
                        loader
                            .callByServer(leju.conf.defaultUrl)
                            .done(function (data) {
                                cache.defaultData = cache.format(data);
                                deferred.resolve(cache.defaultData);
                            })
                            .fail(function () {
                                deferred.reject();
                            });
                    }
                });

            return deferred;
        },
        /** 把数据格式化成len长度，超过的截取，不够的用前面的补齐 */
        sliceLen : function (data, len) {
            var i,
                r = [],
                d,
                l = data.length > len ? len : data.length;   
            for (i = 0; i < l; i++) {
                d = data[i];
                if (d.params && d.params.link && d.params.txt) {
                    // if (('undefined' === typeof d.params.sort) || isNaN(parseInt(d.params.sort, 10))) {
                    //     d.params.sort = i;
                    // }
                    r.push(d.params);
                }
                
            }
            r.sort(function (a, b) {
                return a.sort <= b.sort ? -1 : 1;
            });
            for (i = 0, l = len - r.length; i < l; i++) {
                r.push(r[i]);
            }
            return r;
        },
        text : function (divid, data, len, tpl) {
            var el = null,
                i = 0,
                d,
                html = [],
                txt;
            if ('number' !== typeof len) {
                tpl = len;
                len = data.length;
            }
            if (divid && (el = util.g(divid))) {
                data = leju.sliceLen(data[divid], len);
                while (d = data[i++]) {
                    txt = util.encodeHTML(d.txt);
                    html.push('<li>' + '<a href="' + d.link + '" target="_blank">' + (d.color ? '<span style="color:' + d.color + '">' : '') + ('function' === typeof tpl ? tpl(txt) : txt) + (d.color ? '</span>' : '') + '</a></li>');
                }
                el.innerHTML = '<ul>' + html.join('') + '</ul>';
            }
        },
        //首页下通栏，len必须是负数
        text2 : function (divid, data, len, tpl) {
            var el = null,
                i = 0,
                d,
                txt,
                html = [];
            if ('number' !== typeof len) {
                tpl = len;
                len = data.length;
            }
            if (divid && (el = util.g(divid))) {
                data = leju.sliceLen(data[divid], len);
                while (d = data[i++]) {
                    txt = util.encodeHTML(d.txt);
                    if (i % 2) {
                        html.push('<div class="mod12-item" ' + ((i === data.length - 1 || i === data.length) ? 'style="border-right:none"' : '') + '>');
                    }
                    html.push('<a href="' + d.link + '" target="_blank">' + (d.color ? '<span style="color:' + d.color + '">' : '') + ('function' === typeof tpl ? tpl(txt) : txt) + (d.color ? '</span>' : '') + '</a>');
                    if (!(i % 2)) {
                        html.push('</div>');
                    }
                }
                el.innerHTML = html.join('');
            }
        },
        swf : function (divid, data, sinaFlash, w, h) {
            /**
             * 依赖sinaFlash CAUTHON
             */
            var el = null,
                objFlash,
                type;
            if (divid && sinaFlash && (data = data[divid]) && (el = util.g(divid))) {
                if (data instanceof Array && 
                        data[0] && 
                        data[0].params &&  
                        data[0].params.src
                ) {
                    w = w || data[0].params.width;
                    h = h || data[0].params.height;
                    type = data[0].params.src.substring(data[0].params.src.length - 3).toLowerCase();
                    switch (type) {
                        case 'jpg':
                        case 'gif':
                        case 'png':
                            if (data[0].params.link) {
                                el.innerHTML = '<a href="' + data[0].params.link + '" target="_blank"><img src="' + data[0].params.src + '" border="0" width="' + w + '" height="' + h + '" /></a>';
                            } else {
                                el.innerHTML = '<img src="' + data[0].params.src + '" border="0" width="' + w + '" height="' + h + '" /></a>';
                            }
                            break;
                        default : 
                            objFlash = new sinaFlash(data[0].params.src, divid + '_swf', w, h, "7", "", false, "high");
                            objFlash.addParam("wmode", "opaque");
                            data[0].params.link && objFlash.addVariable("adlink", escape(data[0].params.link));
                            objFlash.write(divid);
                            break;
                    }
                }
            }
        },
        rotator : function (rad, data, divid, startdate, enddate, count) {
            var i = 0,
                d;
            if (divid && (data = data[divid])) {
                if (data instanceof Array) {
                    while(d = data[i++]) {
                        d.params && 
                            d.params.link && 
                            d.params.src &&
                            //使用unshift(不要使用push，谢谢轶鸥提醒)插入到数组前头，防止当广告生效时被已有的生效广告占用包版位置
                            rad.unshift([
                                d.params.src,
                                d.params.link,
                                "<startdate>" + startdate + "</startdate>",
                                "<enddate>" + enddate + "</enddate>",
                                '',
                                parseInt(count, 10) || ""
                            ]);
                    }
                }
            }
        },
        couplet : function (c, data, startdate, enddate, toTop) {
            var data = data['couplet'],
                i = 0,
                toTop = toTop || 46,
                d;
            if (data instanceof Array) {
                while(d = data[i++]) {
                    d.params && 
                        d.params.link &&
                        d.params.left &&
                        d.params.right &&
                        d.params.bar &&
                        //使用unshift(不要使用push，谢谢轶鸥提醒)插入到数组前头，防止当广告生效时被已有的生效广告占用包版位置
                        c.unshift([
                            startdate,//投放开始时间<startdate>2012-12-5</startdate>
                            enddate,//投放结束时间非单天要加1<enddate>2012-12-5</enddate>
                            d.params.left,//左素材
                            d.params.right,//右素材
                            d.params.bar,//触发素材
                            d.params.link,//链接地址
                            "",//触发监测
                            toTop //跨栏距离顶部高度
                        ]);
                }
            }
        }
    };

    glo.leju = leju;

})(window, document);