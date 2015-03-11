/*global data */
(function() {
  'use strict';

  var app = angular.module('app.github');

  app.factory('GithubService', function(User, $http, $q, $log, $auth) {
    var repos = {},
        reposEndpoint = '/github/user/repos';

    return {
      repos: function() {
        return repos;
      },/*
      getCurrentUser: getCurrentUser,
      updateCurrentUser: updateCurrentUser,
      logoutCurrentUser: logoutCurrentUser,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin*/
      getRepos: getRepos,
      getData: getData,
      getCommits: getCommits,
      getContributors: getContributors,
      getActivities: getActivities
    };
    function getRepos() {
      return getData(reposEndpoint);
    }
    function getCommits(owner,repo) {
      return getData('/github/repos/'+owner+'/'+repo+'/stats/contributors');
    }
    function getContributors(owner,repo) {
      return getData('/github/repos/'+owner+'/'+repo+'/stats/contributors');
    }
    function getActivities(owner,repo) {
      return getData('/github/repos/'+owner+'/'+repo+'/stats/commit_activity');
    }
    function getData(endpoint) {
      var deferred = $q.defer();
      $http.get(endpoint)
      .success(function(data) {
        repos = data.data;//new User();
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
