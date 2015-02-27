(function () {
  'use strict';

  function gitInfo () {

    var directive = {
      restrict: 'E',
      templateUrl: '/partials/github/git.html',
      controller: GitCtrl,
      controllerAs: 'vm'
    };

    GitCtrl.$inject = ['GithubService'];

    function GitCtrl(GithubService) {
      var vm = this;

/*      vm.isAdmin = IdentityService.isAdmin;
      vm.isAuthenticated = IdentityService.isAuthenticated;
      vm.isFounder = IdentityService.isFounder;
      vm.getCurrentUser = IdentityService.getCurrentUser;
*/
      activate();

      function activate() {
        GithubService.getRepos().then(function(gitRepos) {
          vm.repos = gitRepos;
        });
      }

    }

    return directive;
  }

  angular.module('app.core').directive('gitInfo', gitInfo);

})();
