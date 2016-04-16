var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";

function map_init(){

	var map = new BMap.Map("allEqp_map");          // 创建地图实例  
    var markerflag = 1;
	if($("#gps_long")[0].innerHTML == "" || $("#gps_lat")[0].innerHTML == ""){
		gps_long = 120.12;
		gps_lat = 30.26;
        markerflag = 0;
	}else{
		gps_long = parseFloat($("#gps_long")[0].innerHTML);
		gps_lat = parseFloat($("#gps_lat")[0].innerHTML);
	}
	
	var gpsPoint = new BMap.Point(gps_long,gps_lat);
	//坐标转换完之后的回调函数
	translateCallback = function (point){
		var marker = new BMap.Marker(point);
        if(markerflag == 1){
            map.addOverlay(marker);
        }
		map.centerAndZoom(point, 11);
	}
	
	BMap.Convertor.translate(gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标
}

$(document).ready(function(){
    
	$("#cv_id_select").select2();
	$("#cv_id_select").select2_set_alertstr("设备不存在！");

    $("#cv_id_select").on("select2-selecting", function(e){
		var num = e.choice.text;//document.getElementById('cv_id_select').value;
		if(num == document.getElementById('SetId').innerHTML){
			return;
		}
		if(num!=''){ 
			window.location.href=base_url+"index.php/admin/"+e.val;
		}
    })
	
	function loadJScript() {
		var script0 = document.createElement("script");
		script0.type = "text/javascript";
		script0.src = "http://api.map.baidu.com/api?v=1.5&ak=09a12fee552d5ad4aa2de5c0626c9c10&callback=map_init";
		
		var script1 = document.createElement("script");
		script1.type = "text/javascript";
		script1.src = "http://developer.baidu.com/map/jsdemo/demo/convertor.js";
		
		document.body.appendChild(script0);
		document.body.appendChild(script1);
	}
	
	
	if(document.getElementById('SetId').innerHTML != ""){
		//chart
		var d0 = [[1196463600000, 10], [1196550000000, 10], [1196636400000, 12], [1196722800000, 17], [1196809200000, 16], [1196895600000, 17], [1196982000000, 17], [1197068400000, 16], [1197154800000, 16], [1197241200000, 12], [1197327600000, 15], [1197414000000, 16], [1197500400000, 15], [1197586800000, 15], [1197673200000, 16], [1197759600000, 15], [1197846000000, 15], [1197932400000, 18], [1198018800000, 11], [1198105200000, 11], [1198191600000, 16], [1198278000000, 18], [1198364400000, 18], [1198450800000, 18], [1198537200000, 16], [1198623600000, 18], [1198710000000, 18], [1198796400000, 18], [1198882800000, 18], [1198969200000, 18]];
		var d1 = [[1196463600000, 5], [1196550000000, 7], [1196636400000, 10], [1196722800000, 17], [1196809200000, 16], [1196895600000, 15], [1196982000000, 17], [1197068400000, 15], [1197154800000, 16], [1197241200000, 10], [1197327600000, 15], [1197414000000, 14], [1197500400000, 14], [1197586800000, 15], [1197673200000, 16], [1197759600000, 13], [1197846000000, 15], [1197932400000, 18], [1198018800000, 11], [1198105200000, 6], [1198191600000, 15], [1198278000000, 13], [1198364400000, 15], [1198450800000, 10], [1198537200000, 10], [1198623600000, 16], [1198710000000, 18], [1198796400000, 9], [1198882800000, 12], [1198969200000, 10]];
		var d2 = [[1196463600000, 0], [1196550000000, 7], [1196636400000, 8], [1196722800000, 9], [1196809200000, 33], [1196895600000, 35], [1196982000000, 27], [1197068400000, 80], [1197154800000, 7], [1197241200000, 10], [1197327600000, 15], [1197414000000, 14], [1197500400000, 14], [1197586800000, 10], [1197673200000, 13], [1197759600000, 10], [1197846000000, 15], [1197932400000, 48], [1198018800000, 35], [1198105200000, 40], [1198191600000, 44], [1198278000000, 33], [1198364400000, 35], [1198450800000, 46], [1198537200000, 20], [1198623600000, 64], [1198710000000, 56], [1198796400000, 56], [1198882800000, 58], [1198969200000, 50]];
		
	   /* 
		var d0 = [[1, 0], [2, 10], [3, 12], [4, 17], [5, 36], [6, 37], [7, 37], [8, 86], [9, 86], [10, 120], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 165], [17, 275], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 481], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686], [30, 686]];
		var d1 = [[1, 0], [2, 7], [3, 10], [4, 17], [5, 36], [6, 35], [7, 27], [8, 85], [9, 86], [10, 120], [11, 159], [12, 147], [13, 147], [14, 165], [15, 164], [16, 153], [17, 275], [18, 480], [19, 410], [20, 466], [21, 465], [22, 334], [23, 352], [24, 520], [25, 590], [26, 649], [27, 681], [28, 592], [29, 682], [30, 608]];
		var d2 = [[1, 0], [2, 7], [3, 8], [4, 9], [5, 33], [6, 35], [7, 27], [8, 80], [9, 67], [10, 120], [11, 150], [12, 140], [13, 140], [14, 160], [15, 143], [16, 130], [17, 157], [18, 458], [19, 359], [20, 408], [21, 454], [22, 313], [23, 335], [24, 468], [25, 270], [26, 644], [27, 568], [28, 562], [29, 582], [30, 508]];
	   */
		var options = {
			xaxis: {
				mode: "time",
				timeformat:"%m/%d",//"%Y/%m/%d",
				tickLength: 5
			},
			yaxis: {
				tickFormatter: function suffixFormatter(val, axis) {return val+"小时";}
			},
			grid: {
				hoverable: true,
				autoHighlight: false,
				margin:0,
				clickable:true
			},
			legend: {
				position: "nw"
			},
			selection: {
				mode: "x"
			}
		};
		
		var plot = $.plot("#effect-bar-chart", [
		{
			data:d0,
			label:"设备开机时间= 0",
			bars: {
				show:true,
				barWidth: 21600000,
				//barWidth: 0.1,
				order: 1,
				lineWidth: 1,
				fill:0.6
			}
		},
		{
			data:d1,
			label:"设备加载时间= 0",
			bars: {
				show:true,
				barWidth: 21600000,
				//barWidth: 0.1,
				order: 2,
				lineWidth: 1,
				fill:0.6
			}
		}
		], options);

		var overview = $.plot("#overview-effect", [d0,d1], {
			series: {
				lines: {
					show: true,
					lineWidth: 1,
					fill:0.5
				},
			},
			grid:{
				margin:0
				//backgroundColor: { colors: ["#fff", "#999"] }
			},
			legend:{
				show:true
			},
			xaxis: {
				ticks: [],
				mode: "time",
				timeformat:"2013/%m/%d"//"%Y/%m/%d",
			},
			yaxis: {
				ticks: [],
				min: 0,
				autoscaleMargin: 0.1
			},
			selection: {
				mode: "x"
			}
		});

		$("#effect-bar-chart").bind("plotselected", function (event, ranges) {

			if (ranges.xaxis.from < d0[0][0] + 8 * 60 * 60 * 1000){
				ranges.xaxis.from = d0[0][0] - 8 * 60 * 60 * 1000;
			}
			if (ranges.xaxis.to < ranges.xaxis.from + 8 * 24 * 60 * 60 * 1000){
				ranges.xaxis.to = ranges.xaxis.from + 8 * 24 * 60 * 60 * 1000;
			}
			if (ranges.xaxis.to > d0[d0.length-1][0] + 24 * 60 * 60 * 1000){
				ranges.xaxis.to = d0[d0.length-1][0] + 24 * 60 * 60 * 1000;
				if(ranges.xaxis.to < ranges.xaxis.from + 8 * 24 * 60 * 60 * 1000){
					ranges.xaxis.from = ranges.xaxis.to - 8 * 24 * 60 * 60 * 1000;
				}
			}
			// do the zooming
			$.each(plot.getXAxes(), function(_, axis) {
				var opts = axis.options;
				opts.min = ranges.xaxis.from;
				opts.max = ranges.xaxis.to;
			});
			plot.setupGrid();
			plot.draw();
			plot.clearSelection();

			// don't fire event on the overview to prevent eternal loop

			$("#effect-fullrange").attr("disabled",false);
			overview.setSelection(ranges, true);
		});

		$("#overview-effect").bind("plotselected", function (event, ranges) {
			plot.setSelection(ranges);
		});
		
		$.plot("#effect-pie-chart", [
		{label:"未加载时间",data:23},
		{label:"加载时间",data:450}], 
		{
			series: {
				pie: { 
					show: true,
					//innerRadius: 0.3,
					radius:0.9,
					tilt: 0.5,
					label: {
						show: true,
						formatter: labelFormatter,
						background: {
							opacity: 0.5,
							color: '#000'
						}
					},
					combine: {
						color: '#999',
						threshold: 0.1
					}
				}
			},
			grid: {
				hoverable: true,
				clickable: true
			},
			legend: {
				show:false
			}
		});
		
		$("#effect-fullrange").on("click",function(){
			$("#effect-fullrange").attr("disabled",true);
			$.each(plot.getXAxes(), function(_, axis) {
				var opts = axis.options;
				opts.min = d0[0][0] - 12 * 60 * 60 * 1000;
				opts.max = d0[d0.length-1][0] + 12 * 60 * 60 * 1000;
			});
			
			overview.setSelection(false,false);
			plot.setupGrid();
			plot.draw();
			plot.clearSelection();
		});

		
		
		
		//run error
		var e0 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 0], [1196809200000, 2], [1196895600000, 5], [1196982000000, 0], [1197068400000, 8], [1197154800000, 0], [1197241200000, 9], [1197327600000, 1], [1197414000000, 4]]; 
		var e1 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 1], [1196722800000, 0], [1196809200000, 0], [1196895600000, 1], [1196982000000, 3], [1197068400000, 2], [1197154800000, 5], [1197241200000, 12], [1197327600000, 13], [1197414000000, 1]];
		var e2 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 2], [1196722800000, 0], [1196809200000, 0], [1196895600000, 2], [1196982000000, 0], [1197068400000, 2], [1197154800000, 7], [1197241200000, 8], [1197327600000, 5], [1197414000000, 6]];
		var e3 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 1], [1196809200000, 1], [1196895600000, 0], [1196982000000, 0], [1197068400000, 1], [1197154800000, 1], [1197241200000, 1], [1197327600000, 8], [1197414000000, 9]];
		var e4 = [[1196463600000, 0], [1196550000000, 1], [1196636400000, 0], [1196722800000, 0], [1196809200000, 5], [1196895600000, 6], [1196982000000, 1], [1197068400000, 0], [1197154800000, 2], [1197241200000, 15], [1197327600000, 20], [1197414000000, 16]];
		var e5 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 0], [1196809200000, 0], [1196895600000, 9], [1196982000000, 6], [1197068400000, 2], [1197154800000, 1], [1197241200000, 0], [1197327600000, 2], [1197414000000, 3]];   

		$.plot("#error-pie-chart", [
		{label:"保养期已过",data:10},//,color:"#095791"},
		{label:"保养期剩余24小时以内",data:12},//,color:"#0B62A4"},
		{label:"保养期剩余7天以内",data:10},//,color:"#3980B5"},
		
		{label:"保养期剩余1个月以内",data:100},//,color:"#679DC6"},
		{label:"保养期剩余2个月以内",data:50},//,color:"#95BBD7"},
		{label:"保养期剩余2个月以上",data:50}//,color:"#B0CCE1"}
		], 
		{
			series: {
				pie: { 
					show: true,
					//innerRadius: 0.3,
					radius:0.9,
					label: {
						show: false
					}
				}
			},
			grid: {
				hoverable: true,
				clickable: true
			},
			legend: {
				show:false
			}
		});
		var options_error = {
			series: {
				lines: {
					show:true,
					lineWidth: 1
				},
				points: {
					show: true
				}
			},
			xaxis: {
				mode: "time",
				timeformat:"2013/%m/%d",//"%Y/%m/%d",
				tickLength: 5
			},
			yaxis: {
				tickFormatter: function suffixFormatter(val, axis) {return val+"次";}
			},
			grid: {
				hoverable: true,
				autoHighlight: false,
				margin:0,
				clickable:true
			},
			legend: {
				position: "nw"
			}
		};
		
		var plot_error = $.plot("#error-bar-chart", [
		{
			data:e0,
			label:"故障0次数",
		},
		{
			data:e1,
			label:"故障1次数",
		},
		{
			data:e2,
			label:"故障2次数",
		},
		{
			data:e3,
			label:"故障3次数",
		},
		{
			data:e4,
			label:"故障4次数",
		}
		], options_error);

		function labelFormatter(label, series) {
			return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
		}
		
		
		
		
		
		
		
		
		
		//maintain
		var options_maintain = {
			series: {
				pie: { 
					show: true,
					innerRadius: 0.7,
					radius:0.9,
					label: {
						show: false
					},
					stroke:{
						width:0,
						color:"#fff"
					}
				}
			},
			legend: {
				show:false
			}
		};
		
		$.plot("#kl_maintain", [
		{label:"保养期已过",data:101-(parseInt($("#kl_maintain_percent").html())),color:"#eee"},
		{label:"保养期已过",data:1+(parseInt($("#kl_maintain_percent").html())),color:"#00F000"}
		],options_maintain);
		$.plot("#yl_maintain", [
		{label:"保养期已过",data:101-(parseInt($("#yl_maintain_percent").html())),color:"#eee"},
		{label:"保养期已过",data:1+(parseInt($("#yl_maintain_percent").html())),color:"#00F000"}
		],options_maintain);
		$.plot("#yf_maintain", [
		{label:"保养期已过",data:101-(parseInt($("#yf_maintain_percent").html())),color:"#eee"},
		{label:"保养期已过",data:1+(parseInt($("#yf_maintain_percent").html())),color:"#00F000"}
		],options_maintain);
		$.plot("#ry_maintain", [
		{label:"保养期已过",data:101-(parseInt($("#ry_maintain_percent").html())),color:"#eee"},
		{label:"保养期已过",data:1+(parseInt($("#ry_maintain_percent").html())),color:"#00F000"}
		],options_maintain);
		$.plot("#rz_maintain", [
		{label:"保养期已过",data:101-(parseInt($("#rz_maintain_percent").html())),color:"#eee"},
		{label:"保养期已过",data:1+(parseInt($("#rz_maintain_percent").html())),color:"#00F000"}
		],options_maintain);
	}
	loadJScript();
})
