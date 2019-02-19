'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersSchema = _mongoose2.default.Schema({
    username: String,
    password: String,
    salt: String
});

UsersSchema.methods.hashPassword = function () {
    this.salt = _crypto2.default.randomBytes(16).toString('hex');
    this.password = _crypto2.default.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UsersSchema.methods.validPassword = function (password) {
    return this.password === _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

var Users = _mongoose2.default.model('Users', UsersSchema);

exports.default = Users;