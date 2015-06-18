define(["app/tool","app/dialog","app/toast","app/cities"],function(t,dialog,toast) {
"use strict";
var global = window.lestore || window.App5 || window.newxb;
var config={
    getAddress:"getdeliveryaddr.do",
    postAddress:"updatedeliveryaddr.do",
    isPost:false
};
var MOCK={
	getAddress:"MOCK/getAddress.json",
    postAddress:"MOCK/postAddress.json"	
}
t.debugMode(config,MOCK);
var address = (function(){
    var initPage=function(){
        /*if(t.getURLParam("gid")!="" && t.getURLParam("gid")!=0){
            loadGiftDetail("logId="+t.getURLParam("gid"));
            //document.title="编辑订单收货信息";
//        }else{
//            loadAddress();
        }*/
		loadAddress();
        bindEvent();
    },
    loadAddress=function(){
		var orderId = t.getURLParam("orderId");
		if(orderId=="" || !orderId){
			orderId = 0;
			$("#addressTips").show();
		}else{
			$("#setDefault").show();	
		};
		$.ajax({
			url:config.getAddress+'?orderId='+orderId+'&t='+Date.parse(new Date()),
			type:"GET",
			dataType:"json",
			success: function(res){
				if(res.status==true){
            		setAddrData(res["data"]);
				}
			},
			error: function(){
				toast.show("网络异常，请稍后再试");	
			}
		});
    },
	$_id = function(_id){
		return document.getElementById(_id);
	},
    setAddrData=function(res){
        $("#name").val(res["userName"]);
        $("#tel").val(res["phoneNumber"]);
        $("#qq").val(res["qqNum"]);
        $("#province").val(res["province"]);
        $("#city").val(res["city"]);
        $("#county").val(res["region"]);

        $("#area").val(res["province"]+res["city"]+res["region"]);
        $("#areaTemp").val(res["province"]+","+res["city"]+","+res["region"]);

        $("#addr").val(res["address"]);
        $("#userId").val(res["userId"]);
    },
    setPushToFresh=function(){
    	if(document.getElementById("mask").style.display=="block"){
            global && global.togglePushToRefresh && global.togglePushToRefresh(false);
        }else{
            global && global.togglePushToRefresh && global.togglePushToRefresh(true);
        }
    },
    bindEvent=function(){
        document.querySelector("#area").addEventListener("click",function(e){
            $("#area").blur();
            var setCityData=function(_type){
                    var str="";
                    switch(_type){
                        case 0:
                            //$("#areaTemp").val("");
                            var city=area_data,
                                len=city.length,
                                pname=$("#province").val();
                            for(var i=1;i<len;i++){
                                str+='<li class="'+ (pname==city[i].name?"cur":"") +'" data-name="'+ city[i].name +'" data-sublen='+ (city[i].sub==undefined?0:city[i].sub.length) +'>'+ city[i].name +'<i class="icon icon-city"></i></li>';
                            }
                            break;
                        case 1:
                            var city=area_data,
                                len=city.length,
                                pname=$("#province").val();
                            for(var i=1;i<len;i++){
                                if(pname==city[i].name){
                                    var city=city[i].sub,
                                        len=city.length,
                                        name=$("#city").val();
                                    for(var i=1;i<len;i++){
                                        str+='<li class="'+ (name==city[i].name?"cur":"") +'" data-name="'+ city[i].name +'" data-sublen='+ (city[i].sub==undefined?0:city[i].sub.length) +'>'+ city[i].name +'<i class="icon icon-city"></i></li>';
                                    }
                                }
                            }
                            break;
                        case 2:
                            var city=area_data,
                                len=city.length,
                                pname=$("#province").val();
                            for(var i=1;i<len;i++){
                                if(pname==city[i].name){
                                    var city=city[i].sub,
                                        len=city.length,
                                        cityname=$("#city").val();
                                    for(var i=1;i<len;i++){
                                        if(cityname==city[i].name){
                                            var city=city[i].sub,
                                                len=city.length,
                                                name=$("#county").val();
                                            for(var i=1;i<len;i++){
                                                str+='<li class="'+ (name==city[i].name?"cur":"") +'" data-name="'+ city[i].name +'" data-sublen='+ (city[i].sub==undefined?0:city[i].sub.length) +'>'+ city[i].name +'<i class="icon icon-city"></i></li>';
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    $("#CityList").html(str);
                    setTimeout(function(){
                        bindEventCity(_type);
                    },300);
                },
                bindEventCity=function(_type){
                    var node=document.querySelectorAll("#CityList li");
                    for(var i= 0,l=node.length;i<l;i++){
                        (function(i,_type){
                            node[i].addEventListener("click",function(){
                                $("#CityList li").removeClass("cur");
								$(node[i]).addClass("cur");
                                var subLen=node[i].getAttribute("data-sublen");
                                var curValue=node[i].getAttribute("data-name");
                                switch(_type){
                                    case 0:
                                        $("#province").val(curValue);
										$("#city").val("");
										$("#county").val("");
                                        break;
                                    case 1:
                                        $("#city").val(curValue);
										$("#county").val("");
                                        break;
                                    case 2:
                                        $("#county").val(curValue);
                                        break;
                                    default:
                                        break;
                                }
                                if(subLen>0){
                                    setTimeout(function(){
                                        setCityData(++_type);
                                    },200);
                                }else{
                                	var newCityStr='';
                                	switch(_type){
	                                    case 0:
	                                        newCityStr=$("#province").val();
	                                        break;
	                                    case 1:
	                                        newCityStr=$("#province").val()+","+$("#city").val();
	                                        break;
	                                    case 2:
	                                        newCityStr=$("#province").val()+","+$("#city").val()+","+$("#county").val();
	                                        break;
	                                    default:
	                                        break;
	                                }
                                    $("#areaTemp").val(newCityStr);
                                    $("#area").val(newCityStr.replace(/\,/g,""));
                                    dialog.close();
                                    setPushToFresh();
                                }
                            },false);
                        })(i,_type);
                    }
                },
                setCityWrapHeight=function(){
                    var flag=10;
                    window.setCityWrapHeightTimer=setInterval(function(){
                        if(flag<=0){
                            window.clearInterval(window.setCityWrapHeightTimer);
                        }
                        flag--;
                        var dialogH=window.getComputedStyle($_id("dialogWrapper"),null).height;
                        var titH=window.getComputedStyle($_id("DialogCityTit"),null).height;
						$("#DialogCityCon").css("height",(parseFloat(dialogH)-parseFloat(titH))-64+"px");
                    },200)

                };
            var startStr =  '\
			<section class="pop_wrap">\
				<h2 class="dialogCityTit" id="DialogCityTit">请选择地区</h2>\
				<div class="dialogCon" id="DialogCityCon">\
					<ul class="cityList" id="CityList"></ul>\
				</div>\
			</section>';
			$("#dialogWrapper").css("height","90%");	
            dialog.open(startStr);
            setCityData(0);
            setCityWrapHeight();
            setPushToFresh();
			document.removeEventListener("touchmove");
            $_id('mask').addEventListener("click",function(){
            	window.lestore && window.lestore.togglePushToRefresh && window.lestore.togglePushToRefresh(true);
            });
        });
		
		$("#setDefault").on("click",function(){
			$("#setDefault").find("span").toggleClass("active");
			if($("#setDef").val()=="true"){
				$("#setDef").val("false");
			}else{
				$("#setDef").val("true");
			}	
		});

        config.isPost=false;
        document.querySelector("#SubmitAddr").addEventListener("click",function(e){
            address.submitForm();
        });
    },
    submitForm=function(){
        var userName=$("#name").val(),
            tel=$("#tel").val(),
            qq=$("#qq").val(),
            addr=$("#addr").val(),
            userId=$("#userId").val(),
			defaultAddr = $("#setDef").val(),
            param={};
        if(userName==""){
            toast.show("请输入姓名。");
            $("#name").focus();
            return false;
        }else{
			param["userName"] = encodeURIComponent(userName);
        };
        if(tel==""){
            toast.show("请输入手机号码。");
            $("#tel").focus();
            return false;
        }else if(!(/^0?1\d{10}$/.test(tel))){
            //!(/^0?1[358]\d{9}$_id/.test(tel) || /^0?(\d{1,4}[-]?)?(\d{6,8})([-]?\d{1,4})$_id/.test(tel))
            toast.show("您输入的手机号码不合法，请核对。");
            $("#tel").focus();
            return false;
        }else{
			param["phoneNumber"] = tel;
        };
        if(qq==""){
            toast.show("请输入QQ号码。");
            $("#qq").focus();
            return false;
        }else if(!/^\d{5,10}$/.test(qq)){
            toast.show("您输入的QQ号不合法，请核对。");
            $("#qq").focus();
            return false;
        }else{
			param["qqNum"] = qq;
        };
        if($("#areaTemp").val()==""){
            toast.show("您选择收货地址。");
            return false;
        }else{
            var areaArray=$("#areaTemp").val().split(",");
            if(areaArray[0]==""){
                toast.show("您选择收货地址。");
                return false;
            }else{
				param["province"] = encodeURIComponent(areaArray[0]);
				param["city"] = areaArray[1] ? encodeURIComponent(areaArray[1]) : "";
				param["region"] = areaArray[2] ? encodeURIComponent(areaArray[2]) : "";
            }
        };

        if(addr==""){
            toast.show("请输入详细收货地址。");
            $("#addr").focus();
            return false;
        }else{
			param["address"] = encodeURIComponent(addr);
        }
        if(t.getURLParam("orderId") && t.getURLParam("orderId")!=""){
			param["orderId"] = t.getURLParam("orderId");
        }else{
			param["orderId"] = 0;
        };
		param["userId"] = userId;
		param["asDefaultAddr"] = defaultAddr;

        if(!config.isPost){
            config.isPost=true;
            var timer = setTimeout(function(){config.isPost=false;},11000);
			var from,id;
			console.log(param);
			$.ajax({
				url:config.postAddress,
				type:"POST",
				data:param,
				dataType:"json",
				success: function(data){
					if(data.status==true){
						toast.show("恭喜，地址保存成功！");
						from = t.getURLParam("from");
						if(from=="detail"){
							id = t.getURLParam("id");
							setTimeout(function(){window.location.href = "detail.html?id="+id},2000);
						}else if(from=="order"){
							setTimeout(function(){window.location.href = "order.html"},2000);
						}else{
							setTimeout(function(){window.location.href = "order.html"},2000);	
						}
					}else{
						toast.show("地址保存失败，请重试");
					}
					config.isPost=false;
					clearTimeout(timer);
				},
				error: function(){
					toast.show("网络异常，请稍后再试");	
					config.isPost=false;
					clearTimeout(timer);
				}	
			});	
        }
    },
    submitArea=function (){
        var province=$_id("province").options[$_id("province").selectedIndex].text,
            city=$_id("city").options[$_id("city").selectedIndex].text,
            county=$_id("county").options[$_id("county").selectedIndex].text;
        if(province=="请选择"){
            toast.show("请选择省份");
            return false;
        }else if(city=="请选择"){
            toast.show("请选择城市");
            return false;
        }else if(county=="请选择"){
            toast.show("请选择区县");
            return false;
        }
        $("#area").val(province+" "+city+" "+county);
        dialog.close();
    };
    return {
        initPage:initPage,
        submitArea:submitArea,
        submitForm:submitForm
    };
})();

    dialog.ready(true);
	toast.ready();
	address.initPage();
    document.getElementById("name").focus();

    //back回调
    window.backevent=function(){
        if($("#UpdateStoreDialog")){
            return 0;
        }else{
            if(document.getElementById("mask").style.display=="block"){
                dialog.close();
                setTimeout(function(){
                	window.lestore && window.lestore.togglePushToRefresh && window.lestore.togglePushToRefresh(true);
                },200);                
                return 1;
            }else{
                return 0;
            }
        }
    }

    //对A520特殊处理
    /*var phoneModel=window.lestore && window.lestore.getPhoneModel().toLowerCase();
    if(phoneModel=="lenovo a520" || phoneModel=="lenovo a60"){
        var clientHeight=document.documentElement.clientHeight;
        function setBotBar(){
            var node=$_id("addrBtnWrap"),nodeH=window.getComputedStyle(node,null).height;
            node.style.position="absolute";
            node.style.top=(document.body.scrollTop+clientHeight-nodeH) +"px";
            node.style.left="0px";
        }
        window.addEventListener("scroll",setBotBar,false);
    }*/
	
});