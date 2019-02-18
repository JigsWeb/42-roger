'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Queries = _mongoose2.default.model('Queries', {
    name: String,
    outputType: {
        type: String,
        enum: ['array', 'object']
    },
    shellType: {
        type: String,
        enum: ['command', 'script']
    },
    data: {
        command: String,
        values: [],
        last_values: []
    },
    interval: Number,
    size: Number,
    height: Number,
    page: String
});

exports.default = Queries;