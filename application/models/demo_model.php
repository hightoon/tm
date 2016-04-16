<?php

class Demo_model extends CI_Model{

    var $dbData;
    var $dbWeb;
    
    public function __construct(){

        $config['hostname'] = "localhost";
        $config['username'] = "root";
        $config['password'] = "ZJUisee423";
        //$config['database'] = "TMPT_MNTR";
        $config['dbdriver'] = "mysql";
        $config['dbprefix'] = "";
        $config['pconnect'] = FALSE;
        $config['db_debug'] = TRUE;
        $config['cache_on'] = FALSE;
        $config['cachedir'] = "";
        $config['char_set'] = "utf8";
        $config['dbcollat'] = "utf8_general_ci";
        $config['swap_pre'] = "";
        $config['autoinit'] = TRUE;
        $config['stricton'] = FALSE;
	
        $config['database'] = "TMPT_MNTR";
        $this->dbData = $this->load->database($config,TRUE);
        
        $config['database'] = "TM_WEB_DB";        
        $this->dbWeb = $this->load->database($config,TRUE);
        
        $config['database'] = "TM_USER";        
        $this->dbUser = $this->load->database($config,TRUE);
    }
    
    public function getAllDevice($device_id = FALSE){
    
        if($device_id != FALSE){
            $query = $this->dbWeb->get_where('all_device_info',array('device_id'=>$device_id));
            return $query->result_array();
        }

        $query = $this->dbWeb->get('all_device_info');
        return $query->result_array();
    }
    
    public function getAllOnlineDevice(){

        $snd_msg = "3:10";
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
            $ret = explode(",", $rcv_msg);
            return $ret;
        }
    }
    
    public function getDeviceSet($device_type = FALSE, $user_id = FALSE){
    
        if($device_type != FALSE && $user_id != FALSE){
            $query = $this->dbWeb->get_where('device_set',array('device_type'=>$device_type,'user_id'=>$user_id));
            return $query->result_array();
        }else{
            $query = $this->dbWeb->get('device_set');
            return $query->result_array();
        }
    }
    
    public function getDeviceOnlineStatus($device_id){

        $snd_msg = "2:".$device_id;
        $rcv_msg = "";
        $timeout = 10;
        $socket = stream_socket_client('unix:///var/run/mysocket.sock', 
                                        $errorno, $errorstr, $timeout);
        stream_set_timeout($socket, $timeout);

        if(!fwrite($socket, $snd_msg)){
            echo("Error while Writing to socket!!!<br>\n");
            return;
        }

        if (!($rcv_msg = fread($socket, 1024))){
            echo("Error while reading from socket!!!<br>\n");
            return;
        }
        else{
            return (00 == $rcv_msg)?0:1;
        }
    }
    
    public function getAllRemark(){

        $query = $this->dbWeb->get('remark');
        return $query->result_array();
    }
    
    public function setMeter($meter_info){
            
        $this->dbWeb->update('device_set', $meter_info, array('user_id' => $meter_info['user_id'],'device_type' => $meter_info['device_type'],'item_name' => $meter_info['item_name']));
    }
    
    public function checkPasswd($user_name,$passwd){
    
        $query = $this->dbRobos->get_where( 'robos_user_info', array('user_name' => $user_name));
        
        if(FALSE == $query->result ()){
            return FALSE;
        }
        
        foreach ( $query->result () as $row ) {  
            if($row->password == $passwd && $row->user_name == $user_name){
                return TRUE;
            }
        }
        
        return FALSE;
        
    }
    
    public function changePasswd($user_name,$passwd){
    
        $query = $this->dbRobos->update( 'robos_user_info', array('password' => $passwd), array('user_name' => $user_name));
        
        return TRUE;
    }
    
    public function delDevice($device_id){
    
        $query = $this->dbWeb->delete( 'all_device_info', array('device_id' => $device_id));
        
        return TRUE;
    }

    public function getAllAlarm($device_id = FALSE){
        
        return;
        if(FALSE === $device_id){
            $query = $this->dbData->get('all_device_info');
            return $query->result_array();
        }

        $query = $this->dbData->get_where('all_device_info',array('device_id'=>$device_id));
        
        return $query->result_array();
    }
    
    public function getAllHistoryInfo($device_id,$num){
        
        $tmp1 = $this->dbData->get_where('all_device_info',array('device_id'=>$device_id));
        
        $row1 = $tmp1->row_array();
        
        $tmp2 = $this->dbData->get_where('device_type_info',array('device_type'=>$row1['device_type']));
        
        $row2 = $tmp2->row_array();
        
        $query = $this->dbData->get_where($row2['history_table_name'],array('device_id'=>$device_id),$num,0);
        
        return $query->result_array();
    }

    public function getAllMaintain($device_id = FALSE){
    
        $tmp = $this->dbData->get('device_type_info');
        $row1 = $tmp->result_array();
        
        for($i=0;$i<count($row1);$i++){
            $query = $this->dbData->get($row1[$i]['maintain_table_name']);
            $row = $query->result_array();
            for($j=0;$j<count($row);$j++){
                //$query = $this->dbData->get($row1[$j]['maintain_table_name']);
                //$row = $query->result_array();
                $maintain_info['device_id'] = $row[$j]['device_id'];
                
                foreach($row[$j] as $key=>$value){
                    
                    if (isset($row[$j][$key."_period"])){
                        $maintain_info['item'] = $key;
                        $maintain_info['time_used'] = $value;
                        $maintain_info['period'] = $row[$j][$key.'_period'];
                        $sql="INSERT INTO all_maintain_info SET device_id=".$maintain_info['device_id'].", item='".$maintain_info['item']."',time_used=".$maintain_info['time_used'].", period=".$maintain_info['period'].
                        " ON DUPLICATE KEY UPDATE time_used=".$maintain_info['time_used'].", period=".$maintain_info['period'];
                        $this->dbWeb->query($sql);
                    }
                }
            }
        }
        
        $query = $this->dbWeb->get('all_maintain_info');
        return $query->result_array();
    }
    
    public function setMaintainRemark($info){
        //print_r($info);
        return $this->dbWeb->update('all_maintain_info',array('remark'=>$info['remark']),array('device_id'=>$info['device_id'],'item'=>$info['item']));
    }
    
    public function setDeviceInfo($info){

        return $this->dbWeb->update('all_device_info',$info,array('device_id'=>$info['device_id']));
    }
}
?>
