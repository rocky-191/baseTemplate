(function() {
	var componentsObject=[
		{
			"link":"allCityThreeLevelLink.html",
			"linkName":"城市三级联动"
		},
		{
			"link":"allCityLink.html",
			"linkName":"城市三级联动可输入选择实例"
		},
		{
			"link":"autoCompleteDemo.html",
			"linkName":"输入框自动填充完成实例"
		},
		{
			"link":"calenderDemo.html",
			"linkName":"日历实例"
		},
		{
			"link":"checkboxAndRadio.html",
			"linkName":"复选框和单选钮实例"
		},
		{
			"link":"css3Login.html",
			"linkName":"css3登录框实例"
		},
		{
			"link":"cssLoading.html",
			"linkName":"css加载实例"
		},
		{
			"link":"dropDownFixedNav.html",
			"linkName":"下拉固定导航实例"
		},
		{
			"link":"ErWeiCode.html",
			"linkName":"生成二维码实例"
		},
		{
			"link":"fengCaoTab.html",
			"linkName":"蜂巢tab切换实例"
		},
		{
			"link":"fenLanSameHeight.html",
			"linkName":"分栏等高实例"
		},
		{
			"link":"gunDongTiaoDemo.html",
			"linkName":"滚动条实例"
		},
		{
			"link":"layoutDemo1.html",
			"linkName":"布局类型一"
		},
		{
			"link":"layoutDemo2.html",
			"linkName":"布局类型二"
		},
		{
			"link":"lunBoDemo.html",
			"linkName":"轮播实例"
		},
		{
			"link":"progressDemo.html",
			"linkName":"进度条实例"
		},
		{
			"link":"huaDongDaoHang.html",
			"linkName":"滑动导航切换实例"
		},
		{
			"link":"selectTemplate.html",
			"linkName":"美化的下拉选择框实例"
		},
		{
			"link":"shouFengQinDemo.html",
			"linkName":"手风琴实例"
		},
		{
			"link":"starGrade.html",
			"linkName":"星星评分实例"
		},
		{
			"link":"tabDemo.html",
			"linkName":"tab切换实例"
		},
		{
			"link":"tableContentScrollUp.html",
			"linkName":"内容自动向上滚动实例"
		},
		{
			"link":"tableTrMoveDemo.html",
			"linkName":"表格行内容上下移动实例"
		},
		{
			"link":"tanChuangAndTable.html",
			"linkName":"弹窗实例及表格基础样式实例"
		},
		{
			"link":"textAreaHeightAuto.html",
			"linkName":"textarea输入框高度自动变化实例"
		},
		{
			"link":"toolTipDemo.html",
			"linkName":"内容tooltip实例"
		},
		{
			"link":"triangleDemo.html",
			"linkName":"css三角形实例"
		},
		{
			"link":"tableContentScrollUp1.html",
			"linkName":"表格表头固定，内容向上滚动实例"
		},
		{
			"link":"3D_rotate.html",
			"linkName":"3D立方体旋转"
		},
		{
			"link":"animationDemo.html",
			"linkName":"基础动画集合"
		},
		{
			"link":"goTop.html",
			"linkName":"回到顶部实例"
		},
		{
			"link":"mouseDirection.html",
			"linkName":"检测鼠标移入移出方向"
		},
		{
			"link":"imageRetota.html",
			"linkName":"图片翻转和开关"
		},
		{
			"link":"circlePos.html",
			"linkName":"圆环周围均匀分布圆点"
		},
		{
			"link":"layoutDemo3.html",
			"linkName":"任意列数均匀布局"
		},
		{
			"link":"goodResource.html",
			"linkName":"优秀资源集"
		}
	];
	
	new Vue({
		el:'#componentsUl',
		data:{
			items:componentsObject
		}
	});
	
	
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    //tip
    $('#componentsUl li a').poshytip({
		className: 'tip-violet',
		alignTo: 'target',
		alignX: 'center',
		offsetY: 5,
		allowTipHover: false,
		content: function(){
			return $(this).text();
		}
	});
})();