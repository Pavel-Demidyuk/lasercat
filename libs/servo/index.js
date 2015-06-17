var util = require('util');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

var ServoController = function (dbModel) {
	this.init = function () {
		this.removeAllListeners();
	};

    this.move = function(coordinates) {
        var x = 60 + Math.floor(coordinates.X*180);
        var y = 60 + Math.floor(coordinates.Y*180);

        var content = "0=>" + x + "\r\n" + "1=>" + y;

        fs.writeFile("/dev/servoblaster", content, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }
}

util.inherits(ServoController, EventEmitter);
module.exports = ServoController;
