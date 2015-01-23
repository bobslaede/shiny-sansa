"use strict";

import shiny from './app/shiny';
import polymer from './polymer';

var app = angular.module('app', [
  shiny.name,
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
