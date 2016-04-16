<!--script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=09a12fee552d5ad4aa2de5c0626c9c10"></script>
<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/changeMore.js"></script-->  
<div id="wrapper">

        <!-- Navigation -->
        <?php include 'menu_top.php' ?>
        
        <!-- /.navbar-static-side -->
        <?php $current_file = basename(__FILE__); require 'menu_left.php' ?>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
				<h1 style="height:74px" class="page-header">所有设备信息<img style="float:right;height:74px" src="<?php $tmp=base_url(); echo $tmp.'img/'.$this->session->userdata('path').'/logo.png'?>"></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            所有设备信息
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-condensed" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th>设备编号</th>
											<th>设备类型</th>
                                            <th>机型</th>
                                            <th>控制器型号</th>
											<th>当前状态</th>
											<th>经销商</th>
											<th style="display:none">用户</th>
											<th>车间</th>
											<th>设备添加时间</th>
											<th>操作</th>
                                        </tr>
                                    </thead>
									<tbody id="listTable">
										
										<?php foreach ($allDevice as $device):?>
										<tr>
                                            <td><a style="text-decoration:underline" href="<?php $tmp=base_url(); echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$device['href']?>"><?php echo $device['device_id']?></a></td>
											<td><?php echo $device['device_type']?></td>
                                                                                        <td><?php echo $device['machine_type']?></td>
                                                                                        <td><?php echo $device['machine_controller']?></td>
											<td><?php if(1 == $device['device_id']){echo "在线";}else{echo "离线";} ?></td>
											<td><?php echo $device['machine_dealer']?></td>
											<td style="display:none"><?php echo $device['device_id']?></td>
											<td><?php echo $device['machine_workshop']?></td>
											<td><?php echo $device['create_time']?></td>
											<td><a href="javascript:void(0)"  onclick="modalShowDel(this);">删除</a> | <a href="javascript:void(0)"  onclick="modalShowEdit(this);">编辑</a></td>
                                        </tr>
										<?php endforeach?>
									</tbody>
								</table>
								<?php if ($this->session->userdata("admin_level") == 1):?>
									<button class="btn btn-default pull-right" data-toggle="modal" data-target="#addItem">添加设备</button>
                                    <div class="modal fade" id="addItem" tabindex="-1" role="dialog" 
                                                               aria-labelledby="myModalLabel" aria-hidden="true">
                                       <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" 
                                                   data-dismiss="modal" aria-hidden="true">
                                                      &times;
                                                    </button>
                                                    <h4 class="modal-title" id="myModalLabel">
                                                        添加设备
                                                    </h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="input-group" style="width:300px">
                                                        <span class="input-group-addon">设备编号</span>
                                                        <input type="text" class="form-control" id="add_id">
                                                    </div>
                                                    <br/>
                                                    <div class="input-group" style="width:300px">
                                                        <span class="input-group-addon">设备类型</span>
                                                        <input type="text" class="form-control" id="add_type">
                                                    </div>
                                                    <br/>
                                                    <div class="input-group" style="width:300px">
                                                        <span class="input-group-addon">使用厂家</span>
                                                        <input type="text" class="form-control" id="add_factory">
                                                    </div>
                                                    <ul class="list-inline" style="text-align:right;">
                                                        <li><button type="button" class="btn btn-primary" onclick="addEqp()" id="modalAddYes">确定</button></li>
                                                        <li><button type="button" class="btn btn-primary" onclick="$('#addItem').modal('hide');">取消</button></li>
                                                    </ul>
                                                </div>
                                            </div><!-- /.modal-content -->
                                        </div><!-- /.modal -->
                                    </div><!-- /.modal -->
								<?php endif?>
								<div class="modal fade" id="delItem" tabindex="-1" role="dialog" 
														   aria-labelledby="myModalLabel" aria-hidden="true">
								   <div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" 
											   data-dismiss="modal" aria-hidden="true">
												  &times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													警告
												</h4>
											</div>
											<div class="modal-body">
												<p>你确定要删除编号为<span id="del_device_id" style="font-weight:bold;color:red"></span>的设备吗?</p>
												<ul class="list-inline" style="text-align:right;">
													<li><button type="button" class="btn btn-primary" id="modalDelYes">确定</button></li>
													<li><button type="button" class="btn btn-primary" onclick="$('#delItem').modal('hide');">取消</button></li>
												</ul>
											</div>
										</div><!-- /.modal-content -->
									</div><!-- /.modal -->
								</div><!-- /.modal -->
								<div class="modal fade" id="editItem" tabindex="-1" role="dialog" 
														   aria-labelledby="myModalLabel" aria-hidden="true">
								   <div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" 
											   data-dismiss="modal" aria-hidden="true">
												  &times;
												</button>
												<h4 class="modal-title" id="myModalLabel">
													编辑
												</h4>
											</div>
											<div class="modal-body">
												<p>设备编号：<span id="edit_device_id" style="font-weight:bold;color:red"></span></p>
												<br/>
												<p>设备类型：<span id="edit_type" style="font-weight:bold;color:red"></span></p>
												<br/>
												<div class="input-group" style="width:300px">
													<span class="input-group-addon">机型</span>
													<input type="text" class="form-control" id="edit_function">
												</div>
												<br/>
												<div class="input-group" style="width:300px">
													<span class="input-group-addon">控制器型号</span>
													<input type="text" class="form-control" id="edit_controller">
												</div>
												<br/>
												<div class="input-group" style="width:300px">
													<span class="input-group-addon">经销商</span>
													<input type="text" class="form-control" id="edit_dealer">
												</div>
												<br/>
												<div class="input-group" style="width:300px">
													<span class="input-group-addon">车间</span>
													<input type="text" class="form-control" id="edit_factory">
												</div>
												<ul class="list-inline" style="text-align:right;">
													<li><button type="button" class="btn btn-primary" id="editmodalDelYes">确定</button></li>
													<li><button type="button" class="btn btn-primary" onclick="$('#editItem').modal('hide');">取消</button></li>
												</ul>
											</div>
										</div><!-- /.modal-content -->
									</div><!-- /.modal -->
								</div><!-- /.modal -->
								<script>
								</script>
								
							</div>
                            <!-- /.table-responsive -->
							
							
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="fa fa-warning"></i>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseWarning" aria-expanded="true" style="color:#fff" aria-controls="collapseWarning">
                                报警信息（所有设备）
                            </a>
                        </div>
                        <!-- /.panel-heading -->
						<div id="collapseWarning" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
							<div class="panel-body">
								<div class="table-responsive">
									<table style="width:100%" class="table table-bordered table-condensed" id="dataTables-alarm">
										<thead>
											<tr>
												<th style="width:10%">设备编号</th>
                                                <th style="width:50%">报警原因</th>
												<th style="width:20%">报警开始时间</th>
												<th style="width:20%">报警结束时间</th>
											</tr>
										</thead>
										<tbody>
                                            <?php if (isset($allWarning)):?>
											<?php foreach ($allWarning as $allWarning_list):?>
												<tr>
													<td><a href="<?php $tmp = base_url(); echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$allWarning_list['href']?>"><?php echo $allWarning_list['device_id']?></a></td>
                                                    <td><?php echo $allWarning_list['alarm_detail']?></td>
													<td><?php echo $allWarning_list['alarm_start']?></td>
                                                    <td><?php 
													$alarm_end = ($allWarning_list['alarm_end'])?($allWarning_list['alarm_end']):("报警仍未结束！");
													echo $alarm_end;
													?></td>
												</tr>
											<?php endforeach?>
											<?php endif?>
										</tbody>
									</table>
								</div>
								<!-- /.table-responsive -->
							</div>
							<!-- /.panel-body -->
						</div>
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="fa fa-ambulance"></i>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseError" aria-expanded="true" style="color:#fff" aria-controls="collapseError">
                                保养信息（所有设备）
                            </a>
                        </div>
                        <!-- /.panel-heading -->
						<div id="collapseError" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
							<div class="panel-body">
								<div class="table-responsive">
									<table class="table table-bordered table-condensed" id="dataTables-maintain">
										<thead>
											<tr>
												<th style="width:10%">设备编号</th>
												<th style="display:none">部件</th>
												<th style="width:15%">具体部件</th>
												<th style="width:10%">保养周期</th>
												<th style="width:10%">保养剩余时间</th>
												<th style="width:15%">上次保养时间</th>
												<th style="width:30%">备注信息</th>
											</tr>
										</thead>
										<tbody>
                                            <?php if(isset($allMaintain)):?>
											<?php foreach ($allMaintain as $maintain):?>
												<tr>
													<td><a href="<?php $tmp=base_url(); echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$maintain['href']?>"><?php echo $maintain['device_id']?></a></td>
													<td style="display:none"><?php echo $maintain['item']?></td>
													<td><?php echo $maintain['item_name']?>(<?php echo $maintain['item']?>)</td>
													<td><?php echo $maintain['period']?>小时</td>
													<td
													<?php
														if($maintain['time_left'] < 24){
															echo "style=\"background-color:#f00;color:#FFF\"";
														}
													?>
													><?php echo $maintain['time_left']?>小时</td>
													<td>
														<?php
															$item = ($maintain['last_maintain_time'])?($maintain['last_maintain_time']):("暂未保养过");
															echo $item;
														?>
													</td>
													<td>
														<div class="pull-left">
														<?php
															$item = ($maintain['remark'])?($maintain['remark']):("无");
															echo $item;
														?>
														</div>
														<button class="maintain-remark btn btn-default btn-xs pull-right">修改</button>
													</td>
												</tr>
											<?php endforeach?>
											<?php endif?>
										</tbody>
									</table>
								</div>
								<!-- /.table-responsive -->
							</div>
							<!-- /.panel-body -->
						</div>
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->
            </div>
            <!-- /.row -->
            
            <!-- /.row -->
            <!--div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            运行效率统计
                        </div>
                        <div class="panel-body">
                            <button type="button" class="btn btn-default" disabled="true" style="position: absolute;right:50px;top:50px;z-index:1;" id="effect-fullrange"><i class="fa fa-arrows-alt"></i></button>
                            <div id="effect-bar-chart" style="height:200px"></div>
                            <div id="overview-effect" style="height:60px"></div>
                        </div>
                    </div>
                </div>
            </div!-->
            <!-- /.row -->
            <!-- /.row -->
            <!--div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            故障次数统计
                        </div>
                        <div class="panel-body">
                            <div id="error-pie-chart" style="height:120px;width:120px;position: absolute;left:230px;top:40px;z-index:1;"></div>
                            <div id="error-bar-chart" style="height:200px"></div>
                        </div>
                    </div>
                </div>
            </div!-->
            
            <!-- /.row -->
            <!--div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            故障率统计
                        </div>
                        <div class="panel-body">
                            <div id="rate-pie-chart" style="height:120px;width:260px;position: absolute;left:230px;top:40px;z-index:1;"></div>
                            <div id="rate-line-chart" style="height:200px"></div>
                        </div>
                    </div>
                </div>
            </div!-->
            
            <!-- /.row -->
            <!--div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            设备故障率统计
                        </div>
                        <div class="panel-body">
                            <div id="eqp-bar-chart" style="height:200px"></div>
                        </div>
                    </div>
                </div>
            </div!-->
            
            <!-- /.row -->
            <!--div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            保养信息统计
                        </div>
                        <div class="panel-body">
                            <button type="button" class="btn btn-default" disabled="true" style="position: absolute;right:50px;top:50px;z-index:1;" id="maintain-fullrange"><i class="fa fa-arrows-alt"></i></button>
                            <div id="maintain-stack-chart" style="height:200px"></div>
                            <div id="overview-maintain" style="height:60px"></div>
                        </div>
                    </div>
                </div>
            </div!-->
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary" style="border:0">
                        <div class="panel-heading">
                            详细地图信息
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body" style="padding:0;">
                            <div id="allEqp_map" style="width:100%;height:560px"></div>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                    <script type="text/javascript">
						var admin_dir = "<?php echo $admin_dir?>";
                        var robos_position = new Array(
                            new Array(-1,-1)
                        <?php
                        foreach($allDevice as $device){
                            if($device['GPS_lat'] != null && $device['GPS_long'] != null){
                                ?>
                                ,new Array(<?php echo $device['GPS_lat']?>,<?php echo $device['GPS_long']?>)
                                <?php
                            }
                        }
                        ?>
                        );
                    </script>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
		
	</div>
	<!-- /#normal -->
	
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content" style="width:280px;margin:0 auto;">
			<div class="modal-header" id="myModal_type">
				<button type="button" class="close" 
			   data-dismiss="modal" aria-hidden="true">
				  &times;
				</button>
				<h4 class="modal-title" id="myModal_Label">
					提示
				</h4>
			</div>
			<div class="modal-body" id="myModal_content" >
			</div>
		</div>
	</div><!-- /.modal -->
</div>

<script type="text/javascript">
	var admin_dir="<?php echo $admin_dir?>";
</script>

<!-- Page-Level Demo Scripts - Tables - Use for reference -->
    <!-- jQuery Version 1.11.0 -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/jquery-1.11.0.js'?>"></script>

<!-- Bootstrap Core JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/metisMenu/metisMenu.min.js'?>"></script>

<!-- DataTables JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/dataTables/jquery.dataTables.js'?>"></script>
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/dataTables/dataTables.bootstrap.js'?>"></script>

<!-- Custom Theme JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/sb-admin-2.js'?>"></script>

<!-- Flot JavaScript -->
<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/excanvas.min.js'?>"></script><![endif]-->
<script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.pie.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.time.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.orderBars.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.stack.min.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.selection.js'?>"></script>

<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'javascript/'.$admin_dir.'/setslist.js'?>'></script>