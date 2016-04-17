    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0;    background-image: -webkit-gradient(linear, 0 0%, 0 100%, from(#666), to(#000));">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">后台管理 v1.0</a>
        </div>
        <!-- /.navbar-header -->

        <ul class="nav navbar-top-links navbar-right">
            <!-- /.dropdown -->
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-user fa-fw"></i><span id="username"><?php echo $this->session->userdata('name')?></span><i class="fa fa-caret-down"></i>
                    </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a href="<?php $tmp=base_url(); echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$zhsz_encrypt?>"><i class="fa fa-gear fa-fw"></i> 账户管理</a>
                    </li>
                    <li class="divider"></li>
                    <li><a href="<?php $tmp=base_url(); echo $tmp?>"><i class="fa fa-sign-out fa-fw"></i> 退出</a>
                    </li>
                </ul>
                <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
        </ul>
        <!-- /.navbar-top-links -->

    </nav>
