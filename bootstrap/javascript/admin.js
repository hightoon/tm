var map;
var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";
var maintainmap=new Array(2);
maintainmap['maintain-donut1'] = 'detail_kl';
maintainmap['maintain-donut2'] = 'detail_yl';
maintainmap['maintain-donut3'] = 'detail_yf';
maintainmap['maintain-donut4'] = 'detail_ry';
maintainmap['maintain-donut5'] = 'detail_rz';

function callback(points){
	var temp = null;
	for (var index in points){
		temp = points[index];
		if (temp.error != 0 ){continue;}
		var point = new BMap.Point(temp.x,temp.y);
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		//map.setCenter(point);
	} 
}

function map_init(){

	map = new BMap.Map("allEqp_map");          // 创建地图实例  
	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL})); 
	map.centerAndZoom(new BMap.Point(118.9188,28.9422), 5);
	
	/*var gpsPoint = [new BMap.Point(116.9187,28.9423),
					new BMap.Point(117.9187,29.9423),
					new BMap.Point(116.9187,27.9423),
					new BMap.Point(115.9187,30.9423),
					new BMap.Point(114.9187,26.9423),
					new BMap.Point(113.9187,31.9423)
					];*/
    var gpsPoint = new Array();
    for (var rp in robos_position){
        if(rp != 0){
            var temp = parseInt(robos_position[rp][0]/100);
            var GPS_lat = temp + (robos_position[rp][0] - temp*100)/60;
            temp = parseInt(robos_position[rp][1]/100);
            var GPS_long = temp + (robos_position[rp][1] - temp*100)/60;
            gpsPoint[rp-1]=new BMap.Point(GPS_long,GPS_lat);
        }
    }
	
	setTimeout(function(){
		BMap.Convertor.transMore(gpsPoint,0,callback);     //真实经纬度转成百度坐标
	},1000);
}

function addRemark(e){
	if(e.innerText == "保存"){
		i = $("#remarkDetail").children().length - 1;
		a = $("#remarkDetail").children()[i].children[1].children[0].value;
		b = $("#remarkDetail").children()[i].children[2].children[0].value;
		//alert(a+b);
		$.ajax({
			type	: "POST",
			url		: base_url+"index.php/ajax_index/addRemark/",
			dataType: 'json',
			data	:{
				name	:a,
				remark	:b
			},
			success: function (msg){
				$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("备注添加成功");
				$("#myModal").modal('show');
				setTimeout('location.reload()',100);
			}
		})
		e.innerText = "添加备注";
	}else{
		newtr=document.createElement("tr");
		
		newtd1=document.createElement("td");
		//newtd1.innerHTML="<input type=\"text\" class=\"form-control\" >";
		newtr.appendChild(newtd1);
		
		newtd1=document.createElement("td");
		newtd1.innerHTML="<input type=\"text\" class=\"form-control input-xs\" >";
		newtr.appendChild(newtd1);
		
		newtd2=document.createElement("td");
		newtd2.innerHTML="<input type=\"text\" class=\"form-control input-xs\" >";
		newtr.appendChild(newtd2);
		
		$("#remarkDetail").append(newtr);
		e.innerText = "保存";
	}
	
	//alert(e.innerText);
}

function delRemark(e){
	a=e.parentNode.parentNode.children[0].innerText;
	b=e.parentNode.parentNode.children[1].innerText;
	c=e.parentNode.parentNode.children[2].children[0].innerText;
	
	$.ajax({
		type	:'POST',
		url		: base_url+"index.php/ajax_index/delRemark/",
		dataType: 'json',
		data	:{
			date	:a,
			name	:b,
			remark	:c
		},
		success: function (msg){
			$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
			$("#myModal_Label").html("成功");
			$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
			$("#myModal_content").html("删除成功");
			$("#myModal").modal('show');
			
			e.parentNode.parentNode.remove();
			
			numtemp = parseInt($("#remarknum").html())-1;
			$("#remarknum").html(numtemp+"条");
			//setTimeout('location.reload()',100);
		}
	});
}

$(function() {

	function loadJScript() {
		var script0 = document.createElement("script");
		script0.type = "text/javascript";
		script0.src = "http://api.map.baidu.com/api?v=1.5&ak=09a12fee552d5ad4aa2de5c0626c9c10&callback=map_init";
		
		var script1 = document.createElement("script");
		script1.type = "text/javascript";
		script1.src = "http://developer.baidu.com/map/jsdemo/demo/changeMore.js";
		
		document.body.appendChild(script1);
		document.body.appendChild(script0);
	}
	
    $("div.maintain_info").mouseenter(function(e){
        $($("div.klq_maintain")[0]).remove();
        $("div.maintain_info")[0].className="col-lg-2 col-md-6 col-sm-6 col-xs-12 maintain_info";
        $("div.maintain_info").each(function(){
            this.className="col-lg-2 col-md-6 col-sm-6 col-xs-12 maintain_info";
        })
        
        this.className="col-lg-4 col-md-6 col-sm-6 col-xs-12 maintain_info";
        if(0 != $(this).find("div.col-lg-12").length){
            $(this).find("div.col-lg-12")[0].className="col-lg-5 col-md-6 col-sm-4 col-xs-6";
        }
        $div=$("<div class=\"col-lg-7  col-md-6 col-sm-8 col-xs-6 text-center klq_maintain\"><br><div>鼠标移动至饼图区域<div></div>可查看概况，</div><div>或点击饼图区域</div><div>以查看详情</div></div>");
        
        $($(this).find("div.klq_maintain")[0]).show();
        $($(this).find("div.row")[1]).append($div);
        
    });
    $("div.maintain_info").mouseleave(function(e){
        //$(this).find("div.col-lg-5")[0].className="col-lg-12";
        //$($("div.klq_maintain")[0]).remove();
        //this.className="col-lg-2 maintain_info";
    });
    
    //chart
    function diffDays(date1,date2){
        if(date1 == null || date2 == null || date1.length == 0 || date2.length == 0){
            return 0;
        }
        
        var start = new Date(date1);
        var starttime = start.getTime();
        
        var end = new Date(date2);
        var endtime = end.getTime();
        
        var difftime = starttime - endtime;
        if(difftime <= 0){
            difftime = -difftime;
        }
        
        var diffdays = parseInt(1 + (difftime/86400000));
        return diffdays;
    }
    
    function gd(offset){
        var date = new Date();
        date.setDate(date.getDate() - offset);
        return date.getTime();
    }
    
    var robosnum = new Array();
    var alarmnum = new Array();
    var date0 = new Date;
    var date_now = date0.toDateString();
    
    for(i=0;i<31;i++){
        robosnum[i] = 0;
        alarmnum[i] = 0;
    }
    
    for(i=0;i<$("td.chart_robosnum").length;i++){
        date_temp = $("td.chart_robosnum")[i].innerHTML.substr(0,10);
        n = diffDays(date_now,date_temp);
        if(n > 31){
            n = 31;
        }
        
        for(j=0;j<31;j++){
            if(j > 30-n){
                robosnum[j]++;
            }
        }
    }
    
    for(i=0;i<$("td.chart_alarmnum").length;i++){
        date_temp = $("td.chart_alarmnum")[i].innerHTML.substr(0,10);
        n = diffDays(date_now,date_temp);
        if(n > 31){
            n = 31;
        }
        
        for(j=0;j<31;j++){
            if(j > 30-n){
                alarmnum[j]++;
            }
        }
    }
    
    var d0 = new Array();
    var d1 = new Array();
    
    for(i=0;i<31;i++){
        d0[i] = new Array();
        d1[i] = new Array();
        d0[i][0]=gd(30-i);
        d0[i][1]=robosnum[i];
        d1[i][0]=gd(30-i);
        d1[i][1]=alarmnum[i];
    }
    
    var options = {
        xaxis: {
            mode: "time",
            timeformat:"%m/%d",
            tickLength: 5
        },
        yaxis: {
            tickFormatter: function suffixFormatter(val, axis) {return val+"台";},
            tickDecimals:0
        },
        grid: {
            hoverable: true,
            autoHighlight: false
        },
        crosshair: {
            mode: "x"
        },
        legend: {
            position: "nw",
			backgroundOpacity:0.25,
			backgroundColor:"#888"
        }
    };

    var updateLegendTimeout = null;
    var latestPosition = null;

    function updateLegend() {

        updateLegendTimeout = null;

        var pos = latestPosition;

        var axes = plot.getAxes();
        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
            pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
            return;
        }

        var i, j, dataset = plot.getData();
        for (i = 0; i < dataset.length; ++i) {

            var series = dataset[i];

            for (j = 0; j < series.data.length; ++j) {
                if (series.data[j][0] > pos.x) {
                    break;
                }
            }

            // Now Interpolate

            var y,
                p1 = series.data[j - 1],
                p2 = null;//series.data[j];

            if (p1 == null) {
                y = p2[1];
            } else if (p2 == null) {
                y = p1[1];
            } else {
                y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
            }
            
            if(i == 0){
                legends.eq(i).text(series.label.replace(/=.*/, "= " + parseInt(y) + "台"));
            }else{
                legends.eq(i).text(series.label.replace(/=.*/, "= " + parseInt(y) + "次"));
            }
        }
    }

	//$.settestcolor_sjl("#fff");
	
    var plot = $.plot("#set-status-chart", [
    //{data:d0,label:"设备总数= 0000台",bars:{show:true,lineWidth:0,barWidth:43200000,fill:0.8}},
    {data:d0,label:"设备总数= 0000台",lines:{show:true,lineWidth:2},color:"#FF0000",points: { fillColor: "#FF0000", show: true }},
    {data:d1,label:"报警次数= 0000次",lines:{show:true,lineWidth:2},color:"#0000FF",points: { fillColor: "#0000FF", show: true }}
    ], options);

    var legends = $("#set-status-chart .legendLabel");

    legends.each(function () {
        // fix the widths so they don't jump around
        $(this).css('width', $(this).width()+10);
    });
    
    $("#set-status-chart").bind("plothover",  function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout) {
            updateLegendTimeout = setTimeout(updateLegend, 50);
        }
    });

	var maintain_options={
        series: {
            pie: { 
                show: true,
                //innerRadius: 0.8,
                //radius:0.9,
                label: {
                    show: false
                },
				stroke:{
					width:0,
					color:"#428bca"
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
    };
	
    var data1 = [
    {label:"保养期已过",data:parseInt($("#kl_0").html()),color:"#f52914"},//"#095791"},
    {label:"保养期剩余24小时以内",data:parseInt($("#kl_1").html()),color:"#f56954"},//"#0B62A4"},
    {label:"保养期剩余7天以内",data:parseInt($("#kl_2").html()),color:"#f39c12"},//"#3980B5"},
    
    {label:"保养期剩余1个月以内",data:parseInt($("#kl_3").html()),color:"#89dc00"},//"#679DC6"},
    {label:"保养期剩余2个月以内",data:parseInt($("#kl_4").html()),color:"#00ca2d"},//"#95BBD7"},
    {label:"保养期剩余2个月以上",data:parseInt($("#kl_5").html()),color:"#00a60a"}];//"#B0CCE1"}];
    
    $.plot("#maintain-donut1", data1, maintain_options);

    $("div.dount-holder").bind("plothover", function(event, pos, obj) {

        if (!obj) {
            return;
        }
        
        $("div.klq_maintain").html("<div class=\"huge\">"+obj.series.data[0][1]+"台</div><div>"+obj.series.label+"</div><div>占比："+obj.series.percent.toFixed(1)+"%</div>");

    });

    var flag2show=-1;
    $("div.dount-holder").bind("plotclick", function(event, pos, obj) {

		var table_name = maintainmap[event.target.id]+obj.seriesIndex;
		//alert(table_name);
        if (!obj) {
            return;
        }
        //alert(obj.seriesIndex)
        if (-1 == flag2show){
            flag2show = obj.seriesIndex;
        }else if(flag2show == obj.seriesIndex && !$("#"+table_name).is(":hidden")){
            flag2show = -1;
            $("#"+table_name).hide();
            return;
        }
        
		for(name in maintainmap){
			for(i=0;i<6;i++){
				if(!$("#"+maintainmap[name]+i).is(":hidden")){
					$("#"+maintainmap[name]+i).hide();
				}
			}
		};
        flag2show = obj.seriesIndex;
        var t = pos.pageY-320; 
        var l = pos.pageX+20; 
        if (l > $(window).width()-520){
            l -= 520;
        }
        $("#"+table_name).css({ "top": t, "left": l ,"backgroundcolor":"rgb(100,0,0)"}).show();
    });
	
	var data2 = [
    {label:"保养期已过",data:parseInt($("#yl_0").html()),color:"#f52914"},//"#095791"},
    {label:"保养期剩余24小时以内",data:parseInt($("#yl_1").html()),color:"#f56954"},//"#0B62A4"},
    {label:"保养期剩余7天以内",data:parseInt($("#yl_2").html()),color:"#f39c12"},//"#3980B5"},
    
    {label:"保养期剩余1个月以内",data:parseInt($("#yl_3").html()),color:"#89dc00"},//"#679DC6"},
    {label:"保养期剩余2个月以内",data:parseInt($("#yl_4").html()),color:"#00ca2d"},//"#95BBD7"},
    {label:"保养期剩余2个月以上",data:parseInt($("#yl_5").html()),color:"#00a60a"}];//"#B0CCE1"}];

    $.plot("#maintain-donut2", data2, maintain_options);
	
	var data3 = [
    {label:"保养期已过",data:parseInt($("#yf_0").html()),color:"#f52914"},//"#095791"},
    {label:"保养期剩余24小时以内",data:parseInt($("#yf_1").html()),color:"#f56954"},//"#0B62A4"},
    {label:"保养期剩余7天以内",data:parseInt($("#yf_2").html()),color:"#f39c12"},//"#3980B5"},
    
    {label:"保养期剩余1个月以内",data:parseInt($("#yf_3").html()),color:"#89dc00"},//"#679DC6"},
    {label:"保养期剩余2个月以内",data:parseInt($("#yf_4").html()),color:"#00ca2d"},//"#95BBD7"},
    {label:"保养期剩余2个月以上",data:parseInt($("#yf_5").html()),color:"#00a60a"}];//"#B0CCE1"}];

    $.plot("#maintain-donut3", data3, maintain_options);
	
	var data4 = [
    {label:"保养期已过",data:parseInt($("#ry_0").html()),color:"#f52914"},//"#095791"},
    {label:"保养期剩余24小时以内",data:parseInt($("#ry_1").html()),color:"#f56954"},//"#0B62A4"},
    {label:"保养期剩余7天以内",data:parseInt($("#ry_2").html()),color:"#f39c12"},//"#3980B5"},
    
    {label:"保养期剩余1个月以内",data:parseInt($("#ry_3").html()),color:"#89dc00"},//"#679DC6"},
    {label:"保养期剩余2个月以内",data:parseInt($("#ry_4").html()),color:"#00ca2d"},//"#95BBD7"},
    {label:"保养期剩余2个月以上",data:parseInt($("#ry_5").html()),color:"#00a60a"}];//"#B0CCE1"}];

    $.plot("#maintain-donut4", data4, maintain_options);
	
	var data5 = [
    {label:"保养期已过",data:parseInt($("#rz_0").html()),color:"#f52914"},//"#095791"},
    {label:"保养期剩余24小时以内",data:parseInt($("#rz_1").html()),color:"#f56954"},//"#0B62A4"},
    {label:"保养期剩余7天以内",data:parseInt($("#rz_2").html()),color:"#f39c12"},//"#3980B5"},
    
    {label:"保养期剩余1个月以内",data:parseInt($("#rz_3").html()),color:"#89dc00"},//"#679DC6"},
    {label:"保养期剩余2个月以内",data:parseInt($("#rz_4").html()),color:"#00ca2d"},//"#95BBD7"},
    {label:"保养期剩余2个月以上",data:parseInt($("#rz_5").html()),color:"#00a60a"}];//"#B0CCE1"}];
	
    $.plot("#maintain-donut5", data5, maintain_options);

    // Add the Flot version string to the footer

	loadJScript();
	
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
});