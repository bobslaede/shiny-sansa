"use strict";

import utils from '../utils/utils';

export default angular.module('shiny.auth.service', [
  'lbServices',
  utils.name
])
  .service('auth', function (User, LoopBackAuth, localStorage, $q) {

    var getAuthentication = function () {
      console.log('get current', User);
      return $q((resolve, reject) => {
        User.getCurrent().$promise
          .then(function (user) {
            if (user) {
              resolve(user);
            } else {
              reject('no user');
            }
          }, reject)
      });
    };

    var login = function (user) {
      return User.login(user).$promise;
    }

    return {
      getAuthentication,
      login
    }

  });
