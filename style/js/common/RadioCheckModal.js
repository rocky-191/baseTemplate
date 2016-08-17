
function Radio_check(event,RadioBoxName){
	if(event.target){		
		if($(event.target).prop("checked")){
			$(event.target).attr("checked","checked");
			
			var chk =window.document.getElementsByName(RadioBoxName);
			for (var i = 0; i < chk.length; i++) {
		  		$(chk[i].parentElement).removeClass("on_check");
		  		$(chk[i])[0].removeAttribute("checked");
		 		}			
			$(event.target).parent().addClass("on_check");
							
		}
	}else if(event.srcElement){
		if($(event.srcElement).prop("checked")){
			$(event.srcElement).attr("checked","checked");
			
			var chk =window.document.getElementsByName(RadioBoxName);
			for (var i = 0; i < chk.length; i++) {
		  		$(chk[i].parentElement).removeClass("on_check");
		  		$(chk[i])[0].removeAttribute("checked");
		 		}
			
			$(event.srcElement).parent().addClass("on_check");
		}
	}
	
}