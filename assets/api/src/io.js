function init(io) {
    io.on('connection', function(socket){
    
        socket.on('page', pageId => {
            Object.keys(socket.rooms)
                .forEach(r => r != socket.id && socket.leave(r));
            socket.join(pageId);
        })
    });
}

export default init;