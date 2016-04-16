<!--script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=09a12fee552d5ad4aa2de5c0626c9c10"></script>
<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script--> 
 <div id="wrapper">

        <!-- Navigation -->
        <?php include 'menu_top.php' ?>
        
        <!-- /.navbar-static-side -->
        <?php $current_file = basename(__FILE__); require 'menu_left.php' ?>
        
        <div id="page-wrapper">
			<div class="row">
                <div class="col-lg-12">
				<h1 style="height:74px" class="page-header">单台设备概况<img style="float:right;height:74px" src="<?php $tmp=base_url(); echo $tmp.'img/'.$this->session->userdata('path').'/logo.png'?>"></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <div class="row">
				<div class="col-lg-8 col-md-7 col-sm-12 col-xs-12">
					<div class="row">
						<div class="col-lg-12">
							<div class="panel panel-primary">
								<div class="panel-heading">
									<div class="row">
										<div class="col-xs-3 text-center">
											<i class="fa fa-home fa-5x"></i>
										</div>
										<div class="col-xs-9 text-right">
											<div><span class="huge" id="SetId"><?php if(isset($device_id)){echo $device_id;}else{echo "";}?></span><?php if(isset($device_id)){echo "号";}else{echo "";}?></div>
											<p>设备基本信息</p>
										</div>	
									</div>	
								</div>
								<div class="panel-body">
									<div class="row">
										<div class="col-lg-7 col-md-6 col-sm-7 col-xs-7">
											<div id="allEqp_map" style="width:100%;height:230px"></div>
										</div>	
										<div class="col-lg-5 col-md-6 col-sm-5 col-xs-5">
											<div><i class="fa fa-sort-amount-asc" style="padding:5px"></i>设备类型:<strong class="text-danger"><?php if(isset($device['cv_function'])){echo $cv_info['cv_function'];}else{echo "";} ?></strong></div>
											<div><i class="fa fa-tag" style="padding:5px"></i>型号:<strong class="text-danger"><?php if(isset($cv_info['cv_model'])){echo $cv_info['cv_model'];}else{echo "";} ?></strong></div>
											<div><i class="fa fa-tachometer" style="padding:5px"></i>控制器型号:<strong class="text-danger"><?php if(isset($cv_info['cv_controller'])){echo $cv_info['cv_controller'];}else{echo "";} ?></strong></div>
											<div><i class="fa fa-clock-o" style="padding:5px"></i>录入时间:<strong class="text-danger"><?php if(isset($cv_info['record_date'])){echo $cv_info['record_date'];}else{echo "";} ?></strong></div>
                                            <div><i class="fa fa-map-marker" style="padding:5px"></i>经度:<strong class="text-danger" id="gps_long"><?php if(isset($cv_info['GPS_long'])){ $temp=floor($cv_info['GPS_long']/100); $GPS_long=($temp+($cv_info['GPS_long']-100*$temp)/60); echo $GPS_long;}else{echo "";} ?></strong></div>
                                            <div><i class="fa fa-map-marker" style="padding:5px"></i>纬度:<strong class="text-danger" id="gps_lat"><?php if(isset($cv_info['GPS_lat'])){$temp=floor($cv_info['GPS_lat']/100); $GPS_lat=($temp+($cv_info['GPS_lat']-100*$temp)/60); echo $GPS_lat;}else{echo "";} ?></strong></div>
										</div>
									</div>	
								</div>	
								<!--/div-->
							</div>
							<!-- /.panel -->
						</div>
					</div>
					<!-- /.col-lg-8 -->
					<?php if(isset($device_id)):?>
					<!--div class="row">
						<div class="col-lg-12">
							<div class="panel panel-primary">
								<div class="panel-heading">
									工作状态统计
								</div>
								<div class="panel-body">
									<button type="button" class="btn btn-default" disabled="true" style="position: absolute;right:50px;top:50px;z-index:1;" id="effect-fullrange"><i class="fa fa-arrows-alt"></i></button>
									<div id="effect-pie-chart" style="height:120px;width:120px;position: absolute;left:230px;top:40px;z-index:1;"></div>
									<div id="effect-bar-chart" style="height:200px"></div>
									<div id="overview-effect" style="height:60px"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="panel panel-primary">
								<div class="panel-heading">
									故障情况统计
								</div>
								<div class="panel-body"><div id="error-pie-chart" style="height:120px;width:120px;position: absolute;left:230px;top:40px;z-index:1;"></div>
									<div id="error-bar-chart" style="height:200px"></div>
								</div>
							</div>
						</div>
					</div-->
					<?php endif?>
				</div>
				<div class="col-lg-4 col-md-5 col-sm-12 col-xs-12">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<i class="fa fa-gears fa-fw"></i>设备列表
						</div>
						<div class="panel-body">
							<ul class="chat">							
								<li class="left clearfix">
									<a>
										<button type="submit" class="btn btn-success text-center pull-left" 
										style="width:60px;height:60px;border-radius:30px;padding:0;margin:10px;border-color:#fff;"><i class="fa fa-graduation-cap fa-2x"></i></button>
									</a>
									<div class="chat-body clearfix" style="padding:5px 20px;background-color:#5c5">
										<div class="header">
											<strong class="primary-font">说明</strong> 
											<small class="pull-right text-muted">
												时间：<i class="fa fa-clock-o fa-fw"></i> 2011-12-30
											</small>
										</div>
										<p>点击下列圆形按钮进入相应设备主页！</p>
									</div>
								</li>
                                <?php if (isset($allDevice)):?>
								<?php $flag=0; foreach($allDevice as $device): ?>
									<?php if (1 == $flag):?>
										<li class="left clearfix">
											<a href="<?php $tmp=base_url();echo $tmp."index.php/".$admin_dir."/admin/".$device['href']?>">
												<button type="submit" class="btn btn-warning text-center pull-left" 
												style="width:60px;height:60px;border-radius:30px;padding:0;margin:10px;border-color:#fff;"><?php echo $device['num']?></button>
											</a>
											<div class="chat-body clearfix" style="background-color:#5cc;padding:5px 20px">
												<div class="header">
													<strong class="primary-font">空压机</strong> 
													<small class="pull-right text-muted">
														添加时间：<i class="fa fa-clock-o fa-fw"></i> 2011-12-30
													</small>
												</div>
												<p>控制器型号：<?php echo $device['cv_controller']?></p>
											</div>
										</li>
									<?php $flag=1;?>
									<?php else:?>
										<li class="right clearfix">
											<a href="<?php $tmp=base_url();echo $tmp."index.php/".$admin_dir."/admin/index/".$device['href']?>">
												<button type="submit" class="btn btn-info text-center pull-right" 
												style="width:60px;height:60px;border-radius:30px;padding:0;margin:0px;border-color:#fff;"><?php echo $device['device_id']?></button>
											</a>
											<div class="chat-body clearfix" style="background-color:#5cc;padding:5px 20px">
												<div class="header">
													<strong class="primary-font">螺杆机</strong> 
													<small class="pull-right text-muted">
														添加时间：<i class="fa fa-clock-o fa-fw"></i> <?php echo $device['create_time'];?>
													</small>
												</div>
												<p>控制器型号：<?php echo $device['device_id']?></p>
											</div>
										</li>
									<?php $flag=0;?>
									<?php endif?>
								<?php endforeach ?>
                                <?php endif?>
							</ul>
						</div>
						<!-- /.panel-body -->
                        <div class="panel-footer">
							<div class="row">
								<div class="col-lg-6 col-md-12 col-sm-6 col-xs-6">
									<button type="submit" class="btn btn-primary text-center">上一页</button> 
									<button type="submit" class="btn btn-primary text-center">下一页</button>
								</div>
								<div class="col-lg-6 col-md-12 col-sm-6 col-xs-6">
									<div class="input-group">
										<input id="btn-input" type="text" class="form-control input-sm" placeholder="手动输入设备编号..." />
										<span class="input-group-btn">
											<button class="btn btn-warning btn-sm" id="btn-chat">
												确定
											</button>
										</span>
									</div>
								</div>
                            </div>
                        </div>
					</div>
					<!-- /.panel -->
					<?php if(isset($device_idx)):?>
					<div class="panel panel-primary">
						<div class="panel-heading">
							<i class="fa fa-gears fa-fw"></i>保养信息
						</div>
						<div class="panel-body">
                            <?php if (isset($maintain)):?>
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-3 col-xs-3 text-center">
									<div style="height:60px;width:100%;position: absolute;top:20px;z-index:1;" id="kl_maintain_percent">
									<?php echo $maintain[0]['percent']?>%
									</div>
									<div id="kl_maintain" style="width:100%;height:60px"></div>
								</div>
								<div class="col-lg-9 col-md-8 col-sm-9 col-xs-9">
									空滤器保养周期剩余时间：<span id="kl_maintain_value" ><?php echo $maintain[0]['left_time']?>小时</span>
									<span style="display:none" id="kl_maintain_period"><?php echo $maintain[0]['period1']?></span>
									<div class="progress">
									  <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $maintain[0]['percent']?>%">
										<span class="sr-only">45% Complete</span>
									  </div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-3 col-xs-3 text-center">
									<div style="height:60px;width:100%;position: absolute;top:20px;z-index:1;" id="yl_maintain_percent">
									<?php echo $maintain[1]['percent']?>%
									</div>
									<div id="yl_maintain" style="width:100%;height:60px"></div>
								</div>
								<div class="col-lg-9 col-md-8 col-sm-9 col-xs-9">
									油滤器保养周期剩余时间：<span id="yl_maintain_value" ><?php echo $maintain[1]['left_time']?>小时</span>
									<span style="display:none" id="yl_maintain_period"><?php echo $maintain[1]['period1']?></span>
									<div class="progress">
									  <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $maintain[1]['percent']?>%">
										<span class="sr-only">45% Complete</span>
									  </div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-3 col-xs-3 text-center">
									<div id="yf_maintain" style="width:100%;height:60px"></div>
									<div style="height:60px;width:100%;position: absolute;top:20px;z-index:1;" id="yf_maintain_percent">
									<?php echo $maintain[2]['percent']?>%
									</div>
								</div>
								<div class="col-lg-9 col-md-8 col-sm-9 col-xs-9">
									油分器保养周期剩余时间：<span id="yf_maintain_value" ><?php echo $maintain[2]['left_time']?>小时</span>
									<span style="display:none" id="yf_maintain_period"><?php echo $maintain[2]['period1']?></span>
									<div class="progress">
									  <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $maintain[2]['percent']?>%">
										<span class="sr-only">45% Complete</span>
									  </div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-3 col-xs-3 text-center">
									<div id="ry_maintain" style="width:100%;height:60px"></div>
									<div style="height:60px;width:100%;position: absolute;top:20px;z-index:1;" id="ry_maintain_percent">
									<?php echo $maintain[3]['percent']?>%
									</div>
								</div>
								<div class="col-lg-9 col-md-8 col-sm-9 col-xs-9">
									润滑油保养周期剩余时间：<span id="ry_maintain_value" ><?php echo $maintain[3]['left_time']?>小时</span>
									<span style="display:none" id="kl_maintain_period"><?php echo $maintain[3]['period1']?></span>
									<div class="progress">
									  <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $maintain[3]['percent']?>%">
										<span class="sr-only">45% Complete</span>
									  </div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-4 col-sm-3 col-xs-3 text-center">
									<div id="rz_maintain" style="width:100%;height:60px"></div>
									<div style="height:60px;width:100%;position: absolute;top:20px;z-index:1;" id="rz_maintain_percent">
									<?php echo $maintain[4]['percent']?>%
									</div>
								</div>
								<div class="col-lg-9 col-md-8 col-sm-9 col-xs-9">
									润滑脂保养周期剩余时间：<span id="rz_maintain_value" ><?php echo $maintain[4]['left_time']?>小时</span>
									<span style="display:none" id="rz_maintain_period"><?php echo $maintain[4]['period1']?></span>
									<div class="progress">
									  <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $maintain[4]['percent']?>%">
										<span class="sr-only">45% Complete</span>
									  </div>
									</div>
								</div>
							</div>
                            <?php endif?>
						</div>
						<!-- /.panel-body -->
					</div>
					<!-- /.panel -->
					<?php endif?>
				</div>
			<!-- /.col-lg-5 -->
			</div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    
    <!-- jQuery Version 1.11.0 -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/jquery-1.11.0.js'?>"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>
    
	<!-- Metis Menu Plugin JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/metisMenu/metisMenu.min.js'?>"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/sb-admin-2.js'?>"></script>
	
	<!-- select2 -->
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/select2-3.5.1/select2.js'?>'></script>
	
    <!-- Flot JavaScript -->
    <!--[if lte IE 8]><script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/excanvas.min.js'?>"></script><![endif]-->
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.js'?>"></script>
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.time.js'?>"></script>
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.orderBars.js'?>"></script>
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.stack.min.js'?>"></script>
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.selection.js'?>"></script>
    <script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.pie.js'?>"></script>

	<script src="<?php $tmp=base_url(); echo $tmp.'javascript/'.$admin_dir.'/basicinfo.js'?>"></script>

