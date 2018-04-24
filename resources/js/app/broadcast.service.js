(function() {
  var broadcastService = function($rootScope) {
    return {
      send: function(msg, data) {
        $rootScope.$broadcast(msg, data);
      }
    }
  };

  broadcastService.$inject = ['$rootScope'];

  angular
    .module('app')
    .factory('broadcastService', broadcastService);
})();
