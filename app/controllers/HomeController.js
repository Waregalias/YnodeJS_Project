var app = angular.module('HomeModule', ['ngCookies']);

app.controller('LogoutController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  $scope.master = {};

  $scope.logout = function() {
    $cookies.remove('token');
    $http.get('/' , {}).then(function(result) { });
  };
}]);
