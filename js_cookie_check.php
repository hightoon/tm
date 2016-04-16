<?php
function getBrowser(){
	if(empty($_SERVER['HTTP_USER_AGENT'])){
        header("Location:http://www.robosnet.com/browser.php");
	}
    if(false!==strpos($_SERVER['HTTP_USER_AGENT'],'IE')){
        header("Location:http://www.robosnet.com/browser.php");
	}
    return "OK";
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
    <title>Info Check</title>
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

<?php if(isset($_GET['info'])):/*页面默认显示操作失败，如果浏览器的js开启，cookie也支持，则会通过js修改显示内容为登陆成功，*/?>
<div id="check_fail_log" class="check">
	<h1>操作失败</h1>
	<p>
        <?php if(($_GET['info']) == 'timeout'):?>
		<span id="js_check_fail">登陆超时或浏览器Cookie未开启，请重新登陆！</span>
        <?php else:?>
		<span id="js_check_fail">操作失败，请重新登陆！</span>
        <?php endif?>
	</p>	
</div>
<?php else:?>
<div id="check_fail_log" class="check">
	<h1>访问失败</h1>
	<p>
		<span id="js_check_fail">对不起，您的浏览器没有开启JavaScript脚本支持！</span>
		<span id="cookie_check_fail" style="display:none">对不起，您的浏览器没有开启Cookie支持！</span>
	</p>	
</div>
<div id="check_success_log" class="check" style="display:none">
	<h1>登陆成功</h1>
	<p>
		<span>正在跳转，请稍后...</span>
	</p>	
</div>
<?php endif?>
</body>
<script language="javascript" type="text/javascript">

<?php if(isset($_GET['path'])):?>
var path="<?php echo $_GET['path']?>";
window.onload=function()
{
	if(!(document.cookie || navigator.cookieEnabled)){
		document.getElementById('js_check_fail').style.display='none';
		document.getElementById('cookie_check_fail').style.display='';       
	}else{
		document.getElementById('check_fail_log').style.display='none';
		document.getElementById('check_success_log').style.display='';
		//window.setTimeout(function(){location.href='index.php/'+path+'/admin/index/'},1000);
	    window.setTimeout(function(){location.href='index.php/welcome/demo';}, 1000);
    }
};
<?php endif?>
</script>
</html>
