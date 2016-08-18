window.onload=function(){
	$("#popModal").on("click",function(){
  		layer.open({
		 	type: 2,//设定弹窗为iframe嵌套页面
		 	title: ['弹出窗', 'font-size:18px;color:#333333;'],//弹窗标题的内容及对应样式
		 	area: ['720px', '500px'],//弹窗的宽度和高度
		  	content: ['baseStylePopModal.html', 'no'] //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
		});
  	});
  	//分页
  	//测试数据
	var data = [
	    '北京',
	    '上海',
	    '广州',
	    '深圳',
	    '杭州',
	    '长沙',
	    '合肥',
	    '宁夏',
	    '成都',
	    '西安',
	    '南昌',
	    '上饶',
	    '沈阳',
	    '济南',
	    '厦门',
	    '福州',
	    '九江',
	    '宜春',
	    '赣州',
	    '宁波',
	    '绍兴',
	    '无锡',
	    '苏州',
	    '徐州',
	    '东莞',
	    '佛山',
	    '中山',
	    '成都',
	    '武汉',
	    '青岛',
	    '天津',
	    '重庆',
	    '南京',
	    '九江',
	    '香港',
	    '澳门',
	    '台北'
	];
	
	var nums = 5; //每页出现的数量
	var pages = Math.ceil(data.length/nums); //得到总页数
	
	var thisDate = function(curr){
	    //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
	    var str = '', last = curr*nums - 1;
	    last = last >= data.length ? (data.length-1) : last;
	    for(var i = (curr*nums - nums); i <= last; i++){
	        str += '<li>'+ data[i] +'</li>';
	    }
	    return str;
	};
	
	//调用分页
	laypage({
	    cont: 'biuuu_city',
	    pages: pages,
	    skip: true, //是否开启跳页
    	skin: '#e23e18',
    	groups: 3, //连续显示分页数
	    jump: function(obj){
	        document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
	    }
	});
	 
	//cpu容量表格分页
	//表格数据
	var table_array=[
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量1：800GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量2：700GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量3：600GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量4：500GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量5：400GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量6：400GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量7：400GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量8：300GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量9：200GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量10：300GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量11：200GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量12：300GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量13：200GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量14：300GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量15：200GHZ/28GHZ/96.5%","cell3":"2016-3-10"},
        {"cell1":"资源池平台_A/数据中心N","cell2":"CPU容量16：100GHZ/28GHZ/96.5%","cell3":"2016-3-10"}
    ];
	
	//调用分页
	var num1=5;
	var pages1 = Math.ceil(table_array.length/num1); //得到总页数
	var countNum=1;
	var thisTableDate = function(curr){
		var tableHtml='',tableLast = curr*num1 - 1;
		tableLast = tableLast >= table_array.length ? (table_array.length-1) : tableLast;
		
		for(var i = (curr*num1 - num1); i <= tableLast; i++){
			tableHtml+='<tr>';
			tableHtml+='<td>'+countNum+'</td>';
			tableHtml+='<td><label>'+table_array[i].cell1+'</label></td>';
			tableHtml+='<td>'+table_array[i].cell2+'</td>';
			tableHtml+='<td>'+table_array[i].cell3+'</td></tr>';
			countNum++;
		}
	    return tableHtml;
	};
	laypage({
	    cont: 'contentFootPage',
	    pages: pages1,
	    skip: true, //是否开启跳页
    	skin: '#4bb9f8',
    	groups: 3, //连续显示分页数
	    jump: function(obj){
	    	document.getElementById("yjTable_tbody").innerHTML=thisTableDate(obj.curr);
	    }
	});
};
