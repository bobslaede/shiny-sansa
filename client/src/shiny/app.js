"use strict";


export default angular.module('shiny.app', [
  'lbServices'
])
  .config(function (LoopBackResourceProvider) {
    LoopBackResourceProvider.setUrlBase('http://127.0.0.1:3007/api')
  })
  .run(function (User, LoopBackAuth) {
    console.log(User, LoopBackAuth);
  })
