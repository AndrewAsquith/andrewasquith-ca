const config = require('./_config.json');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function imagse() {

    return gulp.src(config.paths.images + '/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})]))
        .pipe(gulp.dest(config.paths.dist + '/img'));
});