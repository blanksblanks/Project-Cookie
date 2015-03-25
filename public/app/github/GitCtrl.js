(function() {
  'use strict';

  var app = angular.module('app.github');
  app.controller('GitCtrl', GitCtrl);
  GitCtrl.$inject = ['$scope','$log','$auth','GithubService'];
  function GitCtrl($scope, $log, $auth,GithubService) {
    var deferred = GithubService.getRepos();
    deferred.then(function(val) {
      $scope.gitRepos=val;
      $scope.contribs={};
      val.map(function(repo) {
        $scope.contribs[repo.full_name]={};
        var def = GithubService.getCommits(repo.owner.login,repo.name);
        def.then(function(r) {
          if (r!==undefined) {
            r.map(function(u) {
              $scope.contribs[repo.full_name][u.author.login]=u.total;
              $scope.commits=$scope.contribs;
            });
          };
        }); 
      });
    });
  };

}());
