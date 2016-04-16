var map;
var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";

function addEqp(obj){
	
	$('#modalAddYes').attr("disabled");
	var cv_id = $("#add_id").val();
	var cv_function = $("#add_type").val();
	var cv_factory = $("#add_factory").val();
	
	$.ajax({
		type: "POST",
		url: base_url+"index.php/ajax_setslist/addEqp/",
		data: "cv_id="+cv_id+"&cv_function="+cv_function+"&cv_factory="+cv_factory,
		success:function(){
			var myDate = new Date();
			newtr=document.createElement("tr");
			newtd1=document.createElement("td");
			newtd1.innerHTML = "<a style=\"text-decoration:underline\" href=\"../../index.php/admin/realtimeinfo/"+ cv_id +"\">"+ cv_id +"</a>";
			newtr.appendChild(newtd1);
			
			newtd2=document.createElement("td");
			newtd2.innerHTML = cv_function;
			newtr.appendChild(newtd2);
			
			newtd3=document.createElement("td");
			newtd3.innerHTML = "离线";
			newtr.appendChild(newtd3);
			
			newtd4=document.createElement("td");
			newtd4.innerHTML = cv_factory;
			newtr.appendChild(newtd4);
			
			newtd5=document.createElement("td");
			newtd5.innerHTML = getNowFormatDate();
			newtr.appendChild(newtd5);
			
			newtd6=document.createElement("td");
			newtd6.innerHTML = "<a href=\"javascript:void(0)\"  onclick=\"modalShowDel(this);\">删除</a> | <a href=\"javascript:void(0)\"  onclick=\"modalShowEdit(this);\">编辑</a>";
			newtr.appendChild(newtd6);
			
			listTable = document.getElementById("listTable");
			listTable.appendChild(newtr);
			$('#addItem').modal('hide');
		}
	});
	
	
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			+ " " + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
	return currentdate;
}
function modalShowDel(obj){
	var tds=$(obj).parent().parent().find('td');
	var cv_id = tds.eq(0).text();
	$('#del_cv_id').text(tds.eq(0).text());
	$('#delItem').modal('show');
	$('#modalDelYes').unbind();
	$('#modalDelYes').mousedown(function(e){
		if(1 == e.which){
			$.ajax({
			   type: "POST",
			   url: base_url+"index.php/ajax_setslist/delEqp/",
			   data: "cv_id="+cv_id
			});
			tds.remove();
			$('#delItem').modal('hide');
		}
	});
	
}
function modalShowEdit(obj){
	var tds=$(obj).parent().parent().find('td');
	var cv_id = tds.eq(0).text();
	$('#edit_cv_id').text(tds.eq(0).text());
	$('#edit_type').val(tds.eq(1).text());
	$('#edit_function').val(tds.eq(2).text());
	$('#edit_controller').val(tds.eq(3).text());
	$('#edit_dealer').val(tds.eq(5).text());
	//$('#edit_user').val(tds.eq(6).text());
	$('#edit_factory').val(tds.eq(7).text());
	$('#editItem').modal('show');
	$('#editmodalDelYes').unbind();
	$('#editmodalDelYes').mousedown(function(e){
		if(1 == e.which){
			$.ajax({
			   type: "POST",
			   url: base_url+"index.php/ajax_setslist/editEqp/",
			   dataType:'json',
			   data: {
				cv_id			: cv_id,
				cv_type			: $('#edit_type').val(),
				cv_function		: $('#edit_function').val(),
				cv_controller	: $('#edit_controller').val(),
				cv_dealer		: $('#edit_dealer').val(),
				cv_factory		: $('#edit_factory').val()
			   }
			});
			//tds.remove();
			tds.eq(1).text($('#edit_type').val());
			tds.eq(2).text($('#edit_function').val());
			tds.eq(3).text($('#edit_controller').val());
			tds.eq(5).text($('#edit_dealer').val());
			tds.eq(7).text($('#edit_factory').val());
			$('#editItem').modal('hide');
		}
	});
	
}




function callback(points){
	var temp = null;
	for (var index in points){
		temp = points[index];
		if (temp.error != 0 ){continue;}
		var point = new BMap.Point(temp.x,temp.y);
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		map.setCenter(point);
	} 
}

function map_init(){

	map = new BMap.Map("allEqp_map");          // 创建地图实例  
	map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT})); 
	map.addControl(new BMap.NavigationControl());            
	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL})); 
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
	
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
			
	var markers=[];
	
	setTimeout(function(){
		BMap.Convertor.transMore(gpsPoint,0,callback);     //真实经纬度转成百度坐标
	},1000);
}

function editremarkcancel(e){
    content = e.previousElementSibling.value;
    
	e.parentNode.parentNode.children[1].innerText = "修改";
    e.parentNode.parentNode.children[0].innerHTML = content;
}
$(".maintain-remark").click(function(e){
	text_old = e.currentTarget.previousElementSibling.innerText;
	
	if(e.currentTarget.parentNode.children[1].innerText == "修改"){
		e.currentTarget.parentNode.children[0].innerHTML = "<input type=\"text\" class=\"form-control input-xs\" value="+text_old+">";
        newbutton=document.createElement("button");
        newbutton.innerHTML = "取消";
        newbutton.setAttribute("onclick","editremarkcancel(this)");
        newbutton.setAttribute("class","btn btn-default btn-xs");
        e.currentTarget.parentNode.children[0].appendChild(newbutton);
		e.currentTarget.parentNode.children[1].innerText = "保存";
	}else{
		id = e.currentTarget.parentNode.parentNode.children[0].innerText;
		maintain_item = e.currentTarget.parentNode.parentNode.children[1].innerText;
		content = e.currentTarget.previousElementSibling.children[0].value;

		$.ajax({
			type: "POST",
			url: base_url+"index.php/ajax_setslist/saveMaintainRemark/",
			dataType    : 'json',
			data: {
				cv_id	: id,
				item	: maintain_item,
				remark	:content
			},
			success: function(msg){
				$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("备注信息修改成功！");
				$("#myModal").modal('show');
				
				e.currentTarget.parentNode.children[0].innerHTML = content;//"<button class=\"maintain-remark btn btn-default btn-xs pull-right\">修改</button>";
				e.currentTarget.parentNode.children[1].innerText = "修改";
			}
		})
	}
	
})
/*
function maintainremarksave(e){
	id = e.parentNode.parentNode.parentNode.parentNode.children[0].innerText;
	maintain_item = e.parentNode.parentNode.parentNode.parentNode.children[1].innerText;
	content = e.parentNode.previousSibling.value;
	
	$.ajax({
		type: "POST",
		url: base_url+"index.php/ajax_setslist/saveMaintainRemark/",
		dataType    : 'json',
		data: {
			cv_id	: id,
			item	: maintain_item,
			remark	:content
		},
		success: function(msg){
			$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
			$("#myModal_Label").html("成功");
			$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
			$("#myModal_content").html("备注信息修改成功！");
			$("#myModal").modal('show');
			
			e.parentNode.parentNode.parentNode.innerHTML = content+"<button class=\"maintain-remark btn btn-default btn-xs pull-right\">修改</button>";
			e.currentTarget.parentNode.children[1].innerText = "修改";
		}
	})
}*/

$(document).ready(function(){
	$('#dataTables-example').dataTable();
	$('#dataTables-alarm').dataTable();
	$('#dataTables-maintain').dataTable();
    
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
    //chart
    
    var d0 = [[1196463600000, 0], [1196550000000, 10], [1196636400000, 12], [1196722800000, 17], [1196809200000, 36], [1196895600000, 37], [1196982000000, 37], [1197068400000, 86], [1197154800000, 86], [1197241200000, 120], [1197327600000, 165], [1197414000000, 165], [1197500400000, 165], [1197586800000, 165], [1197673200000, 165], [1197759600000, 165], [1197846000000, 275], [1197932400000, 481], [1198018800000, 481], [1198105200000, 481], [1198191600000, 481], [1198278000000, 481], [1198364400000, 481], [1198450800000, 686], [1198537200000, 686], [1198623600000, 686], [1198710000000, 686], [1198796400000, 686], [1198882800000, 686], [1198969200000, 686]];
    var d1 = [[1196463600000, 0], [1196550000000, 7], [1196636400000, 10], [1196722800000, 17], [1196809200000, 36], [1196895600000, 35], [1196982000000, 27], [1197068400000, 85], [1197154800000, 86], [1197241200000, 120], [1197327600000, 159], [1197414000000, 147], [1197500400000, 147], [1197586800000, 165], [1197673200000, 164], [1197759600000, 153], [1197846000000, 275], [1197932400000, 480], [1198018800000, 410], [1198105200000, 466], [1198191600000, 465], [1198278000000, 334], [1198364400000, 352], [1198450800000, 520], [1198537200000, 590], [1198623600000, 649], [1198710000000, 681], [1198796400000, 592], [1198882800000, 682], [1198969200000, 608]];
    var d2 = [[1196463600000, 0], [1196550000000, 7], [1196636400000, 8], [1196722800000, 9], [1196809200000, 33], [1196895600000, 35], [1196982000000, 27], [1197068400000, 80], [1197154800000, 67], [1197241200000, 120], [1197327600000, 150], [1197414000000, 140], [1197500400000, 140], [1197586800000, 160], [1197673200000, 143], [1197759600000, 130], [1197846000000, 157], [1197932400000, 458], [1198018800000, 359], [1198105200000, 408], [1198191600000, 454], [1198278000000, 313], [1198364400000, 335], [1198450800000, 468], [1198537200000, 270], [1198623600000, 644], [1198710000000, 568], [1198796400000, 562], [1198882800000, 582], [1198969200000, 508]];
    
   /* 
    var d0 = [[1, 0], [2, 10], [3, 12], [4, 17], [5, 36], [6, 37], [7, 37], [8, 86], [9, 86], [10, 120], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 165], [17, 275], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 481], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686], [30, 686]];
    var d1 = [[1, 0], [2, 7], [3, 10], [4, 17], [5, 36], [6, 35], [7, 27], [8, 85], [9, 86], [10, 120], [11, 159], [12, 147], [13, 147], [14, 165], [15, 164], [16, 153], [17, 275], [18, 480], [19, 410], [20, 466], [21, 465], [22, 334], [23, 352], [24, 520], [25, 590], [26, 649], [27, 681], [28, 592], [29, 682], [30, 608]];
    var d2 = [[1, 0], [2, 7], [3, 8], [4, 9], [5, 33], [6, 35], [7, 27], [8, 80], [9, 67], [10, 120], [11, 150], [12, 140], [13, 140], [14, 160], [15, 143], [16, 130], [17, 157], [18, 458], [19, 359], [20, 408], [21, 454], [22, 313], [23, 335], [24, 468], [25, 270], [26, 644], [27, 568], [28, 562], [29, 582], [30, 508]];
   */
    var options = {
        xaxis: {
            mode: "time",
            timeformat:"2013/%m/%d",//"%Y/%m/%d",
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
            position: "nw",
            backgroundOpacity:0.25,
            backgroundColor:"#888"
        },
        selection: {
            mode: "x"
        }
    };
    
    var plot = $.plot("#effect-bar-chart", [
    {
        data:d0,
        label:"设备在线总时间= 0",
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
        label:"设备运行总时间= 0",
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
            show:true,
            backgroundOpacity:0.25,
            backgroundColor:"#888"
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
                },
				stroke:{
					width:0
				}
            }
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        legend: {
            show:false,
            backgroundOpacity:0.25,
            backgroundColor:"#888"
        }
    });
    var options_error = {
        series: {
            bars: {
                show:true,
                barWidth: 10800000,
                //barWidth: 0.1,
                order: 2,
                lineWidth: 1,
                fill:0.6
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
            position: "nw",
            backgroundOpacity:0.25,
            backgroundColor:"#888"
        }/*,
        selection: {
            mode: "x"
        }*/
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
    
    
    
    
    
    
    
    
    
    //error rate
    var er0 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 0], [1196809200000, 2], [1196895600000, 5], [1196982000000, 0], [1197068400000, 8], [1197154800000, 0], [1197241200000, 9], [1197327600000, 1], [1197414000000, 4]]; 
    var er1 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 1], [1196722800000, 0], [1196809200000, 0], [1196895600000, 1], [1196982000000, 3], [1197068400000, 2], [1197154800000, 5], [1197241200000, 12], [1197327600000, 13], [1197414000000, 1]];
    var er2 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 2], [1196722800000, 0], [1196809200000, 0], [1196895600000, 2], [1196982000000, 0], [1197068400000, 2], [1197154800000, 7], [1197241200000, 8], [1197327600000, 5], [1197414000000, 6]];
    var er3 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 1], [1196809200000, 1], [1196895600000, 0], [1196982000000, 0], [1197068400000, 1], [1197154800000, 1], [1197241200000, 1], [1197327600000, 8], [1197414000000, 9]];
    var er4 = [[1196463600000, 0], [1196550000000, 1], [1196636400000, 0], [1196722800000, 0], [1196809200000, 5], [1196895600000, 6], [1196982000000, 1], [1197068400000, 0], [1197154800000, 2], [1197241200000, 8], [1197327600000, 10], [1197414000000, 13]];
    var er5 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 0], [1196809200000, 0], [1196895600000, 9], [1196982000000, 6], [1197068400000, 2], [1197154800000, 1], [1197241200000, 0], [1197327600000, 2], [1197414000000, 3]];   

    var er = [[10,4],[9,3],[6,2],[3,1],[1,0]];
    
    $.plot("#rate-pie-chart", [er], 
    {
        series: {
            bars: { 
                show: true,
                align:"left",
                barWidth:0.4,
                horizontal:true,
                width:1,
                label: {
                    show: false
                }
            }
        },
        grid: {
            show: true
        },
        xaxis: {
            tickFormatter: function suffixFormatter(val, axis) {return val+"%";},
            tickLength:2,
            position: "top"
        },
        yaxis: {
            show:true,
            tickLength:2,
            ticks:[[0,"故障4发生概率"],[1,"故障3发生概率"],[2,"故障2发生概率"],[3,"故障1发生概率"],[4,"故障0发生概率"]]
        },
        legend: {
            show:false,
            sorted:"ascending",
            backgroundOpacity:0.25,
            backgroundColor:"#888"
        }
    });
    var error_rate = $.plot("#rate-line-chart",[
    {
        data:er0,
        label:"故障0概率",
    },
    {
        data:er1,
        label:"故障1概率",
    },
    {
        data:er2,
        label:"故障2概率",
    },
    {
        data:er3,
        label:"故障3概率",
    },
    {
        data:er4,
        label:"故障4概率",
    }
    ],{
        series: {
            lines: {
                show: true,
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
            tickFormatter: function suffixFormatter(val, axis) {return val+"%";}
        },
        grid: {
            hoverable: true,
            autoHighlight: false,
            margin:0,
            clickable:true
        },
        legend: {
            position: "nw",
            backgroundOpacity:0.25,
            backgroundColor:"#888"
        }
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //set error
    var eqpr0 = [[1196463600000, 0], [1196550000000, 10], [1196636400000, 12], [1196722800000, 17], [1196809200000, 36], [1196895600000, 37], [1196982000000, 37], [1197068400000, 86], [1197154800000, 86], [1197241200000, 120], [1197327600000, 165], [1197414000000, 165], [1197500400000, 165], [1197586800000, 165], [1197673200000, 165], [1197759600000, 165], [1197846000000, 275], [1197932400000, 481], [1198018800000, 481], [1198105200000, 481], [1198191600000, 481], [1198278000000, 481], [1198364400000, 481], [1198450800000, 686], [1198537200000, 686], [1198623600000, 686], [1198710000000, 686], [1198796400000, 686], [1198882800000, 686], [1198969200000, 686]];
    var eqpr1 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 1], [1196722800000, 0], [1196809200000, 0], [1196895600000, 1], [1196982000000, 3], [1197068400000, 2], [1197154800000, 5], [1197241200000, 12], [1197327600000, 13], [1197414000000, 1], [1197500400000, 6], [1197586800000, 12], [1197673200000, 5], [1197759600000, 4], [1197846000000, 5], [1197932400000, 12], [1198018800000, 21], [1198105200000, 18], [1198191600000, 15], [1198278000000, 11], [1198364400000, 15], [1198450800000, 12], [1198537200000, 11], [1198623600000, 19], [1198710000000, 21], [1198796400000, 23], [1198882800000, 25], [1198969200000, 18]];
    var eqpr2 = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 2], [1196722800000, 0], [1196809200000, 0], [1196895600000, 2], [1196982000000, 0], [1197068400000, 2], [1197154800000, 7], [1197241200000, 8], [1197327600000, 5], [1197414000000, 6], [1197500400000, 165], [1197586800000, 165], [1197673200000, 165], [1197759600000, 165], [1197846000000, 275], [1197932400000, 481], [1198018800000, 481], [1198105200000, 481], [1198191600000, 481], [1198278000000, 481], [1198364400000, 481], [1198450800000, 686], [1198537200000, 686], [1198623600000, 686], [1198710000000, 686], [1198796400000, 686], [1198882800000, 686], [1198969200000, 686]];

    for (i = 0; i < eqpr0.length; i++){
        eqpr2[i][0] = eqpr0[i][0];
        eqpr2[i][1] = eqpr1[i][1]/eqpr0[i][1];
        eqpr2[i][1] = eqpr2[i][1]*100;
        eqpr2[i][1] = eqpr2[i][1].toFixed(2);
    }
    
    var options_eqperror = {
        xaxis: {
            mode: "time",
            timeformat:"2013/%m/%d",//"%Y/%m/%d",
            tickLength: 5
        },
        yaxes: [ { 
                    min: 0 ,
                    tickFormatter: function suffixFormatter(val, axis) {return val+"台";}
                }, {
                    // align if we are to the right
                    position: "right",
                    tickFormatter: function suffixFormatter(val, axis) {return val+"%";}
				} ],
        grid: {
            hoverable: true,
            autoHighlight: false,
            margin:0,
            clickable:true
        },
        legend: {
            position: "nw",
            backgroundOpacity:0.25,
            backgroundColor:"#888"
        }
    };
    
    $.plot("#eqp-bar-chart", [
    {
        data:eqpr0,
        label:"设备总数",
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
        data:eqpr1,
        label:"发射故障设备数",
        bars: {
            show:true,
            barWidth: 21600000,
            //barWidth: 0.1,
            order: 2,
            lineWidth: 1,
            fill:0.6
        }
    },
    {
        data:eqpr2,
        label:"设备发生故障概率",
        lines: {
            show:true,
            order: 2,
            lineWidth: 1
        },
        points: {
            show: true
        },
        yaxis: 2
    }
    ], options_eqperror);
    

    
    
    
    
    
    
    
    
    //set error
    var m0 = [];//[0, 0], [1, 10], [2, 12], [3, 17], [4, 36], [5, 37], [6, 37], [7, 86], [8, 86], [9, 120], [10, 165], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 275], [17, 481], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 686], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686]];
    var m1 = [];//[0, 0], [1, 10], [2, 12], [3, 17], [4, 36], [5, 37], [6, 37], [7, 86], [8, 86], [9, 120], [10, 165], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 275], [17, 481], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 686], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686]];
    var m2 = [];//[0, 0], [1, 10], [2, 12], [3, 17], [4, 36], [5, 37], [6, 37], [7, 86], [8, 86], [9, 120], [10, 165], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 275], [17, 481], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 686], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686]];
    var m3 = [];//[0, 0], [1, 10], [2, 12], [3, 17], [4, 36], [5, 37], [6, 37], [7, 86], [8, 86], [9, 120], [10, 165], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 275], [17, 481], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 686], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686]];
    var m4 = [];//[0, 0], [1, 10], [2, 12], [3, 17], [4, 36], [5, 37], [6, 37], [7, 86], [8, 86], [9, 120], [10, 165], [11, 165], [12, 165], [13, 165], [14, 165], [15, 165], [16, 275], [17, 481], [18, 481], [19, 481], [20, 481], [21, 481], [22, 481], [23, 686], [24, 686], [25, 686], [26, 686], [27, 686], [28, 686], [29, 686]];

    for (var i = 0; i <= 200; i += 1) {
        m0.push([i, parseInt(Math.random() * 30)]);
        m1.push([i, parseInt(Math.random() * 30)]);
        m2.push([i, parseInt(Math.random() * 30)]);
        m3.push([i, parseInt(Math.random() * 30)]);
        m4.push([i, parseInt(Math.random() * 30)]);
    }
        
    var maintain_plot = $.plot("#maintain-stack-chart", [ 
    {
        data:m0,
        label:"空滤器保养"
    },
    {
        data:m1,
        label:"油滤器保养"
    },
    {
        data:m2,
        label:"油分器保养"
    },
    {
        data:m3,
        label:"润滑油保养"
    },
    {
        data:m4,
        label:"润滑脂保养"
    }
    ], {
        series: {
            stack: true,
            bars: {
                show:true,
                barWidth: 0.3,
                lineWidth: 1,
                fill:0.6
            }
        },
        xaxis: {
            //mode: "time",
            //timeformat:"%Y/%m/%d",
            tickFormatter: function suffixFormatter(val, axis) {return val+"小时";},
            tickLength: 5
        },
        yaxis: {
            tickFormatter: function suffixFormatter(val, axis) {return val+"台";}
        },
        legend: {
            position: "nw",
            backgroundOpacity:0.9,
            backgroundColor:"#eee"

        },
        selection: {
            mode: "x"
        }
    });
    
    var overview_maintain = $.plot("#overview-maintain", [m0,m1,m2,m3,m4], {
        series: {
            stack: true,
            bars: {
                show:true,
                barWidth: 0.3,
                lineWidth: 1,
                fill:0.6
            }
        },
        grid:{
            margin:0
            //backgroundColor: { colors: ["#fff", "#999"] }
        },
        legend:{
            show:true,
            backgroundOpacity:0.25,
            backgroundColor:"#888"
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

    $("#maintain-stack-chart").bind("plotselected", function (event, ranges) {

        if (ranges.xaxis.to < ranges.xaxis.from + 10){
            ranges.xaxis.to = ranges.xaxis.from + 10;
        }
        if (ranges.xaxis.to > m0[m0.length-1][0]){
            ranges.xaxis.to = m0[m0.length-1][0] + 1;
            if (ranges.xaxis.to < ranges.xaxis.from + 10){
                ranges.xaxis.from = ranges.xaxis.to - 10;
            }
        }
        // do the zooming
        $.each(maintain_plot.getXAxes(), function(_, axis) {
            var opts = axis.options;
            opts.min = ranges.xaxis.from;
            opts.max = ranges.xaxis.to;
        });
        maintain_plot.setupGrid();
        maintain_plot.draw();
        maintain_plot.clearSelection();

        // don't fire event on the overview to prevent eternal loop

        $("#maintain-fullrange").attr("disabled",false);
        overview_maintain.setSelection(ranges, true);
    });

    $("#overview-maintain").bind("plotselected", function (event, ranges) {
        maintain_plot.setSelection(ranges);
    });
    
    $("#maintain-fullrange").on("click",function(){
        $("#maintain-fullrange").attr("disabled",true);
        $.each(maintain_plot.getXAxes(), function(_, axis) {
            var opts = axis.options;
            opts.min = m0[0][0];
            opts.max = m0[m0.length-1][0]+1;
        });
        
        overview_maintain.setSelection(false,false);
        maintain_plot.setupGrid();
        maintain_plot.draw();
        maintain_plot.clearSelection();
    });
   
    
    
    
    
    
    
    
    
    
    
    
    loadJScript();
    // Add the Flot version string to the footer

    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
})


