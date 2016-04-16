    <div id="wrapper">

        <!-- Navigation -->
        <?php include 'menu_top.php' ?>
        
        <!-- /.navbar-static-side -->
        <?php $current_file = basename(__FILE__); require 'menu_left.php' ?>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
				<h1 style="height:74px" class="page-header">账户管理<img style="float:right;height:74px" src="<?php $tmp=base_url(); echo $tmp.'img/'.$this->session->userdata('path').'/logo.png'?>"></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            密码更改
                        </div>
                        <div class="panel-body">
							<form role="form">
								<div class="form-group">
									<label>请输入当前密码</label>
									<input class="form-control" placeholder="当前密码">
								</div>
								<br>
								<div class="form-group">
									<label>请输入新密码</label>
									<input class="form-control" placeholder="新密码">
								</div>
								<div class="form-group">
									<label>请再输入一遍输入新密码</label>
									<input class="form-control" placeholder="新密码">
								</div>
								<button type="submit" class="btn btn-primary">提交修改</button>
								<button type="cancel" class="btn btn-primary">取消</button>
							</form>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->
				
				<?php if($this->session->userdata('admin_level') == 1):?>
						<div class="col-lg-6">
							<div class="panel panel-default">
								<div class="panel-heading">
									添加账户
								</div>
								<div class="panel-body">
									<form role="form">
										<div class="form-group">
											<label>请输入当前密码</label>
											<input class="form-control" placeholder="当前密码">
										</div>
										<br>
										<div class="form-group">
											<label>请输入新密码</label>
											<input class="form-control" placeholder="新密码">
										</div>
										<div class="form-group">
											<label>请再输入一遍输入新密码</label>
											<input class="form-control" placeholder="新密码">
										</div>
										<button type="submit" class="btn btn-primary">提交修改</button>
										<button type="cancel" class="btn btn-primary">取消</button>
									</form>
								</div>
								<!-- /.panel-body -->
							</div>
							<!-- /.panel -->
					<?php endif?>
					<!-- /.col-lg-6 -->
				</div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery Version 1.11.0 -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/jquery-1.11.0.js'?>"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/bootstrap.min.js'?>"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/plugins/metisMenu/metisMenu.min.js'?>"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<?php $tmp=base_url(); echo $tmp.'bootstrap/js/sb-admin-2.js'?>"></script>
