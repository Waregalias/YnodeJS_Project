"use strict";
/* jshint node: true */
/* ganttTask model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ganttTaskSchema = new Schema({
  json: { type: JSON, required: true },
});

var GanttTask = mongoose.model('GanttTask', ganttTaskSchema);

module.exports = GanttTask;
