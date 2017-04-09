"use strict";
/* jshint node: true */
/* GET Routes page. */

var express = require('express');
var path    = require('path');
var app     = express();
var config  = require('../config');
var jwt     = require('jsonwebtoken');
app.set('superSecret', config.secret);

function control(req, res) {
    var token = req.cookies.token;
    if (token) {
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          // return res.json({ success: false, message: 'Failed to authenticate token.' });
          login(req, res);
        } else {
          console.log("decoded");
          req.decoded = decoded;
          board(req, res);
        }
      });
    }
    else login(req, res);
} exports.control = control;

function login(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'login.html'));
} exports.login = login;

function signup(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'signup.html'));
} exports.signup = signup;

function board(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'board.html'));
} exports.board = board;

function gantt(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'gantt.html'));
} exports.gantt = gantt;

function chat(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'chat.html'));
} exports.chat = chat;

function todo(req, res) {
    res.sendFile(path.join(__dirname, '../app/views', 'todo.html'));
} exports.todo = todo;

