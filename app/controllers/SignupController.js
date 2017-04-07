var app = angular.module('SingupModule', []);

app.controller('SignupController', ['$scope', '$http', function($scope, $http) {
  $scope.master = {};

  $scope.message = function() {
    $scope.messageClass = 'bg-danger';
    $scope.messageError = "Pleases contact your administrator.";
    $scope.messageSuccess = "User saved successfully !";
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
            $scope.forgotClass = 'bg-danger';
            $scope.forgotmsg = response.data.messageError;
          } else {
            $scope.forgotClass = 'bg-success';
            $scope.forgotmsg = response.data.messageSuccess;
          }
      });
  };
}]);
