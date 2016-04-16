var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";
$(document).ready(function(){
	$("#cv_id_select").select2();
	$("#cv_id_select").select2_set_alertstr("设备不存在或当前不在线！");
	
    $("#cv_id_select").on("select2-selecting",function(e){
		var num = e.choice.text;//document.getElementById('cv_id_select').value;
		if(num == document.getElementById('SetId').innerHTML){
			return;
		}
		if(num!=''){
			window.location.href=base_url+"index.php/admin/"+e.val;
		}
	})
})
