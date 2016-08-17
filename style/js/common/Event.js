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
function showList(obj,name){
	if($(obj).next().length!=0){
		$(obj).next().toggle();
		var state=$(obj).next().css("display");
		if(state=="none"){
			$(obj).find("div[name='mark']").removeClass("showicon").addClass("showiconClick");
		}else{
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
