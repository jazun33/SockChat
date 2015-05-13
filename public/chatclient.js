$(document).ready(function(){
	var chatInput = $('#chat_input');

  var socket = io.connect('http://localhost:8000');

  socket.on('connect', function(data) {
    $('#status').html('Status: Connected to SockChat');
    var nickname = prompt("What is your nickname?");
    socket.emit('join', nickname);
  });

  socket.on('message', function(data){
    insertMessage(data);
  });

  socket.on('join', function(data){
    insertMessage(data)
  });

	$('#chat_form').submit(function(e){
		//prevent page refresh on submit
		e.preventDefault();

		//assign the value of the input field to a variable called 'message'
		var message = chatInput.val();

		//emit the message to the 'messages' event on the server
		socket.emit('messages', message);

    //reset the input field
    chatInput.val("").focus().removeAttr('placeholder');
	});

  //-- insertMessage function
  //takes in a string and appends it to the "messageList" <ul> element
  var insertMessage = function(message) {
    $('#messageList').append('<li>'+ message +'</li>');
  }
})
