<?php

class Ajax_infoset extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('demo_model');
		$this->load->helper('url');
	}
	
	public function setInfo(){
		
		if(!isset($_POST)){
			echo -1;
			return;
		}
		
		$info['user_id'] 		= $_POST[0];
		$info['device_type'] 	= $_POST[1];
		$info['type_name'] 		= $_POST[2];
		$info['item_name'] 		= $_POST[3];
		$info['set_name'] 		= $_POST[4];
		$info['set_unit'] 		= $_POST[5];
		$info['set_max'] 		= $_POST[6];
		$info['set_min'] 		= $_POST[7];
		
		
		$this->demo_model->setMeter($info);
	}

}
?>