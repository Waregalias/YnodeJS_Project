var app = angular.module('SingupModule', []);

app.controller('SignupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.master = {};
  $scope.disabled = false;

  $scope.signup = function(params) {
    $http({
      method: 'POST',
      url: '/signup',
      headers: {'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      },
      data: {username: $scope.username, password: $scope.password}
    }).then(function successCallback(response) {
        if (!response.data.success) {
          $scope.messageClass = 'bg-danger';
          $scope.message = response.data.message;
        } else {
          $scope.disabled = true;
          $scope.messageClass = 'bg-success';
          $scope.message = response.data.message;
          window.location = "/";
        }
      });
  };
}]);
