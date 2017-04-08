"use strict";
/* jshint node: true */
/* user model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    token: String
}));
