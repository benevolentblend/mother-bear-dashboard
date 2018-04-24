/**
 * Name:    js/app/calendar-info/calendar-info.component.js
 * Author:  Benjamin Thomas
 * Purpose: Component for the panels
 */

(function() {
  var preferenceInfo = {
    templateUrl: 'js/app/preference-modal/preference-modal.html',
    controller: preferenceInfoInfoController
  };


  function preferenceInfoInfoController($http, $rootScope, $location, config) {
    var vm = this;

    // default colors
    vm.color1 = '#ffffff';
    vm.color2 = '#701931';
    vm.color3 = '#cec7bf';
    vm.layout = 1;

    vm.setColors = function(clr1, clr2, clr3) {
      if(clr1)
        vm.color1 = clr1;
      if(clr2)
        vm.color2 = clr2;
      if(clr3)
        vm.color3 = clr3;
    }

    vm.update = function() {
      $rootScope.$broadcast('customize.update', {
        color1: vm.color1,
        color2: vm.color2,
        color3: vm.color3,
        layout: vm.layout
      });
    }

    vm.changeLayout = function(view) {
      vm.layout = view;
      vm.update();
    }

    vm.loadDefault = function() {
      vm.setColors('#ffffff', '#701931', '#cec7bf');
      vm.layout = 1;
      vm.update();
    }

    function loadSuccess(res) {
      console.log(res);
      vm.setColors(res.data.color1, res.data.color2, res.data.color3);
      vm.update();
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
      $http.get(config.routes.preference.view).then(loadSuccess, loadFail);
    }

    vm.saveUserParams = function() {
      vm.update();
      var params = {
        color1: vm.color1.slice(1),
        color2: vm.color2.slice(1),
        color3: vm.color3.slice(1),
        layout: vm.layout
      }

      $http.post(config.routes.preference.update, params).then(saveSuccess, saveFail);
    }

    $rootScope.$on('login', function(event, profile) {
      console.log('logging in from preferences');
      vm.loadUserColors();
    });

    $rootScope.$on('logout', function(event, profile) {
      vm.loadDefault();
    });

    vm.loadDefault();
  }

  preferenceInfoInfoController.$inject = ['$http', '$rootScope','$location', 'config'];

  function panelDirective($rootScope) {
    return {
      restrict: 'C',
        link: function (scope, element, attrs) {
            $rootScope.$on('customize.update', function(event, data) {
              element.css('background-color', data.color1);
              element.css('color', data.color2);
            })
        }
    }
  }

  function bodyDirective($rootScope) {
    return {
      restrict: 'E',
        link: function (scope, element, attrs) {
            $rootScope.$on('customize.update', function(event, data) {
              element.css('background-color', data.color3);
            })
        }
    }
  }

  bodyDirective.$inject = ['$rootScope'];

  function layout1View() {
    return {
      restrict: 'E',
      templateUrl: './js/app/layout-1.html'
    };
  }

  function layout2View() {
    return {
      restrict: 'E',
      templateUrl: './js/app/layout-2.html'
    };
  }

  function layout3View() {
    return {
      restrict: 'E',
      templateUrl: './js/app/layout-3.html'
    };
  }

  angular
    .module('app')
    .component('preferenceModal', preferenceInfo)
    .directive('panel', panelDirective)
    .directive('body', bodyDirective)
    .directive('layout1View', layout1View)
    .directive('layout2View', layout2View)
    .directive('layout3View', layout3View);
})();
