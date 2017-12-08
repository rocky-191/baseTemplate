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