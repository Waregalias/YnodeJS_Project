"use strict";
/* jshint node: true */
/* jshint sub:true */
//*********************************************************//
//    Name: Angular Gantt Node
//    Author: said mezhoud, Thomas Sifferlen, Thomas Brunsmann, Simon Delaunay
//    GitHub: https://github.com/Waregalias
//    Description: Gantt Project Application Server - YnodeJS
//    version: .alpha 0.1.0
//*********************************************************//
// app include
var express       = require('express');
var app           = express();
var http          = require('http').Server(app);
var path          = require('path');
var routes        = require('./routes/routes');
var auth          = require('./routes/auth');
var gantt         = require('./routes/gantt');
var chat          = require('./routes/chat');
// auth include
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var jwt           = require('jsonwebtoken');
var config        = require('./config');
var User          = require('./models/user');
// chat include
var Message       = require('./models/chat');
var io            = require('socket.io')(http);
// =======================
// ===== Routes conf =====
// =======================
app.set('port', 3000 || process.env.PORT);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
// app.use('/app', express.static(__dirname + '/app/'))
app.use('/controllers', express.static(__dirname + '/app/controllers'));
app.use('/models', express.static(__dirname + '/app/models'));
app.use('/public', express.static(__dirname + '/app/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/vendor', express.static(__dirname + '/vendor'));
// =======================
// ====== Auth conf ======
// =======================
mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

io.on('connection', function (client) {
   console.log("user joined");
   io.emit('message', {user : 'Server' ,msg : 'User has joined the chat !'});
   Message.find({}).sort({date: 'descending'}).limit(15).exec(function(err, msgs) {
     for(var i = msgs.length -1 ; i >= 0  ; i--)
        client.emit('message', {user : msgs[i].name ,msg : msgs[i].text , color :msgs[i].color , date : msgs[i].date});
   });
   client.on('disconnect', function() {
        console.log('user disconnected');
   });
   client.on('newmessage', function(data) {
        console.log('new message');
        var tmpNewMessage = new Message({ name : data['user'] , text : data['msg'], date : Date.now() , color : data['color']});
        io.emit('message', {user : data['user'] ,msg : data['msg'], color : data['color'] , date : tmpNewMessage.date});
        tmpNewMessage.save(function (err, tmpNewMessage) {
         if (err) return console.error(err);
        });
   });
});

// =======================
// ======= Routes ========
// =======================
app.get('/', routes.control);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get("/board", routes.board);
app.get("/gantt", routes.gantt);
app.get("/chat", routes.chat);
app.post('/login', auth.login);
app.post('/signup', auth.signup);
app.post('/logout', auth.logout);
app.post("/gantt", gantt.save);

http.listen(app.get('port'), function () {
    console.log('Web Application | Server listening on port ' + app.get('port'));
});
