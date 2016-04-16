var linecharttimer;
var plot_press;
var plot_temp;
var plot_CUR;
var Tmp_press = [];
var Tmp_temp = [];
var Tmp_cur = [];
var Tmp_speed = [];
var Tmp_fuel = [];
var Tmp_voltage = [];
var Tmp_runpower = [];
var Tmp_runrate = [];
var updateLegendTimeout = null;
var latestPosition = null;
var select = new Array(2);
select['OilPress'] = 1;
select['GasPress'] = 1;
select['GasTemp'] = 1;
select['OilTemp'] = 1;
select['WaterTemp'] = 1;
select['ACur'] = 1;
select['BCur'] = 1;
select['CCur'] = 1;
select['Speed'] = 1;
select['FuelLevel'] = 1;
select['Voltage'] = 1;
select['RunPower'] = 1;
select['RunRate'] = 1;
var RawData={
	OilPress:[],
	GasPress:[],
	GasTemp:[],
	OilTemp:[],
	WaterTemp:[],
	ACur:[],
	BCur:[],
	CCur:[],
	Speed:[],
	FuelLevel:[],
	Voltage:[],
	RunPower:[],
	RunRate:[]
}
var dataGasTemp = [];
var updateInterval;
var datasets = {
	"press":{
		"OilPress": {
			label: "机油压力",
			data:[],
			//color: "rgb(200, 20, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		},
		"GasPress": {
			label: "排气压力",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"temp":{
		"GasTemp": {
			label: "排气温度",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		},
		"OilTemp": {
			label: "机油温度",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		},
		"WaterTemp": {
			label: "水温度",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"cur":{
		"ACur": {
			label: "A相电流",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		},
		"BCur": {
			label: "B相电流",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		},
		"CCur": {
			label: "C相电流",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"speed":{
		"Speed": {
			label: "转速",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"fuel":{
		"FuelLevel": {
			label: "燃油位置",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"voltage":{
		"Voltage": {
			label: "电压",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"runpower":{
		"RunPower": {
			label: "运行功率",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	},
	"runrate":{
		"RunRate": {
			label: "运行速率",
			data:[],
			//color: "rgb(200, 100, 30)",
			threshold: {
				below: 20,
				color: "rgb(30, 180, 20)"
			},
			lines: {
				steps: false
			}
		}
	}
}

function getRandomData(type,realtime) {

	var y;
	
	if(realtime){
		for(var item in type){
			if (RawData[item].length > 0)
				RawData[item].shift();
				
			for (var i = 0; RawData[item].length < totalPoints; i++) {
			
				y = document.getElementById(item).innerHTML;
			
				RawData[item].push(y);
			}
		}
	}

	var res = [];
	
	for(var item in type){
	
		type[item].data = [];
		
		for (var i = 0; i < RawData[item].length; ++i) {
			type[item].data.push([i,RawData[item][i]]);
		}
		
		if(select[item] != 0){
			res.push(type[item])
		}
	}

	return res;
}

function update() {
	
	Tmp_press = getRandomData(datasets['press'],true);

	plot_press.setData(Tmp_press);

	// Since the axes don't change, we don't need to call plot.setupGrid()

	plot_press.draw();
	
	
	Tmp_temp = getRandomData(datasets['temp'],true);

	plot_temp.setData(Tmp_temp);

	plot_temp.draw();
	
	
	Tmp_cur = getRandomData(datasets['cur'],true);

	plot_cur.setData(Tmp_cur);

	plot_cur.draw();
	
	Tmp_speed = getRandomData(datasets['speed'],true);

	plot_speed.setData(Tmp_speed);

	plot_speed.draw();
	
	Tmp_fuel = getRandomData(datasets['fuel'],true);

	plot_fuel.setData(Tmp_fuel);

	plot_fuel.draw();
	
	Tmp_voltage = getRandomData(datasets['voltage'],true);

	plot_voltage.setData(Tmp_voltage);

	plot_voltage.draw();
	
	Tmp_runpower = getRandomData(datasets['runpower'],true);

	plot_runpower.setData(Tmp_runpower);

	plot_runpower.draw();
	
	Tmp_runrate = getRandomData(datasets['runrate'],true);

	plot_runrate.setData(Tmp_runrate);

	plot_runrate.draw();
	
	linecharttimer = setTimeout(update, updateInterval*1000);
}

$(function() {

	var choiceContainer_press = $("#choices_press");
	var choiceContainer_temp = $("#choices_temp");
	var choiceContainer_cur = $("#choices_cur");
	
	$.each(datasets['press'], function(key, val) {
		choiceContainer_press.append("<br/><input type='checkbox' name='" + key +
			"' checked='checked' id='id" + key + "'>" + val.label +"</input>");
	});
	choiceContainer_press.find("input").click(plotAccordingToChoices);
	
	$.each(datasets['temp'], function(key, val) {
		choiceContainer_temp.append("<br/><input type='checkbox' name='" + key +
			"' checked='checked' id='id" + key + "'>" + val.label +"</input>");
	});
	choiceContainer_temp.find("input").click(plotAccordingToChoices);
	
	$.each(datasets['cur'], function(key, val) {
		choiceContainer_cur.append("<br/><input type='checkbox' name='" + key +
			"' checked='checked' id='id" + key + "'>" + val.label +"</input>");
	});
	choiceContainer_cur.find("input").click(plotAccordingToChoices);
	
	function plotAccordingToChoices() {
		
		choiceContainer_press.find("input:checked").each(function () {
			var key = $(this).attr("name");
			if (key && datasets['press'][key]) {
				select[key] = 2;
			}
		});
		choiceContainer_temp.find("input:checked").each(function () {
			var key = $(this).attr("name");
			if (key && datasets['temp'][key]) {
				select[key] = 2;
			}
		});
		choiceContainer_cur.find("input:checked").each(function () {
			var key = $(this).attr("name");
			if (key && datasets['cur'][key]) {
				select[key] = 2;
			}
		});
		
		for(var item in select){
			if(select[item] == 2){
				select[item] = 1;
			}else{
				select[item] = 0;
			}
		}
		
		Tmp_press = getRandomData(datasets['press'],false);

		plot_press.setData(Tmp_press);

		plot_press.draw();
		
		Tmp_temp = getRandomData(datasets['temp'],false);

		plot_temp.setData(Tmp_temp);

		plot_temp.draw();
		
		Tmp_cur = getRandomData(datasets['cur'],false);

		plot_cur.setData(Tmp_cur);

		plot_cur.draw();
		
	}
	// We use an inline data source in the example, usually data would
	// be fetched from a server

	totalPoints = 300;
	// Set up the control widget

	updateInterval = 1;
	$('#updateInterval').on('slideStop', function(slideEvt) {
		//alert(slideEvt.value);
		var v = slideEvt.value;//$(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = v;
			if (updateInterval < 0.1) {
				updateInterval = 0.1;
			} else if (updateInterval > 5) {
				updateInterval = 5;
			}
			//$(this).val("" + updateInterval);
			slideEvt.value = updateInterval;
			//alert(updateInterval);
		}
	});/*
	$("#updateInterval").val(updateInterval).change(function () {
		var v = $(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = +v;
			if (updateInterval < 1) {
				updateInterval = 1;
			} else if (updateInterval > 2000) {
				updateInterval = 2000;
			}
			$(this).val("" + updateInterval);
		}
	});*/

	Tmp_press = getRandomData(datasets['press'],true);
	Tmp_temp = getRandomData(datasets['temp'],true);
	Tmp_cur = getRandomData(datasets['cur'],true);
	Tmp_speed = getRandomData(datasets['speed'],true);
	Tmp_fuel = getRandomData(datasets['fuel'],true);
	Tmp_voltage = getRandomData(datasets['voltage'],true);
	Tmp_runpower = getRandomData(datasets['runpower'],true);
	Tmp_runrate = getRandomData(datasets['runrate'],true);

	plot_press = $.plot("#placeholder_press", Tmp_press, {
		series: {
			shadowSize: 0,	// Drawing is faster without shadows
			/*points: {
				show: true
			},*/
			lines: {
				show: true,	
				fill: 0.6
			}
		},
		yaxis: {
			min: -40,
			max: 100
		},
		xaxis: {
			show: true
		},
		grid: {               
			backgroundColor: "#666",
			//tickColor: "#e4f4f4"             
			//show:false
		},
		grid: {               
			show:false
		},
		legend: {
			show:false
		}
	});
	
	plot_temp = $.plot("#placeholder_temp", Tmp_temp, {
		series: {
			shadowSize: 0	// Drawing is faster without shadows
		},
		yaxis: {
			min: -40,
			max: 100
		},
		xaxis: {
			show: true
		},
		grid: {               
			backgroundColor: "#fff",
			tickColor: "#e4f4f4"
		},
		grid: {               
			backgroundColor: "#666",
			//tickColor: "#e4f4f4"             
			//show:false
		},
		legend: {
			show:false
		}
	});
	
	plot_cur = $.plot("#placeholder_cur", Tmp_cur, {
		series: {
			shadowSize: 0	// Drawing is faster without shadows
		},
		yaxis: {
			min: -40,
			max: 100
		},
		xaxis: {
			show: true
		},
		grid: {               
			backgroundColor: "#666",
			//tickColor: "#e4f4f4"             
			//show:false
		},
		legend: {
			show:false
		}
	});
	
	plot_speed = $.plot("#placeholder_speed", Tmp_speed, {
		series: {
			shadowSize: 0,	// Drawing is faster without shadows
			lines: {
				fill: 0.3
			}
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
	});
	
	plot_fuel = $.plot("#placeholder_fuel", Tmp_fuel, {
		series: {
			shadowSize: 0	// Drawing is faster without shadows
		},
		yaxis: {
			min: 0,
			max: 1000,
			show: false
		},
		xaxis: {
			show: false
		},
		grid: {               
			backgroundColor: "#666",
			//tickColor: "#e4f4f4"             
			//show:false
		},
		legend: {
			show:false
		},
	});
	
	plot_voltage = $.plot("#placeholder_voltage", Tmp_voltage, {
		series: {
			shadowSize: 0	// Drawing is faster without shadows
		},
		yaxis: {
			min: 0,
			max: 1000,
			show: false
		},
		xaxis: {
			show: false
		},
		grid: {               
			backgroundColor: "#666",
			//tickColor: "#e4f4f4"             
			//show:false
		},
		legend: {
			show:false
		}
	});
	
	plot_runpower = $.plot("#placeholder_runpower", Tmp_runpower, {
		series: {
			shadowSize: 0	// Drawing is faster without shadows
		},
		yaxis: {
			min: 0,
			max: 1000
		},
		xaxis: {
			show: true
		},
		grid: {               
			backgroundColor: "#fff",
			tickColor: "#e4f4f4"
		},
		grid: {               
			show:false
		},
		legend: {
			show:false
		}
	});
	
	plot_runrate = $.plot("#placeholder_runrate", Tmp_runrate, {
		series: {
			shadowSize: 0	// Drawing is faster without shadows
		},
		yaxis: {
			min: 0,
			max: 1000
		},
		xaxis: {
			show: true
		},
		grid: {               
			backgroundColor: "#fff",
			tickColor: "#e4f4f4"
		},
		grid: {               
			show:false
		},
		legend: {
			show:false
		}
	});
	// Add the Flot version string to the footer

	$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
});

