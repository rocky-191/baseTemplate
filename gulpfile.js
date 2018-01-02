//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    rename=require('gulp-rename'),//重命名
    uglify = require('gulp-uglify'),//压缩js
    autoprefixer = require('gulp-autoprefixer'),//自动添加前缀
    cssmin = require('gulp-clean-css'),//压缩css
    babel = require('gulp-babel'),//安装npm install --save-dev gulp-babel babel-preset-es2015
    livereload = require('gulp-livereload');

//定义一个testless任务
gulp.task('testless', function() {
    gulp.src('style/css/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('style/css/page'))
        .pipe(livereload());
});


/**
 * 编译js文件
 */
gulp.task('es6-js', function () {
    //pages下面的业务代码进行babel处理
    gulp.src(['style/js/page/test.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('style/js/buildJs'));
});

//定义压缩js文件任务
gulp.task('jsmin', function () {
    gulp.src('style/js/page/*.js')//指定压缩文件
        .pipe(uglify())//压缩选项配置
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('style/js/buildJs'));//制定压缩后的文件位置
});

//定义压缩css文件任务
gulp.task('cssmin', function () {
    gulp.src('style/css/page/*.css')
        .pipe(cssmin({
        	advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('style/css/buildCss'));
});

var browserOptions = {
  browsers: [
    'last 3 versions',
    'ie >= 6',
    'firefox >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 12.1',
    'ios >= 6',
    'android >= 2.3',
    'and_uc 9.9',
  ]
};

gulp.task('testAutoFx', function () {
    gulp.src('style/css/less/*.less')
        .pipe(autoprefixer({
            browsers: ['last 3 versions',
					    'ie >= 6',
					    'firefox >= 30',
					    'chrome >= 34',
					    'safari >= 6',
					    'opera >= 12.1',
					    'ios >= 6',
					    'android >= 2.3',
					    'UCAndroid>=9.9'
					],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('style/css/less'))
        .pipe(livereload());
});

//定义一个testCss任务（自定义任务名称）
gulp.task('testCss', function () {
    gulp.src('style/css/**/*.css') //该任务针对的文件
        .pipe(livereload());
});

//定义一个testHtml任务
gulp.task('testHtml', function () {
    gulp.src('*.html') //该任务针对的文件
        .pipe(livereload());
});

//定义一个testJs任务
gulp.task('testJs', function () {
    gulp.src('style/js/**/*.js') //该任务针对的文件
        .pipe(livereload());
});

//文件监听css发生变化，实时刷新页面
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('style/css/**/*.css', ['testCss']);
    //gulp.watch('js/*.js');
});

//监听html文件发生变化
gulp.task('watch1', function () {
	livereload.listen();
    gulp.watch('*',['testHtml']);
});

//监听js发生变化，实时刷新
gulp.task('watch2',function(){
	livereload.listen();
	gulp.watch('style/js/**/*.js',['testJs']);
});

gulp.task('watch3', function() {
    livereload.listen();
    gulp.watch('style/css/**/*.less', ['testless']);
});

 
gulp.task('default',['testAutoFx','testCss','testHtml','testJs','watch','watch1','watch2','watch3']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径