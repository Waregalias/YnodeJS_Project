var app = angular.module('LoginModule', []);

app.controller('LoginController', function($scope, $http) {
  $scope.master = {};

  $scope.forgot = function() {
    $scope.forgotClass = 'bg-danger';
    $scope.forgotmsg = "Pleases contact your administrator.";
  };

  $scope.login = function(params) {
    $http({
      method: 'POST',
      url: '/login',
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
          $scope.forgotmsg = response.data.message;
        }
      });
  };
});
