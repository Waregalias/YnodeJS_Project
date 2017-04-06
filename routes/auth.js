// app include
var express     = require('express');
var app         = express();
var http        = require('http');
var path        = require('path');
// auth include
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('../config'); // MongoDB config file
var User        = require('../models/user'); // get our mongoose model
// Variable config
app.set('superSecret', config.secret);

function signin(req, res) {
  var nick = new User({
    username: req.body.username,
    password: req.body.username,
    level: true
  });
  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
} exports.signin = signin;

function login(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
} exports.login = login;
