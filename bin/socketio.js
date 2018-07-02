var socket_io = require('socket.io');
var socketio = {};
socketio.getSocketio = function(server) {
	var io = socket_io.listen(server);
	io.on('connection', function(socket) {
		// console.log('a user connected');
		socket.join('room 237', (id, msg) => {
			console.log(id,msg)
			socket.to(id).emit('my message', msg);
			// console.log('room 237', 'a new user has joined the room'); // broadcast to everyone in the room
		});
		socket.on('disconnect', function() {
			console.log('user disconnected a');
		});
		socket.on('my message', function(msg) {
			io.emit('my message', msg);

			console.log('message my: ', msg);
		});
		socket.on('new message', function(msg) {
			io.emit('my message', msg);

			console.log('message new: ' + msg);
		});

	});
}
module.exports = socketio;