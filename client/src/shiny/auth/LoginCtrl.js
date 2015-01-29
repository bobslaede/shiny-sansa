"use strict";


class LoginCtrl {
  constructor($scope, auth, $state) {
    this.scope = $scope;
    this.state = $state;
    this.auth = auth;

    this.scope.user = {
      email: '',
      password: ''
    }
    this.scope.error = '';
  }

  login() {
    console.log('login', this.scope.user);
    this.auth.login(this.scope.user)
      .then(user => {
        this.state.go('app')
      })
      .catch(err => {
        console.log(err);
        this.scope.error = err;
      })
  }
}

export default angular.module('shiny.auth.login', [])
  .controller('LoginCtrl', LoginCtrl);
