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

$("#btn-roboselect").click(function(e){
    if($("#input-roboselect").val() != ""){
        var id = "#robo"+$("#input-roboselect").val();
        if($(id).length > 0){
            window.location.href=$(id).attr("href");
        }
    }
})
$(document).ready(function(){
    
	
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
    loadJScript();
	$("#cv_id_select").select2();
	$("#cv_id_select").select2_set_alertstr("设备不存在！");
    $("#cv_id_select").on("select2-selecting",function(e){
        var num=e.choice.text;//document.getElementById('cv_id_select').value;
        if(num == document.getElementById('SetId').innerHTML){
            return;
        }   
        if(num!=''){
            window.location.href=base_url+"index.php/admin/"+e.val;
        }
    })
	
    function gd(date){
        var date = new Date(date);
        return date.getTime();
    }
    
	var overview = [];
	var plot_lines = [];

    var d0 = new Array(100);//暂时设定长度为100
    var options = {
		series: {
			lines: {
				show: true
			}
		},
        xaxis: {
            mode: "time",
            timeformat:"%m/%d",
            tickLength: 5
        },
        yaxis: {
            tickFormatter: "",
            tickDecimals:0
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
	
	
    for(var item in meterslist){
        
        if(item == 0){
            continue;
        }
        var infoitem = meterslist[item][0]+"info";
        for (var i=1;i<window[infoitem][0].length;i++){
            d0[i-1] = new Array(2);
            d0[i-1][0]=gd(window[infoitem][0][i]);
            d0[i-1][1]=window[infoitem][1][i];
        }
        //gaspress
        options['grid']['show'] = false;
        options['series']['lines']['fill'] = 0.6;
        options['yaxis']['tickFormatter'] = function suffixFormatter(val, axis) {return val+meterslist[item][1];};
        overview[meterslist[item][0]] = $.plot("#overview-"+meterslist[item][0], [d0], {
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
                timeformat:"%m/%d"//"%Y/%m/%d",
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
        
        options['grid']['show'] = true;
        options['series']['lines']['fill'] = null;
        plot_lines[meterslist[item][0]] = $.plot("#"+meterslist[item][0]+"-line-chart", [d0], options);
    }
	
})
