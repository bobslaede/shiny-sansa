"use strict";


require("6to5/register");

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var to5ify = require('6to5ify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var html = require('html-browserify');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var rename = require('gulp-rename');

var watchLess = require('gulp-watch-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

var config = {
  entryDir: path.join(__dirname, '/client/src'),
  outputDir:  path.join(__dirname, '/client/dist'),
  entryLess: path.join(__dirname, '/client/src', 'shiny', 'less', 'index.less')
};

var lessConfig = {
  paths: [ path.join(config.entryDir, 'shiny', 'less', 'includes') ],
  plugins: [autoprefix]
};

// clean the output directory
gulp.task('clean', function(cb){
  rimraf(config.outputDir, cb);
});

var _bundler;
var getBundler = function () {
  if (!_bundler) {
    _bundler = watchify(
      browserify(
        path.join(config.entryDir, 'index.js'), _.extend({ debug: true }, watchify.args)
      )
    );
  }
  return _bundler;
};

var bundle = function () {
  return getBundler()
    .transform(to5ify)
    .transform(html)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.outputDir))
};

gulp.task('less', function () {
  gulp.src(config.entryLess)
    .pipe(sourcemaps.init())
    .pipe(less(lessConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(config.outputDir, 'styles')));
});

gulp.task('js', function () {
  return bundle();
})

gulp.task('loopback', function () {
  return gulp.src('./server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest(path.join(config.outputDir, 'loopback.js')));
});


gulp.task('build-persistent', ['clean', 'js'], function() {
  process.exit(0);
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent', 'less'], function() {
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});
