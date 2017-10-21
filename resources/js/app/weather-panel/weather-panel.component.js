/**
 * Name:    js/app/weather-info/weather-info.component.js
 * Author:  Benjamin Thomas
 * Purpose: Component for weather info panel
 */

(function() {
  /**
   * Controller for weatherInfo component. Handles the http requests as well as
   * refreshing the content
   * @method weatherInfoController
   * @param  {module}              $interval angular module to handle interval
   *                                         calls
   * @param  {module}              $http     angular module to handle http
   *                                         requests
   * @return {}                              None
   */
  function weatherInfoController($interval, $http) {
    var vm = this;
    var timeoutid;
    var location = 'http://api.openweathermap.org/data/2.5/weather';
    var apikey = 'ddd84a4441bdebf3df5df4140cae463a';
    var q = '19530';
    var units = 'imperial';
    var uri = location + '?apikey=' + apikey + '&q=' + q + '&units=' + units;
    vm.response = undefined;

    /**
     * successful http callback
     * @method success
     * @param  {object} res contains the response from the http request
     * @return {[   ]}     None
     */
    function success(res) {
      vm.response = res.data;
      console.log(res.data);
    }

    /**
     * failing http callback
     * @method fail
     * @param  {object} res contains the response from the http request
     * @return {[   ]}     None
     */
    function fail(res) {
      vm.response = undefined;
    }

    /**
     * http request that calls success or fail, depending on if the request
     * was successful
     * @method update
     * @return {} None
     */
    function update() {
      $http.get(uri,{cache: false}).then(success, fail);
    }

    // Setup interval call on update every 5 minutes (in milliseconds)
    timeoutid = $interval(update, 5 * 60 * 1000);

    // If the component is destroyed, stop the interval call
    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }

    // Call update for the first time
    update();
  }

  // If this file is complied with a minifier program, insure that the correct
  // modules are injected
  weatherInfoController.$inject = ['$interval', '$http'];

  // Setup the weatherInfo component with the templateUrl and controller
  var weatherInfo = {
    templateUrl: 'js/app/weather-panel/weather-panel.html',
    controller: weatherInfoController
  };

  angular
    .module('app')
    .component('weatherPanel', weatherInfo);
})();
