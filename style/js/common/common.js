//封装ajax
function ajax(method, url, data, success) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();//new一个xhr对象，这个对象像信使一样存在着
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');//为了兼容IE6
    }
    //如果是get请求，而且data存在，则是要通过get请求发送数据，通过get请求发送数据，数据会被链接到请求地址之后
    if (method == 'get' && data) {
        url += '?' + data;
    }
    //初始化请求，method表示请求方式，url是请求地址，true表示异步
    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();//发送请求
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//post方式，需要设置请求头
        xhr.send(data);//发送提交数据
    }
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {//4是请求最后的阶段，
            //http状态码，2开头便是还请求成功
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);//在这里判断一下，如果success存在，则执行它，将响应数据作为参数传入回调函数
            } else {
                alert('出错了,Err：' + xhr.status);
            }
        }
    }
}

//获取元素样式
function getStyle(element,attr){
	if(element.currentstyle){
		return element.currentstyle[attr];
	}else{
		return window.getComputedStyle(element,null)[attr];
	}
}

// debounce函数用来包裹我们的事件
function debounce(fn, delay) {
  // 持久化一个定时器 timer
  let timer = null;
  // 闭包函数可以访问 timer
  return function() {
    // 通过 'this' 和 'arguments'
    // 获得函数的作用域和参数
    let context = this;
    let args = arguments;
    // 如果事件被触发，清除 timer 并重新开始计时
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}

//数组随机排序算法
//方法一：
//var arr = [1,2,3,4,5,6,7,8,9,10];
function randSort1(arr){
	for(var i = 0,len = arr.length;i < len; i++ ){
		var rand = parseInt(Math.random()*len);
		var temp = arr[rand];
		arr[rand] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
//console.log(randSort1(arr));
  	
//方法二：
//var arr = [1,2,3,4,5,6,7,8,9,10];
function randSort2(arr){
	var mixedArray = [];
	while(arr.length > 0){
		var randomIndex = parseInt(Math.random()*arr.length);
		mixedArray.push(arr[randomIndex]);
		arr.splice(randomIndex, 1);
	}
	return mixedArray;
}
//console.log(randSort2(arr));

//方法三：
//var arr = [1,2,3,4,5,6,7,8,9,10];
//arr.sort(function(){
//	return Math.random() - 0.5;
//})
//console.log(arr);


//获取文件扩展名
function getFileExtension(filename) {
	return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

//利用递归来实现深拷贝，如果对象属性的值是引用类型（Array,Object），那么对该属性进行深拷贝，直到遍历到属性的值是基本类型为止。  
//作者：守候i
//链接：https://juejin.im/post/5a0c199851882531926e4297
//来源：掘金
function deepClone(obj){    
  if(!obj&& typeof obj!== 'object'){      
    return;    
  }    
  var newObj= obj.constructor === Array ? [] : {};    
  for(var key in obj){       
    if(obj[key]){          
      if(obj[key] && typeof obj[key] === 'object'){  
        newObj[key] = obj[key].constructor === Array ? [] : {}; 
        //递归
        newObj[key] = deepClone(obj[key]);          
      }else{            
        newObj[key] = obj[key];         
      }       
    }    
  }    
  return newObj; 
}

//第二种简单方式var newArr2=JSON.parse(JSON.stringify(arr));

/*作者：守候i
链接：https://juejin.im/post/5a39b2dcf265da431d3cd036
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。*/
//str格式化字符串formatText(123456789.123456)=>123,456,789.123456
//size-每隔几个字符进行分割 默认3
//delimiter-分割符 默认','
function formatText(str,size,delimiter){
    var _str=str.toString();
    var _size=size||3,_delimiter=delimiter||',';
    /* 
         如果_size是3
     "\d{1,3}(?=(\d{3})+$)" 
     */
    var regText='\\d{1,'+_size+'}(?=(\\d{'+_size+'})+$)';
    /*   
    /\d{1,3}(?=(\d{3})+$)/g     这个正则的意思：匹配连续的三个数字，但是这些三个数字不能是字符串的开头1-3个字符  
     */
    var reg=new RegExp(regText,'g');
    /* 
    (-?) 匹配前面的-号   (\d+)匹配中间的数字   ((\.\d+)?)匹配小数点后面的数字
    //$0-匹配结果，$1-第一个括号返回的内容----(-?)    $2,$3如此类推  
    */
    return _str.replace(/^(-?)(\d+)((\.\d+)?)$/, function ($0, $1, $2, $3) {
          return $1 + $2.replace(reg, '$&,') + $3;
    })
}

//随机循环
/*作者：守候i
链接：https://juejin.im/post/5a39b2dcf265da431d3cd036
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。*/
var tipList=['提示1','提示2','提示3','提示4','提示5','提示6','提示7','提示8','提示9'];
var tipListShow=[];
tipListShow=Object.assign([],tipList);
var i=0,timer=null;
function play() {
    //随机显示一个，显示了之后，把这个项从tipListShow中删除掉，防止在同一轮重复出现！
    console.log(tipListShow.splice(Math.floor(Math.random() * tipListShow.length),1)[0]);
    //当循环完了之后，tipListShow的长度就会是0，然后就重新赋值，准备进行下一轮的随机循环
    if(tipListShow.length===0){
        tipListShow=Object.assign([],tipList);
        i=0;
    }
    //如果需要暂停或者停止的，清除这个定时器即可，下次执行就重新这样创建定时器，执行play();！
    timer=setTimeout(function () {
        play();
    },500);
}
play();

/**
 * 判断一个对象是否是数组，参数不是对象或者不是数组，返回false
 *
 * @param {Object} arg 需要测试是否为数组的对象
 * @return {Boolean} 传入参数是数组返回true，否则返回false
 * 
 * author:https://github.com/qiu-deqing
 */
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}

/**
 * 判断对象是否为函数，如果当前运行环境对可调用对象（如正则表达式）
 * 的typeof返回'function'，采用通用方法，否则采用优化方法
 *
 * @param {Any} arg 需要检测是否为函数的对象
 * @return {boolean} 如果参数是函数，返回true，否则false
 * 
 * author:https://github.com/qiu-deqing
 */
function isFunction(arg) {
    if (arg) {
        if (typeof (/./) !== 'function') {
            return typeof arg === 'function';
        } else {
            return Object.prototype.toString.call(arg) === '[object Function]';
        }
    } // end if
    return false;
}

/**
 * author:https://github.com/qiu-deqing
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      username: '用户名', // 暂时不支持
 *      password: '密码',  // 暂时不支持
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */
function parseUrl(url) {
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

    var match = regexp.exec(url);

    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }

    return result;
}

/**
 * author:https://github.com/qiu-deqing
* 查询指定窗口的视口尺寸，如果不指定窗口，查询当前窗口尺寸
**/
function getViewportSize(w) {
    w = w || window;

    // IE9及标准浏览器中可使用此标准方法
    if ('innerHeight' in w) {
        return {
            width: w.innerWidth,
            height: w.innerHeight
        };
    }

    var d = w.document;
    // IE 8及以下浏览器在标准模式下
    if (document.compatMode === 'CSS1Compat') {
        return {
            width: d.documentElement.clientWidth,
            height: d.documentElement.clientHeight
        };
    }

    // IE8及以下浏览器在怪癖模式下
    return {
        width: d.body.clientWidth,
        height: d.body.clientHeight
    };
}

/**
 * author:https://github.com/qiu-deqing
 * 获取指定window中滚动条的偏移量，如未指定则获取当前window
 * 滚动条偏移量
 *
 * @param {window} w 需要获取滚动条偏移量的窗口
 * @return {Object} obj.x为水平滚动条偏移量,obj.y为竖直滚动条偏移量
 */
function getScrollOffset(w) {
    w =  w || window;
    // 如果是标准浏览器
    if (w.pageXOffset != null) {
        return {
            x: w.pageXOffset,
            y: w.pageYOffset
        };
    }

    // 老版本IE，根据兼容性不同访问不同元素
    var d = w.document;
    if (d.compatMode === 'CSS1Compat') {
        return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        }
    }

    return {
        x: d.body.scrollLeft,
        y: d.body.scrollTop
    };
}