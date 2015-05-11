var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server);

io.on('connection', function(client) {
	client.on('messages', function(data) {
		client.broadcast.emit('messages', data);
	});
	client.on('join', function(name) {
		client.nickname = name;
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});



server.listen(8000);