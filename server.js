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
var express     = require('express');
var app         = express();
var http        = require('http');
var path        = require('path');
var routes      = require('./routes/routes');
var auth        = require('./routes/auth');
// auth include
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
var config      = require('./config');
var User        = require('./models/user');

// =======================
// ===== Server conf =====
// =======================
app.set('port', 3000);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/angular', express.static(__dirname + '/angular'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.set('superSecret', config.secret);
// =======================
// ====== Auth conf ======
// =======================
mongoose.connect(config.database);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(function(req, res, next) {
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if (token) {
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//   }
// });
// =======================
// ======= Routes ========
// =======================
app.get('/', routes.index);
app.post('/signin', auth.signin);
app.post('/login', auth.login);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Web Application | Server listening on port ' + app.get('port'));
});
