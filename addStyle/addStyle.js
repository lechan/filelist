var addStyle = function(cssText){
	var style = document.createElement('style');
	style.type = "text/css";
	if(style.styleSheet) { //IE
		style.styleSheet.cssText = cssText;
	} else { //w3c
		style.innerHTML = cssText;
	}
	document.getElementsByTagName('head')[0].appendChild(style);
};