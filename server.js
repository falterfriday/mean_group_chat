var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
});

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var messages = [];

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

	// socket.on('new_user', function(data) {
		// console.log(messages);
	// });

	socket.emit( 'message_data', messages );

	socket.on('new_message', function(data){
		console.log(data);
		messages.push(data);
		console.log(messages);
		io.emit( 'single_message', messages );
	});
});
