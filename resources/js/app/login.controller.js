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
      console.log(res);

      $scope.$broadcast('login', {
        username: vm.username
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
      $scope.$broadcast('logout');
    }
  }

  loginController.$inject = ['$http', '$scope'];

  angular
    .module('app')
    .controller('loginController', loginController);
})();
