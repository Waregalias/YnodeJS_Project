"use strict";
/* jshint node: true */
/* Gantt functions page. */
// app include
var express         = require('express');
var app             = express();
var http            = require('http');
var path            = require('path');
var routes          = require('../routes/routes');
var GanttTask       = require('../models/gantt-task');
// gantt-task include
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

function save(req, res) {
  var newGanttTask = GanttTask({
    json: req.body
  });
  newGanttTask.save(newGanttTask);
  console.log("done!");
} exports.save = save;
