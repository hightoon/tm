	
	<!--[if lte IE 8]><script language="javascript" type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/excanvas.min.js'?>'></script><![endif]-->
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.js'?>'></script>
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.time.js'?>'></script>	
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.symbol.js'?>'></script>	
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.axislabels.js'?>'></script>
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.threshold.js'?>'></script>
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/flot/jquery.flot.crosshair.js'?>'></script>

	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/javascript/realtimeselect.js'?>'></script>
	
	<!-- select2 -->
	<script type="text/javascript" src='<?php $tmp=base_url(); echo $tmp.'bootstrap/select2-3.5.1/select2.js'?>'></script>	
	

	<style type="text/css">
	.headimg{
		color:#fff;font-weight:bold;text-align:center;line-height:40px;float:left;background-color:rgb(85,193,231);width:40px;height:40px;border-radius:20px
	}
	</style>

    <div id="wrapper">

        <!-- Navigation -->
        <?php include 'menu_top.php' ?>
        
        <!-- /.navbar-static-side -->
        <?php $current_file = basename(__FILE__); require 'menu_left.php' ?>
        
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
				<h1 style="height:74px" class="page-header">实时监控<img style="float:right;height:74px" src="<?php $tmp=base_url(); echo $tmp.'img/'.$this->session->userdata('path').'/logo.png'?>"></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
				<div class="col-lg-8">
					<div class="panel panel-default">
						<div class="panel-heading">
							当前设备编号：<span id="SetId"><?php echo $device_id?></span>
						</div>
						<div class="panel-body" style="text-align:center">
							<p>该设备当前不在线，请选择其它设备！</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4">
					<div class="panel panel-default">
						<div class="panel-heading">
							设备选择
						</div>
						<div class="panel-body">
							<select id="device_id_select" style="width:200px;margin-top:5px">
								<option value="<?php echo $device_id ?>"><?php echo $device_id ?></option>
								
								<?php foreach($onlineEqp as $online_item): ?>
									<?php if($online_item['num'] != $device_id): ?>
										<option value="<?php echo $online_item['href']?>"><?php echo $online_item['num']?></option>
									<?php endif?>
								<?php endforeach ?>
							</select>
						</div>
					</div>
				</div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
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
    <!-- Bootstrap Core JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>

