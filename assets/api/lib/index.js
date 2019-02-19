'use strict';

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _io = require('./io');

var _io2 = _interopRequireDefault(_io);

var _createQueryInterval = require('./utils/createQueryInterval');

var _createQueryInterval2 = _interopRequireDefault(_createQueryInterval);

var _models = require('./models');

var _parsers = require('./utils/parsers');

var parsers = _interopRequireWildcard(_parsers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

(0, _mongoose2.default)();
(0, _middlewares2.default)(app);
(0, _io2.default)(io);

var intervals = {};

_models.Queries.find().then(function (queries) {
    intervals = queries.reduce(function (res, q) {
        res[q.id] = (0, _createQueryInterval2.default)(q, io);
        return res;
    }, {});
});

app.post('/authentification', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(req, res) {
        var user;
        return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _models.Users.findOne({ username: req.body.username });

                    case 2:
                        user = _context.sent;

                        if (!(user && user.validPassword(req.body.password))) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', res.json({ token: _jsonwebtoken2.default.sign({ _id: user._id }, 'privateKeyDuFutur') }));

                    case 5:
                        return _context.abrupt('return', res.sendStatus(400));

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.get('/pages', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req, res) {
        var docs;
        return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _models.Pages.find();

                    case 2:
                        docs = _context2.sent;

                        res.json(docs);

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}()).post('/pages', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(req, res) {
        var _ref4, err, _doc;

        return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _models.Pages.create(req.body);

                    case 2:
                        _ref4 = _context3.sent;
                        err = _ref4.err;
                        _doc = _ref4._doc;

                        err ? res.sendStatus(400) : res.json(_doc);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}()).delete('/pages/:_id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee4(req, res) {
        var _ref6, err;

        return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _models.Pages.remove(req.params);

                    case 2:
                        _ref6 = _context4.sent;
                        err = _ref6.err;

                        res.sendStatus(err ? 400 : 200);

                    case 5:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}());

app.get('/queries', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee5(req, res) {
        return _regeneratorRuntime2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.t0 = res;
                        _context5.next = 3;
                        return _models.Queries.find();

                    case 3:
                        _context5.t1 = _context5.sent;
                        return _context5.abrupt('return', _context5.t0.json.call(_context5.t0, _context5.t1));

                    case 5:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
    };
}()).post('/queries', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee6(req, res) {
        var _ref9, err, _doc;

        return _regeneratorRuntime2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return _models.Queries.create(req.body);

                    case 2:
                        _ref9 = _context6.sent;
                        err = _ref9.err;
                        _doc = _ref9._doc;

                        if (!err) intervals[_doc._id] = (0, _createQueryInterval2.default)(_doc, io);
                        err ? res.sendStatus(400) : res.json(_doc);

                    case 7:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref8.apply(this, arguments);
    };
}()).put('/queries/:_id', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee7(req, res) {
        var _ref11, err;

        return _regeneratorRuntime2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return _models.Queries.findOneAndUpdate(req.params, req.body);

                    case 2:
                        _ref11 = _context7.sent;
                        err = _ref11.err;

                        res.sendStatus(err ? 400 : 200);

                    case 5:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref10.apply(this, arguments);
    };
}()).delete('/queries/:_id', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee8(req, res) {
        var _ref13, err;

        return _regeneratorRuntime2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        if (intervals[req.params._id]) {
                            clearInterval(intervals[req.params._id]);
                            delete intervals[req.params._id];
                        }
                        _context8.next = 3;
                        return _models.Queries.deleteOne(req.params);

                    case 3:
                        _ref13 = _context8.sent;
                        err = _ref13.err;

                        res.sendStatus(err ? 400 : 200);

                    case 6:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x15, _x16) {
        return _ref12.apply(this, arguments);
    };
}());

server.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});