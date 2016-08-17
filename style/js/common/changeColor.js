//变换行背景色
function changeTrColor(className1){
	$("."+className1+" tbody").find("tr").mouseover(function(){
		$(this).css("cursor","pointer");
		$(this).addClass("bk2");
	});
}

//恢复行背景色
function returnTrColor(className1){
	$("."+className1+" tbody").find("tr").mouseout(function(){
		$(this).css("cursor","");
		$(this).removeClass("bk2");
	});
}