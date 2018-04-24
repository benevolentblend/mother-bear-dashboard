(function() {
  var timeService = function($interval, broadcastService) {
    var timeoutid;
    var status = false;
    var datetime = null;

    function update() {
      datetime = new Date();
      broadcastService.send('time.update', {time: datetime});
    }

    var start = function() {
      if(!status) {
        //Setup interval call on update every half second (in milliseconds)
        timeoutid = $interval(update, 500);
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

  timeService.$inject = ['$interval', 'broadcastService'];

  angular
    .module('app')
    .factory('timeService', timeService);
})();
