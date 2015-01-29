"use strict";

class Storage {
  constructor(type) {
    console.log('new storage', type);
  }
}

export default angular.module('shiny.localstorage', [])
  .factory('StorageFactory', function () {

    return Storage;
  })
  .factory('localStorage', function (StorageFactory) {
    return new StorageFactory('local');
  });
