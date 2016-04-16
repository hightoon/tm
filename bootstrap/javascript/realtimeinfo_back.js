var xmlHttp;
var url;
var strq;
var initflag = 0;
var timershow;
var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";
var param=new Array("Speed","OilPress","WaterTemp","OilTemp","GasTemp","GasPress","FuelLevel","Voltage","ACur","BCur","CCur","RunPower","RunRate");
var threshold = new Array();
threshold["Speed"]=[1500,1800];
threshold["OilPress"]=[65,70];
threshold["WaterTemp"]=[95,105];
threshold["OilTemp"]=[95,105];
threshold["GasTemp"]=[95,105];
threshold["GasPress"]=[65,70];
threshold["FuelLevel"]=[15,5];
threshold["Voltage"]=[400,450];
threshold["ACur"]=[10,15];
threshold["BCur"]=[10,15];
threshold["CCur"]=[10,15];
threshold["RunPower"]=[25,50];
threshold["RunRate"]=[35,50];
$(document).ready(function(){
	var No = document.getElementById("SetId").innerHTML;
	//$.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });
	showInfo(No);
	getOnlineSets();
	setTab('menu',1,6);
})

function getOnlineSets(){

	url=base_url+"index.php/ajax_realtimeinfo/getonlinesets/";
	url=url+"sid="+Math.random();
	
	xmlHttp.onreadystatechange=stateChanged_onlinesets;
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
}

function stateChanged_onlinesets(){
	var data0,data1,key,value;
	var data = {};
	var datasets = {};
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
		temp = xmlHttp.responseText;
		data0 = temp.split(';');
		for (var i = 0; i < data0.length-1; i++){
			if(data0 != ""){
				newtoption=document.createElement("option");
				newtoption.innerHTML=data0[i];
				newtoption.value=data0[i];
				document.getElementById("onlinesets").appendChild(newtoption);
			}
		}
	}
}

function gotoSet(){
	var num=document.getElementById('setnum-input').value;
	if(num == document.getElementById('SetId').innerHTML){
		return;
	}
	if(num!=''){ 
		$.ajax({
			type: "POST",
			url: base_url+"index.php/ajax_realtimeinfo/isonline/",
			data: "cv_id="+num,
			success:function(msg){
				if(1 == msg){
					window.location.href=num;
				}else{
					$("#eqpStatus").modal("show");
				}
			}
		});
	}
}

function stopShow(){
	document.getElementById("stopget").disabled=true;
	document.getElementById("realtime").disabled=false;

	//document.getElementById("stopget").checked=true;
	//document.getElementById("realtime").checked=true;
	document.getElementById("stopget").checked=true;
	clearInterval(timershow);
	clearInterval(linecharttimer);
}

function showInfo(str){
	document.getElementById("realtime").disabled=true;
	document.getElementById("stopget").disabled=false;
  if (str.length==0){ 
    document.getElementById("SetId").innerHTML=""
    return
  }
  
  xmlHttp=GetXmlHttpObject()
	
  if (xmlHttp==null){
    alert ("Browser does not support HTTP Request")
    return
  } 
  
  //url="http://10.13.71.176/cim/index.php/ajax_realtimeinfo/readinfo/";
  strq = str;
  
  timershow = setTimeout("getRealInfo()",1000);

  update();
} 

function getRealInfo(){
	//url=prefix_url+"index.php/ajax_realtimeinfo/readinfo/";
	url=base_url+"index.php/ajax_realtimeinfo/readinfo/";
	url=url+"sid="+Math.random();
	url=url+"&cv_id="+strq;
	
	if(2 != initflag){
		initflag = 1;
		url = url + "&threshold=0"
	}
	
	xmlHttp.onreadystatechange=stateChanged;
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
}

function stateChanged() {
	var data0,data1,key,value;
	var data = {};
	var datasets = {};
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
		temp = xmlHttp.responseText;
		data0 = temp.split(';');
		for (var i = 0; i < data0.length; i++){
			data1 = data0[i].split('=');
			key = data1[0];
			value = data1[1];
			/*if(!data[key]){*/
				data[key] = value;
			/*}else{
				data[key].push(value);
			}*/
		}
		if(1 == initflag){
			initflag = 2;
			//alert(22);
			threshold["Speed"]		=[data["cv_speed_alarm"],		data["cv_speed_stop"],		data["cv_speed_display"]];
			threshold["OilPress"]	=[data["cv_oilpress_alarm"],	data["cv_oilpress_stop"],	data["cv_oilpress_display"]];
			threshold["WaterTemp"]	=[data["cv_watertemp_alarm"],	data["cv_watertemp_stop"],	data["cv_watertemp_display"]];
			threshold["OilTemp"]	=[data["cv_oiltemp_alarm"],		data["cv_oiltemp_stop"],	data["cv_oiltemp_display"]];
			threshold["GasTemp"]	=[data["cv_gastemp_alarm"],		data["cv_gastemp_stop"],	data["cv_gastemp_display"]];
			threshold["GasPress"]	=[data["cv_gaspress_alarm"],	data["cv_gaspress_stop"],	data["cv_gaspress_display"]];
			threshold["FuelLevel"]	=[data["cv_fuellevel_alarm"],	data["cv_fuellevel_stop"],	data["cv_fuellevel_display"]];
			threshold["Voltage"]	=[data["cv_voltage_alarm"],		data["cv_voltage_stop"],	data["cv_voltage_display"]];
			threshold["ACur"]		=[data["cv_acur_alarm"],		data["cv_acur_stop"],		data["cv_acur_display"]];
			threshold["BCur"]		=[data["cv_bcur_alarm"],		data["cv_bcur_stop"],		data["cv_bcur_display"]];
			threshold["CCur"]		=[data["cv_ccur_alarm"],		data["cv_ccur_stop"],		data["cv_ccur_display"]];
			threshold["RunPower"]	=[data["cv_runpower_alarm"],	data["cv_runpower_stop"],	data["cv_runpower_display"]];
			threshold["RunRate"]	=[data["cv_runrate_alarm"],		data["cv_runrate_stop"],	data["cv_runrate_display"]];
			
			var displayflag;
			for (displayflag in threshold){
				threshold[displayflag][0] = parseInt(threshold[displayflag][0]);
				threshold[displayflag][1] = parseInt(threshold[displayflag][1]);
				threshold[displayflag][2] = parseInt(threshold[displayflag][2]);
				if(threshold[displayflag][2] != 1){
					var contemp = document.getElementById(displayflag);
					var th = contemp.parentElement;
					var tr = th.parentElement;
					//contemp.style="";
					tr.style.display="none";
					//alert(document.getElementById(displayflag).parentNode.parentNode.style);
				}
			}
		}
		//document.getElementById("SetId").innerHTML=data['cv_id'];
		document.getElementById("Time").innerHTML=data['update_time'];
		
		gps_lat = Number(data['GPS_lat']);
		temp = Math.floor(gps_lat/100);
		gps_lat = temp + (gps_lat - temp*100)/60;
		
		gps_long = Number(data['GPS_long']);
		temp = Math.floor(gps_long/100);
		gps_long = temp + (gps_long - temp*100)/60;
		
		//document.getElementById("Longitude").innerHTML=gps_lat.toFixed(4);
		//document.getElementById("Latitude").innerHTML=gps_long.toFixed(4);
		//document.getElementById("LoadTime").innerHTML=data['load_time'];
		//document.getElementById("AccTime").innerHTML=data['acc_time'];
		//document.getElementById("FuelRate").innerHTML=data['fuel_rate'];
		
		datasets["Speed"] 		= parseInt(data['diesel_speed']);
		datasets["OilPress"] 	= parseInt(data['oil_pressure']);
		datasets["WaterTemp"] 	= parseInt(data['water_temp']);
		datasets["OilTemp"] 	= parseInt(data['oil_temp']);
		datasets["GasTemp"] 	= parseInt(data['gas_temp']);
		datasets["GasPress"] 	= parseInt(data['gas_pressure']);
		datasets["FuelLevel"] 	= parseInt(data['fuel_level']);
		datasets["Voltage"] 	= parseInt(data['voltage']);
		datasets["ACur"] 		= parseInt(data['A_CUR']);
		datasets["BCur"] 		= parseInt(data['B_CUR']);
		datasets["CCur"] 		= parseInt(data['C_CUR']);
		datasets["RunPower"] 	= parseInt(data['run_power']);
		datasets["RunRate"] 	= parseInt(data['run_rate']);
		
		for(var i=0; i<param.length;i++){
			
			if(isNaN(datasets[param[i]])){
				document.getElementById(param[i]).innerHTML = "无数据";
				continue;
			}else{
				//datasets[param[i]] += parseInt(50*Math.random())
				document.getElementById(param[i]).innerHTML = datasets[param[i]];
			}
			if ((threshold[param[i]][1] != "") && (datasets[param[i]] >= threshold[param[i]][1])){
				document.getElementById(param[i]+"_img").className = "progress-bar progress-bar-danger";
			}else if((threshold[param[i]][0] != "") && (datasets[param[i]] >= threshold[param[i]][0])){
				document.getElementById(param[i]+"_img").className = "progress-bar progress-bar-warning";
			}else{
				document.getElementById(param[i]+"_img").className = "progress-bar";
			}
			document.getElementById(param[i]+"_img").style.width=datasets[param[i]]+"%";
		}
    setTimeout("getRealInfo()",1000);
	} 
}

function GetXmlHttpObject(){
  var xmlHttp=null;
  try
  {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
  }
  catch (e)
  {
    // Internet Explorer
    try
    {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return xmlHttp;
}
