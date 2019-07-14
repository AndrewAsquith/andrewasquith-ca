const config = require('./_config.json');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

require('dotenv').config();
const env = process.env.ELEVENTY_ENV;
const min = process.env.ELEVENTY_MINIFY;
const buildver = process.env.VERSION;

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
        .pipe(rename( { extname: '.v' + buildver + '.css'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.dist + '/css'));
}

function prodstyles() {

    return gulp.src(config.paths.sass + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulpif(min === 'true', cleanCSS()))
        .pipe(rename({ extname: '.v' + buildver + '.min.css' }))
        .pipe(gulp.dest(config.paths.dist + '/css'));
}
