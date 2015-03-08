(function () {
  'use strict';

  var appGithub = angular.module('app.github');

  appGithub.config(function ($locationProvider, $routeProvider) {
    $routeProvider
      .when('/gitinfo', {
        templateUrl: '/partials/github/git.html',
        controller: 'GitCtrl'
      });
  });

  appGithub.run(function Run($auth, $log, IdentityService) {
    console.log('running app');
  });
})();
