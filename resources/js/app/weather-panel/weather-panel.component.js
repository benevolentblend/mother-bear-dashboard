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
  function weatherInfoController($interval, $http, $rootScope, weatherService) {
    var vm = this;

    vm.response;

    $rootScope.$on('login', function(event, profile) {
      weatherService.start();
    });

    $rootScope.$on('logout', function(event) {
      weatherService.stop();
    });

    $rootScope.$on('weather.update', function(event, data) {
      vm.response = data;
    });

    vm.$onInit = function () {
      vm.response = undefined;
    }
  }

  // If this file is complied with a minifier program, insure that the correct
  // modules are injected
  weatherInfoController.$inject = ['$interval', '$http', '$rootScope', 'weatherService'];

  // Setup the weatherInfo component with the templateUrl and controller
  var weatherInfo = {
    templateUrl: 'js/app/weather-panel/weather-panel.html',
    controller: weatherInfoController
  };

  angular
    .module('app')
    .component('weatherPanel', weatherInfo);
})();
