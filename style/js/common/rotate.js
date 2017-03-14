var pic;

//自定义函数
$.fn.extend({
    rotate: function () {
        pic = this ;
        setInterval('singleRotate()',10);
    }
});

//初始角度
var degree = 0;

//单次旋转
function singleRotate() {
    //一次增加50度
    degree = degree + 50 * Math.PI / 180;
    pic.css("transform","rotate("+degree+"deg)");
}