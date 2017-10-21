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
  function dateTimeController($interval) {
    var vm = this;
    var timeoutid;
    vm.datetime = new Date();

    /**
     * gets current time from the browser
     * @method update
     * @return {}   None
     */
    function update() {
      vm.datetime = new Date();
    }

    //Setup interval call on update every half second (in milliseconds)
    timeoutid = $interval(update, 500);

    // If the component is destroyed, stop the interval call
    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }

    // Call update for the first time
    update();
  }

  dateTimeController.$inject = ['$interval'];

  var dateTime = {
    templateUrl: "js/app/time-panel/time-panel.html",
    controller: dateTimeController
  };

  angular
    .module('app')
    .component('timePanel', dateTime);
})();
