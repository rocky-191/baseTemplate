$(document).ready(function(){	
	/**下拉选择***/
	$(".js-example-basic-hide-search").select2({
	  minimumResultsForSearch: Infinity
  	});
	//新增故事
  	$('.ui-select').ui_select();
	
//	var v='1,2,3'//这个为保存的值，自己从数据库读取来赋值给v变量
//	v=','+v+',';//添加分隔符号，好indexOf进行比较
//	var arr=v.split(',');
//	$('#ddlConditions option').each(function(){
//	  if(v.indexOf(','+this.value+',')!=-1)
//	  	this.selected=true;
//	});
	$("#ddlConditions").multiselect({
		noneSelectedText: "==请选择==",
		checkAllText: "全选", 
		uncheckAllText: '全不选',
		WinClose : function (val) { 
            //alert("Values:" + val.MyValues() + " Texts:" + val.MyTexts()); 
        } 
	});
	
});