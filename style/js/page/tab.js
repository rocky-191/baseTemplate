$(function(){
	var public={
        tab:function(){
        $("#box1 ul li").mouseover(function(){
                $(this).addClass("now").siblings().removeClass("now");
                $(".list1>div:eq("+$(this).index()+")").show().siblings().hide();	                
                })
                
        }
	}
	public.tab()
});

window.onload = function(){
	//原生js的tab切换
	var Obox = document.getElementById("box");
	var Oli =Obox.getElementsByTagName("li");
	var Olist =document.getElementById("list");
	var Otext =Olist.getElementsByTagName("div");
    for(var i=0,len=Oli.length; i<len;i++){
        Oli[i].id=i;//索引
        Oli[i].onmouseover =function(){                                
            for(var i=0,len1=Oli.length; i<len1;i++){
                Oli[i].className="";
                Otext[i].style.display="none";                               
            }
            this.className="now";
            Otext[this.id].style.display="block";//通过li的索引来显示和隐藏Otext内容，取出来的div内容是一个数组 
        }                        
    }       
}