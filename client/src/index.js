"use strict";

import polymer from './polymer/polymer';
import shiny from './shiny/app';

var app = angular.module('app', [
  shiny.name,
  polymer.name
])
  .run(function () {
    console.log('run');
  })

document.addEventListener('polymer-ready', function() {
  console.log('polymer-ready');
  angular.bootstrap(document, [
    app.name
  ])
});
