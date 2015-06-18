<?php
//验证TOKEN
$tokeninfo=$webconn->viewdata("*","wxtoken","where type='p'");
if(time()>$tokeninfo["rtime"]){
	$temp = $webconn->call_get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APPID."&secret=".SECRET);
	$gettoken = json_decode($temp,true);
	$token=$gettoken["access_token"];
	$rtime=time() + $gettoken["expires_in"];
	$webconn->updata("wxtoken","token='{$token}',rtime='{$rtime}'","where type='p'");
}else{
	$token=$tokeninfo["token"];
}
$smarty->assign("token",$token);
//验证ticket
$ticketinfo=$webconn->viewdata("*","wxtoken","where type='j'");
if(time()>$tokeninfo["rtime"]){
	$temp = $webconn->call_get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$token."&type=jsapi ");
	$getticket = json_decode($temp,true);
	$ticket=$getticket["ticket"];
	$rtime=time() + $getticket["expires_in"];
	$webconn->updata("wxtoken","token='{$ticket}',rtime='{$rtime}'","where type='j'");
}else{
	$ticket=$ticketinfo["token"];
}
$smarty->assign("ticket",$ticket);

?>


wx363fa06c1cc97e27

910aaadb4fd681c47bf5c430edc9dbaf

https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx363fa06c1cc97e27&secret=910aaadb4fd681c47bf5c430edc9dbaf

3zwxITBcCYqtw3Au-2y-RpL3PnLoXnenPZkMVlg_xRjymBNAAGwogTwUkzK96zmSTBlhktuWkKoZELCwZPuYMdALnP2H0-BQ1UEGK3cev8M

https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=3zwxITBcCYqtw3Au-2y-RpL3PnLoXnenPZkMVlg_xRjymBNAAGwogTwUkzK96zmSTBlhktuWkKoZELCwZPuYMdALnP2H0-BQ1UEGK3cev8M&type=jsapi