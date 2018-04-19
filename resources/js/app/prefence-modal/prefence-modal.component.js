/**
 * Name:    js/app/calendar-info/calendar-info.component.js
 * Author:  Benjamin Thomas
 * Purpose: Component for the panels
 */

(function() {
  var preferenceInfo = {
    templateUrl: 'js/app/prefence-modal/prefernce-modal.html',
    controller: preferenceInfoInfoController
  };


  function preferenceInfoInfoController($http, $scope) {
    var color1Elements = ['.panel', 'background-color'];
    var color2Elements = ['.panel', 'color'];
    var color3Elements = ['body', 'background-color'];
    var vm = this;

    // default colors
    vm.color1 = '#ffffff';
    vm.color2 = '#701931';
    vm.color3 = '#cec7bf';

    vm.setColors = function(clr1, clr2, clr3) {
      if(clr1)
        vm.color1 = clr1;
      if(clr2)
        vm.color2 = clr2;
      if(clr3)
      vm.color3 = clr3;
    }

    vm.updateColors = function() {
      $(color1Elements[0]).css(color1Elements[1], vm.color1);
      $(color2Elements[0]).css(color2Elements[1], vm.color2);
      $(color3Elements[0]).css(color3Elements[1], vm.color3);
    }

    vm.loadDefaultColors = function() {
      vm.setColors('#ffffff', '#701931', '#cec7bf');
      vm.updateColors();
    }

    function loadSuccess(res) {
      console.log(res);
      vm.setColors(res.data.color1, res.data.color2, res.data.color3);
      vm.updateColors();
    }

    function saveSuccess(res) {
      console.log(res);
      console.log('Saved preferences');
    }

    function loadFail(res) {
      console.log('Failed', res);
    }

    function saveFail(res) {
      console.log('Failed', res);
    }

    vm.loadUserColors = function() {
      $http.get('http://localhost/motherbeardashboard/getPreferences.php?email=bthom214@live.kutztown.edu').then(loadSuccess, loadFail);
    }

    vm.saveUserParams = function() {
      vm.updateColors();
      var params = {
        color1: vm.color1.slice(1),
        color2: vm.color2.slice(1),
        color3: vm.color3.slice(1)
      }

      $http.post('http://localhost/motherbeardashboard/updatePreferences.php', params).then(saveSuccess, saveFail);
    }

    $scope.$on('login', function(event, profile) {
      console.log('logging in from preferences');
      vm.loadUserColors();
    });

    $scope.$on('logout', function(event, profile) {
      vm.loadDefaultColors();
    });

    vm.loadDefaultColors();
  }

  preferenceInfoInfoController.$inject = ['$http', '$scope'];

  angular
    .module('app')
    .component('preferenceModal', preferenceInfo);
})();
