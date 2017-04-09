var app = angular.module('HomeModule', ['ngCookies']);

app.controller('LogoutController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  $scope.master = {};

  $scope.logout = function() {
    $http({
      method: 'POST',
      url: '/logout',
      headers: {'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      },
      data: {username: $cookies.get('user')}
    }).then(function successCallback(response) {
      console.log(response);
    });
    $cookies.remove('user');
    $cookies.remove('token');
    location.reload();
  };
}]);
