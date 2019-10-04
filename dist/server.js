"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _api = require("./api");

var app = (0, _express.default)();
var port = 3000;

var config = require('./api/config');

var cors = require('cors');

app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(_express.default.static(_path.default.join(__dirname, 'client/build')));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // parse form data client

app.use(_express.default.static(_path.default.join(__dirname, 'public')));
app.get('*', function (req, res) {
  return res.sendFile(_path.default.join(__dirname + '/client/build/index.html'));
});
app.post('/api/*', (0, _expressJwt.default)({
  secret: config.secret
}), function (err, req, res, next) {
  if (err) {
    if (err.name = 'UnauthorizedError') {
      return res.sendStatus(401);
    }
  }
});
var corsOptions = {
  origin: 'http://127.0.0.1:3006',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use('/auth/v1', cors(corsOptions), _api.v1);
app.use('/api/user', cors(corsOptions), _api.user);
app.use('/api/tickets', cors(corsOptions), _api.tickets);
app.use('/api/services', cors(corsOptions), _api.services);
app.use('/api/employee', cors(corsOptions), _api.employee);
app.use('/api/branch', cors(corsOptions), _api.branch_list);
app.use('/api/main', cors(corsOptions), _api.main);
app.listen(port, function () {
  return console.log("Server is listinging on localhost:".concat(port));
});
