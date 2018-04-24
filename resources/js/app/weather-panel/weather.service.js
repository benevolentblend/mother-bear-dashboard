(function() {
  var weatherService = function($interval, $http, broadcastService, config) {
    var timeoutid;
    var status = false;
    var location = config.routes.weather.view;
    var apikey = config.keys.weather;
    var q = config.preferences.weather.q;
    var unit = config.preferences.weather.unit;
    var uri = location + '?apikey=' + apikey + '&q=' + q + '&units=' + unit;

    function success(res) {
      console.log(res);
      broadcastService.send('weather.update', res.data);
    }

    function fail(res) {
      console.log('fail', res);
    }

    function update() {
      $http.get(uri, {cache: false}).then(success, fail);
    }

    var start = function() {
      if(!status) {
        //Setup interval call on update every half second (in milliseconds)
        timeoutid = $interval(update, 5 * 60 * 1000);
        status = true;
        update();
      }
    }

    var stop = function() {
      if(status) {
        $interval.cancel(timeoutid);
        status = false;
      }
    }

    return {
      start: start,
      stop: stop
    }
  }

  weatherService.$inject = ['$interval', '$http', 'broadcastService', 'config'];

  angular
    .module('app')
    .factory('weatherService', weatherService);
})();
