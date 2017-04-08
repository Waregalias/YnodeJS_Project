var app = angular.module('SingupModule', []);

app.controller('SignupController', ['$scope', '$http', function($scope, $http) {
  $scope.master = {};

  $scope.resultat = function() {
    $scope.messageClass = 'bg-success';
    $scope.message = 'User saved successfully ! Go to log in page !';
  };

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
          console.log("error");
        } else {
          $scope.resultat();
        }
      });
  };
}]);
