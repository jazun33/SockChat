var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

var messages = [];

var storeMessage = function (name, data) {
  messages.push({name: name, data: data});
  if (messages.length > 10) {
    messages.shift();
  }
  console.log(messages);
}

io.on('connection', function(client) {

  client.on('join', function(name) {
    client.nickname = name;
    messages.forEach(function(message){
      client.emit("messages", message.name + ": " + message.data);
    });
    client.broadcast.emit('join', name + ' joined the chat');
  });

	client.on('messages', function(data) {

    //Get nickname
    var nickname = client.nickname;

    //broadcast with the name and message
		client.broadcast.emit('message', nickname + ": " + data);

    //Send the same message back to the client that sent it.
    client.emit('message', nickname + ": " + data);

    storeMessage(nickname, data);
	});
});

server.listen(8000);
console.log('Server listening on port 8000...')