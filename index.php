<?php

function prolist($url, $type, $root_path = ''){
	$handle=opendir($url);
	$projectContents = '';
	$files = "";
	while ($file = readdir($handle)){
	    if(in_array($file, array('.', '..'))) continue;
		$files .= "{$file},";
	}
	$files = explode(',', rtrim($files, ','));
	sort($files);
	foreach ($files as $file){
		if($type==1){
			if(is_dir($url.'/'.$file)){
				$projectContents .= '<li><h3 data-path="'.$url.'/'.$file.'" onClick="showlist(this)">'.$file.'</h3></li>';
			}
		}else if($type==2){
		    //echo $file, ' ', filetype($url.'/'.$file), '</br>'; 
			if(is_dir($url.'/'.$file)){
				$projectContents .= '<li><h3 data-path="'.$url.'/'.$file.'" onClick="showlist(this)">'.$file.'</h3></li>';
			}elseif(is_file($url.'/'.$file)){
			    $root_path && $href = dirname($_SERVER['PHP_SELF']).str_replace($root_path, '', $url.'/'.$file);
				$href='http://'.$_SERVER["HTTP_HOST"].substr($href,1);
				$projectContents .= '<li><a href="'.$href.'" target="_blank">'.$file.'</a></li>';
			}
		}
	}
	return "<ul>".$projectContents."</ul>";
}

$m=$_GET["m"];
if($m!="list"){
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta property="wb:webmaster" content="a7a2cd23dfc1af87" />
<title>晨的列表</title>
<style type="text/css">
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0}
html{color:#000;overflow-y:scoll; overflow-x:hidden; overflow:-moz-scrollbars-vertical}
body,button,input,select,textarea{font-size:12px;font-family:arial,\5b8b\4f53,sans-serif}
h1,h2,h3,h4,h5,h6{font-size:100%}
em{font-style:normal}
small{font-size:12px}
ul,ol{list-style:none}
a{text-decoration:none}
a:hover{text-decoration:underline}
legend{color:#000}
fieldset,img{border:0}
button,input,select,textarea{font-size:100%}
table{border-collapse:collapse;border-spacing:0}
img{-ms-interpolation-mode:bicubic}
textarea{resize:vertical}
body{ overflow-x:hidden;}
.header{ max-width:1000px; min-width:260px; margin:0 auto; line-height:50px; height:50px; margin-bottom:20px; padding:0px 30px;}
.header h1{ font-size:20px;}
.fileList{ max-width:1000px; min-width:320px; margin:0 auto; overflow:hidden; padding:0px 30px 30px;}
.fileList ul li{ width:100%; margin-top:10px; font-size:14px; line-height:30px; overflow:hidden;}
.fileList ul li a{ color:#333; -webkit-tap-highlight-color: rgba(0,0,0,0); display:block; width:100%;}
.fileList ul li a:hover{ color:#666;}
.fileList ul li h3{ cursor:pointer; color:#111; border-bottom:1px solid #030; margin-bottom:10px; width:290px;-webkit-tap-highlight-color: rgba(0,0,0,0); padding-left:10px; border-left:4px solid #fff;}
.fileList ul li h3:hover{ color:#369; border-left:4px solid #369;}
.fileList ul li ul{ margin-left:30px;}
</style>
</head>

<body>
<div class="header"><h1>File List</h1></div>
<div class="fileList">
<?php
$file_path = str_replace('\\', '/', dirname(__FILE__));
echo prolist($file_path, 1);
?>
</div>
<span id="root_path" style="display:none;"><?php if($file_path) echo $file_path;?></span>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
function showlist(e){
	if($(e).siblings('ul').length==0){
		var path = $(e).data('path');
		var root_path = $("#root_path").html();
		var url = 'index.php?m=list&type=2';
		var data = '/' + $(e).html();
		$.post(url,{path:path,root_path:root_path},function(obj){
			$(e).parent('li').append(obj);	
		});
		event.stopPropagation();
	}else{
		$(e).siblings('ul').remove('ul');
		event.stopPropagation();
	}
}

$(function(){
	$(".fileList a").click(function(event){
		event.stopPropagation();
	});	
});
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47161734-1', 'sinaapp.com');
  ga('send', 'pageview');

</script>
</body>
</html>
<?php
}else{
$type=$_GET["type"];
$path = $_POST["path"];
$root_path = $_POST["root_path"];
echo prolist($path, $type, $root_path);
}
?>


