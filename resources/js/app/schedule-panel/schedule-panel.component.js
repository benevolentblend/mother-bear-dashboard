/**
 * Name:    js/app/calendar-info/calendar-info.component.js
 * Author:  Benjamin Thomas
 * Purpose: Component for the panels
 */

(function() {
  var calendarInfo = {
    templateUrl: 'js/app/schedule-panel/schedule-panel.html',
    controller: calendarInfoController
  };


  function calendarInfoController($interval, $http, $scope) {
    var vm = this;
    var timeoutid;
    var status = false;
    var location = '/calendar/benjamin@thomasnetwork.net';

    vm.response = undefined;
    vm.email = '';

    vm.start = function() {
      if(!status) {
        timeoutid = $interval(update, 5 * 60 * 1000);
        status = true;
        update();
      }

    }

    vm.stop = function() {
      if(status) {
        $interval.cancel(timeoutid);
        status = false;
      }
    }

    function success(res) {
      vm.response = res.data;
      console.log(res.data);
    }

    function fail(res) {
      vm.response = undefined;
    }

    function update() {
      var location = 'http://localhost/motherbeardashboard/calendar.php?email=' + vm.email;
      $http.get(location, {cache: false}).then(success, fail);
    }

    $scope.$on('login', function(event, profile) {
      vm.email = profile.email;
      vm.start();
    });

    $scope.$on('logout', function(event) {
      vm.stop();
    });

    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }

  }

  calendarInfoController.$inject = ['$interval', '$http', '$scope'];

  angular
    .module('app')
    .component('schedulePanel', calendarInfo);
})();
