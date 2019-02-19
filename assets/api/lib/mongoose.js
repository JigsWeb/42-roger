'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initMongoose() {
    _mongoose2.default.connect('mongodb://localhost:27017/ssui', { useNewUrlParser: true });
}

exports.default = initMongoose;