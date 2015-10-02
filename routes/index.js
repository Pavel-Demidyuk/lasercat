var Servo = require('../libs/servo');
var servo = new Servo;
var events = require('events');

var globalRes;

/**
 * This method describes _CONTROLLERS_ logic
 * @param app
 */
var registerListeners = function (app) {

}

/**
 * This is socket IO routes logic.
 * @param app
 */
var defineRoutes = function (app) {
	app.io.route('app', {
		'ready': function () {
            app.io.broadcast("page:home");
		}
	});

    app.io.route('servo', {
        'move': function (coordinates) {
            servo.move(coordinates.data)
        }
    });
}

/**
 * This is root routes logic
 * @param app
 */
module.exports = function (app) {
	app.get('/', function (req, res) {
        defineRoutes(app);
		res.render('boot', {
			partials: {
				header: 'layouts/header',
				footer: 'layouts/footer'
			}
		});

        registerListeners(app);
        servo.init();
	})
};