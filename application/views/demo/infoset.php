<div id="wrapper">
	<!-- Navigation -->
	<?php include 'menu_top.php' ?>
        
    <!-- /.navbar-static-side -->
    <?php $current_file = basename(__FILE__); require 'menu_left.php' ?>

	<div id="page-wrapper">
		<div class="row">
			<div class="col-lg-12">
				<h1 style="height:74px" class="page-header">参数设置<img style="float:right;height:74px" src="<?php $tmp=base_url(); echo $tmp.'img/'.$this->session->userdata('path').'/logo.png'?>"></h1>
			</div>
			<!-- /.col-lg-12 -->
		</div>
		<!-- /.row -->
		
		<div class="row">
			<div class="col-lg-12">
				<div class="panel panel-primary">
					<div class="panel-heading">
						数据显示设置
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form role="form">
									<div class="table-responsive">
										<table class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th style="width:10%">设备类型</th>
													<th style="width:25%">项目名称</th>
													<th style="width:25%">显示名称</th>
													<th style="width:5%">单位</th>
													<th style="width:15%">最大值</th>
													<th style="width:15%">最小值</th>
													<th style="width:5%">操作</th>
												</tr>
											</thead>
											<tbody>
                                                <?php if(true):?>
                                                <?php foreach($deviceSet as $meter):?>
												<tr>
													<td style="display:none"><?php echo $meter['user_id']?></td>
													<td style="display:none"><?php echo $meter['device_type']?></td>
													<td><?php echo $meter['type_name']?></td>
													<td><?php echo $meter['item_name']?></td>
													<td>
														<input type="text" class="form-control input-sm" id="Speed_alarm" value="<?php echo $meter['set_name']?>">
													</td>
													<td>
														<input type="text" class="form-control input-sm" id="Speed_alarm" value="<?php echo $meter['set_unit']?>">
													</td>
													<td>
														<input type="text" class="form-control input-sm" id="Speed_alarm" value="<?php echo $meter['set_max']?>">
													</td>
													<td>
														<input type="text" class="form-control input-sm" id="Speed_alarm" value="<?php echo $meter['set_min']?>">
													</td>
													<td>
														<button type="button" class="btn btn-primary saveinfo">保存</button>
													</td>
												</tr>
                                                <?php endforeach?>
                                                <?php endif?>
											</tbody>
										</table>
									</div>
								</form>
							</div>
							<!-- /.col-lg-6 (nested) -->
						</div>
						<!-- /.row (nested) -->
					</div>
					<!-- /.panel-body -->
				</div>
				<!-- /.panel -->
			</div>
			<!-- /.col-lg-12 -->
		</div>
		<!-- /.row -->
	</div>
	<!-- /#page-wrapper -->

</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
		<div class="panel panel-danger" id="myModal_type" style="width:280px;margin:0 auto;">
		   <div class="panel-heading">
			  <button type="button" class="close" 
			   data-dismiss="modal" aria-hidden="true">
				  &times;
				</button>
				<h4 class="modal-title" id="myModal_Label">
					提示
				</h4>
		   </div>
		   <div class="panel-body" id="myModal_content" style="text-align:center">
		   </div>
		</div>
	</div><!-- /.modal -->
</div>
<!-- /#wrapper -->
<script type="text/javascript">
	var admin_dir="<?php echo $admin_dir?>";
</script>

<!-- jQuery Version 1.11.0 -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/jquery-1.11.0.js'?>"></script>

<!-- Bootstrap Core JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/metisMenu/metisMenu.min.js'?>"></script>

<!-- Custom Theme JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/sb-admin-2.js'?>"></script>

<!-- Custom Theme JavaScript -->
<script src="<?php $tmp=base_url(); echo $tmp.'javascript/'.$admin_dir.'/infoset.js'?>"></script>