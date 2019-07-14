const gulp = require("gulp");
require('require-dir')('./_gulp');

//gulp.task('build',  gulp.series('clean',gulp.parallel('generate','styles','scripts','images')));
gulp.task('build',  gulp.series('clean',gulp.parallel('generate','styles', /* 'scripts',*/ 'images')));
