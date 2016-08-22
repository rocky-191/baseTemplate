$(function(){
	//toolTip类型一
	$('#testJBox').jBox('Tooltip', {
		position: {
			x: 'right',
			y: 'center'
		},
		width:"180px",
		height:"60px",
		outside: 'x',
	    content:"hello world"
	});
	//类型二
	$('#testPoshytip').poshytip({
		className: 'tip-violet',
		bgImageFrameSize: 9,
		alignX: 'right',
		alignY: 'center',
		offsetX: 45,
		content: function(){
			return $(this).text();
		}
	});
	//类型三
	$("#testMyTip").mouseover(function(){
		var targetTop = $(this).offset().top;
		var targetLeft = $(this).offset().left;
		targetLeft = Number(targetLeft)-Number(70);
		targetTop = Number(targetTop)+Number(25);
		$(".myTipContent").css("display","");
		$(".myTipContent").offset({top:targetTop,left:targetLeft});
	});
	$("#testMyTip").mouseout(function(){
		$(".myTipContent").css("display","none");
		$(".myTipContent").mouseover(function(){
			$(this).css("display","");
		});
		$(".myTipContent").mouseout(function(){
			$(this).css("display","none");
		});
	});
});
