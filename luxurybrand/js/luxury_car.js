"use strict";
var mainFunction = function (luxury_car_data, isLogin, gz_uid) {
    gz_uid = gz_uid || [];
    var gzMap = {};//已关注列表
    (function () {
        for (var i = gz_uid.length - 1; i >= 0; i--) {
            gzMap[gz_uid[i].id] = true;
        }
    })();
    var carTpl = ['<div class="luxury_car">',
                        '<ul id="list_ul">',
                            '#{renderLi}',
                        '</ul>',
                        '<div id="car_bar">',
                            '#{renderCarBar}',
                        '</div>',
                    '</div>',
                    '<div class="car_right_bg">',
                        '<div class="car_right_bg_center"></div>',
                    '</div>',
                '</div>'].join('');

    function format(tpl, stub, data) {
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
    }

    function renderLi (data) {
        var result = '',
            i = 0,
            liTpl = '<li style="width:#{liWidth}px">' +
                        '<a target="_blank" href="#{monitor}" style="width:#{liWidth}px">' +
                            '<span class="logo" style="width:#{liWidth}px"></span>' +
                            '<span class="txt" style="width:#{liWidth}px">#{name}</span>' +
                        '</a>' +
                    '</li>';

        for (i = 0; i < data.length; i++) {
            result += format(liTpl, {name: 'name'}, data[i]);
        }
        return result;
    }

    function renderCarBar (data) {
        var result = '',
            i = 0;
        var carbarTpl =
        ['<div class="car_bar">',
            '<div class="car_bar_l">',
                '<dl>',
                    '<dt>',
                        '<a href="#{mointorPrefix}http://weibo.com/#{wbId}" target="_blank">',
                            '<img src="http://tp1.sinaimg.cn/#{wbId}/30/1284017381/1" />',
                        '</a>',
                    '</dt>',
                    '<dd>',
                        '<p>',
                            '<a href="#{mointorPrefix}http://weibo.com/#{wbId}" target="_blank">',
                                '#{fullName}<img src="http://d4.sina.com.cn/shh/lechan/luxury_car/v.png" />',
                            '</a>',
                        '</p>',
                        '<p>',
                        '#{renderLogin}',
                        '</p>',
                    '</dd>',
                '</dl>',
            '</div>',
            '<div class="car_bar_r">',
                '<div class="car_wrap">',
                    '#{createContent}',
                '</div>',
            '</div>',
        '</div>'].join('');

        for (i = 0; i < data.length; i++) {
            result += format(carbarTpl, {
                'renderLogin': renderLogin,
                'createContent': createContent
            }, data[i]);
        }
        return result;
    }

    function renderLogin (data) {
        var resultTpl = '';
        if(isLogin === 0 || isLogin === 'undefined') {
            resultTpl = ['<a href="#{mointorPrefix}http://weibo.com/#{wbId}" target="_blank">',
                        '<img src="http://d1.sina.com.cn/shh/lechan/luxury_car/gz.png" />',
                    '</a>'].join('');
        } else if (gzMap[data.wbId]) {//在已关注列表中
            resultTpl = '<img src="http://d2.sina.com.cn/shh/lechan/luxury_car/gzed.png" />';
        } else {
            resultTpl = '<a href="javascript:;" onclick="luxury_car_gz(#{wbId}, ' + "'#{gzmonitorPrefix}'" + ')" id="luxury_gz_#{wbId}"><img src="http://d1.sina.com.cn/shh/lechan/luxury_car/gz.png" /></a>';
        }
        return format(resultTpl, {}, data);
    }

    function createContent (data) {
        var result = '';
        if (/\.html$/.test(data.src) || /\.html\?/.test(data.src)) {
            result = '<iframe src="' + data.src + '" scrolling="no" frameborder="0" style="width:707px;height:42px;"></iframe>';
        } else {//默认图片
            result = '<a target="_blank" href="' + data.monitor + '"><img src="' + data.src + '" width="707" height="42"/></a>';
        }
        return result;
    }
    var timer;
    function mouseEnterHandler () {
        timer && clearTimeout(timer);
        for(var i = 0; i < aLi.length; i++) {
            aLi[i].className = '';
            aCarBar[i].style.display = 'none';
        }
        aLi[this.index].className = 'show';
        aCarBar[this.index].style.display = 'block';
    }

    function mouseLeaveHandler (event) {
        var me = this;
        event = event || window.event;
        var relatedTarget = event.relatedTarget || event.toElement;
        var parent = relatedTarget;
        while (parent !== null && (parent !== aCarBar[me.index] || parent !== aLi[me.index])) {
            parent = parent.parentNode;
        }
        if (parent !== null) {
            return ;
        }
        timer = setTimeout(function () {
            aLi[me.index].className = '';
            aCarBar[me.index].style.display = 'none';
        }, 500);
    }

    var luxury_car_html = format(carTpl, {
        'renderLi': renderLi,
        'renderCarBar': renderCarBar
    }, luxury_car_data);

    document.getElementById("luxury_car").innerHTML = luxury_car_html;
    var aLi = document.getElementById("list_ul").getElementsByTagName("li");
    var aCarBar = getByClass(document.getElementById("car_bar"),"car_bar");

    for(var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aCarBar[i].index = i;
        aLi[i].onmouseover = mouseEnterHandler;
        aLi[i].onmouseout = mouseLeaveHandler;
        aCarBar[i].onmouseover = mouseEnterHandler;
        aCarBar[i].onmouseout = mouseLeaveHandler;
    }

    function getByClass (oParent,sClass){
        var parent = oParent || document;
        var re = new RegExp('\\b'+sClass+'\\b');
        var aEles = parent.getElementsByTagName('*');
        var arr = [];
        for(var i=0; i<aEles.length; i++){
            if(re.test(aEles[i].className)){arr.push(aEles[i]);}
        }
        return arr;
    };

};

var luxury_car_gz = function(uid,monitor){
    var url = 'http://all.vic.sina.com.cn/201302auto/follow.php?uid=' + uid;
    getJson(url);
    var oImage = new Image();
    oImage.src = monitor + '&_='+ new Date().getTime();
};

var luxury_car_follow = function(json){
    if(json.succ === 1){
        document.getElementById("luxury_gz_"+json.uid).parentNode.innerHTML = '<img src="http://d2.sina.com.cn/shh/lechan/luxury_car/gzed.png" />';
    }
};
