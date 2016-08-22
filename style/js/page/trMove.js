function tableTR_up(obj){
          var tr=obj.parentNode.parentNode;
          var tbody=tr.parentNode;
          var tb=tbody.parentNode;
          var rowIdx=0;
          for(var i=0;i<tb.rows.length;i++){
           if(tb.rows[i]==tr){
            rowIdx=i;
            break;
           }
          }
          if(rowIdx==1){
          	alert("已经是第一条数据了！");
          	return;
          }
          if(rowIdx==2){
          	$(obj)[0].src="style/images/up.png";
          	$(obj).parent().parent().prev().find("img[class='base4_table_img1']")[0].src="style/images/up1.png";
          }
          if(rowIdx==tb.rows.length-1){
          	$(obj).parent().parent().find("img[class='base4_table_img2']")[0].src="style/images/down.png";
          	$(obj).parent().parent().prev().find("img[class='base4_table_img2']")[0].src="style/images/down1.png";
          }
          var preTr=tb.rows[rowIdx-1];
          var nextNextObj=tr.nextSibling;
          tbody.removeChild(preTr);
          if(nextNextObj)
            {
              tbody.insertBefore(preTr,nextNextObj);
            }else {

              tbody.appendChild(preTr);
            }
            /**改变序号***/
            var num=tr.cells[0].innerHTML;
            tr.cells[0].innerHTML=preTr.cells[0].innerHTML;
            preTr.cells[0].innerHTML=num;
}
function tableTR_down(obj){
          var tr=obj.parentNode.parentNode;
          var tbody=tr.parentNode;
          var tb=tbody.parentNode;
          var rowIdx=0;
          for(var i=0;i<tb.rows.length;i++){
               if(tb.rows[i]==tr){
                rowIdx=i;
                break;
               }
          }
          if(rowIdx==tb.rows.length-1){
          	alert("已经是最后一条数据了！");
          	return;
          }
          if(rowIdx==1){
          	$(obj).parent().parent().find("img[class='base4_table_img1']")[0].src="style/images/up1.png";
          	$(obj).parent().parent().next().find("img[class='base4_table_img1']")[0].src="style/images/up.png";
          }
          if(rowIdx==tb.rows.length-2){
          	$(obj)[0].src="style/images/down1.png";
          	$(obj).parent().parent().next().find("img[class='base4_table_img2']")[0].src="style/images/down.png";
          }
          var nextTr=tb.rows[rowIdx+1];
          var nextNextObj=nextTr.nextSibling;
          tbody.removeChild(tr);
          if(nextNextObj){
            tbody.insertBefore(tr,nextNextObj);
          }else {
            tbody.appendChild(tr);
          }
          /**改变序号***/
          var num=tr.cells[0].innerHTML;
          tr.cells[0].innerHTML=nextTr.cells[0].innerHTML;
          nextTr.cells[0].innerHTML=num;
 }