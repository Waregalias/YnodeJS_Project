var app = angular.module('LoginModule', []);

app.controller('LoginController', function($scope, $http) {
  $scope.master = {};

  $scope.login = function(params) {
    $http.post("/login", {
      params: {
        key: ($scope.master.length)+1,
              username: $scope.username,
              password: $scope.password
      }})
      .then(function successCallback(response) {
      });
  };
});
