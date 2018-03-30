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
  function dateTimeController($interval, $scope) {
    var vm = this;
    var timeoutid;
    var status = false;
    vm.datetime = new Date();

    vm.start = function() {
      if(!status) {
        //Setup interval call on update every half second (in milliseconds)
        timeoutid = $interval(update, 500);
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

    /**
     * gets current time from the browser
     * @method update
     * @return {}   None
     */
    function update() {
      vm.datetime = new Date();
    }

    $scope.$on('login', function(event, profile) {
      vm.start();
    });

    $scope.$on('logout', function(event) {
      vm.stop();
    });

    // If the component is destroyed, stop the interval call
    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }
  }

  dateTimeController.$inject = ['$interval', '$scope'];

  var dateTime = {
    templateUrl: "js/app/time-panel/time-panel.html",
    controller: dateTimeController
  };

  angular
    .module('app')
    .component('timePanel', dateTime);
})();
