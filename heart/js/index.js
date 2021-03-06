$(function(){
	var $garden,$loveHeart,gardenCanvas,gardenCtx,garden,offsetX,offsetY;
	$loveHeart = $("#loveHeart");
	offsetX = $loveHeart.width() / 2;
	offsetY = $loveHeart.height() / 2 - 55;
	$garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);	
	// renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
	
	setTimeout(function(){
		$loveHeart.css("top",($(window).height()/2-325)+"px");
		startHeartAnimation();
	},500);
	
	function getHeartPoint(angle) {
		var t = angle / Math.PI;
		var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
		var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
		return new Array(offsetX + x, offsetY + y);
	}
	
	function startHeartAnimation() {
		var interval = 50;
		var angle = 10;
		var heart = new Array();
		var animationTimer = setInterval(function () {
			var bloom = getHeartPoint(angle);
			var draw = true;
			for (var i = 0; i < heart.length; i++) {
				var p = heart[i];
				var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
				if (distance < Garden.options.bloomRadius.max * 1.3) {
					draw = false;
					break;
				}
			}
			if (draw) {
				heart.push(bloom);
				garden.createRandomBloom(bloom[0], bloom[1]);
			}
			if (angle >= 30) {
				clearInterval(animationTimer);
				showMessages();
			} else {
				angle += 0.2;
			}
		}, interval);
	}
	
	function adjustWordsPosition() {
		$('#words').css("position", "absolute");
		$('#words').css("top", $("#garden").position().top + 195);
		$('#words').css("left", $("#garden").position().left + 70);
	}
	
	function showMessages() {
		//adjustWordsPosition();
		$('#words').fadeIn(100);
		$("#words").typewriter(function(){
			$("#loveHeart").on("touchstart",function(){
				$("#words strong").animate({"marginRight":20},800,function(){
					$("#words strong").css({"font-weight":"bold","color":"#F99"});	
				});
			});
		});
		
	}
	
	
	
});

(function(a) {
    a.fn.typewriter = function(fn) {
        this.each(function() {
            var d = a(this),
            c = d.html(),
            b = 0;
            d.html("");
            var e = setInterval(function() {
                var f = c.substr(b, 1);
                if (f == "<") {
                    b = c.indexOf(">", b) + 1
                } else {
                    b++;
                }
                d.html(c.substring(0, b) + (b & 1 ? "_": ""));
                if (b >= c.length) {
                    clearInterval(e);
					d.html(c.substring(0, b));
					fn();
                }
            },100);
        });
        return this
    }
})(jQuery);

(function(){
	var token = 'wx363fa06c1cc97e27';
	wx.config({
		debug: false,
		appId: token,
		timestamp:createTimestamp(),
		nonceStr:createNonceStr(),
		signature: sign(ticket, window.location.href),
		jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo'
		]
	});	
	wx.ready(function () {
		alert(1);
		wx.onMenuShareAppMessage({
			title: '触 &middot; 爱', // 分享标题
			desc: '据说有99%的人都不知道，在情人节这天......', // 分享描述
			link: 'http://lechan.sinaapp.com/heart/index.html', // 分享链接
			imgUrl: 'http://lechan.sinaapp.com/heart/images/icon.jpg', // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
	});
	
})()