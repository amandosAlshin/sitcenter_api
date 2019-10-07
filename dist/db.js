"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var util = require('util');

var db = _mysql["default"].createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ssitcenter_sber'
}); // connect to database


db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('Connected to database');
});
db.query = util.promisify(db.query);
var _default = db;
exports["default"] = _default;