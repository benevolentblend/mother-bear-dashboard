(function() {

  function loginController($http, $rootScope) {
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
      vm.message = res.data.message;
      vm.loggedIn = false;
    }

    function failedLogout (res) {
      console.log('logout failed.')
      console.log(res);
      vm.message = res.data.message;
    }

    vm.loginUser = function() {
      console.log('called login');
      var data = {
        email: vm.email,
        password: vm.password
      }
      $http.post('http://localhost/motherbeardashboard/login.php', data).then(successfulLogin, failedLogin);
    }

    vm.logoutUser = function() {
      $http.get('http://localhost/motherbeardashboard/logout.php').then(successfulLogout, failedLogout);
    }

    $rootScope.$on('customize.update', function(event, data) {
      vm.layout = data.layout;
    });
  }

  loginController.$inject = ['$http', '$rootScope'];

  angular
    .module('app')
    .controller('loginController', loginController);
})();
