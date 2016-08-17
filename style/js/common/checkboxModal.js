function checkbox_check(event){
	var ev = event || window.event;
    var target = ev.target || ev.srcElement;
		if(!$(target).parent().hasClass("on_check")){
			$(target).attr("checked","checked");
			$(target).parent().addClass("on_check");
			$(target).parent().parent().parent().addClass("trCheck");
		}else{
			$(target)[0].removeAttribute("checked");
			$(target).parent().removeClass("on_check");
			$(target).parent().parent().parent().removeClass("trCheck");
		}	
}

function formwork_checkbox_checkAll(event,checkBoxName){
	var ev = event || window.event;
    var target = ev.target || ev.srcElement;
	var chk =window.document.getElementsByName(checkBoxName);
	var l=chk.length;
	if($(target).prop("checked")){
			$(target).parent().addClass("on_check");
			for (var i = 0; i <l ; i++) {
		  		$(chk[i].parentElement).addClass("on_check");
		  		$(chk[i]).attr("checked","checked");
		 	}		
	}else{
			$(target).parent().removeClass("on_check");
			//var chk =window.document.getElementsByName(checkBoxName);
			for (var i = 0; i <l; i++) {
		  		$(chk[i].parentElement).removeClass("on_check");
		  		$(chk[i])[0].removeAttribute("checked");
		 	}
	}	
}

function btn_delete(id,checkboxName){
	if($("#"+id+" tr td").find("div").hasClass("on_check")){		 		
		 	$("input[type='checkbox'][name='"+checkboxName+"']").each(function(){
		 		if($(this).parent().hasClass("on_check")){
		 			$(this).parent().parent().parent().remove();
		 		}
		 	});			
	}else{
		alert("请选择一条数据！");
	}	
}