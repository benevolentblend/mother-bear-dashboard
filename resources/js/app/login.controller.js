(function() {

  function loginController($http, $scope) {
    var vm = this;

    vm.username = "";
    vm.password = "";

    vm.loggedIn = false;

    function successful (res) {
      vm.loggedIn = true;

      $scope.$broadcast('login', {
        username: vm.username
      });

      console.log(vm.loggedIn);
    }

    function failed (res) {
      console.log('login failed.')
      vm.loggedIn = false;
    }

    this.loginUser = function() {
      var data = {
        username: vm.username,
        password: vm.password
      }
      $http.post('http://localhost/login.php', data).then(successful, failed);
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
