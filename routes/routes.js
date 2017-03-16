"use strict";
/*
 * GET home page.
 */
var express = require('express');
var path = require('path');
var app = express();

function index(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
}

exports.index = index;
;
