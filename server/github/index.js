(function() {
  'use strict';

  var express = require('express'),
      authService = require('../auth/auth.service'),
     // providers = require('./auth.providers'),
      gitController = require('./gitController'),
      router = express.Router();

  console.log('hi');

  router.get('/',authService.ensureAuthenticated, gitController.repos);
  module.exports = router;
  //  .post('/signup', authService.signup)
  //  .post('/google', providers.google)
  //  .post('/github', providers.github)
    //      .post('/linkedin', providers.linkedin)
    //      .post('/facebook', providers.facebook)
  //  .get('/unlink/:provider', authService.ensureAuthenticated, providers.unlinkProvider);
}());
