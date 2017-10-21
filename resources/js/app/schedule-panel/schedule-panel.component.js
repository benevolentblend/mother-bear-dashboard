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


  function calendarInfoController($interval, $http) {
    var vm = this;
    var timeoutid;
    var location = '/calendar/benjamin@thomasnetwork.net';

    vm.response = undefined;

    function success(res) {
      vm.response = res.data;
      console.log(res.data);
    }

    function fail(res) {
      vm.response = undefined;
    }

    function update() {
      var dumpydata = {
        data: {
          events:[{
            "id": 123,
            "summary": "CSC 328",
            "start": {
              "dateTime": "2017-10-21T08:00:00-04:00"
            },
            "end": {
              "dateTime": "2017-10-21T09:20:00-04:00"
            },
          },
          {
            "id": 124,
            "summary": "CSC 354",
            "start": {
              "dateTime": "2017-10-21T13:30:00-04:00"
            },
            "end": {
              "dateTime": "2017-10-21T15:00:00-04:00"
            },
          }]
        }
      }
      success(dumpydata);
      //$http.get(location, {cache: false}).then(success, fail);
    }

    timeoutid = $interval(update, 5 * 60 * 1000);

    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }

    update();
  }

  calendarInfoController.$inject = ['$interval', '$http'];

  angular
    .module('app')
    .component('schedulePanel', calendarInfo);
})();
