(function () {
  'use strict';

  var express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      http = require('http'),
      cors = require('cors');

  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.set('port', 3000);

  var dbUrl = 'mongodb://localhost/http-angular';
  mongoose.connect(dbUrl);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('db connection successfully established');
  });

  // var UserSchema = mongoose.Schema

  var UserSchema = mongoose.Schema({
    gender: String,
    name: {
      title: String,
      first: String,
      last: String
    },
    email: String,
    username: String,
    dob: String,
    phone: String,
    picture: {
      large: String,
      medium: String,
      thumbnail: String,
    },
  });
   var data = [];
   var User = mongoose.model

  // var data = [
  //   {"firstName": "Jeff", "lastName": "Winger"},
  //   {"firstName": "Troy", "lastName": "Barnes"},
  //   {"firstName": "Britta", "lastName": "Perry"},
  //   {"firstName": "Abed", "lastName": "Nadir"}
  // ];

  app.get('/users', function (req, res) {
    User.find({}).exec()
    res.status(200).json(data);
  });

  app.post('/users', function (req, res) {
    data.push(req.body);
    res.status(200).send(data);
  });

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
})();
