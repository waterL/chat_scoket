var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var base = require('./database')

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
console.log(app)

app.get('/a', function(req, res){
	// base.sqlQuery("select * from user limit 1" , rs => {
	// 	res.json(rs)
	// });
	base.find("user" ,{name:'c'}, rs => {
		res.json(rs)
	});

});
app.post('/b', function(req, res){
	console.log(req, res)
	// base.find("user" ,{name:'c'}, rs => {
	// 	res.json(rs)
	// });
});

//socket.io
io.on('connection', function(socket){
    console.log('a user connected');
	socket.join('room 237', (id, msg) => {
		socket.to(id).emit('my message', msg);
	    console.log('room 237', 'a new user has joined the room'); // broadcast to everyone in the room
	});
    socket.on('disconnect', function(){
	    console.log('user disconnected a');
	});
	socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	    console.log('message: ' + msg);
	});
});
http.listen(3000, function(){
    console.log('listening on 0*:3000');
});