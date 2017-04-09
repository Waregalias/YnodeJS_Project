"use strict";
/* jshint node: true */
/* chat model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
    name: String,
    text: String,
    date: Number,
    color: String
}));
