const config = require('./_config.json');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

require('dotenv').config();
const env = process.env.ELEVENTY_ENV;

gulp.task('scripts', function styles() {
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
        .pipe(rename( { extname: '.v' + process.env.VERSION + '.js'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.dist + '/js'));
}

function prodscripts() {

    return gulp.src(config.paths.scripts + '/*.js')
        .pipe(concat('site.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.v' + process.env.VERSION + '.min.js' }))
        .pipe(gulp.dest(config.paths.dist + '/js'));
}