"use strict";
/* jshint node: true */
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
// auth include
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var jwt           = require('jsonwebtoken');
var config        = require('./config');
var Message          = require('./models/chat');
var User          = require('./models/user');

var socketio        = require('socket.io')(http);


let port = process.env.PORT || 3000;
//CHAT
socketio.on('connection', function (client)
{
  console.log("NewClient");
  socketio.emit('message', {user : 'Server' ,msg : 'New user connected'});
  
  Message.find({}).sort({date: 'descending'}).limit(15).exec(function(err, msgs)
  { 
    for(var i = msgs.length -1 ; i >= 0  ; i--)
    {
      client.emit('message', {user : msgs[i].name ,msg : msgs[i].text , color :msgs[i].color , date : msgs[i].date});
    }
  });
  
  client.on('disconnect', function()
  {
    console.log('user disconnected');
  });
  
  client.on('newmessage', function(data)
  {
    console.log('New Message');
    
    var tmpNewMessage = new Message({ name : data['user'] , text : data['msg'], date : Date.now() , color : data['color']});
    
    socketio.emit('message', {user : data['user'] ,msg : data['msg'], color : data['color'] , date : tmpNewMessage.date});
    
    tmpNewMessage.save(function (err, tmpNewMessage) {
      if (err) return console.error(err);
    });
  });
  
  
});

// =======================
// ===== Routes conf =====
// =======================
app.set('port', process.env.PORT);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
// app.use('/app', express.static(__dirname + '/app/'))
app.use('/controllers', express.static(__dirname + '/app/controllers'));
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
// =======================
// ======= Routes ========
// =======================
app.get('/', routes.control);
app.get('/login', routes.login);
app.post('/login', auth.login);
app.get('/signup', routes.signup);
app.post('/signup', auth.signup);
app.get("/board", routes.board);


/*http.createServer(app).listen(app.get('port'), function () {
    console.log('Web Application | Server listening on port ' + app.get('port'));
});*/

http.listen(port, () => {console.log('\nPort:', port);});
