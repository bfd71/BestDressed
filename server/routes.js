/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var auth = require('./auth/auth.service');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use("/api/look", require("./api/look")); // lesson 13
  app.use("/api/links", require("./api/imgScraper")); // lesson 14
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  app.post('/forgotpassword', require('./forgotpassword').reset);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
