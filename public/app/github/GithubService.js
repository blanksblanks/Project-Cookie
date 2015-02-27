/*global data */
(function() {
  'use strict';

  var app = angular.module('app');

  app.factory('GithubService', function(User, $http, $q, $log, $auth) {
    var repos = {},
        reposEndpoint = '/repos';

    return {
      repos: function() {
        return repos;
      },/*
      getCurrentUser: getCurrentUser,
      updateCurrentUser: updateCurrentUser,
      logoutCurrentUser: logoutCurrentUser,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin*/
      getRepos: getRepos
    };
    function getRepos() {
      var deferred = $q.defer();
      $http.get(reposEndpoint)
      .success(function(data) {
        repos = JSON.stringify(data.repos);//new User();
//        angular.extend(repos, data);
//        $log.info('current user is now set');
        $log.info(repos);
        deferred.resolve(repos);
      })
      .error(function(data, status, headers, config) {
        $log.warn('failed to get repos');
        repos = {};
        $log.warn(data, status, headers, config);
        deferred.reject(data);
      });
      return deferred.promise;
    }
/*
    function updateCurrentUser(accountData) {
      if (repos.hasOwnProperty('role')) {
        $http.put(endpoint, accountData);
      }
    }

    function logoutCurrentUser() {
      repos = {};
    }

    function isAuthenticated() {
      return $auth.isAuthenticated();
    }

    function isAdmin() {
      if (isAuthenticated()) {
        return repos.hasOwnProperty('role') && repos.role === 'admin';
      } else {
        return false;
      }
    }
*/
  });
}());
