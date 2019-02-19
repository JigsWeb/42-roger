'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _child_process = require('child_process');

function objectParser(query) {
    var output = (0, _child_process.execSync)(query.data[query.shellType]).toString('ascii');

    return query.data.values.reduce(function (res, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            field = _ref2[0],
            selector = _ref2[1];

        res[field] = (0, _child_process.execSync)('echo "' + output + '" | ' + selector).toString('ascii');
        return res;
    }, {});
}

exports.default = objectParser;