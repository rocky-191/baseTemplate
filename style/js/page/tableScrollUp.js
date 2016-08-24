window.onload=function(){
	marque1("chart1Div");
}

var scrollElem1;
var stopscroll1;
var stoptime1;
var preTop1;
var leftElem1;
var currentTop1;
var marqueesHeight1;
//为表格添加事件
function marque1(idname)
{
	scrollElem1 = document.getElementById(idname);
	if(scrollElem1){
		try{
		  marqueesHeight1 = "200px";
		  stopscroll1     = false;
		  
		  with(scrollElem1){
			style.width     = "100%";
			style.height    = marqueesHeight1;
			style.overflow  = 'hidden';
			noWrap          = true;
		  }
		  scrollElem1.onmouseover = new Function('stopscroll1 = true');
		  scrollElem1.onmouseout  = new Function('stopscroll1 = false');
		  preTop1     = 0; 
		  currentTop1 = 0; 
		  stoptime1   = 0;
		  leftElem1 = document.getElementById(idname);
		  scrollElem1.appendChild(leftElem1.cloneNode(true));
		  init_srolltext1();
		}catch(e) {}
	}
}
//表格滚动的初始化
function init_srolltext1()
{
	scrollElem1.scrollTop = 0;
	setInterval('scrollUp1()', 100);
}
//向上滚动的方法
function scrollUp1()
{
	if(stopscroll1) return;
	currentTop1 += 1;
	if(currentTop1 == marqueesHeight1+1) {
		stoptime1 += 1;
		currentTop1 -= 1;
		if(stoptime1 == (marqueesHeight1)*1) {   //停顿时间
		  currentTop1 = 0;
		  stoptime1 = 0;
		}
	}else{
		preTop1 = scrollElem1.scrollTop;
		scrollElem1.scrollTop += 1;
		if(preTop1 == scrollElem1.scrollTop){
		  scrollElem1.scrollTop = marqueesHeight1;
		  scrollElem1.scrollTop += 1;
		}
	}
}