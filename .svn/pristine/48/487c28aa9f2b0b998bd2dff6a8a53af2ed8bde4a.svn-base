(function (document, window) {
    if (!window._ssp_ad) {
        var _ssp_ad = window._ssp_ad = {
            reqUrl: 'http://sax.sina.com.cn/impress',
            t: +new Date(),
            timeout: 5000,
            pdpslist: {},
            count: 0,
            getCount: function () {
                var rnd = Math.round(Math.random());
                if (_ssp_ad.getCookie("rotatecount")) {
                    _ssp_ad.count = parseInt(_ssp_ad.getCookie("rotatecount"), 10) + 1;
                } else {
                    _ssp_ad.count = rnd;
                }
                _ssp_ad.setCookie("rotatecount", _ssp_ad.count, 60);
            },
            setCookie: function (key, value, expires) {
                var l = new Date();
                var z = new Date(l.getTime() + expires * 60000);
                document.cookie = key + "=" + escape(value) + ";path=/;expires=" + z.toGMTString() + ";domain=sina.com.cn";
            },
            getCookie: function (key) {
                var c = document.cookie.split("; ");
                for (var i = 0; i < c.length; i++) {
                    var d = c[i].split("=");
                    if (d[0] == key) {
                        return unescape(d[1]);
                    }
                }
                return '';
            },
            _rmScr: function (scr) {
                if (scr && scr.parentNode) {
                    scr.parentNode.removeChild(scr);
                }
                scr = null;
            },
            _creScr: function (scr, url, charset) {
                scr.setAttribute('type', 'text/javascript');
                charset && scr.setAttribute('charset', charset);
                scr.async = true;
                scr.setAttribute('src', url);
                var head = document.getElementsByTagName('head')[0];
                head.insertBefore(scr, head.childNodes[0]);
            },
            jsonp: function (url, opt_cb, opt_conf) {
                var scr = document.createElement('SCRIPT'),
                    scrLoaded = 0,
                    conf = opt_conf || {},
                    cb = opt_cb ||
                function () {}, charset = conf['charset'] || 'utf-8', timeout = conf['timeout'] || 0, timer;
                if (scr.readyState) {
                    scr.onreadystatechange = ready();
                } else {
                    scr.onload = ready();
                }

                function ready() {
                    return function () {
                        if (scrLoaded) {
                            return;
                        }
                        var readyState = scr.readyState;
                        if ('undefined' == typeof readyState || readyState == "loaded" || readyState == "complete") {
                            scrLoadeded = 1;
                            try {
                                cb();
                                clearTimeout(timer);
                            } finally {
                                scr.onerror = scr.onload = scr.onreadystatechange = null;
                                _ssp_ad._rmScr(scr);
                            }
                        }
                    }
                };

                scr.onerror = function () {
                    scr.onerror = scr.onload = scr.onreadystatechange = null;
                    _ssp_ad._rmScr(scr);
                    conf.onfailure && conf.onfailure();
                    clearTimeout(timer);
                };

                if (timeout) {
                    timer = setTimeout(function () {
                        scr.onerror = scr.onload = scr.onreadystatechange = null;
                        _ssp_ad._rmScr(scr);
                        conf.onfailure && conf.onfailure();
                    }, timeout);
                }
                _ssp_ad._creScr(scr, url, charset);

            },
            callback: function (data) {
                if (typeof data == "object" && typeof data.ad == "object") {
                    _ssp_ad.pdpslist[data.ad[0].id] = data;
                }
            },
            id2PDPS: function (id) {
                if (typeof id == "string") {
                    var codeNum = id.split("ad_")[1];
                    return(codeNum && codeNum.match(/^\d{5}$/)) ? "PDPS0000000" + id.split("_")[1] : false;
                } else {
                    return false;
                }
            },
            isDZ: function (pdps) {
                return {
                    'PDPS000000000000': 1
                }[pdps];
            },
            cookieMapping: function (mapping) {
                var map, i = 0,
                    img;
                if (mapping instanceof Array && mapping.length > 0) {
                    img = new Image();
                    img.width = 1;
                    img.height = 1;
                    document.body.appendChild(img);
                    while(map = mapping[i++]) {
                        img.src = map;
                    }
                    document.body.removeChild(img);
                }
            },
            dspCM: function (map) {
                var img = new Image();
                img.width = 1;
                img.height = 1;
                document.body.insertBefore(img, document.body.childNodes[0]);
                img.src = map;
                img.onload = function () {
                    document.body.removeChild(img);
                }
            },
            addCover: function (w, h, url, el) {
                var cover = document.createElement('a');
                el.style.position = "relative";
                cover.id = "cov_" + el.id;
                cover.setAttribute("href", url);
                cover.setAttribute("target", "_blank");
                cover.style.cssText += ";display:block;width:" + w + "px;height:" + h + "px;position:absolute;left:0px;top:0px;filter:alpha(opacity:0)";
                if (cover.style.filter) {
                    cover.style.backgroundColor = "white";
                }
                el.appendChild(cover);
                return cover;
            },
            addClickMonitor: function (monitor) {
                return function () {
                    if (monitor.length) {
                        var ml = monitor.length;
                        while(ml--) {
                            var ifr = document.createElement("iframe");
                            ifr.src = monitor[ml];
                            ifr.frameborder = 0;
                            ifr.scrolling = "no";
                            ifr.style.display = "none";
                            document.body.insertBefore(ifr, document.body.firstChild);
                        }
                    }
                }
            },
            addPVMonitor: function (pv) {
                if (pv.length) {
                    var pl = pv.length;
                    while(pl--) {
                        var ifr = document.createElement("iframe");
                        ifr.src = pv[pl];
                        ifr.frameborder = 0;
                        ifr.scrolling = "no";
                        ifr.style.display = "none";
                        document.body.insertBefore(ifr, document.body.firstChild);
                    }
                }
            },
            showAD: function (src, url, monitor, w, h, el) {
                var filetype = src.substring(src.length - 3).toLowerCase();
                switch(filetype) {
                case "swf":
                    var formatHTML = [];
                    formatHTML.push('<object type="application/x-shockwave-flash" data="' + src + '" width="' + w + '" height="' + h + '">', '<param name="movie" value="' + src + '" />', '<param name="wmode" value="transparent" />', '</object>');
                    el.innerHTML = formatHTML.join('');
                    if (url) {
                        _ssp_ad.addCover(w, h, url, el);
                    }
                    if (url && monitor.length) {
                        document.getElementById("cov_" + el.id).onclick = _ssp_ad.addClickMonitor(monitor);
                    }
                    break;
                case "jpg":
                case "gif":
                case "png":
                    el.innerHTML = '<a href="' + url + '" id="cli_' + el.id + '" target="_blank"><img src="' + src + '" border="0" width="' + w + '" height="' + h + '"/></a>';
                    if (monitor.length) {
                        document.getElementById("cli_" + el.id).onclick = _ssp_ad.addClickMonitor(monitor);
                    }
                    break;
                case "htm":
                case "tml":
                    if (src.indexOf("adbox.sina.com.cn/ad") != -1 || src.indexOf("sinastorage.com/sandbox/ad") != -1) {
                        var api_exu = monitor[0] || '';
                        api_exu && (api_exu = encodeURIComponent(api_exu += (api_exu.indexOf('?') >= 0 ? '&' : '?') + 'adboxmoel={__moel__}&adboxmoet={__moet__}'));
                        el.innerHTML = '<iframe id="ifm_' + el.id + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="' + src + '" ' + (api_exu ? ' name="api_exu=' + api_exu + '"' : '') + '></iframe>';
                    } else {
                        el.innerHTML = '<iframe id="ifm_' + el.id + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="' + src + '"></iframe>';
                    }
                    if (url) {
                        _ssp_ad.addCover(w, h, url, el);
                    }
                    if (url && monitor.length) {
                        document.getElementById("cov_" + el.id).onclick = _ssp_ad.addClickMonitor(monitor);
                    }
                    break;
                case ".js":
                    var cont = document.createElement("iframe");
                    cont.width = w;
                    cont.height = h;
                    cont.scrolling = "no";
                    cont.frameborder = 0;
                    el.appendChild(cont);
                    try {
                        var doc = cont.contentWindow.document;
                        doc.open();
                        doc.write(['<html><body><', 'script>document.domain=\'sina.com.cn\';</', 'script><', 'script src="', src, '"></', 'script></body></html>'].join(''));
                        //doc.close();
                        cont.onload = function () {
                            try {
                                this.contentWindow.document.close()
                            } catch(e) {}
                        };
                    } catch(e) {}
                    //cont.contentWindow.document.body.innerHTML = "<script type='text/javascript' src="+ src +"></script>";
                    break;
                default:

                }
            },
            CoupletMediaOpenWin: function (kldata, defaultW) {
                var pthis = this; //设置指针
                var o = new SinaDotAdJs(); //加载通用类
                var minWidth = defaultW - 0 + 240;
                var rn = 2; //轮播数
                if (o.$("SteamMediaWrap")) {
                    var w = o.$("SteamMediaWrap");
                } else {
                    var w = false;
                } //加载容器对象
                this.ctimer = null;
                this.ctimer_ext = null;
                this.ctimer_lft = null;
                this.tmpWidth = 0;
                this.isext = false;
                this.ishide = false;

                //跨栏构造函数
                this.initAdCM = function (ul, ur, ue, l, tk, tp) {

                    //高度固定
                    tp = 46;

                    //容器构造
                    //主容器
                    eval(o.initWrap(0x02, "CoupletMediaWrap", "cmWrap", defaultW, 0, "", "", "", "", "", "", "0 auto", "0", "none", "block"));

                    //左栏部分
                    eval(o.initWrap(0x01, "div", "clWrap", 120, 288, "absolute", "0", "", "0", "", "99", "0", "0", "none", "none"));
                    clWrap.style.top = tp + "px";
                    clWrap.style.background = "#fff";
                    cmWrap.appendChild(clWrap);
                    eval(o.initWrap(0x01, "div", "cliWrap", 120, 270, "absolute", "0", "", "0", "", "", "0", "0", "", "block"));
                    clWrap.appendChild(cliWrap);
                    eval(o.initWrap(0x01, "div", "clcBtn", 120, 18, "absolute", "0", "", "270", "", "", "0", "0", "#ebebeb url('http://d1.sina.com.cn/litong/zhitou/pic/close-h.jpg') no-repeat right", "block"));
                    clcBtn.style.cursor = "pointer";
                    clWrap.appendChild(clcBtn);

                    //右栏部分
                    eval(o.initWrap(0x01, "div", "crWrap", 120, 288, "absolute", "", "0", "0", "", "99", "0", "0", "none", "none"));
                    crWrap.style.top = tp + "px";
                    crWrap.style.background = "#fff";
                    cmWrap.appendChild(crWrap);
                    eval(o.initWrap(0x01, "div", "criWrap", 120, 270, "absolute", "0", "", "0", "", "", "0", "0", "", "block"));
                    crWrap.appendChild(criWrap);
                    eval(o.initWrap(0x01, "div", "crcBtn", 120, 18, "absolute", "0", "", "270", "", "", "0", "0", "#ebebeb url(http://d1.sina.com.cn/litong/zhitou/pic/close-h.jpg) no-repeat left", "block"));
                    crcBtn.style.cursor = "pointer";
                    crWrap.appendChild(crcBtn);

                    //触发部分
                    eval(o.initWrap(0x01, "div", "ceWrap", defaultW, 90, "absolute", "0", "", "0", "", "999", "0", "0", "", "none"));
                    ceWrap.style.top = tp + "px";
                    cmWrap.appendChild(ceWrap);
                    eval(o.initWrap(0x01, "div", "ceiWrap", 0, 90, "", "0", "", "0", "", "", "0 auto", "0", "", "block"));
                    ceiWrap.style.overflow = "hidden";
                    ceWrap.appendChild(ceiWrap);
                    eval(o.initWrap(0x01, "div", "cecBtn", 66, 22, "absolute", "", "0", "", "-22", "999", "0", "0", "url(http://d2.sina.com.cn/d1images/lmt/cls_66x22.gif) no-repeat", "block"));
                    cecBtn.style.cursor = "pointer";
                    ceWrap.appendChild(cecBtn);

                    this.getCMPos = function () {
                        ceWrap.style.left = (cmWrap.offsetLeft == "undefined" ? ((o.bdy.offsetWidth - w) / 2 - (o.isIE6 ? 16 : 0)) : (cmWrap.offsetLeft != 0 ? cmWrap.offsetLeft : cmWrap.parentNode.offsetLeft)) + "px";
                        pthis.ctimer_lft = setTimeout("getCMPos()", 50);
                    }

                    //隐藏跨栏
                    this.hideCM = function () {
                        this.isext = false;
                        clearTimeout(pthis.ctimer);
                        clearTimeout(pthis.ctimer_lft);
                        clearInterval(pthis.ctimer_ext);
                        cliWrap.innerHTML = "";
                        criWrap.innerHTML = "";
                        ceiWrap.innerHTML = "";
                        var cliObj = o.initObj("CoupletMediaLeftObj", ul, l, 120, 270);
                        cliWrap.appendChild(cliObj);
                        if (ul.match(/swf$|htm$|tml$/) && tk.link[0]) {
                            var coverL = _ssp_ad.addCover(120, 270, tk.link[0], cliWrap);
                            coverL.onclick = _ssp_ad.addClickMonitor(tk.monitor);
                        } else {
                            cliObj.onclick = _ssp_ad.addClickMonitor(tk.monitor);
                        }
                        var criObj = o.initObj("CoupletMediaRightObsj", ur, l, 120, 270);
                        criWrap.appendChild(criObj);
                        if (ur.match(/swf$|htm$|tml$/) && tk.link[0]) {
                            var coverR = _ssp_ad.addCover(120, 270, tk.link[0], criWrap);
                            coverR.onclick = _ssp_ad.addClickMonitor(tk.monitor);
                        } else {
                            criObj.onclick = _ssp_ad.addClickMonitor(tk.monitor);
                        }
                        clWrap.style.display = "block";
                        crWrap.style.display = "block";
                        ceWrap.style.display = "none";
                    };
                    //点击隐藏
                    this.clcHideCM = function () {
                        pthis.ishide = true;
                        pthis.hideCM();
                    };
                    //显示跨栏
                    this.showCM = function () {
                        if (!pthis.isext && !pthis.ishide) {
                            pthis.getCMPos();
                            this.isext = true;
                            clearTimeout(pthis.ctimer);
                            ceiWrap.style.width = 0;
                            pthis.tmpWidth = 0;
                            var ceiObj = o.initObj("CoupletMediaExtObsj", ue, l, defaultW, 90);
                            ceiWrap.appendChild(ceiObj);
                            if (ue.match(/swf$|htm$|tml$/)) {
                                var coverC = _ssp_ad.addCover(defaultW, 90, tk.link[0], ceiWrap);
                                coverC.onclick = _ssp_ad.addClickMonitor(tk.monitor);
                            } else {
                                ceiObj.onclick = _ssp_ad.addClickMonitor(tk.monitor);
                            }
                            ceWrap.style.display = "block";
                            pthis.ctimer_ext = setInterval(function () {
                                if (pthis.tmpWidth < defaultW) {
                                    pthis.tmpWidth += 50;
                                    ceiWrap.style.width = pthis.tmpWidth + "px";
                                } else {
                                    clearInterval(pthis.ctimer_ext);
                                }
                            }, 1);
                            pthis.ctimer = setTimeout(function () {
                                pthis.hideCM();
                            }, 8000);
                            // if (tk.pv instanceof Array && tk.pv.length > 0) { //触发展现监测, not点击
                            //     _ssp_ad.addPVMonitor(tk.pv);
                            // }
                        }
                    };
                    this.reposCM = function () {
                        var winW = document.documentElement.clientWidth || document.body.clientWidth;
                        if (winW <= minWidth) {
                            if (winW <= defaultW) {
                                clWrap.style.display = "none";
                                crWrap.style.display = "none";
                            } else {
                                clWrap.style.display = "block";
                                crWrap.style.display = "block";
                                clWrap.style.left = winW / 2 - minWidth / 2 + "px";
                                crWrap.style.width = 120 + winW / 2 - minWidth / 2 + "px";
                                crWrap.style.overflow = "hidden";
                            }
                        } else {
                            clWrap.style.display = "block";
                            crWrap.style.display = "block";
                            clWrap.style.left = 0;
                            crWrap.style.width = 120 + "px";
                        }
                    }
                    //关闭跨栏
                    this.closeCM = function () {
                        clearTimeout(pthis.ctimer);
                        clearTimeout(pthis.ctimer_lft);
                        clearInterval(pthis.ctimer_ext);
                        cmWrap.innerHTML = "";
                    };
                    try {
                        window.attachEvent("onresize", this.reposCM);
                    } catch(e) {
                        window.addEventListener("resize", this.reposCM);
                    }
                    o.addEvent(cliWrap, "mouseover", pthis.showCM); //注册左触发事件
                    o.addEvent(criWrap, "mouseover", pthis.showCM); //注册右触发事件
                    o.addEvent(clcBtn, "click", pthis.closeCM); //注册左关闭事件
                    o.addEvent(crcBtn, "click", pthis.closeCM); //注册右关闭事件
                    o.addEvent(cecBtn, "click", pthis.clcHideCM); ////注册触发关闭事件
                    this.reposCM();
                    pthis.hideCM(); //加载广告
                }
                pthis.initAdCM(kldata.src[1], kldata.src[2], kldata.src[0], kldata.link[0], kldata, 0);
                _ssp_ad.addPVMonitor(kldata.pv);
            },
            showAE: function (content, el, w, h, adtype) {
                var content = (typeof content == "string") ? eval('(' + content + ')') : content;
                switch(adtype) {
                case "bt":
                    if (content.link[0] && content.src[0]);
                    window.open("http://d1.sina.com.cn/d1images/pb/pbv4.html?" + content.link[0] + "${}" + content.src[0].substring(content.src[0].length - 3).toLowerCase() + "${}" + content.src[0], (window.name != "popUpWin2") ? "popUpWin2" : "", "width=1,height=1,top=4000,left=3000");
                    break;
                case "kl":
                    if (content.src.length) {
                        _ssp_ad.CoupletMediaOpenWin.call(window, content, w);
                    }
                    break;
                default:
                    if (el) {
                        _ssp_ad.showAD(content.src[0], content.link[0], content.monitor, w, h, el);
                    }
                }
                if (content.pv && content.pv.length) {
                    _ssp_ad.addPVMonitor(content.pv);
                }
            },
            showAMP: function (src, el, w, h) {
                src += (src.indexOf('?') > 0 ? '&' : '?') + 'i_ssp=1';
                el.innerHTML = '<iframe id="ifm_' + el.id + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="' + src + '"></iframe>';
            },

            showDSP: function (src, el, w, h) {
                if (el) {
                    el.innerHTML = src;
                }
            },
            showNetwork: function (networkId, posId, el, w, h) {
                var src = "";
                switch(networkId) {
                case "1":
                    // taobao
                    src = '<iframe id="network_' + networkId + posId + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="http://d3.sina.com.cn/litong/zhitou/union/taobao.html?w=' + w + '&h=' + h + '&pid=' + posId + '"></iframe>'
                    break;
                case "2":
                    //google
                    src = '<iframe id="network_' + networkId + posId + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="http://d3.sina.com.cn/litong/zhitou/union/google.html?w=' + w + '&h=' + h + '&pid=' + posId + '"></iframe>';
                    break;
                case "3":
                    //yihaodian
                    src = '<iframe id="network_' + networkId + posId + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="http://d3.sina.com.cn/litong/zhitou/union/yihaodian.html?w=' + w + '&h=' + h + '&pid=' + posId + '"></iframe>'
                    break;
                case "4":
                    //baidu
                    src = '<iframe id="network_' + networkId + posId + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="http://d3.sina.com.cn/litong/zhitou/union/baidu.html?w=' + w + '&h=' + h + '&pid=' + posId + '"></iframe>'
                    break;
                case "5":
                    //Hawkeye
                    src = '<iframe id="network_' + networkId + posId + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="http://js.miaozhen.com/mzad_iframe.html?l=' + posId + '&_srv=MZHKY"></iframe>'
                    break;
                default:
                }
                if (el) {
                    el.innerHTML = src;
                }
            },
            failCB: function (pdps, el, adid, cb, w, h) {
                if (_ssp_ad.isDZ(pdps)) {
                    var srcList = {
                        "950*90": "http://d1.sina.com.cn/litong/zhitou/gongyi/gongyi-banner.html",
                        "300*250": "http://d1.sina.com.cn/litong/zhitou/gongyi/gongyi-pip.html",
                        "250*230": "http://d1.sina.com.cn/litong/zhitou/gongyi/gongyi-square.html"
                    };
                    var src = srcList[w + "*" + h];
                    el.innerHTML = '<iframe id="ifm_' + adid + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '" src="' + src + '"></iframe>';
                } else {
                    if (cb) {
                        cb();
                    }
                }
            },
            domReady: function (d, f) {
                var ie = !! (window.attachEvent && !window.opera);
                var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
                var fn = [];
                var run = function () {
                        for (var i = 0; i < fn.length; i++) fn[i]();
                    };
                if (!ie && !wk && d.addEventListener) {
                    return d.addEventListener('DOMContentLoaded', f, false);
                }
                if (fn.push(f) > 1) {
                    return;
                }
                if (ie) {
                    (function () {
                        try {
                            d.documentElement.doScroll('left');
                            run();
                        } catch(err) {
                            setTimeout(arguments.callee, 0);
                        }
                    })();
                } else if (wk) {
                    var t = setInterval(function () {
                        if (/^(loaded|complete)$/.test(d.readyState)) {
                            clearInterval(t), run();
                        }
                    }, 0);
                }
            },
            loadIdentityIframe: function () {
                if (!document.getElementById("identityFrame")) {
                    var frameUrl = "http://d1.sina.com.cn/litong/zhitou/identity.html";
                    var ifr = document.createElement('iframe');
                    ifr.width = 0;
                    ifr.height = 0;
                    ifr.frameBorder = 0;
                    ifr.style.display = "none";
                    ifr.src = frameUrl;
                    ifr.id = "identityFrame";
                    // _ssp_ad.dspCM("http://ads.ad.sina.com.cn/cm?sina_nid=4"); //mediaV
                    document.body.insertBefore(ifr, document.body.childNodes[0]);
                }
            },
            referral: function () {
                try {
                    var ref = encodeURIComponent(window.top.location.href || document.referrer || window.location.href);
                } catch(e) {
                    var ref = encodeURIComponent(document.referrer || window.location.href);
                }
                return ref || "";
            },
            load: function (adid, cb, w, h, rotateId) {
                var url = _ssp_ad.reqUrl,
                    pdps = this.id2PDPS(adid);
                var el = document.getElementById(adid) || null;
                if (pdps) {
                    //el.setAttribute('data-asp', 1);
                    //this.isDZ(pdps) && el.setAttribute('data-dz', 1);
                    _ssp_ad.jsonp(
                    url + (url.indexOf('?') >= 0 ? '&' : '?rotate_count=' + _ssp_ad.count + '&adunitid=' + this.id2PDPS(adid) + '&TIMESTAMP=' + _ssp_ad.t + '&referral=' + _ssp_ad.referral() + '&callback=_ssp_ad.callback'), function () {
                        var _ssp_ads = _ssp_ad.pdpslist[pdps];
                        if (_ssp_ads && _ssp_ads.ad instanceof Array && _ssp_ads.ad.length > 0 && _ssp_ads.ad[0].value instanceof Array && _ssp_ads.ad[0].value.length > 0 && _ssp_ads.ad[0].value[0].content) {
                            w = _ssp_ads.ad[0].size.split("*")[0];
                            h = _ssp_ads.ad[0].size.split("*")[1];
                            var src = _ssp_ads.ad[0].value[0].content;
                            // if(_ssp_ads.ad[0].id == "PDPS000000005486"){
                            //     Tracker("pdps:PDPS000000028571");
                            // }
                            switch(_ssp_ads.ad[0].engineType) {
                            case "sina":
                            case "bottom":
                                if (_ssp_ads.ad[0].value[0].manageType === 'AE' || _ssp_ads.ad[0].value[0].manageType === 'nad') {
                                    _ssp_ad.showAE(src, el, w, h, _ssp_ads.ad[0]["type"]);

                                } else {
                                    _ssp_ad.showAMP(src, el, w, h);
                                }
                                break;
                            case "dsp":
                                if (_ssp_ads.ad[0].value[0].manageType == 17) {
                                    _ssp_ad.showAE(src, el, w, h, _ssp_ads.ad[0]["type"]);
                                } else {
                                    _ssp_ad.showDSP(src, el, w, h);
                                }
                                break;
                            case "network":
                                var networkId = _ssp_ads.ad[0].value[0].manageType;
                                _ssp_ad.showNetwork(networkId, src, el, w, h);
                                break;
                            default:
                                cb();
                            }
                            //_ssp_ad.cookieMapping(_ssp_ads.mapUrl);
                            //_ssp_ads = window["_ssp_ads"] = null;
                        } else {
                            _ssp_ad.failCB(pdps, el, adid, cb, w, h);
                        }
                        if (_ssp_ads && _ssp_ads.mapUrl instanceof Array && _ssp_ads.mapUrl.length > 0) {
                            _ssp_ad.cookieMapping(_ssp_ads.mapUrl);
                        }
                        _ssp_ad.pdpslist[pdps] = false;
                    }, {
                        timeout: _ssp_ad.timeout,
                        onfailure: function () {
                            _ssp_ad.failCB(pdps, el, adid, cb, w, h);
                        }
                    });
                } else {
                    cb();
                }
            },
            ergodic: function () {
                var allDom = document.getElementsByTagName("*");
                for (var i = 0, il = allDom.length; i < il; i++) {
                    var pdps = allDom[i].getAttribute("data-pdps");
                    if (pdps) {
                        if (_ssp_ad.pdpslist[pdps] == undefined) {
                            _ssp_ad.pdpslist[pdps] = allDom[i];
                        }
                    }
                }
                for (var j in _ssp_ad.pdpslist) {
                    if (_ssp_ad.pdpslist[j]) {
                        var divid = "ad_" + j.substring(11, 16);
                        _ssp_ad.load(divid);
                    }
                }
            },
            init: function () {
                this.domReady(document, function () {
                    _ssp_ad.ergodic();
                    _ssp_ad.loadIdentityIframe();
                });
            }
        }
        _ssp_ad.getCount();
    };
})(document, window);
_ssp_ad.init();



var Tracker = (function (win, doc, DEFAULT_CONFIG) {
    var util = {
        E: win.encodeURIComponent,
        ref: doc.referrer,
        loc: win.location,
        ifr: win.self != win.top ? 1 : 0,
        top: "",
        cookie: {
            getRaw: function (key) {
                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"),
                    result = reg.exec(document.cookie);

                if (result) {
                    return result[2] || null;
                }
            },
            get: function (key) {
                var value = util.cookie.getRaw(key);
                if ('string' == typeof value) {
                    value = decodeURIComponent(value);
                    return value;
                }
                return null;
            }
        },
        ie: /msie (\d+\.\d)/i.test(navigator.userAgent),

        rnd: function () {
            return Math.floor(Math.random() * 2147483648).toString(36);
        },

        rand: function (min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        },

        /**
         * 获取当前页面中tracker对象的唯一id
         * 生成方式：top_url + SINAGLOBAL_cookie + rnd()
         * @return string
         */
        uid: function () {
            var hash = 0,
                i = 0,
                w, s = util.top || util.loc.href || '',
                //tip url
                sg = util.cookie.get('SINAGLOBAL') || '',
                //SINAGLOBAL_cookie
                rnd = util.rnd(); //rnd
            s = s + sg + rnd;

            for (; !isNaN(w = s.charCodeAt(i++));) {
                hash = ((hash << 5) - hash) + w;
                hash = hash & hash;
            }

            return Math.abs(hash).toString(36);
        },
        attr: function (dom, attrName) {
            return dom.getAttribute ? dom.getAttribute(attrName) : null;
        },

        serialize: function (json) {
            var str = [];
            for (var key in json) {
                str.push(key + '=' + json[key]);
            }
            return str.join('&');
        },

        strProp2jsonProp: function (str) {
            var i = 0,
                result = {},
                prop;

            if (!str) return null;

            str = str.split(';');

            while(prop = str[i++]) {
                if (prop) {
                    prop = prop.split(':');
                    result[prop[0]] = prop[1];
                }
            }
            return result;
        },

        getPos: function (e) {
            var e = e || win.event;
            var targetX, targetY, offsetX, offsetY, scrollTop, scrollLeft;
            scrollTop = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
            scrollLeft = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
            if (util.ie) {
                targetX = e.clientX + scrollLeft;
                targetY = e.clientY + scrollTop;
            } else {
                targetX = e.pageX;
                targetY = e.pageY;
            }
            if (this.documentWidth) {
                var clientWidth = Math.max(doc.documentElement.clientWidth, doc.body.clientWidth);
                offsetX = (clientWidth - this.documentWidth) / 2;
                offsetY = 0;
            } else {
                offsetX = 0;
                offsetY = 0;
            }

            function getRelativePos(targetX, targetY) {
                return {
                    x: targetX - offsetX,
                    y: targetY - offsetY
                };
            }
            var pos = getRelativePos(targetX, targetY);
            targetX = Math.round(pos.x / 10) * 10;
            targetY = Math.round(pos.y / 10) * 10;
            return {
                x: targetX,
                y: targetY
            };
        },
        forEach: function (arr, iterator) {
            var i = 0,
                item;
            if (arr) {
                while(item = arr[i++]) {
                    iterator && iterator(item, i);
                }
            }
        },
        inArray: function (arr, item) {
            var r = false;
            for (var len = arr.length - 1; len >= 0; len--) {
                if (arr[len] === item) {
                    r = true;
                }
            }
            return r;
        },
        delegate: function (dom, type, callback, filter) {
            util.on(dom, type, function (e) {
                var target = e.realTarget;
                if ('function' === typeof filter) {
                    while(target && target !== dom) {
                        if (filter(target)) {
                            e.delegateTarget = target;
                            callback.call(this, e);
                        }
                        target = target.parentNode;
                    }
                } else {
                    callback.call(this, e);
                }
            });
        },

        on: function (dom, type, callback) {
            var handler = function (e) {
                    e = e || window.event;
                    e.realTarget = e.srcElement || e.target;
                    e.relTarget = e.relatedTarget || e.toElement || e.fromElement || null;
                    callback.call(dom, e);
                };

            if (dom.addEventListener) {
                dom.addEventListener(type, handler, false);
            } else if (dom.attachEvent) {
                dom.attachEvent('on' + type, handler);
            }
        },
        findTarget: function (from, to, filter) {
            while(from && from !== to) {
                if (filter(from)) {
                    return from;
                }
                from = from.parentNode;
            }
            if (filter(from)) {
                return from;
            }
            return null;
        }
    };


    function Tracker(bid, types, opt_conf) {
        var config = opt_conf || {},
            THIS = this,
            _obj;

        this.bid = bid;
        this.tag = config.tag || Tracker.DEFAULT_CONFIG.tag || 'sadt';
        this.url = config.url || Tracker.DEFAULT_CONFIG.url;
        this.exdata = config.exdata || Tracker.DEFAULT_CONFIG.exdata;

        this._cache = [];
        this._events = {};
        this._loadtime = +new Date();
        this._cookie = (function (keys) {
            var r = [];
            util.forEach(keys, function (key, i) {
                var value = util.cookie.get(key);
                if (value) {
                    r.push(key + '=' + value);
                }
            });
            return r.join(';');
        })(config.cookie || Tracker.DEFAULT_CONFIG.cookie || []);

        util.forEach(types, function (type, i) {
            if (type === 'load') {
                THIS.log(THIS.format({
                    _ev: 'load',
                    _t: THIS._loadtime,
                    _bid: THIS.bid
                }));
            }
            if (type === 'unload') {
                util.on(win, 'beforeunload', function () {
                    var now = +new Date();
                    THIS.log(THIS.format({
                        _dur: now - THIS._loadtime,
                        _ev: 'unload',
                        _t: now,
                        _bid: THIS.bid
                    }));
                });
            }
            if (Tracker.BIND_MAP[type]) {
                _obj = opt_conf[type] || Tracker.DEFAULT_CONFIG[type] || {};

                THIS._cache[type] = [];
                THIS._events[type] = {
                    max: _obj.max || 1,
                    filter: _obj.filter
                };

                util.delegate(
                doc, Tracker.BIND_MAP[type], THIS._getMonitorHandle(type), THIS._getFilter(bid));
            }
        });
        util.on(win, 'beforeunload', function () {
            for (var type in THIS._cache) {
                THIS.send(type, 0);
            }
        });
    }
    util.top = (function () {
        var top;
        try {
            top = win.top.location.href;
        } catch(e) {
            top = util.ref;
        }
        return top;
    })()

    Tracker.prototype = {
        _getMonitorHandle: function (type) {
            var THIS = this;
            return function (e) {
                var msg, pos, conf = THIS._events[type];
                monitorTarget = conf.filter ? util.findTarget(e.realTarget, e.delegateTarget, conf.filter) : e.realTarget;

                e.monitorType = type;
                e.monitorTarget = monitorTarget;

                if (e.monitorTarget) {
                    msg = THIS.getMessage(e);
                    THIS._cache[type].push(THIS.format(msg));
                    THIS.send(type, conf.max)
                }
            };
        },
        _getFilter: function (name) {
            var THIS = this;
            return function (dom) {
                return util.attr(dom, THIS.tag) === name;
            };
        },
        format: util.serialize,
        getUrl: function () {
            var len, url = this.url;
            if ((url instanceof Array) && (len = url.length)) {
                return url[util.rand(0, len - 1)];
            } else if ('string' === typeof url) {
                return url;
            } else {
                throw new Error("url must string or array, and array must not empty.");
            }
        },

        getMessage: function (e) {
            var target = e.monitorTarget,
                type = e.monitorType,
                pos = util.getPos(e),
                exdata = this.exdata || {},
                msg = {
                    '_id': target.id || 'noid' + util.rnd(),
                    '_tagn': target.tagName || 'notagname',
                    '_x': pos.x,
                    '_y': pos.y,
                    '_t': +new Date(),
                    '_ev': type,
                    '_bid': this.bid
                };

            (function (exdata, msg, target) {
                var i = 0,
                    list = exdata.glo || [],
                    tn = exdata.tagname || {},
                    k, v;

                if (tn[target.tagName.toUpperCase()]) {
                    list = list.concat(tn[target.tagName.toUpperCase()]);
                }
                while(k = list[i++]) {
                    (v = util.attr(target, k)) && (msg[k] = util.E(v));
                }
            })(exdata, msg, target);

            return msg;
        },

        log: function (msg) {
            var img = new Image(1, 1),
                key = Tracker.UID + '_' + util.rnd(),
                info, url = this.getUrl();

            window[key] = img;
            img.onload = img.onerror = img.onabort = function () {
                img.onload = img.onerror = img.onabort = null;
                window[key] = null;
                img = null;
            };
            img.src = url + '?__moid__=' + Tracker.UID + '&log=' + Tracker.UID + '&ifr=' + util.ifr + '&ref=' + util.E(util.ref) + '&top=' + util.E(util.top) + (Tracker.gloPar ? '&' + Tracker.gloPar : '') + '&t=' + (+new Date()) + (this._cookie ? '&ck=' + util.E(this._cookie) : '') + '&msg=' + util.E(msg);
        },

        send: function (type, max) {
            var msgs = [],
                msg = '',
                tracks = this._cache[type];
            if (!max) {
                while(msg = tracks.shift()) {
                    msgs.push(msg);
                }
            } else if (tracks.length >= max) {
                while(max-- > 0 && (msg = tracks.shift())) {
                    msgs.push(msg);
                }
            }
            msgs.length > 0 && this.log(msgs.join('|'));
        }
    };

    Tracker.manager = {};

    Tracker.UID = util.uid();

    Tracker.BIND_MAP = {
        "click": "click",
        "move": "mousemove",
        "enter": "mouseover",
        "leave": "mouseout"
    };

    Tracker.DEFAULT_CONFIG = DEFAULT_CONFIG;

    return function (bid, types, opt_conf) {
        new Tracker(bid, types || Tracker.DEFAULT_CONFIG.types, opt_conf || {});
    };
})(window, document, {
    url: ["http://d00.sina.com.cn/a.gif", "http://d01.sina.com.cn/a.gif"],
    types: ["click", "enter", "leave", "load", "unload"],
    exdata: {
        glo: ["remarks"],
        tagname: {
            "A": ["href"]
        }
    },
    cookie: ["SINAGLOBAL"],
    tag: "digger",
    click: {
        max: 1,
        filter: function (dom) {
            return dom.getAttribute('clk') !== null;
        }
    },
    enter: {
        max: 5,
        filter: function (dom) {
            return dom.getAttribute('enter') !== null;
        }
    },
    leave: {
        max: 5,
        filter: function (dom) {
            return dom.getAttribute('leave') !== null;
        }
    }
});