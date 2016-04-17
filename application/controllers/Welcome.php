<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
	
	public function __construct()
	{
		parent::__construct();
		//$this->load->model('robo_user_model');
		$this->load->helper (array(
			'form',  
			'url'   
        	));

		$this->load->library('session'); 
	    $this->load->library('encrypt');
    }

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		//$this->load->view('welcome_message');
		$this->load->view('login_page');
	}

	public function demosubmit() {
        
     		$data = array (
                	'name'      => "Demo",
                	//'password'  => md5("123456"),
                	'userip'    => $_SERVER['REMOTE_ADDR'],  
                	'logintime' => time()
        	);
        
        	$data['path'] = 'demo';
        	$this->session->set_userdata($data);
        	header("Location:../../js_cookie_check.php?path=".$data['path']);
   	}

    public function demo()
    {
        $data = array(
            'sysb_encrypt' => $this->encrypt->encode('setslist'),
            'dtsb_encrypt' => $this->encrypt->encode('basicinfo'),
            'ssxx_encrypt' => $this->encrypt->encode('realtimeinfo'),
            'lsxx_encrypt' => $this->encrypt->encode('historyinfo'),
            'cssz_encrypt' => $this->encrypt->encode('infoset'),
            'zhsz_encrypt' => $this->encrypt->encode('userset'),
            'sbzw_encrypt' => $this->encrypt->encode('setsgroup'),
            'admin_dir'    => $this->session->userdata('path'),
            'deviceNum'    => 3,
            'allDevices'   => array(
                array('GPS_lat' => 3015.2,
                      'GPS_long' => 12007.2000,
                      'device_id' => '温度监测-1',
                      'href' => $this->encrypt->encode('basicinfo/86000300'),
                      'machine_type' => 'realtime',
                      'machine_model' => 'TM8888001',
                      'create_time' => '2016-04-17 12:00:00'
                ),
                array('GPS_lat' => 3010.2,
                      'GPS_long' => 12000.2000,
                      'device_id' => '温度监测-2',
                      'href' => $this->encrypt->encode('basicinfo/86000301'),
                      'machine_type' => 'realtime',
                      'machine_model' => 'TM8888001',
                      'create_time' => '2016-04-17 12:00:00'
                ),
                array('GPS_lat' => 3000.2,
                      'GPS_long' => 12020.2000,
                      'device_id' => '温度监测-3',
                      'href' => $this->encrypt->encode('basicinfo/86000302'),
                      'machine_type' => 'realtime',
                      'machine_model' => 'TM8888001',
                      'create_time' => '2016-04-17 12:00:00'
                )
            ),
            'onlineDeviceNum' => 2,
            'allOnlineDevice' => array(
                array(
                    'device_id' => '温度监测-1',
                    'href' => 'temp-mon-001'
                ),
                array(
                    'device_id' => '温度监测-2',
                    'href' => 'temp-mon-002'
                )
            ),
            'alarmNum' => 0,
            'allAlarm' => array(),
            'maintainNum' => 0,
            'allMaintain' => array(),
            'remarkNum' => 2,
            'allRemark' => array(
                array(
                    'date' => '2016-04-16',
                    'name' => '提醒',
                    'remark' => '一切OK'
                ),
                array(
                    'date' => '2016-04-16',
                    'name' => '设备情况',
                    'remark' => '所有设备无需维护'
                ),
            ), 
        ); 
        $this->load->view('templates/header');
        //$this->load->view($this->data['admin_dir'].'/index.php',$this->data);
        $this->load->view('demo/index', $data);
        $this->load->view('templates/footer'); 
    }
}
