window.onload=function(){
	var DIR_POS = {
        left: {
            top: '0',
            left: '-100%'
        },
        right: {
            top: '0',
            left: '100%'
        },
        bottom: {
            top: '100%',
            left: '0'
        },
        top: {
            top: '-100%',
            left: '0'
        }
    };

    $('.box').each(function () {
        new MouseDirection(this, {
            enter: function ($element, dir) {
                //每次进入前先把.trans类移除掉，以免后面调整位置的时候也产生过渡效果
                var $content = $element.find('.content').removeClass('trans');

                //调整位置
                $content.css(DIR_POS[dir]);

                //reflow
                $content[0].offsetWidth;

                //启用过渡
                $content.addClass('trans');

                //滑入
                $content.css({left: '0', top: '0'});
            },
            leave: function ($element, dir) {
                $element.find('.content').css(DIR_POS[dir]);
            }
        });
    });
}

//这个模块完成鼠标方向判断的功能
function MouseDirection(element, opts) {

    var $element = $(element);

    //enter leave代表鼠标移入移出时的回调
    opts = $.extend({}, {
        enter: $.noop,
        leave: $.noop
    }, opts || {});

    var dirs = ['top', 'right', 'bottom', 'left'];

    var calculate = function (element, e) {
        /*以浏览器可视区域的左上角建立坐标系*/

        //表示左上角和右下角及中心点坐标
        var x1, y1, x4, y4, x0, y0;

        //表示左上角和右下角的对角线斜率
        var k;

        //用getBoundingClientRect比较省事，而且它的兼容性还不错
        var rect = element.getBoundingClientRect();

        if (!rect.width) {
            rect.width = rect.right - rect.left;
        }

        if (!rect.height) {
            rect.height = rect.bottom - rect.top;
        }

        //求各个点坐标 注意y坐标应该转换为负值，因为浏览器可视区域左上角为(0,0)，整个可视区域属于第四象限
        x1 = rect.left;
        y1 = -rect.top;

        x4 = rect.left + rect.width;
        y4 = -(rect.top + rect.height);

        x0 = rect.left + rect.width / 2;
        y0 = -(rect.top + rect.height / 2);

        //矩形不够大，不考虑
        if (Math.abs(x1 - x4) < 0.0001) return 4;

        //计算对角线斜率
        k = (y1 - y4) / (x1 - x4);

        var range = [k, -k];

        //表示鼠标当前位置的点坐标
        var x, y;

        x = e.clientX;
        y = -e.clientY;

        //表示鼠标当前位置的点与元素中心点连线的斜率
        var kk;

        kk = (y - y0) / (x - x0);

        //如果斜率在range范围内，则鼠标是从左右方向移入移出的
        if (isFinite(kk) && range[0] < kk && kk < range[1]) {
            //根据x与x0判断左右
            return x > x0 ? 1 : 3;
        } else {
            //根据y与y0判断上下
            return y > y0 ? 0 : 2;
        }
    };

    $element.on('mouseenter', function (e) {
        var r = calculate(this, e);
        opts.enter($element, dirs[r]);
    }).on('mouseleave', function (e) {
        var r = calculate(this, e);
        opts.leave($element, dirs[r]);
    });
}