const config = require('./_config.json');
const gulp = require('gulp');
const browserSync  = require('browser-sync').create();

gulp.task('serve', function serve(done){

    browserSync.init({
        server: config.paths.dist,
        port: 8080  
    });

    gulp.watch(config.paths.sass + '/**/*.scss', gulp.series('styles')).on('change', browserSync.reload);
//  gulp.watch(config.paths.scripts + '/**/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch(config.paths.images + '/**/**', gulp.series('images')).on('change', browserSync.reload);
    gulp.watch(config.paths.eleventy + '/**/**', gulp.series('generateSync')).on('change', browserSync.reload);

    done();
});