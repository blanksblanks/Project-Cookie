(function () {
  'use strict';

  var core = angular.module('app.core');

  var clientIds = {
    facebook: '689050897814697',
    google: '817403130477-8j0o7mqeuhnuv3bimsh2gsklfein37oc.apps.googleusercontent.com',
    github: '08f868285c66f5226367',
    linkedin: '7543vklf9n4pxx',
    foursquare: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
    gitlocal: 'e86060576123616596e3'
  };

  core.config(function ($locationProvider, $stateProvider,
                        $urlRouterProvider, $authProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true);
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
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/partials/dashboard/dashboard.html'
      })
      .state('gitinfo', {
        url: '/gitinfo',
        templateUrl: '/partials/github/git.html',
        controller: 'GitCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $authProvider.facebook({
      clientId: clientIds.facebook
    });

    $authProvider.google({
      clientId: clientIds.google,
      url: '/auth/google'
    });
    var theUri =  window.location.origin;
    if (theUri.indexOf('localhost')>=0) { 
      $authProvider.github({
        redirectUri: theUri,
        clientId: clientIds.gitlocal,
        url: '/auth/github'
        });
    } else {
      $authProvider.github({
        redirectUri: theUri,
        clientId: clientIds.github,
        url: '/auth/github'
      });
    }

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

    $mdThemingProvider.theme('default')
    .primaryPalette('pink', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
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
