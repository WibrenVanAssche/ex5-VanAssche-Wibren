var express = require('express');
var parser = require('body-parser');

var dalLocations = require("./LocationStorage.js");
var dalAanwezigheden = require("./AanwezighedenStorage.js");
var dalSales = require("./SalesStorage.js");
var dalProducts = require("./ProductStorage.js");

var validator = require("./Validate.js");

var app = axpress();
app.use(parser.json());

