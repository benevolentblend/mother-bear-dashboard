/************************************************************
 * Author:          Benjamin Thomas
 * Major:           Software Development
 * Creation Date:   October 21, 2017
 * Due Date:        TBD
 * Course:          CSC354 010
 * Professor Name:  Dr. Hussain
 * Filename:        resources/app/time-panel.component.js
 * Purpose:         Logic for the time panel component
/************************************************************/

(function() {

  /**
   * controller for weatherInfo component. Handles refreshing the content
   * @method dateTimeController
   * @param  {module}           $interval angular module to handle http
   *                                         requests
   * @return {}                           None
   */
  function dateTimeController($interval, $rootScope, timeService) {
    var vm = this;
    vm.datetime = null;

    $rootScope.$on('login', function(event, profile) {
      timeService.start();
    });

    $rootScope.$on('logout', function(event) {
      timeService.stop();
    });

    $rootScope.$on('time.update', function(event, data) {
      vm.datetime = data.time;
    });

    vm.$onInit = function () {
      vm.datetime = new Date();
    }
  }

  dateTimeController.$inject = ['$interval', '$rootScope', 'timeService'];

  var dateTime = {
    templateUrl: "js/app/time-panel/time-panel.html",
    controller: dateTimeController
  };

  angular
    .module('app')
    .component('timePanel', dateTime);
})();
