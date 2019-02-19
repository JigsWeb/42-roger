'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function init(io) {
    io.on('connection', function (socket) {

        socket.on('page', function (pageId) {
            Object.keys(socket.rooms).forEach(function (r) {
                return r != socket.id && socket.leave(r);
            });
            socket.join(pageId);
        });
    });
}

exports.default = init;