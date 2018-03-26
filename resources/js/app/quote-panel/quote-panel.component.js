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


  function dailyQuoteController($interval, $http, $scope) {
    var vm = this;
    var timeoutid;
    var status = false;
    var location = 'http://quotes.rest/qod.json';

    vm.response = undefined;

    vm.start = function() {
      if(!status) {
        timeoutid = $interval(update, 4 * 60 * 60 * 1000);
        status = true;
        update();
      }
    }

    vm.stop = function() {
      if(status) {
        $interval.cancel(timeoutid);
        status = false;
      }
    }

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

    $scope.$on('login', function(event, profile) {
      vm.start();
    });

    $scope.$on('logout', function(event) {
      vm.stop();
    });

    vm.$onDestroy = function() {
      $interval.cancel(timeoutid);
    }
  }

  dailyQuoteController.$inject = ['$interval', '$http', '$scope'];

  angular
    .module('app')
    .component('quotePanel', dailyQuote);
})();
