'use strict';

angular.module('poseidon')
.factory('Account', function($rootScope, $firebaseObject){
  var fbUser;
  var afUser;

  function Account(){
  }

  Account.init = function(){
    fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    afUser = $firebaseObject(fbUser);
  };

  Account.add = function(name){
    var names = afUser.names ? afUser.names.split(',') : [];
    names.push(name);

    afUser.names = names.join(',');
    afUser.$save();
  };

  return Account;
});
