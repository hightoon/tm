<?php

class Ajax_realtimeinfo extends CI_Controller{

	public function __construct(){
		parent::__construct();
        $this->load->model('demo_model');
		$this->load->helper('url');
	}

	public function index(){
		$this->load->view('web/index');
	}
	
	public function getonlinesets(){
	}
	
	public function isonline(){

		$data = dataio_isonline($_POST['cv_id']);
        echo $data;
	}

	public function readinfo($device_id = FALSE){

		if(FALSE === $device_id && isset($_POST['device_id'])){
			$device_id = $_POST['device_id'];
        }
		if(!isset($device_id) || ($device_id<8600000)){
			return;
		}

		$snd_msg = "1:".($device_id-8600000);
		$rcv_msg = "";
		$timeout = 10;
		$socket = stream_socket_client('unix:///var/run/mysocket.sock', 
										$errorno, $errorstr, $timeout);
		stream_set_timeout($socket, $timeout);
		
		if(!fwrite($socket, $snd_msg)){
			echo("Error while Writeing to socket!!!<br>\n");
			return;
		}

		if (!($rcv_msg = fread($socket, 1024))){
			echo("Error while reading from socket!!!<br>\n");
			return;
		}
		else{
			//$ret = explode(",", $rcv_msg);
			echo $rcv_msg;
			return;
		}		
	}
	
	public function setmeter(){
		
		if(!isset($_POST)){	
			return;
		}
		
		$info['user_id'] 		= $_POST['device_id'][1];
		$info['device_type'] 	= $_POST['device_id'][2];
		
		$i=0;
		foreach($_POST as $item){
			if(0 == $i){
				$i = 1;
				continue;
			}			
			$info['item_name'] 		= $item[0];
			$info['set_name'] 		= $item[1];
			$info['set_unit'] 		= $item[2];
			$info['set_max'] 		= $item[3];
			$info['set_min'] 		= $item[4];
			$info['is_display']		= $item[6];
			
			$this->demo_model->setMeter($info);
		}
		
		return;
	}
	
	public function shutdown(){
		dataio_cmd($_POST['cv_id'],1);
		echo 0;
		return;
	}
	
	public function start(){
		dataio_cmd($_POST['cv_id'],0);
		echo 0;
		return;
	}
	
	public function load(){
		dataio_cmd($_POST['cv_id'],2);
		echo 0;
		return;
	}
	
	public function unload(){
		dataio_cmd($_POST['cv_id'],3);
		echo 0;
		return;
	}
}
?>
