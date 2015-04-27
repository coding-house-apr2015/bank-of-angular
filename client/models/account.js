'use strict';

angular.module('poseidon')
.factory('Account', function($rootScope, $firebaseObject, $firebaseArray){
  var fbUser;
  var afUser;

  function Account(){
  }

  Account.init = function(){
    fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    afUser = $firebaseObject(fbUser);
    return afUser;
  };

  Account.addTransaction = function(name, tx){
    var fbTransactions = fbUser.child('accounts/' + tx.type);
    var afTransactions = $firebaseArray(fbTransactions);
    afTransactions.$add(tx);
  };

  Account.add = function(name){
    var names = afUser.names ? afUser.names.split(',') : [];
    names.push(name);

    afUser.names = names.join(',');
    return afUser.$save();
  };

  return Account;
});
