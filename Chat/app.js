'use strict';

const express       = require('express');
const app           = express();
const http          = require('http').Server(app);
const path          = require('path');
var socketio        = require('socket.io')(http);
const mongoose      = require("mongoose");

var MsgShema;
var Msg ;

mongoose.connect('mongodb://localhost/messages', function(err) { if (err) { throw err; }});
 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()
{
  MsgShema = mongoose.Schema({ name: String , text: String, date : Number, color : String});
  Msg = mongoose.model('Message', MsgShema);
});


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
  
let port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', function (req, res) 
{
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

socketio.on('connection', function (client)
{
  console.log("NewClient");
  socketio.emit('message', {user : 'Server' ,msg : 'New user connected'});
  
  Msg.find({}).sort({date: 'descending'}).limit(15).exec(function(err, msgs)
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
    
    var tmpNewMessage = new Msg({ name : data['user'] , text : data['msg'], date : Date.now() , color : data['color']});
    
    socketio.emit('message', {user : data['user'] ,msg : data['msg'], color : data['color'] , date : tmpNewMessage.date});
    
    tmpNewMessage.save(function (err, tmpNewMessage) {
      if (err) return console.error(err);
    });
  });
  
  
});

http.listen(port, () => {console.log('\nPort:', port);});