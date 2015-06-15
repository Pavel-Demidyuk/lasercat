// Filename: app.js
define([
	'socket_io',
	'modules/servo_base',
	'modules/pages'
], function(socket_io, servo, pages){

	var io;

	var ioConnect = function() {
		io = socket_io.connect();
        console.log(io);
		servo.setIo(io);
	};

	var listen = function() {
		io.on("page:home", function(data){
			pages.render("home", {}, function() {
				servo.start();
			});
		});
	};

	var initialize = function(){
		ioConnect();
		listen();
		io.emit("app:ready");
	};

	return {
		initialize: initialize
	};
});