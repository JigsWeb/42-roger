'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _parsers = require('./parsers');

var parsers = _interopRequireWildcard(_parsers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createQueryInterval(q, io) {
    return setInterval(function () {
        var values = parsers[q.outputType](q);
        _models.Queries.findOneAndUpdate({ _id: q._id }, { 'data.last_values': values }).then(function () {
            return io.to(q.page).emit('queries', { queryId: q._id, values: values });
        });
    }, q.interval);
}

exports.default = createQueryInterval;