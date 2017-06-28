var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css");
 
gulp.task('default', function () {
   gulp.src('text.js')
    .pipe(uglify())  
    .pipe(gulp.dest('src')); 
   
   gulp.src('text.css')
   .pipe(minifyCss())
   .pipe(gulp.dest('src'));
    
});

