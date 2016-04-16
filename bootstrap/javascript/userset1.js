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

//$('#upload_file').submit(function(e) {
$('#logo_update').click(function(e) {

	if($("#userfile").val()==""){
		$("#userfile").prev().html("修改logo图标：<span style=\"color:#800\">（请选择文件！）</span>");
		return;
	}else{
		$("#userfile").prev().html("修改logo图标：");
	}
	
	e.preventDefault();
	$.ajaxFileUpload({
		url         :base_url+'index.php/admin/'+$("#logo_update").val(),
		secureuri      :false,
		fileElementId  :'userfile',
		dataType    : 'json',
		/*data        : {
			'title'           : $('#title').val()
		},*/
		success  : function (data, status)
		{
			if(data.status != 'error')
			{
				$("#logo_preview").attr("src",base_url+'uploads/'+$("#username").html()+'/logo.png');
				$("#userfile").prev().html("修改logo图标：<span style=\"color:#080\">（上传成功！）</span>");
				$("#logo_change").removeAttr("disabled");
				$("#logo_cancel").removeAttr("disabled");
			}else{
				$("#logo_preview").attr("src",base_url+'uploads/'+$("#username").html()+'/logo.png');
				$("#userfile").prev().html("修改logo图标：<span style=\"color:#800\">（失败："+data.msg+"！）</span>");
				$("#logo_change").removeAttr("disabled");
				$("#logo_cancel").removeAttr("disabled");
			}
		}
	});
	return false;
});

$("#logo_change").click(function(e){
	$.ajax({
		type:"POST",
		url:base_url+'index.php/admin/'+$("#logo_change").val(),
		success:function(msg){
			if(msg==0){
				/*$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("修改成功！");
				$('#myModal').modal();*/
				
				$("#logo_change").attr("disabled","true");
				$("#logo_cancel").attr("disabled","true");
				location.reload();
			}else{
				$("#myModal_type").attr({style:"color:#fff;background:#c32"});
				$("#myModal_Label").html("失败");
				$("#myModal_content").attr({style:"color:#c32;text-align:center"});
				$("#myModal_content").html("修改失败！");
				$('#myModal').modal();
			}
		}
	})
})

$('#newuser_passwd0,#newuser_passwd1').focus(function(e){
	
	if($('#newuser_name').val() == ""){
		$('#newuser_name').prev().html("用户名（<span style=\"color:#800\">*请输入用户名</span>）");
	}else{
		$('#newuser_name').prev().html("用户名（<span style=\"color:#080\">√</span>）");
	}
})

$("#newuser_add").click(function(e){

	if($('#newuser_name').val() == ""){
		$('#newuser_name').prev().html("用户名（<span style=\"color:#800\">*请输入用户名</span>）");
		return;
	}else if($('#newuser_passwd0').val() != $('#newuser_passwd1').val()){
		$('#newuser_passwd0').prev().html("密码（<span style=\"color:#800\">*</span>）");
		$('#newuser_passwd1').prev().html("请再输入一遍密码（<span style=\"color:#800\">*两次输入密码不一致</span>）");
		return;
	}else if($('#newuser_passwd0').val() == ""){
		$('#newuser_passwd0').prev().html("密码（<span style=\"color:#800\">*密码不能为空</span>）");
		$('#newuser_passwd1').prev().html("请再输入一遍密码（<span style=\"color:#800\">*密码不能为空</span>）");
		return;
	}
	$.ajax({
		type:"POST",
		url:base_url+'index.php/admin/'+$("#newuser_add").val(),
		dataType    : 'json',
		data        : {
			'newuser_name'		: $('#newuser_name').val(),
			'newuser_passwd'	: $('#newuser_passwd0').val(),
			'newuser_level'		: $("input[name='leveloption']:checked").val(),
			'newuser_factory'	: $('#newuser_factory').val(),
			'newuser_phone'		: $('#newuser_phone').val(),
			'newuser_addr'		: $('#newuser_addr').val(),
			'newuser_remarks'	: $('#newuser_remarks').val()
		},
		success:function(msg){
			if(msg==0){
				$('#adduser').modal('hide');
				
				$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("添加成功！");
				$('#myModal').modal();
			}else{
				$("#myModal_type").attr({style:"color:#fff;background:#c32"});
				$("#myModal_Label").html("失败");
				$("#myModal_content").attr({style:"color:#c32;text-align:center"});
				$("#myModal_content").html("添加失败！");
				$('#myModal').modal();
			}
		}
	})
})

//$("#edit_user").click(function(){
function edit_user(e){

	var name 	= e.parentNode.parentNode.children[0].innerHTML;
	var level 	= e.parentNode.parentNode.children[2].innerHTML;
	var factory	= e.parentNode.parentNode.children[1].innerHTML;
	var phone 	= e.parentNode.parentNode.children[3].innerHTML;
	var addr 	= e.parentNode.parentNode.children[4].innerHTML;
	var remarks = e.parentNode.parentNode.children[5].innerHTML;
	
	$("#edituser_name").val(name);
	if(2 == level){
		//$("input[name='editleveloption'][value='admin']").removeAttr("checked");
		//$("input[name='editleveloption'][value='admin']").attr({checked:"false"});
		//$("input[name='editleveloption'][value='user']").attr({checked:"true"});
		document.getElementById("edituser_level0").setAttribute("checked","true");
		document.getElementById("edituser_level1").setAttribute("checked","false");
	}else if(1 == level){
		//$("input[name='editleveloption'][value='user']").removeAttr("checked");
		//$("input[name='editleveloption'][value='user']").attr({checked:"false"});
		//$("input[name='editleveloption'][value='admin']").attr({checked:"true"});
		document.getElementById("edituser_level0").checked="true";
		document.getElementById("edituser_level1").checked="false";
	}
	//$("#eidtuser_name").val(level);
	$("#edituser_factory").val(factory);
	$("#edituser_phone").val(phone);
	$("#edituser_addr").val(addr);
	$("#edituser_remarks").val(remarks);
	
	$("#edituser").modal('show');
}

$("#edituser_confirm").click(function(e){

	$.ajax({
		type:"POST",
		url:base_url+'index.php/admin/'+$("#edituser_confirm").val(),
		dataType    : 'json',
		data        : {
			'edituser_name'		: $('#edituser_name').val(),
			'editser_passwd'	: $("input[name='editpasswdoption']:checked").val(),
			'edituser_level'	: $("input[name='editleveloption']:checked").val(),
			'edituser_factory'	: $('#edituser_factory').val(),
			'edituser_phone'	: $('#edituser_phone').val(),
			'edituser_addr'		: $('#edituser_addr').val(),
			'edituser_remarks'	: $('#edituser_remarks').val()
		},
		success:function(msg){
			if(msg==0){
				$('#edituser').modal('hide');
				
				$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("修改成功！");
				$('#myModal').modal();
			}else{
				$("#myModal_type").attr({style:"color:#fff;background:#c32"});
				$("#myModal_Label").html("失败");
				$("#myModal_content").attr({style:"color:#c32;text-align:center"});
				$("#myModal_content").html("修改失败！");
				$('#myModal').modal();
			}
		}
	})
})

function del_modal(e){

	var name = e.parentNode.parentNode.children[0].innerHTML;
	$("#myModal_type").attr({style:"color:#fff;background:#c32"});
	$("#myModal_Label").html("警告");
	$("#myModal_content").attr({style:"color:#c32;"});
	$("#myModal_content").html(
	"你确定要删除用户 <span style='font-weight:bold' id='del_selectname'>"+name+"</span> 吗？<br><br><br>"+
	"<button type='submit' class='btn btn-primary' onclick='del_user()'>确定删除</button> "+
	"<button type='submit' class='btn btn-primary' data-dismiss='modal'>取消</button>"
	);
	$("#myModal").modal('show');
}

function del_user(){

	
	$.ajax({
		type:"POST",
		url:base_url+'index.php/admin/'+$("#del_option").attr("value"),
		dataType    : 'json',
		data        : {
			'user_name'		: $('#del_selectname').html(),
		},
		success:function(msg){
			if(msg==0){
				$('#adduser').modal('hide');
				
				$("#myModal_type").attr({style:"color:#fff;background:#3c2"});
				$("#myModal_Label").html("成功");
				$("#myModal_content").attr({style:"color:#3c2;text-align:center"});
				$("#myModal_content").html("删除成功！");
				$('#myModal').modal();
			}else{
				$("#myModal_type").attr({style:"color:#fff;background:#c32"});
				$("#myModal_Label").html("失败");
				$("#myModal_content").attr({style:"color:#c32;text-align:center"});
				$("#myModal_content").html("删除失败！");
				$('#myModal').modal();
			}
		}
	})
}