(function() {
  var scheduleService = function($interval, $http, broadcastService, config) {
    var timeoutid;
    var status = false;
    var email = '';

    function success(res) {
      console.log(res.data);
      broadcastService.send('schedule.update', res.data);
    }

    function fail(res) {
      console.log('failed', res.data);
    }

    function update() {
      $http.get(config.routes.schedule.view, {cache: false}).then(success, fail);
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

  scheduleService.$inject = ['$interval', '$http', 'broadcastService', 'config'];

  angular
    .module('app')
    .factory('scheduleService', scheduleService);
})();
