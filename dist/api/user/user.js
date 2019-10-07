"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bluebird = require("bluebird");

var _express = require("express");

var _db = _interopRequireDefault(require("../../db"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var bcrypt = require('bcryptjs');

var util = require('util');

var router = (0, _express.Router)();

var moment = require('moment');

moment.locale('kk');
router.use(function authCheck(req, res, next) {
  if (!req.user.login) {
    return res.sendStatus(401);
  } else {
    if (req.user.role != 0) {
      return res.status(401).send({
        status: false,
        message: 'У вас недостаточно прав'
      });
    }

    next();
  }
});
router.post('/userlist',
/*#__PURE__*/
function () {
  var _ref = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query('SELECT id,login,password,role,id_branch, DATE_FORMAT(ins_date,"%d.%m.%Y") as ins_date,ins_by_id FROM users WHERE delete_status=0');

          case 3:
            data = _context.sent;

            if (!(data.length > 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(200).send({
              type: "ok",
              data: data
            }));

          case 8:
            return _context.abrupt("return", res.status(401).send({
              type: "error",
              msg: 'Пользователи еще не добавлены'
            }));

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).send({
              status: false,
              message: _context.t0.message
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/useradd',
/*#__PURE__*/
function () {
  var _ref2 = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var ins_date, data, _data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body.login) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Не получен логин'
            }));

          case 2:
            if (req.body.password) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Не получен пароль'
            }));

          case 4:
            if (req.body.role) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Не получен роль'
            }));

          case 6:
            if (!(!req.body.id_branch && req.user.role !== 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Не получен отделение'
            }));

          case 8:
            _context2.prev = 8;
            ins_date = moment().format('YYYY-DD-MM h:mm:ss');

            if (!(req.body.role === 0)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 13;
            return _db["default"].query('INSERT INTO users (login,password,role,id_branch,ins_date,ins_by_id) values ("' + req.body.login + '","' + req.body.password + '",' + '"' + req.body.role + '","","' + ins_date + '","' + req.user.user_id + '")');

          case 13:
            data = _context2.sent;
            _context2.next = 19;
            break;

          case 16:
            _context2.next = 18;
            return _db["default"].query('INSERT INTO users (login,password,role,id_branch,ins_date,ins_by_id) values ("' + req.body.login + '","' + req.body.password + '",' + '"' + req.body.role + '","' + req.body.id_branch + '","' + ins_date + '","' + req.user.user_id + '")');

          case 18:
            _data = _context2.sent;

          case 19:
            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              msg: 'Пользователь удачно добавлен'
            }));

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](8);
            return _context2.abrupt("return", res.status(401).send({
              status: false,
              message: _context2.t0.message
            }));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 22]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/userinfo',
/*#__PURE__*/
function () {
  var _ref3 = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _db["default"].query('SELECT id,login,password,role,id_branch, DATE_FORMAT(ins_date,"%d.%m.%Y") as ins_date FROM users WHERE id="' + req.body.user_id + '"');

          case 3:
            data = _context3.sent;

            if (!(data.length > 0)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(200).send({
              type: "ok",
              data: data
            }));

          case 8:
            return _context3.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Пользователь не найден'
            }));

          case 9:
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(401).send({
              status: false,
              message: _context3.t0.message
            }));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/userdelete',
/*#__PURE__*/
function () {
  var _ref4 = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _db["default"].query('UPDATE users set delete_status=1 WHERE id="' + req.body.user_id + '"');

          case 3:
            data = _context4.sent;
            return _context4.abrupt("return", res.status(200).send({
              type: "ok",
              msg: 'Пользователь удачно удален'
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(401).send({
              status: false,
              message: _context4.t0.message
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;