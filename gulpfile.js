const gulp = require('gulp'),
    gutil = require("gulp-util"),
    sass = require('gulp-sass');

/**
 * 关于学习gulp、sass、compass参考链接如下
 * gulp: 
 * 1、http://www.gulpjs.com.cn/docs/api/(中文网)
 * 2、http://www.cnblogs.com/morong/p/4469637.html(使用案例总结)
 * sass: https://www.sass.hk/guide/
 */
gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass({
                outputStyle: 'expanded'
            })
            .on('error', function (err) {
                gutil.log(gutil.colors.red('[Error]'), err.toString());
            }))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass-watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', function () {
    let tasks = [
        'sass',
    ]
    gulp.start(...tasks);
});