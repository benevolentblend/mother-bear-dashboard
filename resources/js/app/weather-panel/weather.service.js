(function() {
  var weatherService = function($interval, $http, broadcastService) {
    var timeoutid;
    var status = false;
    var location = 'http://api.openweathermap.org/data/2.5/weather';
    var apikey = 'ddd84a4441bdebf3df5df4140cae463a';
    var q = 'Kutztown';
    var units = 'imperial';
    var uri = location + '?apikey=' + apikey + '&q=' + q + '&units=' + units;

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

  weatherService.$inject = ['$interval', '$http', 'broadcastService'];

  angular
    .module('app')
    .factory('weatherService', weatherService);
})();
