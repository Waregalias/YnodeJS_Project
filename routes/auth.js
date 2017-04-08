"use strict";
/* jshint node: true */
/* Auth functions page. */
// app include
var express     = require('express');
var app         = express();
var http        = require('http');
var path        = require('path');
var routes      = require('../routes/routes');
// auth include
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
var config      = require('../config');
var User        = require('../models/user');
// Variable config
app.set('superSecret', config.secret);

function signup(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (user) {
      return res.json({ success: false, message: 'This username is already taken !' });
    } else {
        var nick = new User({
          username: req.body.username,
          password: req.body.password,
          token: ''
        });
        nick.save(function(err) {
          if (err) throw err;
          res.json({ success: true , message: 'The user was successfully created.'});
          routes.board(req, res);
        });
      }
    });
} exports.signup = signup;

function login(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });
        return res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
} exports.login = login;
