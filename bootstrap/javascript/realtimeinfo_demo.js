var select = new Array();
select['oilpress'] = 1;
select['gaspress'] = 1;
select['gastemp'] = 1;
select['oiltemp'] = 1;
select['watertemp'] = 1;
select['acur'] = 1;
select['bcur'] = 1;
select['ccur'] = 1;
select['speed'] = 1;
select['fuellevel'] = 1;
select['voltage'] = 1;
select['runpower'] = 1;
select['runrate'] = 1;

var metermax = new Array();
metermax['oilpress'] = 100;
metermax['gaspress'] = 100;
metermax['gastemp'] = 150;
metermax['oiltemp'] = 150;
metermax['watertemp'] = 150;
metermax['acur'] = 450;
metermax['bcur'] = 450;
metermax['ccur'] = 450;
metermax['speed'] = 2500;
metermax['fuellevel'] = 100;
metermax['voltage'] = 450;
metermax['runpower'] = 10000;
metermax['runrate'] = 10;
var RawData={
	oilpress:[],
	gaspress:[],
	gastemp:[],
	oiltemp:[],
	watertemp:[],
	acur:[],
	bcur:[],
	ccur:[],
	speed:[],
	fuellevel:[],
	voltage:[],
	runpower:[],
	runrate:[]
};
var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";
var Tmp_data = [];
var line_plot = [];
var updateInterval = 1;
var data_ajax={
	oil_pressure:[],
	gas_pressure:[],
	gas_temp:[],
	oil_temp:[],
	water_temp:[],
	A_CUR:[],
	B_CUR:[],
	C_CUR:[],
	diesel_speed:[],
	fuel_level:[],
	voltage:[],
	run_power:[],
	run_rate:[],
	update_time:[]
};
var relation=new Array(2);
relation["oilpress"]="oil_pressure",
relation["gaspress"]="gas_pressure",
relation["gastemp"]="gas_temp",
relation["oiltemp"]="oil_temp",
relation["watertemp"]="water_temp",
relation["acur"]="A_CUR",
relation["bcur"]="B_CUR",
relation["ccur"]="C_CUR",
relation["speed"]="diesel_speed",
relation["fuellevel"]="fuel_level",
relation["voltage"]="voltage",
relation["runpower"]="run_power",
relation["runrate"]="run_rate";

//"发送机转速","燃油位置","电压","运行功率","运行速率","机油压力","排气压力","水温","液压油温","排气温度","A相电流","B相电流","C相电流"
var meterid=new Array(2);
meterid["发动机转速"]="speed_meter",
meterid["燃油位置"]="fuellevel_meter",
meterid["电压"]="voltage_meter",
meterid["运行功率"]="runpower_meter",
meterid["运行速率"]="runrate_meter",
meterid["机油压力"]="oilpress_meter",
meterid["排气压力"]="gaspress_meter",
meterid["冷却水温度"]="watertemp_meter",
meterid["液压油温度"]="oiltemp_meter",
meterid["排气温度"]="gastemp_meter",
meterid["A相电流"]="acur_meter",
meterid["B相电流"]="bcur_meter",
meterid["C相电流"]="ccur_meter";

var meterlist = new Array(2);
meterlist['speed_meter'] = 1;
meterlist['fuellevel_meter'] = 1;
meterlist['voltage_meter'] = 1;
meterlist['runpower_meter'] = 1;
meterlist['runrate_meter'] = 1;
meterlist['oilpress_meter'] = 1;
meterlist['gaspress_meter'] = 1;
meterlist['watertemp_meter'] = 1;
meterlist['oiltemp_meter'] = 1;
meterlist['gastemp_meter'] = 1;
meterlist['acur_meter'] = 1;
meterlist['bcur_meter'] = 1;
meterlist['ccur_meter'] = 1;
/*
var meterlist = new Array(2);
meterlist['oilpress'] = "机油压力";
meterlist['gaspress'] = "排气压力";
meterlist['gastemp'] = "排气温度";
meterlist['oiltemp'] = "液压油温度";
meterlist['watertemp'] = "冷却水温度";
meterlist['acur'] = "A相电流";
meterlist['bcur'] = "B相电流";
meterlist['ccur'] = "C相电流";
meterlist['speed'] = "发动机转速";
meterlist['fuellevel'] = "燃油位置";
meterlist['voltage'] = "电压";
meterlist['runpower'] = "运行功率";
meterlist['runrate'] = "运行速率";
*/
var time_temp0=null,time_temp1=null;

$("#shutdown").click(function(){
	
	cv_id = document.getElementById('SetId').innerHTML;
	if(cv_id == " - "){
		//alert(1);
		return;
	}
	
	$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
	$("#myModal_Label").html("成功");
	$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
	$("#myModal_content").html("远程关机成功");
	$("#myModal").modal('show');
})

$("#start").click(function(){
	
	cv_id = document.getElementById('SetId').innerHTML;
	if(cv_id == " - "){
		//alert(1);
		return;
	}
	$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
	$("#myModal_Label").html("成功");
	$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
	$("#myModal_content").html("远程开机成功");
	$("#myModal").modal('show');
})

$("#load").click(function(){
	
	cv_id = document.getElementById('SetId').innerHTML;
	if(cv_id == " - "){
		//alert(1);
		return;
	}
	
	$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
	$("#myModal_Label").html("成功");
	$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
	$("#myModal_content").html("远程加载成功");
	$("#myModal").modal('show');
})

$("#unload").click(function(){
	
	cv_id = document.getElementById('SetId').innerHTML;
	if(cv_id == " - "){
		//alert(1);
		return;
	}
	
	$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
	$("#myModal_Label").html("成功");
	$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
	$("#myModal_content").html("远程卸载成功");
	$("#myModal").modal('show');
})

$(document).ready(function(){

	for (var key in meterlist){
		if($("#"+key).is(":hidden")){
			meterlist[key] = 0;
		}else{
			meterlist[key] = 1;
		}
	}
	
	$("#eqp_select").click(function(){
		$("#onlineeqp_modal").modal('show');
	})

	$("#meter_select").click(function(){
		var i = 0;
		for(var key in meterid){
			if(meterlist[meterid[key]] == 0){
				$(".meter")[i].innerHTML = key+"（×）";
				$(".meter")[i].className = "btn btn-danger btn-sm meter";
			}else{
				$(".meter")[i].innerHTML = key+"（√）";
				$(".meter")[i].className = "btn btn-success btn-sm meter active";
			}
			i++;
		}
		
		$("#meter_modal").modal('show');
	})

	$(".meter").click(function(e){
		str = e.target.innerHTML;
		name = str.replace(/（.\）/g,"");
		if(e.target.className == "btn btn-danger btn-sm meter"){
			e.target.className = "btn btn-success btn-sm meter active";
			str = str.replace(/×/g,"√");
			e.target.innerHTML = str;
			meterlist[meterid[name]] = 1;
			$("#"+meterid[name]).fadeIn(1000);
		}else{
			e.target.className = "btn btn-danger btn-sm meter";
			str = str.replace(/√/g,"×");
			e.target.innerHTML = str;
			meterlist[meterid[name]] = 0;
			$("#"+meterid[name]).fadeOut(1000);
		}
	})
	
	$(".meter-close").click(function(e){
		name = e.currentTarget.id;
		name = name.replace(/_close/g,"");
		meterlist[name] = 0;
		$("#"+name).fadeOut(300);
	})
	
	$(".flot-close").click(function(e){
		name = e.currentTarget.id;
		name = name.replace(/_flot_close/g,"");
		if($("#"+name+"_flot").parent().is(":hidden")){
			$("#"+name+"_flot").parent().show();
			e.currentTarget.parentNode.parentNode.parentNode.className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right";
			$("#"+name+"_meter").attr("class","col-lg-4 col-md-6 col-sm-12 col-xs-12");
			e.currentTarget.innerHTML="<i class='fa fa-chevron-left'></i>";
		}else{
			$("#"+name+"_flot").parent().hide();
			e.currentTarget.parentNode.parentNode.parentNode.className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right";
			$("#"+name+"_meter").attr("class","col-lg-2 col-md-3 col-sm-6 col-xs-6");
			e.currentTarget.innerHTML="<i class='fa fa-chevron-right'></i>";
		}
	})
	
	$("#meter_modal_confirm").click(function(){
		$.ajax({
			type: "POST",
			url: base_url+"index.php/ajax_realtimeinfo/setmeter/",
			dataType    : 'json',
			data: {
				meters:{
					speed		: meterlist['speed_meter'],
					fuellevel	: meterlist['fuellevel_meter'],
					voltage		: meterlist['voltage_meter'],
					runpower	: meterlist['runpower_meter'],
					runrate		: meterlist['runrate_meter'],
					oilpress	: meterlist['oilpress_meter'],
					gaspress	: meterlist['gaspress_meter'],
					watertemp	: meterlist['watertemp_meter'],
					oiltemp		: meterlist['oiltemp_meter'],
					gastemp		: meterlist['gastemp_meter'],
					acur		: meterlist['acur_meter'],
					bcur		: meterlist['bcur_meter'],
					ccur		: meterlist['ccur_meter']
				},
				cv_id		: document.getElementById('SetId').innerHTML
			},
			success: function(msg){
				$("#meter_modal").modal('hide');
			}
		});
	})
	
	for (var item in RawData){
		for (var i=0;i<30;i++){
			RawData[item][i] = 0;
		}
	}
	
	function getRealtimeData(type,realtime) {
		
		var data0,data1,key,value,new_info = true;
		
		if(realtime){
		
			$.ajax({
				type: "POST",
				url: base_url+"index.php/ajax_realtimeinfo/readinfo/",
				data: "sid="+Math.random()+"&cv_id="+document.getElementById('SetId').innerHTML,
				success: function(msg){
					//var y;
					data0 = msg.split(';');
					for(var i=0;i<data0.length;i++){
						data1 = data0[i].split(':');
                        key = data1[0];
                        var value=data1[1];
                        for(var j=2;j<data1.length;j++){
                            value += ":"+data1[j];
                        }
                        data_ajax[key] = value;
					}
					//y = data_ajax[item];
				}
			});
			
			time_temp0 = data_ajax['update_time'];
			
			if (null == time_temp1){
				time_temp1 = data_ajax['update_time'];
			}else{
				if(time_temp1 == time_temp0){
					new_info = false;
				}else{
					new_info = true;
				}
				time_temp1 = time_temp0;
			}
			
			new_info = true;//demo
			if(true == new_info){
				for(var item in type){
					if (RawData[item].length > 0)
						RawData[item].shift();
						
						//RawData[item].push(data_ajax[relation[item]]);//
						RawData[item].push(300+100*Math.random());//demo
				}
			}
		}

		var res={
			oilpress:[],
			gaspress:[],
			gastemp:[],
			oiltemp:[],
			watertemp:[],
			acur:[],
			bcur:[],
			ccur:[],
			speed:[],
			fuellevel:[],
			voltage:[],
			runpower:[],
			runrate:[]
		}
		
		for(var item in type){
		
			type[item].data = [];
			
			for (var i = 0; i < RawData[item].length; ++i) {
				type[item].data.push([i,RawData[item][i].toFixed(2)]);
			}
			
			if(select[item] != 0){
				res[item].push(type[item].data)
			}
		}

		return res;
	}
	
	//Tmp_data = getRealtimeData(RawData,true);

	var options_chart = {
		series: {
			shadowSize: 0,	// Drawing is faster without shadows
			lines: {
				fill: 0.3
			},
			color: "#FFF"
		},
		yaxis: {
			min: 0,
			max: 1000,
			show:false
		},
		xaxis: {
			show: false
		},
		grid: {               
			backgroundColor: "#666",
			//tickColor: "#e4f4f4"             
			show:false
		},
		legend: {
			show:false
		}
	}

	function update() {	
		Tmp_data = getRealtimeData(RawData,true);
		var meters="";
		for (var item in line_plot){
			var pie_data=[];
			pie_data[1] = 100 * (Tmp_data[item][0][29][1]/metermax[item]);
			pie_data[1] = pie_data[1].toFixed(1);
			pie_data[0] = 100 - pie_data[1];
			
			line_plot[item].setData(Tmp_data[item]);
			line_plot[item].draw();
			if (Tmp_data[item][0][29][1] == ""){
				document.getElementById(item).innerHTML = " - ";
				document.getElementById(item+"_img").style.width=pie_data[1]+"%";
			}else{
				document.getElementById(item).innerHTML = Tmp_data[item][0][29][1];
				document.getElementById(item+"_img").style.width=pie_data[1]+"%";
			}
			
			$("div.update_time").each(function(){
				var currentTime = new Date();
				this.innerHTML = currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds();
			})
		}
		setTimeout(cycle, updateInterval*1000);
	}

	function cycle(){
		if(document.getElementById('SetId').innerHTML != " - "){
			update();

			//speed
			if(meterlist['speed_meter'] == 1){
				line_plot['speed'] = $.plot("#speed_flot", Tmp_data["speed"], options_chart);
			}
			//fuellevel
			if(meterlist['fuellevel_meter'] == 1){
				line_plot['fuellevel'] = $.plot("#fuellevel_flot", Tmp_data["fuellevel"], options_chart);
			}

			//voltage
			if(meterlist['voltage_meter'] == 1){
				line_plot['voltage'] = $.plot("#voltage_flot", Tmp_data["voltage"], options_chart);
			}

			//runpower
			if(meterlist['runpower_meter'] == 1){
				line_plot['runpower'] = $.plot("#runpower_flot", Tmp_data["runpower"], options_chart);
			}

			//runrate
			if(meterlist['runrate_meter'] == 1){
				line_plot['runrate'] = $.plot("#runrate_flot", Tmp_data["runrate"], options_chart);
			}

			//oilpress
			if(meterlist['oilpress_meter'] == 1){
				line_plot['oilpress'] = $.plot("#oilpress_flot", Tmp_data["oilpress"], options_chart);
			}

			//gaspress
			if(meterlist['gaspress_meter'] == 1){
				line_plot['gaspress'] = $.plot("#gaspress_flot", Tmp_data["gaspress"], options_chart);
			}

			//watertemp
			if(meterlist['watertemp_meter'] == 1){
				line_plot['watertemp'] = $.plot("#watertemp_flot", Tmp_data["watertemp"], options_chart);
			}

			//oiltemp
			if(meterlist['oiltemp_meter'] == 1){
				line_plot['oiltemp'] = $.plot("#oiltemp_flot", Tmp_data["oiltemp"], options_chart);
			}

			//gastemp
			if(meterlist['gastemp_meter'] == 1){
				line_plot['gastemp'] = $.plot("#gastemp_flot", Tmp_data["gastemp"], options_chart);
			}

			//acur
			if(meterlist['acur_meter'] == 1){
				line_plot['acur'] = $.plot("#acur_flot", Tmp_data["acur"], options_chart);
			}

			//bcur
			if(meterlist['bcur_meter'] == 1){
				line_plot['bcur'] = $.plot("#bcur_flot", Tmp_data["bcur"], options_chart);
			}

			//ccur
			if(meterlist['ccur_meter'] == 1){
				line_plot['ccur'] = $.plot("#ccur_flot", Tmp_data["ccur"], options_chart);
			}
		}
	}
	
	cycle();	
})
