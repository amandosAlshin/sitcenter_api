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
router.use(function authCheck(req, res, next) {
  if (!req.user.login) {
    return res.sendStatus(401);
  }

  next();
});
router.post('/employee_list',
/*#__PURE__*/
function () {
  var _ref = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var where, branches, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            where = '';

            if (parseInt(req.user.role, 10) !== 0) {
              branches = req.user.id_branch.split(",");

              if (branches.length > 0) {
                where = 'WHERE F_BRANCH_ID IN ("' + branches.join('","') + '")';
              } else {
                where = 'WHERE F_BRANCH_ID IN ("' + branches.join() + '")';
              }
            }

            _context.next = 5;
            return _db["default"].query('SELECT `id`,`F_ID`,`F_NAME`,`F_PATRONIMIC`,`F_SURNAME`,`F_WORK_NAME`,`startTime`,`F_BRANCH_ID`,`F_DESCR` FROM employee_list ' + where + '');

          case 5:
            data = _context.sent;

            if (!(data.length > 0)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(200).send({
              type: "ok",
              data: data
            }));

          case 10:
            return _context.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Employee list empty'
            }));

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).send({
              status: false,
              message: _context.t0.message
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/employee_group_add',
/*#__PURE__*/
function () {
  var _ref2 = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body.name) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Не получен название группы'
            }));

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return _db["default"].query('INSERT INTO employee_group (name,parent_id) values ("' + req.body.name + '",0)');

          case 5:
            data = _context2.sent;
            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              msg: 'Группа удачно добавлен'
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", res.status(401).send({
              status: false,
              message: _context2.t0.message
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/employee_group_list',
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
            return _db["default"].query('SELECT `id`,`name`,`parent_id` FROM employee_group');

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
              msg: 'Employee group empty'
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
var _default = router;
exports["default"] = _default;