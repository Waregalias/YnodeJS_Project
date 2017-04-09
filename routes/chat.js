"use strict";
/* jshint node: true */
/* Auth functions page. */
/**
 * Module exports.
 * @public
 */

// app include
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
// Chat include
var Message     = require('../models/chat');
var socketio    = require('socket.io')(http);

/**
 * Parse Cookie header and populate `req.cookies`
 * with an object keyed by the cookie names.
 * @return {Function}
 * @public
 */
function chat() {
  socketio.on('connection', function (client) {
     console.log("NewClient");
     socketio.emit('message', {user : 'Server' ,msg : 'New user connected'});
     Message.find({}).sort({date: 'descending'}).limit(15).exec(function(err, msgs) {
       for(var i = msgs.length -1 ; i >= 0  ; i--)
       {
          client.emit('message', {user : msgs[i].name ,msg : msgs[i].text , color :msgs[i].color , date : msgs[i].date});
       }
     });
     client.on('newmessage', function(data) {
          console.log('New Message');
          var tmpNewMessage = new Message({ name : data['user'] , text : data['msg'], date : Date.now() , color : data['color']});
          socketio.emit('message', {user : data['user'] ,msg : data['msg'], color : data['color'] , date : tmpNewMessage.date});
          tmpNewMessage.save(function (err, tmpNewMessage) {
           if (err) return console.error(err);
          });
     });
     client.on('disconnect', function() { console.log('user disconnected'); });
  });
} module.exports = chat;
