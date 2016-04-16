<?php

class Ajax_setslist extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('demo_model');
		$this->load->helper('url');
	}

	public function setslist(){
		$data= $this->demo_model->get_news();

		if (empty($data))
		{
			show_404();
		}

		foreach($data as $item){
			echo "cv_id=".$item['cv_id'].";";
			echo "cur_loc=北京;";
			echo "cur_state=".$item['isOnLine'].";";
			echo "acc_time=".$item['acc_time'].";";
			echo "load_time=".$item['load_time'].";";
			echo "#";
		}
	}
	
	public function delDevice(){
	
		$device_id = $_POST['device_id'];
		
		$this->demo_model->delDevice($device_id);
		
		echo 1;
		return;
	}
	
	public function editDevice(){
		
		$info['device_id'] 			= $_POST[0];
		$info['device_type'] 		= $_POST[1];
		$info['mechine_type'] 		= $_POST[2];
		$info['mechine_controller'] = $_POST[3];
		$info['mechine_dealer'] 	= $_POST[4];
		$info['mechine_workshop'] 	= $_POST[5];
		
		$ret = $this->demo_model->setDeviceInfo($info);
		echo $ret;
		return;
	}
	
	public function addDevice(){
		
		$data = array(
		   'cv_id' 			=> $_POST['cv_id'],
		   'cv_function' 	=> $_POST['cv_function'],
		   'cv_factory' 	=> $_POST['cv_factory'],
		   'isOnLine' 		=> 0,
		   'record_date' 	=> date('Y-m-d H:i:s')
		);

		//$this->db->insert('cv_info_tbl', $data); 
	}
	
	public function allEqp(){
		$data= $this->demo_model->get_allEqp();

		if (empty($data))
		{
			show_404();
		}

		foreach($data as $item){
			echo "cv_id=".$item['cv_id'].";";
			echo "cv_function=".$item['cv_function'].";";
			echo "record_date=".$item['record_date'].";";
			echo "#";
		}
	}

	public function saveMaintainRemark(){
		
		$info['device_id'] 	= $_POST['device_id'];
		$info['item'] 		= $_POST['item'];
		$info['remark'] 	= $_POST['remark'];
		
		$ret = $this->demo_model->setMaintainRemark($info);
		echo $ret;
		return;
	}
}
?>