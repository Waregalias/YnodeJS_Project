"use strict";
//*********************************************************//
//    Name: MediaTowServer
//    Author: said mezhoud
//    GitHub: https://github.com/Waregalias
//    Description: API - MediaTow
//    version: .alpha 0.1.0
//
//*********************************************************//
var express = require('express');
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');
var app = express();

// all config
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', routes.index);

app.set('port', 3000);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Web Application | Server listening on port ' + app.get('port'));
});
