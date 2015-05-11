$(document).ready(function(){
	var socket = io.connect('http://localhost:8000');
	$('#chat_form').submit(function(e){

		//prevent page refresh on submit
		e.preventDefault();

		//assign the value of the input field to a variable called 'message'
		var message = $('#chat_input').val();

		//emit the message to the 'messages' event on the server
		socket.emit('messages', message);

		//reset the input field
		$('#chat_input').val("").focus().removeAttr('placeholder');
	});
})
