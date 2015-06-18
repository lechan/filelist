String.byteLength = function(str) {
    if (typeof str == "undefined") {
        return 0
    }
    var aMatch = str.match(/[^\x00-\x80]/g);
    return (str.length + (!aMatch ? 0: aMatch.length))
};
String.trimHead = function(str) {
    return str.replace(/^(\u3000|\s|\t)*/gi, "")
};
String.trimTail = function(str) {
    return str.replace(/(\u3000|\s|\t)*$/gi, "")
};
String.trim = function(str) {
    return String.trimHead(String.trimTail(str))
};

var ua = navigator.userAgent.toLowerCase();
$IE = /msie/.test(ua);
$OPERA = /opera/.test(ua);
$MOZ = /gecko/.test(ua);
$IE5 = /msie 5 /.test(ua);
$IE55 = /msie 5.5/.test(ua);
$IE6 = /msie 6/.test(ua);
$IE7 = /msie 7/.test(ua);
$SAFARI = /safari/.test(ua);
$winXP = /windows nt 5.1/.test(ua);
$winVista = /windows nt 6.0/.test(ua);
$FF2 = /Firefox\/2/i.test(ua);
$IOS = /\((iPhone|iPad|iPod)/i.test(ua);

var $CLTMSG = {
	CD0033: "还可以输入<em>${num}</em>个字",
	CD0034: "已经超出<em>${num}</em>个字"
}

function $E(oID) {
	var node = typeof oID == "string" ? document.getElementById(oID) : oID;
	if (node != null) {
		return node
	} else {}
	return null
}


function openBox(boxId,iserrorlogin){
	$dialog = $("#" + boxId);
	$('.basicDialog').hide();
	if(iserrorlogin) {
		$('#errorlogin').show();
	} else {
		$('#errorlogin').hide();
	}
	$dialog.show();
}
function closeBox(){	
	$('.basicDialog').hide();
}
// 遮罩层 begin
var coverLayer = {
	divObj : null,
	_coverTime : null,
	_coverRe : function(){//刷新遮盖层
		if(document.body.offsetHeight < document.documentElement.clientHeight){
			this.divObj.style.width = document.body.clientWidth + "px";
			this.divObj.style.height = document.documentElement.clientHeight + "px";
		}else{
			this.divObj.style.width = document.body.clientWidth + "px";
			this.divObj.style.height = document.body.clientHeight + "px";
		}
	},
	isIE : navigator.appVersion.indexOf("MSIE")!=-1?true:false,
	on : function(noSave){ //打开遮盖层
		if(this.divObj == null){
			this.divObj = document.createElement("div");
			this.divObj.style.zIndex = 9;
			this.divObj.style.left = '0px';;
			this.divObj.style.top = '0px';;
			this.divObj.style.position = "absolute";
			this.divObj.style.backgroundColor = "#000";
			if(this.isIE){
				var tempFrame = document.createElement("iframe");
				tempFrame.style.filter = "Alpha(Opacity=0)";
				tempFrame.frameBorder=0;
				tempFrame.scrolling="no";
				tempFrame.style.width = "100%";
				tempFrame.style.height = "100%";
				this.divObj.appendChild(tempFrame);
				this.divObj.style.filter = "Alpha(Opacity=70)";
			}else{
				this.divObj.style.opacity = 0.7
			};
			document.body.appendChild(this.divObj);
		};
		if(document.body.offsetHeight < document.documentElement.clientHeight){
			this.divObj.style.width = document.body.clientWidth + "px";
			this.divObj.style.height = document.documentElement.clientHeight + "px";
		}else{
			this.divObj.style.width = document.body.clientWidth + "px";
			this.divObj.style.height = document.body.clientHeight + "px";
		};
		this.divObj.style.display = "block";
		clearInterval(this._coverTime);
		this._coverTime = setInterval("coverLayer._coverRe()",50);
	},
	off : function(noSave){ //关闭遮盖层
		if(this.divObj){this.divObj.style.display = "none"};
		clearInterval(this._coverTime);
	}
}
// 遮罩层 end

function forwardInputLimit(textAreaId,tipInfoId) {
	var maxlen = 280;
	var mdforwardtextarea = $E(textAreaId);
	//alert(textAreaId+':'+tipInfoId);
	var tipStringOK = $CLTMSG.CD0033;
	var tipStringErr = $CLTMSG.CD0034;
	var num = Math.ceil(String.byteLength(String.trim(mdforwardtextarea.value)) / 2);
	//alert(num);
	
	var $tipInfoBox = $E(tipInfoId);
	if ($tipInfoBox) {
		if (num > 140) {
			$tipInfoBox.innerHTML = tipStringErr.replace(/\$\{num\}/, (maxlen / 2 - num) * ( - 1));
			$tipInfoBox.style.color = "#008BE6";
			return false
		} else {
			$tipInfoBox.innerHTML = tipStringOK.replace(/\$\{num\}/, (maxlen / 2 - num));
			$tipInfoBox.style.color = "#b84040";
			return true
		}
	}
}

function checkchar(textAreaId,tipInfoId){	
	try {
		setTimeout(function() {
			$E(textAreaId).focus();			
			forwardInputLimit(textAreaId,tipInfoId);
		},
		100)
	} catch(e) {		
		$E(textAreaId).focus();		
		setTimeout(forwardInputLimit, 5)	
	}
}


function pubTextAreaCheckchar(pubTextAreaId,tipInfoId) {
	var pubTextArea = $E(pubTextAreaId);
	pubTextArea.onchange = function(){
		checkchar(pubTextAreaId,tipInfoId);
	}
	pubTextArea.onfocus = function(){
		checkchar(pubTextAreaId,tipInfoId);
	}
	pubTextArea.onkeydown = function(){
		checkchar(pubTextAreaId,tipInfoId);
	}	
}


$(function(){
	try {
		forwardInputLimit('pubTArea','tipInfoBox');
		pubTextAreaCheckchar('pubTArea','tipInfoBox');
    } catch(e){}	
	
})

function add_emotions(text) {
	var mblog_content = $("#pubTArea").val();
	$("#pubTArea").val(mblog_content + '[' + text + ']');
	forwardInputLimit('pubTArea','tipInfoBox');
	return false;
}
