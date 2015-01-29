"use strict";

import utils from '../utils/utils';
import service from './authService';
import login from './LoginCtrl';

export default angular.module('shiny.auth', [
  service.name,
  login.name,
  utils.name
]);
