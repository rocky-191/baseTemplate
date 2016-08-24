//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

//定义一个testless任务
/*gulp.task('testless', function() {
    gulp.src('style/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(livereload());
});*/

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

/*gulp.task('watch3', function() {
    livereload.listen();
    gulp.watch('style/less*.less', ['testless']);
});*/

 
gulp.task('default',['testCss','testHtml','testJs','watch','watch1','watch2']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径