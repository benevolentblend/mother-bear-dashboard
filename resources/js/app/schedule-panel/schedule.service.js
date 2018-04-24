(function() {
  var scheduleService = function($interval, $http, broadcastService) {
    var timeoutid;
    var status = false;
    var email = '';
    var location = 'http://localhost/motherbeardashboard/calendar.php?email=';

    function success(res) {
      console.log(res.data);
      broadcastService.send('schedule.update', res.data);
    }

    function fail(res) {
      console.log('failed', res.data);
    }

    function update() {
      $http.get(location + email, {cache: false}).then(success, fail);
    }

    function start(em) {
      if(!status) {
        email = em;
        timeoutid = $interval(update, 5 * 60 * 1000);
        status = true;
        update();
      }
    }

    function stop() {
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

  scheduleService.$inject = ['$interval', '$http', 'broadcastService'];

  angular
    .module('app')
    .factory('scheduleService', scheduleService);
})();
