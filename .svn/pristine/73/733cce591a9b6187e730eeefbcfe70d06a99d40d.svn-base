<?php
include 'http.php';
//$info = apiGet ("http://www.lenovomm.com/error/queryappvc.do?pn=com.lenovo.leos.appstore");
$type = $_GET['type'];
$pn = $_GET['pn'];
$lcaid = $_GET['lcaid'];
if($type == 'getVersionCode'){
	$info = apiGet('http://www.lenovomm.com/error/queryappvc.do?pn='.$pn);
}else if($type == 'getLcaid'){
	$info = apiGet('http://www.lenovomm.com/error/queryappvc.do?lcaid='.$lcaid);	
}
echo $info;

