"use strict";

angular.module('menu.controllers', ['account.services'])
.controller('MenuCtrl', function($scope, accountService) {
    $scope.status = accountService.status;
});
