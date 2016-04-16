	<div id="wrapper">

        <!-- Navigation -->
        <?php include 'menu_top.php' ?>
        
        <!-- /.navbar-static-side -->
        <?php $current_file = basename(__FILE__); require 'menu_left.php' ?>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
				<h1 style="height:74px" class="page-header">账户管理<img style="float:right;height:74px" id="logo" src="<?php $tmp=base_url(); echo $tmp.'img/'.$this->session->userdata('path').'/logo.png'?>"></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-4">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            密码更改
                        </div>
                        <div class="panel-body">
							<div class="form-group">
								<label>请输入当前密码</label>
								<input class="form-control" id="passwd_old" placeholder="当前密码" type="password" value="<?php echo set_value('username'); ?>" autofocus/>
							</div>
							<div class="form-group">
								<label>请输入新密码</label>
								<input class="form-control" id="passwd_new0" placeholder="新密码" type="password" value="<?php echo set_value('password'); ?>"/>
							</div>
							<div class="form-group">
								<label>请再输入一遍新密码</label>
								<input class="form-control" id="passwd_new1" placeholder="新密码" type="password" value="<?php echo set_value('password'); ?>"/>
							</div>
							<button type="submit" class="btn btn-primary" onclick="userset0_submit()" id="passwd_ch_button" value="<?php echo $passwd_ch?>">提交修改</button>
							<!--button type="cancel" class="btn btn-primary">取消</button-->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->
			</div>

		</div>
		<!-- /#wrapper -->
	</div>
	
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

    <!-- jQuery Version 1.11.0 -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/jquery-1.11.0.js'?>"></script>

    <!-- ajaxfileupload -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/ajaxfileupload.js'?>"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/metisMenu/metisMenu.min.js'?>"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/sb-admin-2.js'?>"></script>

	<!-- Chart JavaScript -->
	<script src="<?php $tmp=base_url(); echo $tmp.'javascript/'.$admin_dir.'/userset0.js'?>" charset="utf-8"></script>
