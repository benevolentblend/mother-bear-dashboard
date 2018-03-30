(function() {

  function calendarFilter() {
    function filter(input, display) {
      if(display == 'week')
        return input;

      var filtered = [];
      var day = (new Date).getDay();
      for(var i in input) {
        var currentEvent = input[i];
        switch(day) {
          case 0:
            if(currentEvent.SUN == 'Y')
              filtered.push(input[i]);
              break;
          case 1:
            if(currentEvent.MON == 'Y')
              filtered.push(input[i]);
              break;
          case 2:
            if(currentEvent.TUES == 'Y')
              filtered.push(input[i]);
              break;
          case 3:
            if(currentEvent.WED == 'Y')
              filtered.push(input[i]);
              break;
          case 4:
            if(currentEvent.THURS == 'Y')
              filtered.push(input[i]);
              break;
          case 5:
            if(currentEvent.FRI == 'Y')
              filtered.push(input[i]);
              break;
          case 6:
            if(currentEvent.SAT == 'Y')
              filtered.push(input[i]);
              break;
          default:
              break;
        }
      }

      return filtered;
    }

    return filter;
  }

  angular
    .module('app')
    .filter('calendar', calendarFilter);
})();
