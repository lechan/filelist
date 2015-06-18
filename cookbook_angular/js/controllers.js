var cookCtrls = angular.module('cookCtrls', []);

cookCtrls.controller('startAnimeCtrl',['$scope',function($scope){
	var logo = $("#logo"),logoTxt = $("#logo h1"),searchbox = $("#search");
	setTimeout(function(){
		logo.animate({top : 150},500,function(){
			logoTxt.animate({opacity : 100},1000,function(){
				searchbox.animate({opacity : 150},500);
			});
		});
	},1000);	
}]);

cookCtrls.controller('listCtrl', ['$scope','$http',function($scope,$http,listData){
	$scope.list = [];
	var cookList = {
		_key : "5c34d0cdd72ee8145f5d4602b69d01bd",
		_menu : function(){return encodeURI($("#search_inp").val());},
		_rn : 5,
		_pn : function(){return $("#listNum").val();},
		_cb : "JSON_CALLBACK",
		url : function(){
			return "http://apis.juhe.cn/cook/query.php?key="+this._key+"&menu="+this._menu()+"&rn="+this._rn+"&pn="+this._pn()+"&callback="+this._cb;
		},
		flag : true,
		moreBtn : function(){
			var more = $('<div class="more">加载更多</div>');
			var This = this;
			$(".wrap .more").remove();
			$(".wrap").append(more);
			more.on('click',function(){
				$("#listNum").val(parseInt($("#listNum").val()) + This._rn);
				This.renderData(This.url());
				This.flag = false;
				more.remove();
			});	
		},
		renderData : function(){
			var This = this,inp = $("#search_inp"),resultcode,listData,len;
			if(This.flag){
				This.flag = false;
				$http.jsonp(This.url()).success(function(jdata){
					resultcode = jdata.resultcode;
					listData = jdata.result.data;
					len = listData.length;
					This.flag = true;
					if(resultcode==200){
						if(len!=0){
							for(var i in listData){
								listData[i].status = true;
								$scope.list.push(listData[i]);
							}
							console.log($scope.list);
							$(".wrap ul").show();
							This.moreBtn();
						}
					}else if(resultcode==201){
						alert("亲，菜谱名没填哦~");
						inp.focus();
					}else if(resultcode==202){
						alert("亲，菜谱查询不到哦，再输入一个吧~");	
						inp.value = "";
						inp.focus();
					}
				});
			}	
		}
	}
	
	$scope.searchBtn = function(){
		$("#logo").hide();
		$scope.list = [];
		cookList.renderData();
	}
	$scope.toggle = function(e,self){
		e.status = !e.status;
		$("html,body").animate({scrollTop: $(self).offset().top}, 100);
	}
}]);