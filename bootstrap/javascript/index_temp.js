var listtitle;
var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";

$(document).ready(function(){
	listtitle = document.getElementById("allEqp");

	xmlHttp=GetXmlHttpObject()
	
	if (xmlHttp==null){
		alert ("Browser does not support HTTP Request")
		return
	} 
	
	getAllSets();
	//drawpie();
})

function getAllSets(){
  url=base_url+"index.php/ajax_setslist/allEqp/";
  url=url+"sid="+Math.random();
  xmlHttp.onreadystatechange=stateChanged;
  xmlHttp.open("GET",url,true);
  xmlHttp.send(null);
}

function stateChanged() {
	var data0,data1,data2;
	var data=[];
	var list="";
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
		temp = xmlHttp.responseText;
		//alert(temp);
		data0 = temp.split('#');
		for (var i = 0; i < data0.length-1; i++){
			data1 = data0[i].split(';');
			for (var j = 0; j < data1.length; j++){
				data2 = data1[j].split('=');
				key = data2[0];
				value = data2[1];
				//if(!data[key]){
					data[key] = value;
				//}else{
				//	data[key].push(value);
				//}
			}
			//alert(data['cv_id']);
			//list = "<td><a style=\"text-decoration:underline\" href=\"http://210.32.159.42/CI/index.php/news/"+ data['cv_id'] +"\">"+ data['cv_id'] +"</a></td>";
			//list = list+"<td>"+ data['cur_loc'] +"</td>";
			//list = list+"<td>"+ data['cur_state'] +"</td>";
			//list = list+"<td>"+ data['acc_time'] +"</td>";
			//list = list+"<td>"+ data['load_time'] +"</td>";
			newtr=document.createElement("tr");
			newtd1=document.createElement("td");
			newtd1.innerHTML = "<a style=\"text-decoration:underline\" href=\"http://210.32.159.42/CI/index.php/admin/realtimeinfo/"+ data['cv_id'] +"\">"+ data['cv_id'] +"</a>";
			newtr.appendChild(newtd1);
			
			newtd2=document.createElement("td");
			newtd2.innerHTML = data['cv_function'];
			newtr.appendChild(newtd2);
			
			newtd3=document.createElement("td");
			newtd3.innerHTML = data['record_date'];
			newtr.appendChild(newtd3);
			
			//alert(list);
			//newtr.innerHTML = list;
			//alert(newtr.innerHTML);
			listtitle.appendChild(newtr);
		}
		//alert(listtitle.innerHTML);
		$('#dataTables-example').dataTable();
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
