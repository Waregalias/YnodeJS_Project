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
var http          = require('http');
var path          = require('path');
var auth          = require('./routes/auth');
var gantt          = require('./routes/gantt');
var routes        = require('./routes/routes');
// auth include
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var jwt           = require('jsonwebtoken');
var config        = require('./config');
var User          = require('./models/user');
// =======================
// ===== Routes conf =====
// =======================
app.set('port', 3000);
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
// =======================
// ======= Routes ========
// =======================
app.get('/', routes.control);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get("/board", routes.board);
app.get("/gantt", routes.gantt);
app.post('/login', auth.login);
app.post('/signup', auth.signup);
app.post("/gantt", gantt.save);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Web Application | Server listening on port ' + app.get('port'));
});
