    <div class="navbar-default sidebar" role="navigation" >
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
                
                <!-- /index -->
                <?php if("index.php" == $current_file): ?>
                <li>
                    <a class="active" href="#"><i class="fa fa-dashboard fa-fw"></i> 管理首页</a>
                </li>
                <?php else:?>
                <li>
                    <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index'?>"><i class="fa fa-dashboard fa-fw"></i> 管理首页</a>
                </li>
                <?php endif?>
                
                <!-- /setslist -->
                <?php if("setslist.php" == $current_file): ?>
                <li>
                    <a class="active" href="#"><i class="fa fa-table fa-fw"></i> 所有设备信息</a>
                </li>
                <?php else:?>
                <li>
                    <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$sysb_encrypt?>"><i class="fa fa-table fa-fw"></i> 所有设备信息</a>
                </li>
                <?php endif?>
                
                <!-- /singlerobo -->
                <?php if("basicinfo.php" == $current_file || "realtimeinfo.php" == $current_file || "realtimeselect.php" == $current_file || "historyinfo.php" == $current_file): ?>
                <li class="active">
                <?php else:?>
                <li>
                <?php endif?>
                    <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 单台设备管理<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <?php if("basicinfo.php" == $current_file):?>
                            <a class="active" href="#"> 单台设备概况</a>
                            <?php else:?>
                            <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$dtsb_encrypt?>"> 单台设备概况</a>
                            <?php endif?>
                        </li>
                        <li>
                            <?php if("realtimeinfo.php" == $current_file || "realtimeselect.php" == $current_file):?>
                            <a class="active" href="#"> 实时监控</a>
                            <?php else:?>
                            <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$ssxx_encrypt?>"> 实时监控</a>
                            <?php endif?>
                        </li>
                        <li>
                            <?php if("historyinfo.php" == $current_file):?>
                            <a class="active" href="#"> 历史信息</a>
                            <?php else:?>
                            <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$lsxx_encrypt?>"> 历史信息</a>
                            <?php endif?>
                        </li>
                    </ul>
                    <!-- /.nav-second-level -->
                </li>
                
                <!-- profile -->
                <?php if("infoset.php" == $current_file || "userset.php" == $current_file || "userset0.php" == $current_file || "userset1.php" == $current_file || "userset2.php" == $current_file): ?>
                <li class="active">
                <?php else:?>
                <li>
                <?php endif?>
                    <a href="#"><i class="fa fa-wrench fa-fw"></i> 后台设置<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <?php if("infoset.php" == $current_file):?>
                            <a class="active" href="#"> 参数设置</a>
                            <?php else:?>
                            <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$cssz_encrypt?>"> 参数设置</a>
                            <?php endif?>
                        </li>
                        <li>
                            <?php if("userset.php" == $current_file || "userset0.php" == $current_file || "userset1.php" == $current_file || "userset2.php" == $current_file):?>
                            <a class="active" href="#"> 账户管理</a>
                            <?php else:?>
                            <a href="<?php echo $tmp.'index.php/'.$admin_dir.'/admin/index/'.$zhsz_encrypt?>"> 账户管理</a>
                            <?php endif?>
                        </li>
                    </ul>
                    <!-- /.nav-second-level -->
                </li>
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
