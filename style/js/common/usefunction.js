//运动框架
function animate(obj,targetJson,time,callback){
	if(window.navigator.userAgent.indexOf("MSIE") != -1){
		var interval = 50;	
	}else{
		var interval = 10;
	}
	//得到现在的状态当作信号量；这个信号量是所有要变化属性的集合；
	var nowJson = {};//信号量对象；
	//给信号量对象添加属性，添加什么属性，目标对象中有什么属性，这里就添加什么属性
	//值就是当前的计算样式
	for(var k in targetJson)
	{
		nowJson[k] = parseFloat(fetchComputedStyle(obj,k));
	}
	console.log(nowJson);
	//我们思考一下，我们的动画是10毫秒执行一次，而用户让我们time毫秒执行完毕动画
	//也就是说，总执行函数次数：
	var maxcount = time/interval;
	var count = 0;
	//继续深入思考，动画总次数是maxcount次，那么每一次动画变化的步长就有了啊！
	//所以我们现在要再来一个JSON，放置所有属性的步长
	var stepJson = {};
	for(var k in targetJson)
	{	//捎带脚，把每个targetJSON中的值都去掉px
		targetJson[k] = parseFloat(targetJson[k]);
		stepJson[k] = (targetJson[k] - nowJson[k])/maxcount;
	}
	//至此，三个非常重要的JSON整理完毕。分别是：
	//信号量JSON ：  nowJson
	//终点JSON ：  	targetJson
	//步长JSON ：  stepJson
	//这三个JSON所有的k都一样。
	// console.log(semaphoreJson);
	// console.log(targetJson);
	// console.log(stepJson);
	//总体思路就是nowJson每一帧都在变
	var timer = null;
	timer = setInterval(function (){
		for(var k in targetJson)
		{
			nowJson[k] +=stepJson[k]; 
			if(k!='opacity')
			{
				obj.style[k] = nowJson[k] + 'px';
			}else{
				obj.style[k] = nowJson[k];
				obj.style.filter = "alpha(opacity=" + (nowJson[k] * 100) + ")";
			}
		}
		//console.log(nowJson);
		//计数器；
		count++;
		if(count == maxcount)
		{
			//次数够了，所以停表。
			//这里抖一个小机灵，我们强行让obj跑到targetJSON那个位置
			/*for(var k in targetJson)
			{	
				if(k!='opacity'){
					obj.style[k] =parseFloat( targetJson[k]) +'px';
				}else{
					obj.style[k] = targetJson[k];
					obj.style.filter = "alpha(opacity=" + (targetJson[k] * 100) + ")";
				}	
			}*/
		
		//停表
		clearInterval(timer);
		callback&&callback();	//调用回调函数
		}
	},interval)
	function fetchComputedStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}
}			
/*
说明：获得元素相应属性值；不能获取未定义属性值
@obj ----->元素本身
@attr ------>要获取元素的属性值的属性
*/
function getStyle(obj,attr){
	return obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj)[attr];
	}
/*
说明：抖函数；使一个元素上下左右抖动
@obj ---->元素本身
@attr ----->抖动方向("top"和"left")
@endFn---->回调函数（可有可无）
*/
function shake(obj,attr,endFn){
		if (obj.onoff) {return};//加开关修复抖函数
		obj.onoff=true;
		 var arr = [];
		var num = 0;
		var k=null;
		for(var i=20;i>0;i-=2)
		{
			arr.push(i,-i);
		}
		arr.push(0)
		clearInterval(shake.timer)
		shake.timer=setInterval(function(){
			obj.style[attr]=parseInt(getStyle(obj,attr))+arr[num]+"px";
			num++
			if (num==arr.length)
			{
			clearInterval(shake.timer)
			obj.onoff = false;
			endFn&&endFn();
			}
		},100)
		}
/*
说明：传入一个数num，如果该数小于10，返回其前面加0的字符串，如果大于10则返回该数的字符串；
@num----->传入的数。
*/	
function twoNum(num){
	if(num<10)
	{
		return "0"+num;
	}
	else{
		return ""+num;
	}
}
/*
说明：传入x和y两数，返回在x-y之间的随机数；
*/
function getRandom(x,y){
	return Math.round(Math.random()*(y-x)+x);
	}
/*
说明：控制元素的透明度渐变效果
@obj------>要传入的元素
@dir------->透明度渐变的速度
@target----->透明度变化的目标
@endFn----->回调函数（可有可无）；
*/
function Opacity(obj,dir,target,endFn){
		if(target>100||target<0)
		{
			alert('输入范围不对');
			return
		}
		dir=getStyle( obj, 'opacity')*100 < target?dir:-dir;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
		var speed = getStyle(obj,'opacity')*100+dir;
		if(dir<0&&speed<target||dir>0&&speed>target)
		{
			speed=target;
		}
		obj.style.opacity=speed/100;
		if(speed==target)
		{
			clearInterval(obj.timer);
			endFn&&endFn();
		}
		},14)
		}
/*
说明：数组去重函数；传入一个数组，返回去重过后的数组；
@arr----->需要去重的数组；
*/
function arrQc(arr){
	for(var i=0;i<arr.length;i++)
	{
	for(var j=i+1;j<arr.length;j++)
	{
		if(arr[i]==arr[j])
		{
			arr.splice(j,1);
			j--;
		}
	}
	}
	return arr;
}
/*
说明：获取元素的位置；
@obj------->要获取位置的元素；
*/
function getPos(obj){
		var pos = {left:0,top:0}

		while(obj)
		{
		pos.left+= obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
		}
		return pos;
	}
/*
说明：通过类名获得元素；
@parent------->父级元素；
@TagName------->要通过类名获得的元素标签名；
@className------->类名；
*/
function getElementsByClassName(parent,TagName,className){
	var oAll = parent.getElementsByTagName(TagName);
	var arr=[];
	for(var i=0;i<oAll.length;i++)
	{
	/*if(oAll[i].className=='div1')
	{
		arr.push(oAll[i]);
	}*/
	var arr1 = oAll[i].className.split(" ");
	for(var j=0;j<arr1.length;j++)
	{
		if(arr1[j]==className)
		{
			arr.push(oAll[i]);
			break;
		}
	}
	}
	return arr
}
/*
说明：为元素添加class
@obj------->要添加class的元素
@className--------->为元素添加的className;
*/
function addClass(obj,className){
	var arr = obj.className.split(" ");
	for(var i=0;i<arr.length;i++){
	if(arr[i]==className)
	{	alert('ok');
		return
	}
	}
	arr.push(className);
	obj.className=arr.join(" ");
}
/*
说明：数组的indexOf()方法，找到数组中的元素，并返回该元素在数组中的位置；
@arr---->传入的数组
@v------>需在数组中返回位置的元素
*/
function arrIndexOf(arr,v){
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]===v)
		{
			return i;
		}
	}
	return -1;
}
/*
说明：删除元素class；
@obj------->要删除class的元素；
@className-------->要删除的class值；
*/
function removeClass (obj,className){
	var arr1= obj.className.split(" ");
	var _index = arrIndexOf(arr1,className);
	if(_index != -1){
		arr1.splice(_index,1);
		obj.className=arr1.join(" ");
	}
}
/*
说明：事件绑定的第二种方式，可以让一个元素的一个事件同时触发2个事件函数
@obj------>要绑定事件的元素
@evname-------->事件名称
@fn----------->事件函数
*/
function bind(obj,evname,fn){
	obj.addEventListener?obj.addEventListener(evname,fn,false):obj.attachEvent('on'+evname,function(){
		fn.call(obj);
	})
}
/*
说明：拖曳函数
@obj-------->要拖曳的元素
*/
	function drag (obj){
	obj.onmousedown = function (ev){
	var ev = ev || event;
	//获取鼠标点击位置与元素的左右距离；
	var disX = ev.clientX-obj.offsetLeft;
	var disY = ev.clientY-obj.offsetTop;
	if(obj.setCapture)
	{
		obj.setCapture();
	}
	document.onmousemove = function (ev)
	{
		var ev = ev || event;
		var L = ev.clientX-disX;
		var T = ev.clientY-disY;
		/*if(L<100)//改变该值可以实现磁性吸附效果；
		{
			L = 0;
		}else if(L>document.documentElement.clientWidth - oDiv.offsetWidth)
		{
			L = document.documentElement.clientWidth - oDiv.offsetWidth;
		}
		if(T<0)
		{
			T = 0;
		}else if(T>document.documentElement.clientHeight - oDiv.offsetHeight)
		{
			T = document.documentElement.clientHeight- oDiv.offsetHeight;
		}
		oDiv.style.left = L+'px';
		oDiv.style.top = T+'px';
		//该段代码可限制拖曳范围；
		*/
		obj.style.left = L+'px';
		obj.style.top = T+'px';
		}
		document.onmouseup = function (){
	   	 document.onmouseup =document.onmousemove = null;
	  	 if(obj.releaseCapture)
		{
		obj.releaseCapture();
		}
	}
	return false;
	}
}

//得到cookie；
function getCookie(key){
	var arr1 = document.cookie.split('; ');
	for(var i = 0;i<arr1.length;i++)
	{
		var arr2 = arr1[i].split('=');
		if(arr2[0]==key)
		{
			return decodeURI(arr2[1]);
		}
	}
}
//设置cookie；
function setCookie(key,value,t){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+t);
	oDate.toGMTString();
	document.cookie = key+'='+encodeURI(value)+';expires='+oDate;
}
//删除cookie；
function removeCookie(key){
	setCookie(key,'',-1);
}

//ajax请求方式
var Ajax = function(url, type success, error) {
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        timeout: 10000,
        success: function(d) {
            var data = d.data;
            success && success(data);
        },
        error: function(e) {
            error && error(e);
        }
    });
};
// 使用方法：
Ajax('/data.json', 'get', function(data) {
    console.log(data);
});

//jsonp请求
function jsonp(config) {
    var options = config || {};   // 需要配置url, success, time, fail四个属性
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement('script');
    oHead.appendChild(oScript);
    window[callbackName] = function(json) {  //创建jsonp回调函数
        oHead.removeChild(oScript);
        clearTimeout(oScript.timer);
        window[callbackName] = null;
        options.success && options.success(json);   //先删除script标签，实际上执行的是success函数
    };
    oScript.src = options.url + '?' + callbackName;    //发送请求
    if (options.time) {  //设置超时处理
        oScript.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oScript);
            options.fail && options.fail({ message: "超时" });
        }, options.time);
    }
};
// 使用方法：
jsonp({
    url: '/b.com/b.json',
    success: function(d){
        //数据处理
    },
    time: 5000,
    fail: function(){
        //错误处理
    }       
});

//手机号验证
var validate = function(num) {
    var reg = /^1[3-9]\d{9}$/;
    return reg.test(num);
};

//身份证号验证
var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;

//ip验证
var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/

//返回顶部函数
$(window).scroll(function() {
    var a = $(window).scrollTop();
    if(a > 100) {
        $('.go-top').fadeIn();
    }else {
        $('.go-top').fadeOut();
    }
});
$(".go-top").click(function(){
    $("html,body").animate({scrollTop:"0px"},'600');
});

//阻止冒泡
function stopBubble(e){
    e = e || window.event;  
    if(e.stopPropagation){
        e.stopPropagation();  //W3C阻止冒泡方法  
    }else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    }  
}

//全部替换replaceAll
var replaceAll = function(bigStr, str1, str2) {  //把bigStr中的所有str1替换为str2
    var reg = new RegExp(str1, 'gm');
    return bigStr.replace(reg, str2);
}

//获取浏览器中url中的参数值
var getURLParam = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
};

//深度拷贝对象
function cloneObj(obj) {
    var o = obj.constructor == Object ? new obj.constructor() : new obj.constructor(obj.valueOf());
    for(var key in obj){
        if(o[key] != obj[key] ){
            if(typeof(obj[key]) == 'object' ){
                o[key] = mods.cloneObj(obj[key]);
            }else{
                o[key] = obj[key];
            }
        }
    }
    return o;
}

//数组去重
var unique = function(arr) {
    var result = [], json = {};
    for (var i = 0, len = arr.length; i < len; i++){
        if (!json[arr[i]]) {
            json[arr[i]] = 1;
            result.push(arr[i]);  //返回没被删除的元素
        }
    }
    return result;
};

//判断数组元素是否重复
var isRepeat = function(arr) {  //arr是否有重复元素
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
    }
    return false;
};

//操作cookie
own.setCookie = function(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};
own.getCookie = function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i< ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return '';
};

//获取元素样式，如GetCurrentStyle(s,"display")
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

//滚动时动态加载内容
var loading = false;
$(window).scroll(function(){
 if((($(window).scrollTop()+$(window).height())+250)>=$(document).height()){
      if(loading == false){
           loading = true;
           $('#loadingbar').css("display","block");
           $.get("load.php?start="+$('#loaded_max').val(), function(loaded){
                $('body').append(loaded);
                $('#loaded_max').val(parseInt($('#loaded_max').val())+50);
                $('#loadingbar').css("display","none");
                loading = false;
           });
      }
 }
});

$(document).ready(function() {
 $('#loaded_max').val(50);
});

//使用jquery重绘图片大小
$(window).bind("load", function() {
     // IMAGE RESIZE
     $('#product_cat_list img').each(function() {
          var maxWidth = 120;
          var maxHeight = 120;
          var ratio = 0;
          var width = $(this).width();
          var height = $(this).height();

          if(width > maxWidth){
           ratio = maxWidth / width;
           $(this).css("width", maxWidth);
           $(this).css("height", height * ratio);
           height = height * ratio;
          }
          var width = $(this).width();
          var height = $(this).height();
          if(height > maxHeight){
           ratio = maxHeight / height;
           $(this).css("height", maxHeight);
           $(this).css("width", width * ratio);
           width = width * ratio;
          }
     });
     //$("#contentpage img").show();
     // IMAGE RESIZE
});

//根据视窗(viewport)创建一个全屏宽度和高度(width/height)的div
$('#content').css({
    'width': $(window).width(),
    'height': $(window).height(),
});
// make sure div stays full width/height on resize
$(window).resize(function(){
    var $w = $(window);
    $('#content').css({
      'width': $w.width(),
      'height': $w.height(),
    });
});

//克隆table head到表格下面
var $tfoot = $('<tfoot></tfoot>'); 
$($('thead').clone(true, true).children().get().reverse()).each(function(){
    $tfoot.append($(this));
});
$tfoot.insertAfter('table thead');

//采用data方法来缓冲数据
var cache = {};
 $.data(cache,'key','value'); //缓存数据
  //获取数据
 $.data(cache,'key');
 
//部分页面加载更新
setInterval(function() {   //每隔5秒钟刷新页面内容
      //获取的内容将增加到 id为content的元素后
     $("#content").load(url);
 }, 5000);
 
//字符串相关方法
//xString.substring(start,end)
var str = 'www.jeffjade.com'
console.log(str.substring(0,3)) // www
console.log(str.substring(0))   //www.jeffjade.com
console.log(str.substring(-2))  //www.jeffjade.com (传负值则视为0)

//slice(),	stringObject.slice(start, end)
var str = 'www.jeffjade.com'
console.log(str.slice(0, 3))    // www
console.log(str.slice(-3, -1))  // co
console.log(str.slice(1, -1))   // www.jeffjade.co
console.log(str.slice(2, 1))    // '' (返回空字符串,start须小于end)
console.log(str.slice(-3, 0))   // '' (返回空字符串,start须小于end)

//stringObject.substr(start,length)
var str = 'www.jeffjade.com'
console.log(webStr.substr(1, 3))   // ww.
console.log(webStr.substr(0))      // www.jeffjade.com
console.log(webStr.substr(-3, 3))  // com
console.log(webStr.substr(-1, 5))  // m  (目标长度较大的话，以实际截取的长度为准)

//str.split([separator][, limit])
var str = 'www.jeffjade.com'
str.split('.')      // ["www", "jeffjade", "com"]
str.split('.', 1)   // ["www"]
str.split('.').join('') // wwwjeffjadecom

//查找类方法
//stringObject.indexOf(searchValue,fromIndex)
var str = 'www.jeffjade.com'
console.log(str.indexOf('.'))     // 3
console.log(str.indexOf('.', 1))  // 3
console.log(str.indexOf('.', 5))  // 12
console.log(str.indexOf('.', 12)) // -1

//indexOf()也可以用来判断是否存在制定字符串
if (str.indexOf('yoursPecifiedStr') !== -1) {
    // do something
}

//ES6中有includes()方法，str.includes(searchString[, position])
'Blue Whale'.includes('blue'); // returns false
'乔峰乔布斯乔帮主'.includes('乔布斯'); // returns true
if (str.includes('yoursPecifiedStr')) {
    // do something(这样写是不是更为人性化？Yeah，这是一个更趋向人性化的时代嘛)
}

//lastIndexOf(),stringObject.lastIndexOf(searchValue,fromIndex)
var str = 'www.jeffjade.com'
console.log(str.lastIndexOf('.'))     // 12
console.log(str.lastIndexOf('.', 1))  // -1
console.log(str.lastIndexOf('.', 5))  // 3
console.log(str.lastIndexOf('.', 12)) // 12

//search()
var str = 'www.jeffjade.com'
console.log(str.search('w'))    // 0
console.log(str.search(/j/g))   // 4
console.log(str.search(/\./g))  // 3

//match()方法
var str = '#1a2b3c4d5e#';
console.log(str.match('A'));    //返回null
console.log(str.match('b'));    //返回["b", index: 4, input: "#1a2b3c4d5e#"]
console.log(str.match(/b/));    //返回["b", index: 4, input: "#1a2b3c4d5e#"]

//字符串反转
String.prototype.reverse = function () {
	return this.split('').reverse().join('')
}

//去除空白行
String.prototype.removeBlankLines = function () {
	return this.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
}

//转化为一维数组
var Str = '陈寅恪,鲁迅,钱钟书,胡适,王国维,梁启超,吴宓,季羡林'
var hallAllOfFameArr = Str.split(',')
console.log(hallAllOfFameArr)
// ["陈寅恪", "鲁迅", "钱钟书", "胡适", "王国维", "梁启超", "吴宓", "季羡林"]

//转化为二维数组
String.prototype.removeBlankLines = function () {
	return this.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
}
String.prototype.strTo2dArr = function(firstSplit, secondSplit){
	var contentStr = this.removeBlankLines(),
		contentStrArr = contentStr.split(firstSplit),
		resultArr = contentStrArr.map((element) => {
            return element.split(secondSplit)
        })
	return resultArr;
}
var str ='渺渺钟声出远方,依依林影万鸦藏。一生负气成今日,四海无人对夕阳。破碎山河迎胜利,残馀岁月送凄凉。松门松菊何年梦,且认他乡作故乡。';
console.log(str.strTo2dArr('\n', ','));


/*
 * 获取元素移动的方向
 * @param  $element  元素的jQuery对象
 * @param  event     事件对象
 * @return direction 返回一个数字：0:上，1:右，2:下，3:左
 **/
function getDirection($element, event) {
    var w = $element.width(),
        h = $element.height(),
        x = (event.pageX - $element.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
        y = (event.pageY - $element.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
        direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

    return direction;
}

//使用方法
/*$('#content').on('mouseenter', function(event){
    console.log( 'enter: '+ getDirection($(this), event) );
}).on('mouseleave', function(event){
    console.log( 'leave: '+getDirection($(this), event) );
})*/

//html字段转换函数
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"};                      
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
    }); 
}

//检测浏览器是否支持fixed
function isSupportFixed() {
    var userAgent = window.navigator.userAgent, 
        ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
        ios5below = ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) < 5),
        operaMini = /Opera Mini/i.test(userAgent),
        body = document.body,
        div, isFixed;

    div = document.createElement('div');
    div.style.cssText = 'display:none;position:fixed;z-index:100;';
    body.appendChild(div);
    isFixed = window.getComputedStyle(div).position != 'fixed';
    body.removeChild(div);
    div = null;

    return !!(isFixed || ios5below || operaMini);
}

//解析url中的参数
function getUrlInfo(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null){
		return unescape(r[2]); 		
	}
	return null;
}

//产生随机字符串
function getRadomString(){
	var randomString=Math.random().toString(36).substr(2);
	return randomString;
}

function fixedRequestAnimationFrame(){
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

//产生6位随机数字
function getRanNum(){
    return (''+Math.random()).slice(-6); // Math.random().toString().slice(-6)
}

//字符串反转
function getStringReverse(str){
	var revs = str.split("").reverse().join("");
	return revs;
}

//绑定事件
function addEvent(obj,type,fn){
  if(obj.addEventListener){
  obj.addEventListener(type,fn);
  }else{
  obj.attachEvent('on'+type,fn);
  }
};
//取消绑定
function removeEvent(obj,type,fn){
  if(obj.removeEventListener){
  obj.removeEventListener(type,fn);
  }else{
  obj.detachEvent('on'+type,fn);
  }
}

//去除字符串两侧空白
String.prototype.mytrim=function(){
  return this.replace(/^\s+|\s+$/g,'');
};

//滚动事件封装兼容方案
function myScroll(obj,upFn,downFn){
  obj.onmousewheel=fn;
  obj.addEventListener('DOMMouseScroll',fn);

  function fn(ev){
  if(ev.wheelDelta>0 || ev.detail<0){
  //这个条件成立，说明现在都是往上边滚动
  //upFn();
  upFn.call(obj,ev);
  }else{
  //走这里说明，都是往下滚动
  //downFn();
  downFn.call(obj,ev);
  }
  ev.preventDefault();
  return false;
  };
}

//获取随机颜色值
//var color = '#' + Math.random().toString(16).slice(2, 8);
//alert(color);