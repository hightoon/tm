var base_url="http://10.13.71.176/civ/";
//var base_url="http://10.13.71.176/cim/";
$(function(){
	$("#passwd_new0,#passwd_new1").focus(function(){
		var name=$("#username").html();
		var passwd=$("#passwd_old").val();
		if(passwd == ""){
			$("#passwd_old").prev().html("请输入当前密码<span style=\"color:#800\">（请输入当前密码！）</span>");
			return;
		}
		$.ajax({
			type:"POST",
			url:base_url+"index.php/ajax_userset/passwdcheck/",
			data:"name="+name+"&passwd="+passwd,
			success:function(msg){
				if(msg == 0){
					$("#passwd_old").prev().html("请输入当前密码<span style=\"color:#080\">（√）</span>");
				}else{
					$("#passwd_old").prev().html("请输入当前密码<span style=\"color:#800\">（×）</span>");
				}
			}
		})
	});
	
	$("#passwd_new1").keyup(function(){
		var passwd_new0=$("#passwd_new0").val();
		var passwd_new1=$("#passwd_new1").val();
		
		if(passwd_new0.length<6){
			$("#passwd_new0").prev().html("请输入新密码<span style=\"color:#800\">（密码长度必须大于6位!）</span>");
			return;	
		}else{
			$("#passwd_new0").prev().html("请输入新密码");
		}
		
		if(passwd_new1 != passwd_new0){
			$("#passwd_new1").prev().html("请再输入一遍新密码<span style=\"color:#800\">（两次输入密码不一致!）</span>");
		}else{
			$("#passwd_new1").prev().html("请再输入一遍新密码<span style=\"color:#080\">（√）</span>");
		}
	})
})

function  userset0_submit(){

	var passwd_old=$("#passwd_old").val();
	if(passwd_old == ""){
		$("#passwd_old").prev().html("请输入当前密码<span style=\"color:#800\">（请输入当前密码！）</span>");
		return;
	}
	
	var passwd_new0=$("#passwd_new0").val();
	var passwd_new1=$("#passwd_new1").val();
	
	if(passwd_new1 != passwd_new0){
		$("#passwd_new1").prev().html("请再输入一遍新密码<span style=\"color:#800\">（两次输入密码不一致!）</span>");
		return;
	}else if(passwd_new0 == ""){
		$("#passwd_new0").prev().html("请输入新密码<span style=\"color:#800\">（密码不能为空!）</span>");
		$("#passwd_new1").prev().html("请再输入一遍新密码<span style=\"color:#800\">（密码不能为空!）</span>");
		return;
	}else if(passwd_new0.length<6){
		$("#passwd_new0").prev().html("请输入新密码<span style=\"color:#800\">（密码长度必须大于6位!）</span>");
		$("#passwd_new1").prev().html("请再输入一遍新密码<span style=\"color:#800\">（密码长度必须大于6位!）</span>");
		return;	
	}
	
	$.ajax({
		type:"POST",
		url:base_url+'index.php/admin/'+$("#passwd_ch_button").val(),
		data:"passwd_old="+passwd_old+"&passwd_new0="+passwd_new0+"&passwd_new1="+passwd_new1,
		success:function(msg){
			if(msg==0){
				$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("密码修改成功！");
				$('#myModal').modal();
			}else{
				$("#myModal_type").attr({style:"color:#fff;background:#c32"});
				$("#myModal_Label").html("失败");
				$("#myModal_content").attr({style:"color:#c32;text-align:center"});
				$("#myModal_content").html("密码修改失败！");
				$('#myModal').modal();
			}
		}
	})
}