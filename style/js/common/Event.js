//设置iframe高度
/*function reinitIframe(id1){
	var iframe = document.getElementById(id1);
	try{
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		console.log(id1);
		iframe.height =  height;
	}catch (ex){}
}*/

/**左侧菜单树***/
function showList(obj,className){
	if($(obj).next().length!=0){
		$(obj).next().toggle();
		var state=$(obj).next().css("display");
		if(state=="none"){
			$(obj).find("div[name='mark']").removeClass("showicon").addClass("showiconClick");
			$(obj).removeClass(className);
		}else{
			$(obj).addClass(className);
			$(obj).find("div[name='mark']").removeClass("showiconClick").addClass("showicon");
		}		
	}
}

function changeMenu(event,className1,id1){
	var ev = event || window.event;
    var target = ev.target || ev.srcElement;
	if(target){
		$(target).addClass(className1);
		$(target).siblings().removeClass(className1);
		var p1=$(target).parent().parent().parent().siblings();
		p1.find("div[name='mark1'] ul li").removeClass("liClick");
		$("#"+id1).show();
		$("#"+id1).siblings("iframe").hide();
	}
}

//三级导航
function changeMenu1(obj,className1,id1,sfqFlag){
	$(obj).addClass(className1);
	//sqfFlag1一级导航标记，sqfFlag2二级导航标记，sqfFlag3三级导航标记
	if(sfqFlag=="sqfFlag1"){
		var sfq_p1=$(obj).parent();
		var mySiblings=sfq_p1.siblings();
		mySiblings.find("div.sfq_first").removeClass(className1);
		mySiblings.find("div.sfq_second").removeClass(className1);
		mySiblings.find("ul.sfq_second_ul li").removeClass(className1);
		if($(obj).next().length!=0){
			$(obj).next().toggle();
			$(obj).next().find("div.sfq_second").removeClass(className1);		
			var state=$(obj).next().css("display");
			if(state=="none"){
				$(obj).find("div[name='mark']").removeClass("sfq_icon").addClass("sfq_icon1");
			}else{
				$(obj).find("div[name='mark']").removeClass("sfq_icon1").addClass("sfq_icon");
			}
		}
	}else if(sfqFlag=="sqfFlag2"){
		var p=$(obj).parent();
		var p0=p.parent().parent();
		$(obj).next().find("li").removeClass(className1);
		p0.prev().removeClass(className1);
		p.siblings().find("div.sfq_second").removeClass(className1);
		p.siblings().find("ul.sfq_second_ul li").removeClass(className1);
		p0.parent().parent().find("div.sfq_first").removeClass(className1);
		if($(obj).next().length!=0){
			$(obj).next().toggle();
			var state2=$(obj).next().css("display");
			if(state2=="none"){
				$(obj).find("div[name='mark']").removeClass("sfq_icon").addClass("sfq_icon1");
			}else{
				$(obj).find("div[name='mark']").removeClass("sfq_icon1").addClass("sfq_icon");
			}
		}
	}else{
		$(obj).siblings().removeClass(className1);
		var p1=$(obj).parent();
		var p3=p1.parent();
		var p2=p3.parent().parent();
		p1.prev().removeClass(className1);
		p2.prev().removeClass(className1);
		p3.siblings().find("div.sfq_second").removeClass(className1);
		p3.siblings().find("ul.sfq_second_ul li").removeClass(className1);
		p2.parent().siblings().find("div.sfq_first").removeClass(className1);
	}
	if(id1 && id1!=""){
		$("#"+id1).show();
		$("#"+id1).siblings().hide();
	}
}

function changeMenuTab(obj,className1,name,id1){
	if($(obj).next().length!=0){
		$(obj).next().toggle();
		$(obj).parent().siblings().find("div.leftMenuTree_partDiv").removeClass(className1);
		var state=$(obj).next().css("display");
		if(state=="none"){
			$(obj).find("div[name='mark']").removeClass("showicon").addClass("showiconClick");
		}else{
			$(obj).find("div[name='mark']").removeClass("showiconClick").addClass("showicon");
		}		
	}else{
		$(obj).addClass(className1);
		$(obj).parent().siblings().find("div.leftMenuTree_partDiv").removeClass(className1);
	}
	if(id1!="" && id1!=undefined){
		$("#"+id1).show();
		$("#"+id1).siblings("iframe").hide();
	}
}

/***iframe高度自适应***/
var browserVersion = window.navigator.userAgent.toUpperCase();
var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
var isIE9More = (! -[1, ] == false);

function reinitIframe(iframeId, minHeight) {
    try {
        var iframe = document.getElementById(iframeId);
        var bHeight = 0;
        if (isChrome == false && isSafari == false)
            bHeight = iframe.contentWindow.document.body.scrollHeight;

        var dHeight = 0;
        if (isFireFox == true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        else if (isIE == false && isOpera == false)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        else if (isIE == true && isIE9More) {//ie9+
            var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
            if (heightDeviation == 0) {
                bHeight += 3;
            } else if (heightDeviation != 3) {
                eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                bHeight += 3;
            }
        }
        else//ie[6-8]、OPERA
            bHeight += 3;

        var height = Math.max(bHeight, dHeight);
        if (height < minHeight) height = minHeight;
        iframe.style.height = height + "px";
    } catch (ex) { }
}
function startInit(iframeId, minHeight) {
    eval("window.IE9MoreRealHeight" + iframeId + "=0");
    window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")", 200);
}

//随机数
function Random(start,end){    
    return Math.random()*(end-start)+start;    
}

//随机整数
function randNum(minnum , maxnum){
    return Math.floor(minnum + Math.random() * (maxnum - minnum));
}

//randNum(0,10),生成0到9的随机整数

//获取元素样式
function GetCurrentStyle (obj, prop) {
	//obj为目标对象
    if (obj.currentStyle) {        
        return obj.currentStyle[prop];     
    }      
    else if (window.getComputedStyle) {        
        propprop = prop.replace (/([A-Z])/g, "-$1");           
        propprop = prop.toLowerCase ();        
        return document.defaultView.getComputedStyle (obj,null)[prop];     
    }      
    return null;   
}

//检测IE
var isIE = function(ver){
	var b = document.createElement('b')
	b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
	return b.getElementsByTagName('i').length === 1
}

//如果只想检测是不是IE，而不关心浏览器版本，那只需要在调用函数的时候，不传递参数即可。
//var ie = isIE()

//alert('ie6:' + isIE(6) + '\n' + 'ie7:' + isIE(7) + '\n' + 'ie8:' + isIE(8) + '\n' + 'ie9:' + isIE(9) + '\n' + 'ie:' + isIE())

//获取兄弟节点
function siblings(elm) {
	var a = [];
	var p = elm.parentNode.children;
	for(var i =0,pl= p.length;i<pl;i++) {
		if(p[i] !== elm) a.push(p[i]);
	}
	return a;
}