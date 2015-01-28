"use strict";

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

var watchLess = require('gulp-watch-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

var config = {
  entryDir: path.join(__dirname, '/client/src'),
  outputDir:  path.join(__dirname, '/client/dist'),
  entryLess: path.join(__dirname, '/client/src', 'shiny', 'less', 'index.less'),
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
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.outputDir))
};

gulp.task('less', function () {
  gulp.src(config.entryLess)
    .pipe(watchLess(config.entryLess, {
      less: lessConfig
    }))
    .pipe(less(lessConfig))
    .pipe(gulp.dest(path.join(config.outputDir, 'styles')));
});


gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent', 'less'], function() {
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});
