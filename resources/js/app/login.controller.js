(function() {

  function loginController($http, $scope) {
    var vm = this;

    vm.email = "";
    vm.password = "";
    vm.loggedIn = false;
    vm.message = null;

    function successfulLogin (res) {
      vm.loggedIn = true;
      vm.message = null;
      vm.password = '';
      console.log(res);

      $scope.$broadcast('login', {
        email: vm.email
      });
    }

    function successfulLogout (res) {
      vm.loggedIn = false;
      console.log(res);

      $scope.$broadcast('logout');
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

    this.loginUser = function() {
      var data = {
        email: vm.email,
        password: vm.password
      }
      $http.post('http://localhost/motherbeardashboard/login.php', data).then(successfulLogin, failedLogin);
    }

    this.logoutUser = function() {
      $http.get('http://localhost/motherbeardashboard/logout.php').then(successfulLogout, failedLogout);
    }
  }

  loginController.$inject = ['$http', '$scope'];

  angular
    .module('app')
    .controller('loginController', loginController);
})();
