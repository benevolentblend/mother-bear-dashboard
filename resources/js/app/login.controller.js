(function() {

  function loginController($http, $rootScope, config) {
    var vm = this;

    vm.email = "";
    vm.password = "";
    vm.loggedIn = false;
    vm.message = null;
    vm.layout = 1;

    function successfulLogin (res) {

      vm.loggedIn = true;
      vm.message = null;
      vm.password = '';
      console.log(res);

      $rootScope.$broadcast('login', {
        email: vm.email
      });
    }

    function successfulLogout (res) {
      vm.loggedIn = false;
      console.log(res);

      $rootScope.$broadcast('logout');
    }

    function failedLogin (res) {
      console.log('login failed.')
      console.log(res);
      vm.loggedIn = false;

      if(res.data && res.data.message)
        vm.message = res.data.message;
      else
        vm.message = "There was a problem logging in.";
    }

    function failedLogout (res) {
      console.log('logout failed.')
      console.log(res);
      if(res.data && res.data.message)
        vm.message = res.data.message;
      else
        vm.message = "There was a problem logging out.";
    }

    vm.loginUser = function() {
      console.log('called login');
      var data = {
        email: vm.email,
        password: vm.password
      }
      $http.post(config.routes.user.login, data).then(successfulLogin, failedLogin);
    }

    vm.logoutUser = function() {
      $http.get(config.routes.user.logout).then(successfulLogout, failedLogout);
    }

    $rootScope.$on('customize.update', function(event, data) {
      vm.layout = data.layout;
    });
  }

  loginController.$inject = ['$http', '$rootScope', 'config'];

  angular
    .module('app')
    .controller('loginController', loginController);
})();
