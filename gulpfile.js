const gulp = require("gulp");
require('require-dir')('./_gulp');

gulp.task('build',  gulp.series('clean',gulp.parallel('generate','styles', /* 'scripts',*/ 'images')));
gulp.task('buildSync', gulp.series('clean',gulp.parallel('generateSync','styles', /* 'scripts',*/ 'images')));
gulp.task('run', gulp.series('buildSync', 'serve'));