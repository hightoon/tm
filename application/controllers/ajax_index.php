<?php

class Ajax_index extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('info_model');
		$this->load->helper('url');
		$this->load->library('session');  
	}

	public function addRemark(){
		
		$name = $_POST['name'];
		$remark = $_POST['remark'];
		$admin_id=$this->session->userdata['admin_id'];
		
		$ret = $this->info_model->add_remark($name,$admin_id,$remark);
		echo $ret;
		return;
	}

	public function delRemark(){
		
		//$name = $_POST['name'];
		//$remark = $_POST['remark'];
		$date = $_POST['date'];
		$admin_id=$this->session->userdata['admin_id'];
		
		$ret = $this->info_model->del_remark($admin_id,$date);
		echo $ret;
		return;
	}
}
?>