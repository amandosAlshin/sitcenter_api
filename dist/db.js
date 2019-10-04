"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var util = require('util');

var db = _mysql.default.createConnection({
  host: '10.10.102.209',
  user: 'root',
  password: '123456',
  database: 'sitcenter_sber'
}); // connect to database


db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('Connected to database');
});
db.query = util.promisify(db.query);
var _default = db;
exports.default = _default;
