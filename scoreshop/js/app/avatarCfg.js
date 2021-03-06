(function(win, loc){
    var APPKEY="0T0WBDI6YKO1", CATE="__NEWUA__";

	var url=loc.href;
	var pref=document.referer===undefined ? "" : document.referer;
    var trackers={
		/*
		 *频道页
		 */
		//banner点击
		bannerClick:function(evt, trackTarget){
            var obj=["H", "cA",""], params={};			
            params["url"]=trackTarget.getAttribute('href');
            //params["pgn"]=trackTarget.getAttribute('data-pgn');
			params["pgn"]="video#"+EVENT_ACTION;
            params["pos"]=trackTarget.getAttribute('data-pos');
            obj.push(params);
            return obj;
        }
		//频道点击
		,channelClick:function(evt, trackTarget){
            var obj=["H", "cI",""], params={};
            params["cnt"]=trackTarget.getAttribute('href');
            params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
            obj.push(params);
            return obj;
        }
		//筛选点击
		,clickFilter:function(evt, trackTarget){
            var obj=[CATE,"clickFilter", ""], params={};
            obj.push(params);
			params["ref"]=window.location.href+";"+pref;
			return obj;
        }
		//确认筛选
		,submitFilter:function(evt, trackTarget){
            var obj=[CATE,"submitFilter", ""], params={},
			type = trackTarget.getAttribute('data-type'),
			region = trackTarget.getAttribute('data-region'),
			showTime = trackTarget.getAttribute('data-showTime'),
			age = trackTarget.getAttribute('data-age');
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			params["filterInfo"]="type="+type+"|region="+region+"|showTime="+showTime+"|age="+age;
			return obj;
        }
		//取消筛选
		,cancelFilter:function(evt, trackTarget){
            var obj=[CATE,"cancelFilter", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		
		/*
		 *榜单页
		 */
		//点击tab
		,clickvideoRank:function(evt, trackTarget){
            var obj=[CATE,"clickvideoRank", ""], params={};
            obj.push(params);
			params["ctn"]=trackTarget.getAttribute('data-code');
			return obj;
        }
		,videoRankPageView:function(evt,trackTarget){
			var obj,eventName,index;
			index = trackTarget.getAttribute('data-index');
			switch(index){
				case "0" : eventName = "videoRankSeries";break;	
				case "1" : eventName = "videoRankMovie";break;	
				case "2" : eventName = "videoRankCartoon";break;		
				case "3" : eventName = "videoRankVariety";break;		
			}
			obj=["__PAGEVIEW__","video#"+eventName,""];
			return obj;
		}
		/*
		 *详情页
		 */
		//点击tab 
		 ,clickDetailTab:function(evt, trackTarget){
            var obj=[CATE,"clickDetailTab", ""], params={};
            obj.push(params);
			params["ctn"]=trackTarget.innerHTML;
			return obj;
        }
		//点击收藏
		,collectVideo:function(evt, trackTarget){
            var obj=[CATE,"collectVideo", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//取消收藏
		,cancelCollectVideo:function(evt, trackTarget){
            var obj=[CATE,"cancelCollectVideo", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//点击追剧
		,clickTrackVideo:function(evt, trackTarget){
            var obj=[CATE,"clickTrackVideo", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//点击报错
		,clickWrongReport:function(evt, trackTarget){
            var obj=[CATE,"clickWrongReport", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//点击排序
		,clickVideoOrder:function(evt, trackTarget){
            var obj=[CATE,"clickVideoOrder", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//点击分享
		,clickVideoShare:function(evt, trackTarget){
            var obj=[CATE,"clickVideoShare", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//点击更换来源
		,changeVideoSource:function(evt, trackTarget){
            var obj=[CATE,"changeVideoSource", ""], params={};
            obj.push(params);
			params["source_id"]=trackTarget.getAttribute('data-source-id'),
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//点击离线
		,clickOffline:function(evt, trackTarget){
            var obj=[CATE,"clickOffline", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
			DEBUG('ol');
        }
		//点击播放
		,clickPlayVideo:function(evt, trackTarget){
            var 
			obj=[CATE,"clickPlayVideo", ""], 
			params={};
			
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			params["album_id"]=trackTarget.getAttribute('data-album-id')
			params["source_id"]=trackTarget.getAttribute('data-source-id');
			params["video_id"]=trackTarget.getAttribute('data-num');
			params["clarity"]=trackTarget.getAttribute('data-clarity');
			return obj;
        }
		//点击我要评论按钮
		,clickCommentBtn:function(evt, trackTarget){
            var obj=[CATE,"clickCommentBtn", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		//评论列表的评论按钮
		,clickCommentListBtn:function(evt, trackTarget){
            var obj=[CATE,"clickCommentListBtn", ""], params={};
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		,clickFollowBtn:function(evt, trackTarget){
            var obj=[CATE, trackTarget.classList.contains('followed')?"clickDefollowBtn":"clickFollowBtn", ""], params={};
			if(/\baid=(\d+)\b/.test(location.search)){
				params.aid=RegExp.$1;
			}
            obj.push(params);
			params["ref"]=encodeURI(window.location.href+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			return obj;
        }
		
    };

	if(window.Avatar&&Object.prototype.toString.call(window.Avatar)=='[object Array]'){
		var _avt=window.Avatar;
		var avatar=window.Avatar=[];
		for(var i=0, len=_avt.length; i<len; i++){
			var item=_avt[i];
			var data;
			if(typeof item[1] =='string'){
				data={
					parser:trackers[item[1]]
				};
				data.leaving=item[2];
			}else if(item[1] instanceof Array){
				data=item[1];
				for(var ii=0, len2=data.length; ii<len2; ii++){
					obj=data[ii];
					obj.parser=trackers[obj.parser];
				}
			}else if(typeof item[1] == 'object'){
				data=item[1];
				data.parser=trackers[data.parser];
			}else if(typeof item == 'function'){
				avatar.push(item);
			}
			avatar.push(["register", item[0], data]);
		}
	}


	//load and config Avatar;
	


	var evts=[], clicker=function(evt){
		//TEST('clicker>'+evt.target.className);
		evts.push(evt);
	};
	document.body.addEventListener('click', clicker);
	var remover=function(){
		document.body.removeEventListener('click', clicker);
	};
	var global=window.lestore || window.App5 || window.newxb;
	//toast.show(Avatar.getProperty("pref"));
	
	window.Avatar.push({
		startTime:new Date().getTime(),
		delay:0,
		appKey:APPKEY,
		init:function(){
			var info={EVENT_ACTION:'video#'+EVENT_ACTION};
			info.ref= encodeURI(url+";"+Avatar.getProperty("ref")+';'+Avatar.getProperty("pref"));
			info.versionName =  (global && typeof(global.getVersion) !="undefined") ? global.getVersion() : "1.0.0.55";
			info.versionCode = (global && typeof(global.getVersionCode) !="undefined") ? String(global.getVersionCode()) : "55";
			Avatar.config.PVInfo.set(info);
			/*if(EVENT_ACTION=="VideoDetail"){
				//详情页上报数据
				detailViewReport();
			}*/
		}
	});
	

})(window, window.location);
