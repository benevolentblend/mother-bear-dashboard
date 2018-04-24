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


  function calendarInfoController($interval, $http, $rootScope, scheduleService) {
    var vm = this;

    vm.response = undefined;

    $rootScope.$on('login', function(event, profile) {
      scheduleService.start(profile.email);
    });

    $rootScope.$on('logout', function(event) {
      vm.stop();
    });

    $rootScope.$on('schedule.update', function(event, data) {
      vm.response = data;
    });
  }

  calendarInfoController.$inject = ['$interval', '$http', '$rootScope', 'scheduleService'];

  angular
    .module('app')
    .component('schedulePanel', calendarInfo);
})();
