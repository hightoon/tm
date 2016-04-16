<?php
function getBrowser(){
    if(empty($_SERVER['HTTP_USER_AGENT'])){
        return;
    }   
    if(false!==strpos($_SERVER['HTTP_USER_AGENT'],'IE')){
        return;
    }   
    header("Location:http://www.robosnet.com");
}

getBrowser();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>	
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>浏览器兼容性检测</title>
</head>
<style type="text/css">
::selection{ background-color: #E13300; color: white; }
::moz-selection{ background-color: #E13300; color: white; }
::webkit-selection{ background-color: #E13300; color: white; }

body {
	background-color: #fff;
	margin: 40px;
	font-family: "Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu, "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
	color: #4F5155;
}

a {
	color: #003399;
	background-color: transparent;
	font-weight: normal;
}

h1 {
	color: #444;
	background-color: transparent;
	border-bottom: 1px solid #D0D0D0;
	font-size: 19px;
	font-weight: normal;
	margin: 0 0 14px 0;
	padding: 14px 15px 10px 15px;
}

.check {
	margin: 10px;
	border: 1px solid #D0D0D0;
	-webkit-box-shadow: 0 0 8px #D0D0D0;
}

p {
	margin: 12px 15px 12px 15px;
}
</style>

<body>
<div id="check_fail_log" class="check">
	<h1>浏览器交互体验级别过低</h1>
	<p>为保证良好的交互体验，请勿使用IE浏览器！</p>	
	<p>如果您使用的是以下浏览器，请按下图操作进行访问：</p>
	<p>360浏览器、搜狗浏览器</p>
</div>
<div style="padding:10px">
	<img src="http://www.robosnet.com/img/jianrongxing.png">
</div>
</body>
<script language="javascript" type="text/javascript">

</script>
</html>
