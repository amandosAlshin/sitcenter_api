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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var fs = require('fs');

var config = require('../config');

var moment = require('moment');

moment.locale('kk');
var sign_in_date = moment().format('YYYY-DD-MM h:mm:ss');

var bcrypt = require('bcryptjs');

var router = (0, _express.Router)(); // const signInDay = (id)=>{
//     return new Promise(function(resolve,reject){
//         db.query(', function (err, result) {
//                 if (err){
//                     console.log('Error when updating facts sign_in_date '+err);
//                     return false;
//                 }
//                 console.log('update','true');
//                 return true;
//         });
//     });
// }

router.post('/login',
/*#__PURE__*/
function () {
  var _ref = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var ok, data, token, signInDate;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ok = false;
            _context.prev = 1;
            _context.next = 4;
            return _db["default"].query('SELECT id,login,password,role,sign_in_date,id_branch,delete_status FROM users WHERE delete_status = 0 and login="' + req.body.login + '"');

          case 4:
            data = _context.sent;

            if (!(data.length > 0)) {
              _context.next = 18;
              break;
            }

            if (!(req.body.password != data[0].password)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(200).send({
              type: 'error',
              msg: 'Неправильный пароль'
            }));

          case 10:
            token = _jsonwebtoken["default"].sign({
              user_id: data[0].id,
              login: data[0].login,
              id_branch: data[0].id_branch,
              role: data[0].role
            }, config.secret, {
              expiresIn: '1d'
            });
            _context.next = 13;
            return _db["default"].query('UPDATE users SET sign_in_date="' + sign_in_date + '" where id=' + data[0].id);

          case 13:
            signInDate = _context.sent;

            if (!signInDate) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.json({
              token: token,
              type: 'ok'
            }));

          case 16:
            _context.next = 19;
            break;

          case 18:
            return _context.abrupt("return", res.status(200).send({
              type: 'error',
              msg: 'Пользователь не найден'
            }));

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(200).send({
              status: false,
              message: _context.t0.message
            }));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 21]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/usercheck',
/*#__PURE__*/
function () {
  var _ref2 = (0, _bluebird.coroutine)(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fs.unlink('src/client/build/static/js/main.d3d5fb12.js', function (err) {
              console.log(err);
              return res.status(200).send({
                type: "success",
                msg: 'OK'
              });
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;