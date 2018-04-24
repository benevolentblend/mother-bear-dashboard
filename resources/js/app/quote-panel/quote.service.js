(function() {
  var quoteService = function($interval, $http, broadcastService) {
    var timeoutid;
    var status = false;
    var location = 'http://quotes.rest/qod.json';

    function success(res) {
      console.log(res.data);
      broadcastService.send('quote.update', res.data);
    }

    function fail(res) {
      console.log('failed', res.data);
    }

    function update() {
      $http.get(location, {cache: true}).then(success, fail);
    }

    function start() {
      if(!status) {
        timeoutid = $interval(update, 4 * 60 * 60 * 1000);
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

  quoteService.$inject = ['$interval', '$http', 'broadcastService'];

  angular
    .module('app')
    .factory('quoteService', quoteService);
})();
