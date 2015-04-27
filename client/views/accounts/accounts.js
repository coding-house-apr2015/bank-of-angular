'use strict';

angular.module('poseidon')
.controller('AccountsCtrl', function($scope, Account){
  var afUser = Account.init();
  afUser.$loaded().then(syncNames);

  $scope.addAccount = function(name){
    Account.add(name).then(syncNames);
    $scope.accountName = '';
  };

  function syncNames(){
    $scope.names = afUser.names ? afUser.names.split(',') : [];
  }
});
