'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthMiddleware = AuthMiddleware;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(app) {
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_bodyParser2.default.json());
    app.use((0, _cors2.default)());
}

function AuthMiddleware(req, res, next) {
    _jsonwebtoken2.default.verify(req.get('Authentification'), 'privateKeyDuFutur', function (err) {
        return err ? res.sendStatus(401) : next();
    });
};

exports.default = init;