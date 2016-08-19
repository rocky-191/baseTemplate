window.onload=function(){
	var iNow = 0;
	var tiemr = setInterval(function(){
		if(iNow  == 100)
		{
			clearInterval(tiemr)
		}
		else{
			iNow += 2;
			progressFn(iNow) 
		}
	},30);
	function progressFn (cent){
		var oDiv1=document.getElementById('progressBox');
		var oDiv2=document.getElementById('progressBar');
		var oDiv3=document.getElementById('progressText');
		var allWidth=parseInt(getStyle(oDiv1,'width'));
		oDiv2.innerHTML = cent + '%';
		oDiv3.innerHTML = cent + '%';
		oDiv2.style.clip = "rect(0px,"+ cent/100*allWidth +"px,30px,0)";		
	}
	//类型二进度条
	var proObj1=document.getElementById("krProgressBarBg");
	var proObj2=document.getElementById("krProgressBar");
	var proObj3=document.getElementById("krProgressNum");
	var bgWidth=parseInt(getStyle(proObj1,'width'));
	//假设宽度是120px
	var num1=120;
	var totalNum=260;
	var proObj4=document.getElementById("progressRestNum");
	proObj4.innerHTML='剩余：'+(totalNum-num1)+'GHZ';
	var per1=(num1/260)*100;
	per1=per1.toFixed(2);//保留两位小数
	proObj3.innerHTML=per1+'%';
	proObj2.style.width=num1+'px';
	proObj3.style.left=(num1-25)+'px';
}

function getStyle(obj,attr){
	if( obj.currentStyle )
	{
		return obj.currentStyle[attr]
	}else
	{
		return getComputedStyle(obj,false)[attr]
	}
}