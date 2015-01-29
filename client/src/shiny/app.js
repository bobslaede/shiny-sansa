"use strict";

import utils from './utils/utils';
import auth from './auth/auth';

export default angular.module('shiny.app', [
  'lbServices',
  'ui.router',
  utils.name,
  auth.name
])
  .config(function (LoopBackResourceProvider, $stateProvider, $urlRouterProvider) {
    LoopBackResourceProvider.setUrlBase('http://127.0.0.1:3007/api')

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        template: require('./app.html'),
        resolve: {
          _authenticated: function (auth, $state) {
            return auth.getAuthentication()
              .catch(err => {
                console.log(err);
                $state.go('login');
              })
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl as loginCtrl',
        template: require('./auth/login.html')
      })


  })
  .run(function (User, LoopBackAuth) {
    console.log(User, LoopBackAuth);
  })
