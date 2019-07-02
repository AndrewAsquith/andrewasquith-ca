const config = require('./_config.json');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const responsive = require('gulp-responsive');
const mergeStream = require('merge-stream');

gulp.task('images', function images() {

    return mergeStream(
        gulp.src([config.paths.images + '/posts/**/*.{png,jpg}', config.paths.images + '/aa_header.jpg'])
        .pipe(responsive( {
            'aa_header.jpg': [{
                width: 768,
                rename: { suffix: '_768_461' },
              }, {
                width: 992,
                rename: { suffix: '_992_595' },
              }, {
                width: 1200,
                rename: { suffix: '_1200_720' },
              }, {
                rename: { suffix: '_2000_1200' },
              }],
            '*/*.jpg': [{
                width: 480,
                rename: { suffix: '-small' },
              }, {
                width: 960,
                rename: { suffix: '-medium' },
              }, {
                width: 1440,
                rename: { suffix: '-large' },
              }, {
                // Compress, strip metadata, and rename original image
                width: 1920,
                rename: { suffix: '-full' },
              }],
              '*/*.png': [{
                width: 480,
                rename: { suffix: '-small' },
              }, {
                width: 960,
                rename: { suffix: '-medium' },
              }, {
                width: 1440,
                rename: { suffix: '-large' },
              }, {
                width: 1920,
                rename: { suffix: '-full' },
              }],
            }, {
            errorOnUnusedImage: false,
            withMetadata: false,
            errorOnUnusedConfig: false
            })    
        ).pipe(gulp.dest(config.paths.dist + '/img')),
        gulp.src(config.paths.images + '/svg/*', {base: config.paths.images}).pipe(gulp.dest(config.paths.dist + '/img')),
        gulp.src(config.paths.images + '/favicon/*', {base: config.paths.images}).pipe(gulp.dest(config.paths.dist + '/img')));
});