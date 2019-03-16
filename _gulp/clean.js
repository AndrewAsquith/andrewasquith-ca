const config = require('./_config.json');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean', function clean() {
    return del(config.paths.dist + '/**');
});