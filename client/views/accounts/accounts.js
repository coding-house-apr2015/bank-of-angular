'use strict';

angular.module('poseidon')
.controller('AccountsCtrl', function($scope, Account){
  Account.init();

  $scope.addAccount = function(name){
    Account.add(name);
  };
});
