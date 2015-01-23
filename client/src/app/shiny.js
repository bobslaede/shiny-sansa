"use strict";

export default angular.module('shiny', [])
  .directive('shinyApp', function () {
    return {
      restrict: 'E',
      template: require('./shiny-app.html')
    }
  });
