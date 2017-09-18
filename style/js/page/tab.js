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
    
    //类型三点击切换
    var Obox1 = document.getElementById("box2");
	var Oli1 =Obox1.getElementsByTagName("li");
	var Olist1 =document.getElementById("list2");
	var Otext1 =Olist1.getElementsByTagName("div");
    for(var i=0,len=Oli1.length; i<len;i++){
        Oli1[i].id=i;//索引
        Oli1[i].onclick =function(){                                
            for(var i=0,len1=Oli.length; i<len1;i++){
                Oli1[i].className="";
                Otext1[i].style.display="none";                               
            }
            this.className="now";
            Otext1[this.id].style.display="block";//通过li的索引来显示和隐藏Otext内容，取出来的div内容是一个数组 
        }                        
    }
    
    //类型四
    var OneLi=document.getElementsByClassName('newbox')[0].getElementsByTagName('li');
	var TwoLi=document.getElementsByClassName('boxtwo')[0].getElementsByTagName('li');
	var a=document.getElementsByClassName('newbox')[0].getElementsByTagName('a')
	var timer=null;
	var num=0;
	OneLi[0].className='bj'
	a[0].style.color='white'
		
	showtimer()
	
	function showtimer(){
		timer=setInterval(function(){
			num++;
			if(num>=OneLi.length){
				num=0
			}
			for(var j=0;j<OneLi.length;j++){
				OneLi[j].className=''
				TwoLi[j].className='hide'
				a[j].style.color=''
			}
			OneLi[num].className='bj'
			TwoLi[num].className='show'
			a[num].style.color='white'
			
		},3000)
	}
}