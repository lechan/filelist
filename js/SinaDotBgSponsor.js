function SinaDotAdJs1(){
//-------------------------------

var pthis = this;
//浏览器判断
this.isIE=navigator.userAgent.indexOf("MSIE")==-1?false:true;
this.isOPER=navigator.userAgent.indexOf("Opera")==-1?false:true;
this.version=navigator.appVersion.split(";"); 
//this.trim_Version=this.version[1].replace(/[ ]/g,""); 
//this.isIE6=(navigator.appName=="Microsoft Internet Explorer" && this.trim_Version=="MSIE6.0")?true:false;
this.isXHTML = document.compatMode=="CSS1Compat"?true:false;

//获取body
this.bdy = (document.documentElement && document.documentElement.clientWidth)?document.documentElement:document.body;

//获取对象
this.$ = function(id){if(document.getElementById){return eval('document.getElementById("'+id+'")')}else{return eval('document.all.'+id)}};

//获取cookie
this.getAdCookie = function(N){
	var c=document.cookie.split("; ");
	for(var i=0;i<c.length;i++){var d=c[i].split("=");if(d[0]==N)return unescape(d[1]);}
	return "";
};

//设置cookie
this.setAdCookie = function(N,V,Q,D){
	var L=new Date();
	var z=new Date(L.getTime()+Q*60000);
    var tmpdomain = "";
	if(typeof(D)!="undefined"){if(D){tmpdomain="domain=sina.com.cn;";}}
	document.cookie=N+"="+escape(V)+";path=/;"+tmpdomain+"expires="+z.toGMTString()+";";
};

//外部事件加载
this.addEvent = function(obj,event,func){
  var MSIE=navigator.userAgent.indexOf("MSIE");
  var OPER=navigator.userAgent.indexOf("Opera");
  if(document.all && MSIE!=-1 && OPER==-1){
    obj.attachEvent("on"+event,func);
  }else{
    obj.addEventListener(event,func,false);
  }
};

//容器对象
this.initWrap = function(mod,id,v,w,h,po,l,r,t,b,z,m,p,bg,dsp){
  var lst='';
  if(mod == 0x01){lst += 'pthis.'+v+' = document.createElement("'+id+'");';}
  else if(mod == 0x02){lst += 'pthis.'+v+' = document.getElementById("'+id+'");';}
  else return;
  if(v!="" && mod == 0x01){lst+=v+'.id = "'+v+'";';}
  if(w!=""){lst+=v+'.style.width = '+w+' + "px";';}
  if(h!=""){lst+=v+'.style.height = '+h+' + "px";';}
  if(po!=""){
	  lst+=v+'.style.position = "'+po+'";';

      if(l!=""){lst+=v+'.style.left = '+l+' + "px";';}
      else if(l=="" && r!=""){lst+=v+'.style.right = '+r+' + "px";';}
	  if(t!=""){lst+=v+'.style.top = '+t+' + "px";';}
      else if(t=="" && b!=""){lst+=v+'.style.bottom = '+b+' + "px";';}
	  if(z!=""){lst+=v+'.style.zIndex = "'+z+'";';}
  }
  if(bg!=""){lst+=v+'.style.background = "'+bg+'";';}
  if(m!=""){lst+=v+'.style.margin = "'+m+'";';}
  if(p!=""){lst+=v+'.style.padding = "'+p+'";';}
  if(dsp!=""){lst+=v+'.style.display = "'+dsp+'";';}
  return lst;
};

//素材对象
this.initObj = function(id,s,u,w,h){
  var lst = s.substring(s.length-3).toLowerCase();
  switch(lst){
	 case "tml":
	 case "htm":
	 case "php":var to = document.createElement("iframe");
                     to.id=id;
	                 to.width=w;
	                 to.height=h;
                     to.src=s;
                     to.frameBorder = 0;
					 to.allowTransparency = "true";
                     to.scrolling = "no";
                     to.marginheight = 0;
                     to.marginwidth = 0;
					 break;
	 case "swf": var to = document.createElement("div");
					 var fo = new sinaFlash( s, id, w, h, "7", "", false, "High");
	                 fo.addParam("wmode", "transparent");
	                 fo.addParam("allowScriptAccess", "always");
	                 fo.addParam("menu", "false");
	                 fo.write(to);
				     break;
     case "jpg":
     case "gif":
	 case "png":if(u!=""){
		             var to = document.createElement("a");
					 to.href = u;
					 to.target = "_blank";
					 var io = new Image();
	                 io.id = id;
					 io.style.width = w+"px";
					 io.style.height = h+"px";
					 io.style.border = "none";
					 io.src = s;
					 to.appendChild(io);
				}else{
				     var to = new Image();
	                 to.id = id;
					 to.style.width = w+"px";
					 to.style.height = h+"px";
					 to.style.border = "none";
					 to.style.cursor = "pointer";
					 to.src = s;	 
				}
				     break;
	     default:var to = document.createElement("a");
		             to.id = id;
					 to.href = u;
					 to.target = "_blank";
                     to.innerText = s;
  }
  return to;
};

//-------------------------------
};

(function(){
  //加载素材
  this.data = ["bg.jpg","#","","no-repeat center 120px"];
  var pthis = this;//设置指针
  var o = new SinaDotAdJs1();//加载通用类
 
//构造函数
this.init = function(){
  try{
   
   //设置背景
   pthis.bdyWrap = document.getElementsByTagName("body").item(0);
   pthis.bdyWrap.style.background = "url("+pthis.data[0]+") "+pthis.data[3];
   pthis.bdyWrap.style.paddingTop = 0;
   pthis.bdyWrap.style.marginTop = 0;
   
   //构造主容器
   //document.write('<div id="bgAdWrap"></div><style type="text/css">#page{background:#fff;}</style>');
   
   var bgAdWrap = document.createElement('div');
   var fullScreenWrap = document.getElementById('FullScreenWrap');
   bgAdWrap.id = 'bgAdWrap';
   document.body.insertBefore(bgAdWrap,fullScreenWrap);
   eval(o.initWrap(0x02,"bgAdWrap","mWrap","1000","30","relative","","","","","","0 auto","0","none","block"));
   pthis.mWrap = mWrap;
   
   //窄通素材
   if(pthis.data[2]!=""){
     pthis.iObj = o.initObj("",pthis.data[2],pthis.data[1],1000,30);
   }else{
     eval(o.initWrap(0x01,"a","iObj","1000","30","absolute","0","","0","","1","0","0","url(http://d1.sina.com.cn/shh/SinaDotColumnBarCreativeTool/spc.gif) repeat","block"));
     pthis.iObj.style.cursor = "pointer";
     pthis.iObj.target = "_blank";
     pthis.iObj.href=pthis.data[1];
   }
   pthis.mWrap.appendChild(pthis.iObj);
   //pthis.iObj.insertBefore(document.getElementById('page'));
   //关闭事件
   this.closeAD = function(){
	 pthis.bdyWrap.style.background = "none";
	 pthis.bdyWrap.style.paddingTop = 5 +"px";
     pthis.mWrap.innerHTML = "";
     pthis.mWrap.style.display = "none";
	 o.setAdCookie("bgAdCookie"+document.URL,0,1440);
   };
   //关闭按钮
   eval(o.initWrap(0x01,"div","cBtn","40","18","absolute","","1","","7","2","0","0","url(http://d1.sina.com.cn/shh/tianyi/bg/audi_zty_cls1.jpg) no-repeat right","block"));
   pthis.cBtn = cBtn;
   pthis.cBtn.style.cursor = "pointer";
   pthis.tmpImg = document.createElement("img");
   pthis.tmpImg.src="http://d1.sina.com.cn/shh/tianyi/bg/audi_zty_cls2.jpg";
   pthis.cBtn.onmouseover = function(){pthis.cBtn.style.background = "url(http://d1.sina.com.cn/shh/tianyi/bg/audi_zty_cls2.jpg) no-repeat";}
   pthis.cBtn.onmouseout = function(){pthis.cBtn.style.background = "url(http://d1.sina.com.cn/shh/tianyi/bg/audi_zty_cls1.jpg) no-repeat";}
   pthis.mWrap.appendChild(pthis.cBtn);
   o.addEvent(pthis.cBtn,"click",pthis.closeAD);
  }catch(e){}
}
 //ip限制
 var cookie = o.getAdCookie("bgAdCookie"+document.URL);
 cookie = cookie==""?1:cookie;
 if(cookie==1 && pthis.data[0]!=""){pthis.init();}

})();