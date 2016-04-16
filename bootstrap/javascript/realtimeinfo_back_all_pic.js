var select = new Array(2);
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
var Tmp_data = [];
var line_plot = [];
var pie_plot = [];
var updateInterval = 1;

$(document).ready(function(){

	function getRealtimeData(type,realtime) {

		var y;
		
		if(realtime){
			for(var item in type){
				if (RawData[item].length > 0)
					RawData[item].shift();
					
				for (var i = 0; RawData[item].length < /*totalPoints*/30; i++) {
				
					//y = document.getElementById(item).innerHTML;
					y = parseInt(500+300*Math.random());
					
					RawData[item].push(y);
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
				type[item].data.push([i,RawData[item][i]]);
			}
			
			if(select[item] != 0){
				res[item].push(type[item].data)
			}
		}

		return res;
	}
	Tmp_data = getRealtimeData(RawData,true);
	/*Tmp_fuellevel = getRealtimeData(datasets['fuel'],true);
	Tmp_speed = getRealtimeData(datasets['speed'],true);
	Tmp_voltage = getRealtimeData(datasets['voltage'],true);
	Tmp_runpower = getRealtimeData(datasets['runpower'],true);
	Tmp_runrate = getRealtimeData(datasets['runrate'],true);
	Tmp_oilpress = getRealtimeData(datasets['oilpress'],true);
	Tmp_gaspress = getRealtimeData(datasets['gaspress'],true);
	Tmp_watertemp = getRealtimeData(datasets['watertemp'],true);
	Tmp_oiltemp = getRealtimeData(datasets['oiltemp'],true);
	Tmp_gastemp = getRealtimeData(datasets['gastemp'],true);
	Tmp_acur = getRealtimeData(datasets['acur'],true);
	Tmp_bcur = getRealtimeData(datasets['bcur'],true);
	Tmp_ccur = getRealtimeData(datasets['ccur'],true);*/

	var options_meter = {
		series: {
			pie: { 
				show: true,
				innerRadius: 0.8,
				radius:0.9,
				label: {
					show: false
				},
				stroke: { 
					width: 1,
					color: "#F0b01F"
				}
			}
		},
		legend: {
			show:false
		},
		grid: {
			show: false
		}
	};
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

	//speed
	pie_plot['speed'] = $.plot("#speed_meter", [
	{label:"剩余",data:1,color:"#F0b01F"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['speed'] = $.plot("#placeholder_speed", Tmp_data["speed"], options_chart);

	//fuellevel
	pie_plot['fuellevel'] = $.plot("#fuellevel_meter", [
	{label:"剩余",data:1,color:"#F0b01F"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['fuellevel'] = $.plot("#placeholder_fuellevel", Tmp_data["fuellevel"], options_chart);

	//voltage
	options_meter['series']['pie']['stroke']['color'] = "#428BCA";
	pie_plot['voltage'] = $.plot("#voltage_meter", [
	{label:"剩余",data:1,color:"#428BCA"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['voltage'] = $.plot("#placeholder_voltage", Tmp_data["voltage"], options_chart);

	//runpower
	options_meter['series']['pie']['stroke']['color'] = "#428BCA";
	pie_plot['runpower'] = $.plot("#runpower_meter", [
	{label:"剩余",data:1,color:"#428BCA"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['runpower'] = $.plot("#placeholder_runpower", Tmp_data["runpower"], options_chart);

	//runrate
	options_meter['series']['pie']['stroke']['color'] = "#20b820";
	pie_plot['runrate'] = $.plot("#runrate_meter", [
	{label:"剩余",data:1,color:"#20b820"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['runrate'] = $.plot("#placeholder_runrate", Tmp_data["runrate"], options_chart);

	//oilpress
	options_meter['series']['pie']['stroke']['color'] = "#20b820";
	pie_plot['oilpress'] = $.plot("#oilpress_meter", [
	{label:"剩余",data:1,color:"#20b820"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['oilpress'] = $.plot("#placeholder_oilpress", Tmp_data["oilpress"], options_chart);

	//gaspress
	options_meter['series']['pie']['stroke']['color'] = "#f0b01f";
	pie_plot['gaspress'] = $.plot("#gaspress_meter", [
	{label:"剩余",data:1,color:"#f0b01f"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['gaspress'] = $.plot("#placeholder_gaspress", Tmp_data["gaspress"], options_chart);

	//watertemp
	options_meter['series']['pie']['stroke']['color'] = "#f0b01f";
	pie_plot['watertemp'] = $.plot("#watertemp_meter", [
	{label:"剩余",data:1,color:"#f0b01f"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['watertemp'] = $.plot("#placeholder_watertemp", Tmp_data["watertemp"], options_chart);

	//oiltemp
	options_meter['series']['pie']['stroke']['color'] = "#428bca";
	pie_plot['oiltemp'] = $.plot("#oiltemp_meter", [
	{label:"剩余",data:1,color:"#428bca"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['oiltemp'] = $.plot("#placeholder_oiltemp", Tmp_data["oiltemp"], options_chart);

	//gastemp
	options_meter['series']['pie']['stroke']['color'] = "#428bca";
	pie_plot['gastemp'] = $.plot("#gastemp_meter", [
	{label:"剩余",data:1,color:"#428bca"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['gastemp'] = $.plot("#placeholder_gastemp", Tmp_data["gastemp"], options_chart);

	//acur
	options_meter['series']['pie']['stroke']['color'] = "#20b820";
	pie_plot['acur'] = $.plot("#acur_meter", [
	{label:"剩余",data:1,color:"#20b820"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['acur'] = $.plot("#placeholder_acur", Tmp_data["acur"], options_chart);

	//bcur
	options_meter['series']['pie']['stroke']['color'] = "#20b820";
	pie_plot['bcur'] = $.plot("#bcur_meter", [
	{label:"剩余",data:1,color:"#20b820"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['bcur'] = $.plot("#placeholder_bcur", Tmp_data["bcur"], options_chart);

	//ccur
	options_meter['series']['pie']['stroke']['color'] = "#20b820";
	pie_plot['ccur'] = $.plot("#ccur_meter", [
	{label:"剩余",data:1,color:"#20b820"},
	{label:"当前",data:10,color:"#F00000"}
	],options_meter);
	
	line_plot['ccur'] = $.plot("#placeholder_ccur", Tmp_data["ccur"], options_chart);
	
	function update() {
		Tmp_data = getRealtimeData(RawData,true);
		for (var item in line_plot){
			pie_data = pie_plot[item].getData();
			pie_data[1].data = 100 * (Tmp_data[item][0][29][1]/800);
			pie_data[0].data = 100 - pie_data[1].data;
			
			pie_plot[item].setData(pie_data);
			pie_plot[item].draw();
			
			line_plot[item].setData(Tmp_data[item]);
			line_plot[item].draw();
			document.getElementById(item+"_img").style.width=pie_data[1].data+"%";
		}
		setTimeout(update, updateInterval*1000);
	}
	
	update();
})