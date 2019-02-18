'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queries = require('./queries');

Object.defineProperty(exports, 'Queries', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_queries).default;
  }
});

var _users = require('./users');

Object.defineProperty(exports, 'Users', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_users).default;
  }
});

var _pages = require('./pages');

Object.defineProperty(exports, 'Pages', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pages).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }