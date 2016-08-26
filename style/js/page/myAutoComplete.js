$(document).ready(function() { 
  var countries = [
	   { value: 'aos', data: 'AD' },
	   { value: 'Zimbabwe', data: 'ZZ1' },
	   { value: 'asd', data: 'ZZ2' },
	   { value: 'abs', data: 'ZZ3' },
	];
 
$('#autocomplete').autocomplete({
    lookup: countries,
    onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', data is ' + suggestion.data);
        }
    });
  
  
});

window.onload=function(){
		var su = new suggest();
    su.init();
};

function suggest(){
 	this.sInput = document.getElementById('input');
 	this.sUl = document.getElementById('emails');
 	this.sLi = document.getElementsByTagName('li');
}
 suggest.prototype = {
 	init : function(){
        this.toChange();
        this.toBlur();
        this.sele();         
 	},
 	/*input输入事件*/
 	toChange : function(){
 		var ie = !-[1,];
 		var that = this;
 		if(ie){
 			this.sInput.onpropertychange = function(){
        that.toShow();
 			}
 		}else{
 			this.sInput.oninput = function(){
	      that.toShow();             	
	    }
 		}         		
 	},
 	/*显示提示*/
 	toShow : function(){
 		var value = this.sInput.value;
 		/*用于匹配相应邮箱格式的正则*/
 		var re = new RegExp('@'+value.substring(value.indexOf('@')+1)+'');
 		this.sUl.style.display = 'block';
 		if(re.test(value)){
 			this.sLi[1].innerHTML = value;
 			for(var i=2;i<this.sLi.length;i++){
 				var sEmail = this.sLi[i].getAttribute('email');
 				/*输入@后匹配email*/
 				if(re.test(sEmail)){
 					this.sLi[i].innerHTMl = value.substring(0,'@')+sEmail;
 					this.sLi[i].style.display = 'block';
 				}else{
 					this.sLi[i].style.display = 'none';
 				}
 			}
 		}else{
 			this.sUl.style.display = 'block';
      this.sLi[1].innerHTML = value;
    	for(var i=2;i<this.sLi.length;i++){
				this.sLi[i].innerHTML = value + this.sLi[i].getAttribute('email');
    	}
 		}     		
 	},
 	/*失去焦点*/
 	toBlur : function(){
 	   var that = this;
       this.sInput.onblur = function(){
          that.sUl.style.display = 'none';
       }
 	},
 	/*鼠标键盘相关选择事件*/
 	sele : function(){
        var iNow = 1;
        if(this.sInput.value ==''){
        	this.sLi[1].className='item';
        }
        /*鼠标相关*/
        for(var i=0;i<this.sLi.length;i++){
		 			var that = this;
		 			this.sLi[i].onmouseover = function(ev){				
		            this.className = 'active';
		 		    };
		 		  this.sLi[i].onmouseout = function(ev){				
		            this.className = 'item';
		 		    };
		 			this.sLi[i].onmousedown = function(ev){
		            that.sInput.value = ev.target.innerHTML;
		 		    }
 				}
 		/*键盘相关*/ 
 		var that = this;
         this.sInput.onkeydown = function(ev){
            var ev = ev || window.event; 
            if(ev.keyCode == 38){  //上
                if(iNow == 1){
            		iNow=that.sLi.length;
            	}
                iNow--;                        
                for(var i=1;i<that.sLi.length;i++){
            		that.sLi[i].className = 'item';
            	}
                that.sLi[iNow].className = 'active';                              
            }else if(ev.keyCode == 40){  //下
            	iNow++;
            	if(iNow == that.sLi.length){
            		iNow=1;
            	}
            	for(var i=1;i<that.sLi.length;i++){
            		that.sLi[i].className = 'item';
            	}      
                that.sLi[iNow].className = 'active';                     
             }else if(ev.keyCode == 13){
             	that.sInput.value = that.sLi[iNow].innerHTML;
             }
         }
 	}
 }