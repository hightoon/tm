<!doctype html>
    <!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
    <!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
    <!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js" lang="zh-CN"> <!--<![endif]-->
<html>
    <head>
        <!--<?php echo validation_errors(); ?>  -->
        <meta charset="utf-8" />
        <title>Login</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="web/less/animate.less-master/animate.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="web/js/woothemes-FlexSlider-06b12f8/flexslider.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="web/js/prettyPhoto_3.1.5/prettyPhoto.css" type="text/css" media="screen" />
        <link href="web/style.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="web/fonts/font-awesome/css/font-awesome.min.css" media="screen" />
        <!--[if IE 7]>
            <link rel="stylesheet" href="web/fonts/font-awsome/css/font-awesome-ie7.min.css"/>
        <![endif]-->
        <!-- Fav and touch icons -->
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-57x57-precomposed.png" />
        <link rel="shortcut icon" href="favicon.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
        <header>
            <div class="container">
                <div class="navbar">
                    <div class="navbar-inner">
                        <a class="brand" href="index.php/index/index">
                            <img src="web/images/logo.png" width="90" height="90" alt="optional logo" />
                            <span class="logo_title" style="width:600px"><strong style="font-size:30px">温度监控平台</strong></span>
                            <span class="logo_subtitle">温控互联网新时代</span>
                        </a>
                        <a href="#" style="float:right;text-align:center">
                            <div><img src="web/images/android.png"  alt="optional logo"/></div>
                            <span class="logo_subtitle">敬请期待</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <div id="main">
            <div class="container">
                <section id="register">
                    <div class="row">
                        <div class="span8">
                            <div style="padding:50px 10px 0 0">
                                <img src="web/images/robosnet.png" />
                            </div>
                        </div>
                        <div class="span4">
                            <div class="hgroup">
                                <h1>欢迎使用</h1>
                                <ul class="breadcrumb pull-right">
                                    <li class="active">登录系统</li>
                                </ul>
                            </div>
                            <div class="signin">
                                <div class="form">
                                    <?php echo form_open('/welcome/demosubmit'); ?>
                                        <input style="width:100%" id="demo_login" type="submit" name="submit" value="登陆演示账号"  class="btn btn-lg btn-info btn-large">
                                    </form>
                                </div>

                                <p>请输入用户名密码</p>
                                <?php 
                                    if(isset($error)){
                                        echo "<p style='color:#aa2222'>用户名或密码不正确！</p>";
                                    }else{
                                        echo "<br>";
                                    }
                                ?>
                                <div class="form">
                                    <?php echo form_open('/welcome/formsubmit'); ?>
                                        <div class="form-group">
                                            <input style="width:100%" class="form-control" placeholder="User Name" name="username" type="text" value="<?php echo set_value('username'); ?>" autofocus/>
                                        </div>
                                        <div class="form-group">
                                            <input style="width:100%" class="form-control" placeholder="Password" name="password" type="password" value="<?php echo set_value('password'); ?>"/>
                                        </div>
                                        <div class="forgot">
                                            <label class="checkbox">
                                                <input type="checkbox" /> 记住我
                                            </label>
                                            <a href="#">忘记密码?</a>
                                        </div>
                                        <!-- Change this to a button or input when using this as a form -->
                                        <input type="submit" name="submit" value="登陆"  class="btn btn-lg btn-success btn-large">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <footer>
            <section id="copyright">
                <div class="container">
                    <div class="row" style="text-align: center;">
                        <div class="span6">温控互联网平台技术支持 &copy; <a target="_blank" href="http://www.google.com.cn">Excellent网络科技</a></div>
                    </div>
                </div>
            </section>
        </footer>
    </body>
</html>
