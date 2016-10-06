// Require HTTP module (to start server) and Socket.IO

var express = require('express'),


	app = express(),



//var http = require('http'), io = require('socket.io');


/*
console.log('suka')
*/

 server = require('http').createServer(app),

	 io = require('socket.io').listen(server);

server.listen(8080);

app.use(express.static('public'));

var router = express.Router();


// Start the server at port 8080
/*var server = http.createServer(function(req, res){
	var host = server.address().address;
	var port = server.address().port;
	console.log("server is running under " + host + ":" + port);
	// Send HTML headers and message
	res.writeHead(200,{ 'Content-Type': 'text/html' }); 
	res.end('<h1>Hello Socket Lover!</h1>');


});*/



/*app.get('/', function(req, res) {
	//if the user is not logged in do not serve the file
	console.log('aaaaaaa')
	res.sendFile(BASE_PATH + '/public/index.html');



});*/



  
// Create a Socket.IO instance, passing it our server
/*
var socket = io.listen(server);

// Add a connect listener
socket.on('connection', function(client){ 
	
	// Create periodical which ends a message to the client every 5 seconds
	var interval = setInterval(function() {
		client.send('This is a message from the server!  ' + new Date().getTime());
	},5000);
	
	// Success!  Now listen to messages to be received
	client.on('message',function(event){ 
		console.log('Received message from client!',event);
	});
	client.on('disconnect',function(){
		clearInterval(interval);
		console.log('Server has disconnected');
	});
	
});

*/






module.exports = router;
