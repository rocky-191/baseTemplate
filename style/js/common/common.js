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