"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bluebird = require("bluebird");

var _express = require("express");

var _db = _interopRequireDefault(require("../../db"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var bcrypt = require('bcryptjs');

var util = require('util');

var router = (0, _express.Router)();

var _ = require('lodash');

router.use(function authCheck(req, res, next) {
  if (!req.user.login) {
    return res.sendStatus(401);
  }

  next();
});
router.post('/branch_list',
/*#__PURE__*/
function () {
  var _ref = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db.default.query('SELECT id,F_ID,F_NAME,F_IP_ADDRESS,F_PARENT_ID,ONN FROM branches');

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
              message: 'Нет прав для просмотра'
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
router.post('/window-state',
/*#__PURE__*/
function () {
  var _ref2 = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(req, res) {
    var where, branches, data;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            where = '';

            if (parseInt(req.user.role, 10) !== 0) {
              branches = req.user.id_branch.split(",");

              if (branches.length > 0) {
                where = 'WHERE idbranch IN ("' + branches.join('","') + '")';
              } else {
                where = 'WHERE idbranch IN ("' + branches.join() + '")';
              }
            }

            _context2.next = 5;
            return _db.default.query('SELECT id,windowid,winno,idoperator,idbranch,worktitle FROM window_state  ' + where + '');

          case 5:
            data = _context2.sent;

            if (!(data.length > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              data: data
            }));

          case 10:
            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              message: 'Пусто'
            }));

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(401).send({
              status: false,
              message: _context2.t0.message
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;