/**
 * Name:    js/app/daily-quote/daily-quote.component.js
 * Author:  Benjamin Thomas
 * Purpose: Component for the panels
 */

(function() {
  var quotePanel = {
    templateUrl: 'js/app/quote-panel/quote-panel.html',
    controller: quoteController
  };


  function quoteController($interval, $http, $rootScope, quoteService) {
    var vm = this;
    var timeoutid;
    var status = false;
    var location = 'http://quotes.rest/qod.json';

    vm.response = undefined;

    $rootScope.$on('login', function(event, profile) {
      quoteService.start();
    });

    $rootScope.$on('logout', function(event) {
      quoteService.stop();
    });

    $rootScope.$on('quote.update', function(event, data) {
      vm.response = data;
    });
  }

  quoteController.$inject = ['$interval', '$http', '$rootScope', 'quoteService'];

  angular
    .module('app')
    .component('quotePanel', quotePanel);
})();
