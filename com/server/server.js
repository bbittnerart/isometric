/*
	Server Connection
*/


var Server = function () {

	/*
		Private Variables
	*/
	var socket;

	// Server Address
	this.address = '127.0.0.1:1234';

	/*
		Initiate Server Connection
	*/
	this.connect = function (name, success, failure) {
		
		socket = io.connect('//' + this.address, {
			'connect timeout': 5000,
			'query': ('name=' + name)
		});

		// Bind Events
		socket.on('connect', success);
		socket.on('error', failure);
	};

	/*
		Events -
	*/

	this.bind = function (name, callback) {
		socket.on(name, callback);
	};

	// Send
	this.send = function (type, options) {
		socket.emit(type, options);
	};

};