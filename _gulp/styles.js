const config = require('./_config.json');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

require('dotenv').config();
const env = process.env.ELEVENTY_ENV;

gulp.task('styles', function styles() {
    if (env == "production") {
        return prodstyles();
    } else {
        return devstyles();
    }

});

function devstyles() {

    return gulp.src(config.paths.sass + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.dist + '/css'));
}

function prodstyles() {

    return gulp.src(config.paths.sass + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(config.paths.dist + '/css'));
}
