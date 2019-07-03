const config = require('./_config.json');
const gulp = require('gulp');
const responsive = require('gulp-responsive');
const mergeStream = require('merge-stream');

gulp.task('images', function images() {

    return mergeStream(

      gulp.src(config.paths.images + '/pages/**/*.{png,jpg}')
        .pipe(responsive( {
            'aa_header.jpg': [{
                width: 768,
                format: 'jpg',
                rename: { suffix: '_768_461' },
              }, {
                width: 992,
                format: 'jpg',
                rename: { suffix: '_992_595' },
              }, {
                width: 1200,
                format: 'jpg',
                rename: { suffix: '_1200_720' },
              }, {
                format: 'jpg',
                rename: { suffix: '_2000_1200' },
              }],
            '*/*.jpg': [{
                width: 480,
                format: 'jpg',
                rename: { suffix: '-small' },
              }, {
                width: 960,
                format: 'jpg',
                rename: { suffix: '-medium' },
              }, {
                width: 1440,
                format: 'jpg',
                rename: { suffix: '-large' },
              }, {
                width: 1920,
                format: 'jpg'
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
              }],
            }, {
            errorOnUnusedImage: false,
            withMetadata: false,
            errorOnUnusedConfig: false
            })    
        ).pipe(gulp.dest(config.paths.dist + '/img/pages')),
        gulp.src(config.paths.images + '/posts/**/*.{png,jpg}')
        .pipe(responsive( {
              '*/*.jpg': [{
                width: 480,
                format: 'jpg',
                rename: { suffix: '-small' },
              }, {
                width: 960,
                format: 'jpg',
                rename: { suffix: '-medium' },
              }, {
                width: 1440,
                format: 'jpg',
                rename: { suffix: '-large' },
              }, {
                width: 1920,
                format: 'jpg'
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
              }],
            }, {
            errorOnUnusedImage: false,
            withMetadata: false,
            errorOnUnusedConfig: false
            })    
        ).pipe(gulp.dest(config.paths.dist + '/img/posts')),
        gulp.src(config.paths.images + '/svg/*', {base: config.paths.images}).pipe(gulp.dest(config.paths.dist + '/img')),
        gulp.src(config.paths.images + '/favicon/*', {base: config.paths.images}).pipe(gulp.dest(config.paths.dist + '/img')));
});