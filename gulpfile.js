var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var to5ify = require('6to5ify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');

var config = {
  entryFile: './client/src/index.js',
  outputDir: './client/dist/',
  outputFile: 'index.js'
};
// clean the output directory
gulp.task('clean', function(cb){
  rimraf(config.outputDir, cb);
});

var _bundler;
var getBundler = function () {
  if (!_bundler) {
    _bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return _bundler;
};

var bundle = function () {
  return getBundler()
    .transform(to5ify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
};

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent'], function() {
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});
