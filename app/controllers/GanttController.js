angular.module('demoApp', ['ngAnimate', 'weeklyScheduler', 'weeklySchedulerI18N'])

  .config(['weeklySchedulerLocaleServiceProvider', function (localeServiceProvider) {
    localeServiceProvider.configure({
      doys: {'es-es': 4},
      lang: {'es-es': {month: 'Mes', weekNb: 'número de la semana', addNew: 'Añadir'}},
      localeLocationPattern: 'https://code.angularjs.org/1.5.8/i18n/angular-locale_{{locale}}.js'
    });
  }])

  .controller('DemoController', ['$scope', '$http', '$timeout', 'weeklySchedulerLocaleService', '$log',
    function ($scope, $http, $timeout, localeService, $log) {

      $scope.model = {
        locale: localeService.$locale.id,
        options: {/*monoSchedule: true*/},
        items: [{
          label: 'Item 1',
          editable: true,
          schedules: [
            {start: moment('2015-12-27').toDate(), end: moment('2016-08-01').toDate()}
          ]
        }]
      };

      $timeout(function () {
        $scope.model.items = $scope.model.items.concat([{
          label: 'Item 2',
          schedules: [
            {start: moment('2016-05-03').toDate(), end: moment('2017-02-01').toDate()},
            {start: moment('2015-11-20').toDate(), end: moment('2016-02-01').toDate()}
          ]
        }, {
          label: 'Item 3',
          schedules: [
            {start: moment('2017-08-09').toDate(), end: moment('2017-08-21').toDate()},
            {start: moment('2017-09-12').toDate(), end: moment('2017-10-12').toDate()}
          ]
        }]);
      }, 1000);

      this.doSomething = function (itemIndex, scheduleIndex, scheduleValue) {
        $log.debug('The model has changed!', itemIndex, scheduleIndex, scheduleValue);

        console.log($scope.model);
        console.log(scheduleIndex);
        console.log(scheduleValue);

    	$http({
          method: 'POST',
          url: '/gantt',
          headers: {'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {json: JSON.stringify($scope.model)}
        }).then(function successCallback(response) {

          });
      };

      this.onLocaleChange = function () {
        $log.debug('The locale is changing to', $scope.model.locale);
        localeService.set($scope.model.locale).then(function ($locale) {
          $log.debug('The locale changed to', $locale.id);
        });
      };
    }]);
