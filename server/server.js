/*
	Simple Socket Server for isometric game

	http://jsiso.com/
*/
var io = require('socket.io').listen(1234, { log: false }),
	players = {}; // Store list of current players



/*
	Handshake
	- Check a valid name has been sent by the connecting client, further checks could be completed here
*/
io.set('authorization', function (handshakeData, callback) {

	if (typeof handshakeData.query.name !== 'undefined') {
		handshakeData.name = handshakeData.query.name;
		callback(null, true); // Valid Connection
	} else {
		callback(null, false); // No Name sent invalid connection
	}

});



/*
	Connection
*/
io.sockets.on('connection', function (socket) {

	// Send current player information
	socket.emit('connect', {players: players});

	// Create this player
	players[socket.id] = {
		id: socket.id,
		name: socket.handshake.name,
		x: null,
		y: null
	};

	socket.on('update', function (data) {

		var newPlayer = false;

		if (players[socket.id].x === null) {
			newPlayer = true;
		}

		players[socket.id].x = data.x;
		players[socket.id].y = data.y;

		// Sent out update
		if (newPlayer) {
			socket.broadcast.emit('playerjoin', {
				id: socket.id,
				name: players[socket.id].name,
				x: data.x,
				y: data.y
			});
		} else {
			socket.broadcast.emit('update', {
				id: socket.id,
				x: data.x,
				y: data.y
			});
		}
	});

	socket.on('disconnect', function () {
		delete players[socket.id];
		socket.broadcast.emit('playerleave', {
			id: socket.id
		});
	});

});