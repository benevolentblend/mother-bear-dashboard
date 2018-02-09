/**
 * Name:    js/app/daily-quote/daily-quote.component.js
 * Author:  Benjamin Thomas
 * Purpose: Component for the panels
 */

(function() {
  var dailyQuote = {
    templateUrl: 'js/app/quote-panel/quote-panel.html',
    controller: dailyQuoteController
  };


  function dailyQuoteController($interval, $http) {
    var vm = this;
    var timeoutid;
    var location = 'http://quotes.rest/qod.json';

    vm.response = undefined;

    function success(res) {
      vm.response = res.data;
      console.log(res.data);
    }

    function fail(res) {
      vm.response = undefined;
    }

    function update() {
      $http.get(location, {cache: true}).then(success, fail);
    }

    timeoutid = $interval(update, 4 * 60 * 60 * 1000);

    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }

    update();
  }

  dailyQuoteController.$inject = ['$interval', '$http'];

  angular
    .module('app')
    .component('quotePanel', dailyQuote);
})();
