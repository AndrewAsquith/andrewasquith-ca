const config = require('./_config.json');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');

require('dotenv').config();
const env = process.env.ELEVENTY_ENV;
const min = process.env.ELEVENTY_MINIFY;
const buildver = process.env.VERSION;

gulp.task('scripts', function scripts() {
    if (env == "production") {
        return prodscripts();
    } else {
        return devscripts();
    }

});

function devscripts() {

    return gulp.src(config.paths.scripts + '/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('site.js'))
        .pipe(rename( { extname: '.v' + buildver + '.js'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.dist + '/js'));
}

function prodscripts() {

    return gulp.src(config.paths.scripts + '/*.js')
        .pipe(concat('site.js'))
        .pipe(gulpif(min===true, uglify()))
        .pipe(rename({ extname: '.v' + buildver + '.min.js' }))
        .pipe(gulp.dest(config.paths.dist + '/js'));
}