var xmlHttp;
var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";
var initflag = 1;

$(document).ready(function(){
	str="HongWuHuan";
	getThresholdInfo(str);
})

function getThresholdInfo(str){
	url=base_url+"index.php/ajax_infoset/getThresholdInfo/";
	url=url+"sid="+Math.random();
	url=url+"&user_id="+str;
	
	xmlHttp=GetXmlHttpObject()

	if (xmlHttp==null){
		alert ("Browser does not support HTTP Request")
		return
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
			//if(!data[key]){
				data[key] = value;
			//}else{
			//	data[key].push(value);
			//}
		}
		//alert(21);
		if(1 == initflag){
			initflag = 2;
			//alert(22);
			/*threshold["Speed"]		=[data["cv_speed_alarm"],data["cv_speed_stop"]];
			threshold["OilPress"]	=[data["cv_oilpress_alarm"],data["cv_oilpress_stop"]];
			threshold["WaterTemp"]	=[data["cv_watertemp_alarm"],data["cv_watertemp_stop"]];
			threshold["OilTemp"]	=[data["cv_oiltemp_alarm"],data["cv_oiltemp_stop"]];
			threshold["GasTemp"]	=[data["cv_gastemp_alarm"],data["cv_gastemp_stop"]];
			threshold["GasPress"]	=[data["cv_gaspress_alarm"],data["cv_gaspress_stop"]];
			threshold["FuelLevel"]	=[data["cv_fuellevel_alarm"],data["cv_fuellevel_stop"]];
			threshold["Voltage"]	=[data["cv_voltage_alarm"],data["cv_voltage_stop"]];
			threshold["ACur"]		=[data["cv_acur_alarm"],data["cv_acur_stop"]];
			threshold["BCur"]		=[data["cv_bcur_alarm"],data["cv_bcur_stop"]];
			threshold["CCur"]		=[data["cv_ccur_alarm"],data["cv_ccur_stop"]];
			threshold["RunPower"]	=[data["cv_runpower_alarm"],data["cv_runpower_stop"]];
			threshold["RunRate"]	=[data["cv_runrate_alarm"],data["cv_runrate_stop"]];*/
		}
		//document.getElementById("SetId").innerHTML=data['cv_id'];
		document.getElementById("Speed_alarm").value		=data["cv_speed_alarm"];
		document.getElementById("Speed_stop").value			=data["cv_speed_stop"];
		if (1 == data["cv_speed_display"]){
			document.getElementById("Speed_display").className = "btn-switch btn btn-success active";
			document.getElementById("Speed_display").innerHTML = "是";
		}else{
			document.getElementById("Speed_display").className = "btn-switch btn btn-default";
			document.getElementById("Speed_display").innerHTML = "否";
		}
		
		document.getElementById("Voltage_alarm").value		=data['cv_voltage_alarm'];
		document.getElementById("Voltage_stop").value		=data['cv_voltage_stop'];
		if (1 == data["cv_voltage_display"]){
			document.getElementById("Voltage_display").className = "btn-switch btn btn-success active";
			document.getElementById("Voltage_display").innerHTML = "是";
		}else{
			document.getElementById("Voltage_display").className = "btn-switch btn btn-default";
			document.getElementById("Voltage_display").innerHTML = "否";
		}
		
		document.getElementById("Oilpress_alarm").value		=data['cv_oilpress_alarm'];
		document.getElementById("Oilpress_stop").value		=data['cv_oilpress_stop'];
		if (1 == data["cv_oilpress_display"]){
			document.getElementById("Oilpress_display").className = "btn-switch btn btn-success active";
			document.getElementById("Oilpress_display").innerHTML = "是";
		}else{
			document.getElementById("Oilpress_display").className = "btn-switch btn btn-default";
			document.getElementById("Oilpress_display").innerHTML = "否";
		}
		
		document.getElementById("Gaspress_alarm").value		=data['cv_gaspress_alarm'];
		document.getElementById("Gaspress_stop").value		=data['cv_gaspress_stop'];
		if (1 == data["cv_gaspress_display"]){
			document.getElementById("Gaspress_display").className = "btn-switch btn btn-success active";
			document.getElementById("Gaspress_display").innerHTML = "是";
		}else{
			document.getElementById("Gaspress_display").className = "btn-switch btn btn-default";
			document.getElementById("Gaspress_display").innerHTML = "否";
		}
		
		document.getElementById("Watertemp_alarm").value	=data['cv_watertemp_alarm'];
		document.getElementById("Watertemp_stop").value		=data['cv_watertemp_stop'];
		if (1 == data["cv_watertemp_display"]){
			document.getElementById("Watertemp_display").className = "btn-switch btn btn-success active";
			document.getElementById("Watertemp_display").innerHTML = "是";
		}else{
			document.getElementById("Watertemp_display").className = "btn-switch btn btn-default";
			document.getElementById("Watertemp_display").innerHTML = "否";
		}
		
		document.getElementById("Oiltemp_alarm").value		=data['cv_oiltemp_alarm'];
		document.getElementById("Oiltemp_stop").value		=data['cv_oiltemp_stop'];
		if (1 == data["cv_oiltemp_display"]){
			document.getElementById("Oiltemp_display").className = "btn-switch btn btn-success active";
			document.getElementById("Oiltemp_display").innerHTML = "是";
		}else{
			document.getElementById("Oiltemp_display").className = "btn-switch btn btn-default";
			document.getElementById("Oiltemp_display").innerHTML = "否";
		}
		
		document.getElementById("Gastemp_alarm").value		=data['cv_gastemp_alarm'];
		document.getElementById("Gastemp_stop").value		=data['cv_gastemp_stop'];
		if (1 == data["cv_gastemp_display"]){
			document.getElementById("Gastemp_display").className = "btn-switch btn btn-success active";
			document.getElementById("Gastemp_display").innerHTML = "是";
		}else{
			document.getElementById("Gastemp_display").className = "btn-switch btn btn-default";
			document.getElementById("Gastemp_display").innerHTML = "否";
		}
		
		document.getElementById("Acur_alarm").value			=data['cv_acur_alarm'];
		document.getElementById("Acur_stop").value			=data['cv_acur_stop'];
		if (1 == data["cv_acur_display"]){
			document.getElementById("Acur_display").className = "btn-switch btn btn-success active";
			document.getElementById("Acur_display").innerHTML = "是";
		}else{
			document.getElementById("Acur_display").className = "btn-switch btn btn-default";
			document.getElementById("Acur_display").innerHTML = "否";
		}
		
		document.getElementById("Bcur_alarm").value			=data['cv_bcur_alarm'];
		document.getElementById("Bcur_stop").value			=data['cv_bcur_stop'];
		if (1 == data["cv_bcur_display"]){
			document.getElementById("Bcur_display").className = "btn-switch btn btn-success active";
			document.getElementById("Bcur_display").innerHTML = "是";
		}else{
			document.getElementById("Bcur_display").className = "btn-switch btn btn-default";
			document.getElementById("Bcur_display").innerHTML = "否";
		}
		
		document.getElementById("Ccur_alarm").value			=data['cv_ccur_alarm'];
		document.getElementById("Ccur_stop").value			=data['cv_ccur_stop'];
		if (1 == data["cv_ccur_display"]){
			document.getElementById("Ccur_display").className = "btn-switch btn btn-success active";
			document.getElementById("Ccur_display").innerHTML = "是";
		}else{
			document.getElementById("Ccur_display").className = "btn-switch btn btn-default";
			document.getElementById("Ccur_display").innerHTML = "否";
		}
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

function infoset_submit(){
	url=base_url+"index.php/ajax_infoset/setThresholdInfo/";
	//url=url+"sid="+Math.random();
	//url=url+"&user_id="+str;
	var displayflag;
	param = "cv_speed_alarm="+document.getElementById("Speed_alarm").value;
	param += "&cv_speed_stop="+document.getElementById("Speed_stop").value;
	displayflag = document.getElementById("Speed_display");
	displayflag.innerHTML == "是"?(param += "&cv_speed_display=1"):(param += "&cv_speed_display=0");
	
	param += "&cv_voltage_alarm="+document.getElementById("Voltage_alarm").value;
	param += "&cv_voltage_stop="+document.getElementById("Voltage_stop").value;
	displayflag = document.getElementById("Voltage_display");
	displayflag.innerHTML == "是"?(param += "&cv_voltage_display=1"):(param += "&cv_voltage_display=0");
	
	param += "&cv_oilpress_alarm="+document.getElementById("Oilpress_alarm").value;
	param += "&cv_oilpress_stop="+document.getElementById("Oilpress_stop").value;
	displayflag = document.getElementById("Oilpress_display");
	displayflag.innerHTML == "是"?(param += "&cv_oilpress_display=1"):(param += "&cv_oilpress_display=0");
	
	param += "&cv_gaspress_alarm="+document.getElementById("Gaspress_alarm").value;
	param += "&cv_gaspress_stop="+document.getElementById("Gaspress_stop").value;
	displayflag = document.getElementById("Gaspress_display");
	displayflag.innerHTML == "是"?(param += "&cv_gaspress_display=1"):(param += "&cv_gaspress_display=0");
	
	param += "&cv_watertemp_alarm="+document.getElementById("Watertemp_alarm").value;
	param += "&cv_watertemp_stop="+document.getElementById("Watertemp_stop").value;
	displayflag = document.getElementById("Watertemp_display");
	displayflag.innerHTML == "是"?(param += "&cv_watertemp_display=1"):(param += "&cv_watertemp_display=0");
	
	param += "&cv_oiltemp_alarm="+document.getElementById("Oiltemp_alarm").value;
	param += "&cv_oiltemp_stop="+document.getElementById("Oiltemp_stop").value;
	displayflag = document.getElementById("Oiltemp_display");
	displayflag.innerHTML == "是"?(param += "&cv_oiltemp_display=1"):(param += "&cv_oiltemp_display=0");
	
	param += "&cv_gastemp_alarm="+document.getElementById("Gastemp_alarm").value;
	param += "&cv_gastemp_stop="+document.getElementById("Gastemp_stop").value;
	displayflag = document.getElementById("Gastemp_display");
	displayflag.innerHTML == "是"?(param += "&cv_gastemp_display=1"):(param += "&cv_gastemp_display=0");
	
	param += "&cv_acur_alarm="+document.getElementById("Acur_alarm").value;
	param += "&cv_acur_stop="+document.getElementById("Acur_stop").value;
	displayflag = document.getElementById("Acur_display");
	displayflag.innerHTML == "是"?(param += "&cv_acur_display=1"):(param += "&cv_acur_display=0");
	
	param += "&cv_bcur_alarm="+document.getElementById("Bcur_alarm").value;
	param += "&cv_bcur_stop="+document.getElementById("Bcur_stop").value;
	displayflag = document.getElementById("Bcur_display");
	displayflag.innerHTML == "是"?(param += "&cv_bcur_display=1"):(param += "&cv_bcur_display=0");
	
	param += "&cv_ccur_alarm="+document.getElementById("Ccur_alarm").value;
	param += "&cv_ccur_stop="+document.getElementById("Ccur_stop").value;
	displayflag = document.getElementById("Ccur_display");
	displayflag.innerHTML == "是"?(param += "&cv_ccur_display=1"):(param += "&cv_ccur_display=0");
	//xmlHttp=GetXmlHttpObject()

	if (xmlHttp==null){
		alert ("Browser does not support HTTP Request");
		return
	} 
	//alert(url);
	xmlHttp.onreadystatechange=setStateChanged;
	xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", param.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(param);
	//getThresholdInfo("HongWuHuan");
}
function setStateChanged() {
	var data0,data1,key,value;
	var data = {};
	var datasets = {};
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
		temp = xmlHttp.responseText;
		if("ok" == temp){
			document.getElementById('myModal_type').className="panel panel-success";
			document.getElementById('myModal_Label').innerHTML="成功";
			document.getElementById('myModal_content').innerHTML="参数修改成功！";
			$('#myModal').modal();
		}
	}
}