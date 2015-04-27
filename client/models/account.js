'use strict';

angular.module('poseidon')
.factory('Account', function($rootScope, $firebaseObject, $firebaseArray, $window){
  var fbUser;
  var afUser;

  function Account(){
  }

  Account.init = function(){
    fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    afUser = $firebaseObject(fbUser);
    return afUser;
  };

  Account.delTransaction = function(tx, index){
    var fbTransactions = fbUser.child('accounts/' + tx.type);
    var afTransactions = $firebaseArray(fbTransactions);
    afTransactions.$loaded().then(function(){
      var foundTx = afTransactions[index];
      afTransactions.$remove(foundTx);
    });
  };

  Account.addTransaction = function(name, tx){
    var transaction = angular.copy(tx);
    transaction.date = transaction.date.getTime();
    transaction.createdAt = $window.Firebase.ServerValue.TIMESTAMP;
    transaction.name = name;
    var fbTransactions = fbUser.child('accounts/' + transaction.type);
    var afTransactions = $firebaseArray(fbTransactions);
    afTransactions.$add(transaction);
  };

  Account.add = function(name){
    var names = afUser.names ? afUser.names.split(',') : [];
    names.push(name);

    afUser.names = names.join(',');
    return afUser.$save();
  };

  return Account;
});
