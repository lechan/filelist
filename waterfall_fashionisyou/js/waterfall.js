// Masonry 模块
(function(a,b,c){var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()};var f=["position","height"];b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[],this.reloadItems();var d=this.element[0].style;this.originalStyle={};for(var e=0,g=f.length;e<g;e++){var h=f[e];this.originalStyle[h]=d[h]||""}this.element.css({position:"relative"}),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var i=this;setTimeout(function(){i.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){i.resize()})},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0,c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/(this.columnWidth+this.options.gutterWidth)),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d=0,e=f.length;d<e;d++){var g=f[d];c[g]=this.originalStyle[g]}this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){--e<=0&&this.src!==f&&(setTimeout(g),d.unbind("load error",h))}function g(){a.call(b,d)}var b=this,d=b.find("img").add(b.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e||g(),d.bind("load error",h).each(function(){if(this.complete||this.complete===c){var a=this.src;this.src=f,this.src=a}});return b};var g=function(a){this.console&&console.error(a)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d)g("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){g("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);
// 结束 masonry



(function(window,$,undefined){
	var waterfall = window.waterfall = {
		url : 'js/data.js',
		itemWidth : 230, //单元块的宽度，包含了margin、padding、border
		itemClassName : 'cell_item',
		dom : {
			container : $('#waterfall'),
			itemCon : $('.'+this.itemClassName),
			page : $('#hid_page'),
			loader : $("#loader")
		},
		loadSwitch : true,
		init : function(){
			this.containerInit();
			this.getData();
			this.scroll();
		},
		containerInit : function(){
			var This = this;
			This.dom.container.imagesLoaded(function(){
				This.dom.container.masonry({
					columnWidth: This.itemWidth,
					itemSelector : '.'+This.itemClassName
				});
				This.dom.itemCon.show();
			});
		},
		itemTemplate : function(result){
			var html = '';
			html +='<div class="cell_item">';
			html +='<a href="javascript:void(0)" onclick=shareweibo("'+result.pic_url+'") ><img src="http://rm.vic.sina.com.cn/minisite/2013/201308lfy/images/share.png" style="position:absolute; top:10px; right:10px;" /></a>'
			html +='<div class="pic_wrap">';
			html +='	<a><img src="'+result.pic_url+'" /></a>';
			html +='</div>';
			html +='<div class="func_box">';
			html +='	<span>'+result.nickname+'</span>';
			html +='    <i>'+result.vote_count+'</i>';
			html +='    <a href="javascript:void(0)" onclick=popvote("'+result.id+'","'+result.nickname+'") ><img src="http://rm.vic.sina.com.cn/minisite/2013/201308lfy/images/zan.png" /></a>';
			html +='</div>';
			html +='</div>';
			return html;
		},
		getData : function(){
			var This = this;
			
			var page = This.dom.page.val();
			if(!This.loadSwitch){
				return;
			}
			This.loadSwitch = false;
			//http://all.vic.sina.com.cn/redbull/list_json.php?type=1&page=1
			//{"is_end":0,"result":[{"id":"53154","sina_id":"2112758871","nickname":"\u54ea\u8c01\u5bb6\u5c0f\u54ea\u8c01","head_url":"http:\/\/tp1.sinaimg.cn\/2112758871\/180\/0\/1","pic_url":"http:\/\/video.vic.sina.com.cn\/allvic\/shibajiufang\/\/79\/77\/10314.jpg","text":"#\u671d\u7115\u65b0\u80fd\u91cf# \u6bcf\u4e2a\u65e9\u4e0a\uff0c\u90fd\u8981\u8fd9\u4e48\u6027\u611f\u4e00\u756a\uff0c\u7ed9\u7761\u773c\u60fa\u5fea\u7684\u8001\u516c\u63d0\u4e2a\u795e\uff01 ","mid":"3606618052750507","repost_num":"166","vote_count":"13724","total_num":"13890","today_time":"20130801","one_num":"3734","two_num":"10156","three_num":"0","four_num":"0","week_num":"1","is_hot":"1","is_title":"0","city":null,"add_time":"2013-08-01 22:43:34","updatetime":"2013-08-09 01:55:48","add_ip":"221.223.233.208","status":"1"}]}
			
			var url = This.url+'?page='+page;
			$.getJSON(url,function(jData){
				
				This.dom.loader.show();
				var isEnd = jData.is_end;
				var html = '';
				if(isEnd==0){
					var $dataWrap = $('<div></div>');
					for(var i=0;i<jData.result.length;i++){
						var result = jData.result;
						html +=
						This.itemTemplate({
							id : result[i].id,
							pic_url : result[i].pic_url,
							nickname : result[i].nickname,
							vote_count : result[i].vote_count
						});
					}
					$dataWrap.html(html);
					var $newData = $dataWrap.find('.'+This.itemClassName);
					This.dom.container.append($newData);
					$newData.css({'opacity':0});
					$newData.imagesLoaded(function(){
						This.dom.container.masonry( 'appended',$newData, true );
						// 渐显新的内容
						$newData.animate({'opacity':1},500);
						This.dom.loader.hide();
						This.loadSwitch = true;
					});
				}
			});
		},
		scroll : function(){
			var This = this;
			$(window).on('scroll', function() {
				var loader = $(document).height() - 100;
				var iH = $(window).scrollTop() + $(window).innerHeight();
				if (loader < iH) {
					if(This.loadSwitch == true){
						This.dom.loader.show();
						var pageNum = parseInt(This.dom.page.val());
						This.dom.page.val(pageNum+1)
						This.getData();
					}
				}
			})
		}
	}
})(window,$);

waterfall.init();	