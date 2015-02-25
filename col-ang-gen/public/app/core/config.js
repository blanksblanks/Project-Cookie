(function () {
  'use strict';

  var core = angular.module('app.core');

  var clientIds = {
    facebook: '689050897814697',
    google: '245712720284-fc37j539heu5ktagshoj42qrr3qdfcog.apps.googleusercontent.com',
    github: '08f868285c66f5226367',
    linkedin: '7543vklf9n4pxx',
    foursquare: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K'
  };

  core.config(function ($locationProvider, $stateProvider,
                        $urlRouterProvider, $authProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: '/partials/layout/main.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/partials/core/auth/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '/partials/core/auth/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/partials/core/user/profile.html',
        controller: 'ProfileCtrl',
        protected: true
      });

    $authProvider.facebook({
      clientId: clientIds.facebook
    });

    $authProvider.google({
      clientId: clientIds.google
    });

    $authProvider.github({
      clientId: clientIds.github,
      url: '/auth/github',
      redirectUri: window.location.origin
    });

/*$authProvider.github({
  name: 'github',
  url: '/auth/github',
//  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  redirectUri: window.location.origin,
  clientId: clientIds.github,
  scope: [],
  scopeDelimiter: ' ',
  type: '2.0',
  popupOptions: { width: 1020, height: 618 }
});*/

    $authProvider.linkedin({
      clientId: clientIds.linkedin
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: clientIds.foursquare,
      redirectUri: window.location.origin,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });
  });

  core.run(function Run($auth, $log, IdentityService) {
    if ($auth.isAuthenticated()) {
      $log.info('getting current user');
      IdentityService.getCurrentUser();
    } else {
      $log.warn('user not authenticated');
    }
  });
})();
