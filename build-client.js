'use strict';

var fs = require('fs');
var browserify = require('browserify');
var to5ify = require('6to5ify');
var path = require('path');
var html = require('html-browserify');

var srcDir = path.join(__dirname, 'client', 'src');
var distDir = path.join(__dirname, 'client', 'dist');

browserify({ debug: true })
  .transform(to5ify.configure({
    sourceMapRelative: srcDir
  }))
  .transform(html)
  .require(path.join(srcDir, 'index.js'), { entry: true })
  .bundle()
  .on('error', function(err) {
    console.log('Error : ' + err.message);
  })
  .pipe(fs.createWriteStream(path.join(distDir, 'index.js')));
