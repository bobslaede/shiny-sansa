"use strict";

import polymer from './shiny/polymer/polymer';

var app = angular.module('app', [
  polymer.name
])
  .run(function () {
    console.log('run')
  })

document.addEventListener('polymer-ready', function() {
  console.log('polymer-ready');
  angular.bootstrap(document, [
    app.name
  ])
});
