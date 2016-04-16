	<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=09a12fee552d5ad4aa2de5c0626c9c10"></script>
	<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>
	<style type="text/css">
	.headimg{
		color:#fff;font-weight:bold;text-align:center;line-height:40px;float:left;background-color:rgb(85,193,231);width:40px;height:40px;border-radius:20px
	}
	</style>
	
    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0;background: none repeat scroll 0% 0% #080808;">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
			<a class="navbar-brand" href="<?php $tmp=base_url(); echo $tmp.'index.php/admin/index'?>">后台管理 v1.0</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
					<li><a href="<?php echo $tmp.'index.php/admin/'.$zhsz_encrypt?>"><i class="fa fa-gear fa-fw"></i> 帐户设置</a>
                        </li>
                        <li class="divider"></li>
					<li><a href="<?php $tmp=base_url(); echo $tmp.'index.php/index/logout'?>"><i class="fa fa-sign-out fa-fw"></i> 登出</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation" style="background: none repeat scroll 0% 0% #3A3A3A;">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                            <!-- /input-group -->
                        </li>
                        <li>
                            <a href="<?php $tmp=base_url(); echo $tmp.'index.php/admin'?>"><i class="fa fa-dashboard fa-fw"></i> 管理首页</a>
                        </li>
						<li>
                            <a href="<?php $tmp=base_url(); echo $tmp.'index.php/admin/setslist'?>"><i class="fa fa-table fa-fw"></i> 所有设备信息</a>
                        </li>
                        <li class="active">
                            <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 单台设备信息<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
								<a href="<?php echo $tmp.'index.php/admin/'.$dtsb_encrypt?>"> 单台设备概况</a>
                                </li>
                                <li>
                                    <a class="active" href="#"> 实时信息</a>
                                </li>
                                <li>
								<a href="<?php echo $tmp.'index.php/admin/'.$lsxx_encrypt?>"> 历史信息</a>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-wrench fa-fw"></i> 后台设置<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
								<a href="<?php echo $tmp.'index.php/admin/'.$cssz_encrypt?>"> 参数设置</a>
							</li>
							<li>
								<a href="<?php echo $tmp.'index.php/admin/'.$zhsz_encrypt?>"> 帐户设置</a>
							</li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
					</ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
				<h1 style="height:74px" class="page-header">实时信息<img style="float:right;height:74px" src="<?php $tmp=base_url(); echo $tmp.'img/->session->userdata('username')/logo.png'?>"></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
			<div class="row">
				<div class="col-lg-12">
					<div class="panel panel-yellow">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-4">
									 <p><i class="fa fa-line-chart fa-2x"></i>&nbsp;&nbsp;&nbsp;当前设备编号：<span id="SetId"  class="text-danger"><?php echo $cv_id?></span></p>
								</div>
								<div class="col-lg-5 text-right">
									<p>设备选择：</p>
								</div>
								<div class="col-lg-3">
									<div class="input-group">
										<!--input onfocus="setPromot()" id="setnum-input" type="text" class="form-control input-sm" placeholder="请输入车辆编号..." /-->
										<div style="position:relative;">
											<input name="box" id="setnum-input" class="form-control input-sm" style="width:92%;position:absolute;left:0px;" value="">
											<span style="margin-left:100px;overflow:hidden;">
												<select id="onlinesets" style="width:100%;margin-left:-100px;height:30px;padding:5px 10px;font-size:12px;line-height:1.5;" onchange="this.parentNode.previousSibling.value=this.value;this.value=null">
													<option style="display:none"></option>
												</select>
											</span>
										</div>
										<span class="input-group-btn">
											<button class="btn btn-warning btn-sm" onclick="gotoSet()">
												确定
											</button>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-yellow">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="speed_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前转速：</p><p><span class="huge" id="speed">00000</span>rpm</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_speed" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="speed_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-yellow">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="fuellevel_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前燃油位置：</p><p><span class="huge" id="fuellevel">00.0</span>%</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_fuellevel" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="fuellevel_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="voltage_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前电压值：</p><p><span class="huge" id="voltage">00.0</span>V</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_voltage" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="voltage_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="runpower_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前运行功率：</p><p><span class="huge" id="runpower">00.0</span>W</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_runpower" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="runpower_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<div class="panel panel-green">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="runrate_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前运行速率：</p><p><span class="huge" id="runrate">00.0</span></p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_runrate" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="runrate_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-green">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="oilpress_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前机油压力：</p><p><span class="huge" id="oilpress">00.0</span>Bar</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_oilpress" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="oilpress_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<div class="panel panel-yellow">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="gaspress_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前排气压力：</p><p><span class="huge" id="gaspress">00000</span>Bar</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_gaspress" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="gaspress_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-yellow">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="watertemp_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前水温度：</p><p><span class="huge" id="watertemp">00.0</span>℃</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_watertemp" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="watertemp_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="oiltemp_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前液压油温度：</p><p><span class="huge" id="oiltemp">00.0</span>℃</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_oiltemp" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="oiltemp_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="gastemp_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前排气温度：</p><p><span class="huge" id="gastemp">00.0</span>℃</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_gastemp" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="gastemp_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<div class="panel panel-green">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="acur_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前A相电流：</p><p><span class="huge" id="acur">00.0</span>A</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_acur" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="acur_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="panel panel-green">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="bcur_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前B相电流：</p><p><span class="huge" id="bcur">00.0</span>A</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_bcur" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="bcur_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<div class="panel panel-green">
						<div class="panel-heading">
							<div class="row">
								<div class="col-lg-6 text-right">
									<div id="ccur_meter" style="position:absolute;top:20px;width:100px;height:100px" ></div>
									<p>当前C相电流：</p><p><span class="huge" id="ccur">00.0</span>A</p>
									<p>采集时间：</p>
									<p>0000-00-00 00:00:00</p>
								</div>
								<div class="col-lg-6">
									<div id="placeholder_ccur" style="height:100px;margin-bottom:10px" ></div>
									<div class="progress progress-striped active">
									   <div id="ccur_img" class="progress-bar " role="progressbar" 
										  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									   </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
	
	<div class="modal fade" id="eqpStatus" tabindex="-1" role="dialog" 
	   aria-labelledby="myModalLabel" aria-hidden="true">
	   <div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" 
				   data-dismiss="modal" aria-hidden="true">
					  &times;
					</button>
					<h4 class="modal-title" id="myModalLabel">
						提示
					</h4>
				</div>
				<div class="modal-body">
					<p>该设备当前不在线！</p>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/js/modernizr.js'?>'></script>
	
    <!-- jQuery Version 1.11.0 -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/jquery-1.11.0.js'?>"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/metisMenu/metisMenu.min.js'?>"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/sb-admin-2.js'?>"></script>
	
	<!-- slider -->
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap-slider.js'?>'></script>
	
    <!-- Flot JavaScript -->
    <!--[if lte IE 8]><script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/excanvas.min.js'?>"></script><![endif]-->
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.js'?>"></script>
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.pie.js'?>"></script>

    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/realtimeinfo.js'?>"></script>


 <script>
	function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
	var menu=document.getElementById(name+i);
	var con=document.getElementById("con_"+name+"_"+i);
	menu.className=i==cursel?"active":"";
	con.style.display=i==cursel?"block":"none";
	}
	}
 </script>

<script type="text/javascript">
	var map = new BMap.Map("placeholder_map");          // 创建小地图实例  
	var map_lg = new BMap.Map("placeholder_map_lg");          // 创建大地图实例 
	
	gps_lat = Number(<?php echo $realtimeinfo['GPS_lat']?>);
	temp = Math.floor(gps_lat/100);
	gps_lat = temp + (gps_lat - temp*100)/60;
	
	gps_long = Number(<?php echo $realtimeinfo['GPS_long']?>);
	temp = Math.floor(gps_long/100);
	gps_long = temp + (gps_long - temp*100)/60;

	var gpsPoint = new BMap.Point(gps_lat,gps_long);
	//坐标转换完之后的回调函数
	translateCallback = function (point){
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		map.centerAndZoom(point, 13); 
		
		var marker_lg = new BMap.Marker(point);
		map_lg.addOverlay(marker_lg);
		map_lg.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别  
		map_lg.addControl(new BMap.NavigationControl());
		map_lg.addControl(new BMap.ScaleControl());
		//alert("转化为百度坐标为："+gpoint.lng + "," + gpoint.lat);
	}

	setTimeout(function(){
		BMap.Convertor.translate(gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标
	}, 1000);
</script>  
<!--script type="text/javascript">
function addEventSimple(obj,evt,fn){
	var eventHandler = fn;
    if(obj)
    {
        eventHander = function(e)
        {
            fn.call(obj, e);
        }
    }
	if(obj.addEventListener){
		obj.addEventListener(evt,fn);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+evt,fn);
	}
}
var content = document.getElementsByClassName("btn-round");

function LinkClick(e)
{
	var a = this.children[0].className;
	if (a =="glyphicon glyphicon-chevron-up"){
		this.children[0].className = "glyphicon glyphicon-chevron-down";
	}else{
		this.children[0].className = "glyphicon glyphicon-chevron-up";
	}
}

for(var i=0; i<content.length;i++){
	addEventSimple(content[i],'click',LinkClick);
}
</script-->
<script type="text/javascript">
$(document).ready(function() {
$('#updateInterval').slider({
				tooltip: 'always'
	        });
});
</script>
<script type="text/javascript">
function setPromot(){
	//alert(11);
}
</script>
