const gulp = require('gulp');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

gulp.task('generate',  function generate(done) { 
    exec('npx eleventy');
    done();
});

gulp.task('generateSync',  function generateSync(done) { 
    execSync('npx eleventy');
    done(); 
});
