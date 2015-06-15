define(["jquery", "bootstrap_switch"], function ($, bootstrapSwitch) {

	var io,
		bindFlag = false;

	return {
		setIo: function (socket_io) {
			io = socket_io;
		},

        start : function() {
            this.bindEvents();
        },


		bindEvents: function () {
			if (bindFlag) {
				return;
			}

            $('#target').click(function(e) {
                var offset = $(this).offset();
                io.emit("servo:move", {
                    X: (e.pageX - offset.left)/($("#target").width()),
                    Y: (e.pageY - offset.top)/($("#target").height())
                });
            });

			bindFlag = true;
		}
	}
});
