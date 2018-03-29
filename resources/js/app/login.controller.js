(function() {

  function loginController($http, $scope) {
    var vm = this;

    vm.email = "";
    vm.password = "";
    vm.loggedIn = false;
    vm.message = null;

    function successful (res) {
      vm.loggedIn = true;
      vm.message = null;
      vm.password = '';
      console.log(res);

      $scope.$broadcast('login', {
        email: vm.email
      });
    }

    function failed (res) {
      console.log('login failed.')
      console.log(res);
      vm.message = res.data.message;
      vm.loggedIn = false;
    }

    this.loginUser = function() {
      var data = {
        email: vm.email,
        password: vm.password
      }
      $http.post('http://localhost/motherbeardashboard/login.php', data).then(successful, failed);
    }

    this.logoutUser = function() {
      vm.loggedIn = false;
      $http.post('http://localhost/motherbeardashboard/logout.php', data)
      $scope.$broadcast('logout');
    }
  }

  loginController.$inject = ['$http', '$scope'];

  angular
    .module('app')
    .controller('loginController', loginController);
})();
