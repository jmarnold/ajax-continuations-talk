// jquery.diagnostics v0.1.4
//
// Copyright (C)2011 Joshua Arnold
// Distributed Under Apache License, Version 2.0
//
// https://github.com/jmarnold/jquery.diagnostics
(function ($) {
	function diagnostics() {
		this.screens = {};
		this.activescreen = null;
	}

	diagnostics.prototype.registerScreen = function (code, topic, screen) {
		this.screens[topic] = screen;
		this.registerShortcut(code, topic);
	};

	diagnostics.prototype.registerShortcut = function (code, topic) {
		var self = this;
		$(document).bind(code, function (e) {
			// Don't allow inputs
			if ($(e.target).is(":input")) return;

			self.switchTo(topic, e);

			e.preventDefault();
		});
	};

	diagnostics.prototype.allScreens = function () {
		screens = [];
		for (var key in this.screens) {
			screens.push(this.screens[key]);
		}

		return screens;
	};

	diagnostics.prototype.switchTo = function (topic, payload) {

		this.close();

		var screen = this.screens[topic];
		this.activeScreen = screen;

		screen.activate(payload);
	};

	diagnostics.prototype.allTopics = function () {
		var topics = [];
		for (var key in this.screens) {
			topics.push(key);
		}

		return topics;
	};

	diagnostics.prototype.close = function () {
		if (this.activeScreen) {
			this.activeScreen.deactivate();
		}
	};

	function diagnosticsView(options) {
		this.element = $('<div class="diagnostics"><h2 class="title" style="color:white">' + options.title + '</h2></div>');
		this.element.css({
			left: '4%',
			width: '90%',
			top: '5%',
			padding: '10px',
			color: 'white',
			position: 'fixed',
			opacity: .90,
			'border-radius': '10px',
			background: '#222 none repeat scroll 0',
			height: '40%',
			'z-index': 9999
		});
	}

	diagnosticsView.prototype.configure = function (callback) {
		callback.call(this.element);
		return this;
	};

	diagnosticsView.prototype.show = function () {
		this.element.appendTo('body');
	};

	diagnosticsView.prototype.hide = function () {
		this.element.remove();
	};

	diagnostics.prototype.createView = function (title) {
		return new diagnosticsView({ title: title });
	};

	$.diagnostics = new diagnostics();
} (jQuery));

$(function () {
	var DASHBOARD = 'Dashboard';

	var dashboardView = null;
	var dashboardScreen = {
		activate: function () {
			dashboardView = $.diagnostics.createView('jquery.Diagnostics');
			dashboardView.configure(function () {
				var list = $('<ul></ul>');
				var topics = $.diagnostics.allTopics();
				for (var i = 0; i < topics.length; i++) {
					var topic = topics[i];
					if (topic == DASHBOARD) continue;
					var item = $('<li><a href="#" data-topic="' + topic + '">' + topic + '</a></li>');
					$('a', item).attr('style', 'color:white').click(function (e) {
						$.diagnostics.switchTo($(this).data('topic'));
						e.preventDefault();
					});
					item.appendTo(list);
				}

				if ($('li', list).size() != 0) {
					this.append('<h4 style="color:white">Available screens</h4>');
					this.append(list);
				}
				else {
					this.append('<p style="color:white">No screens registered</p>');
				}
			});
			dashboardView.show();
		},
		deactivate: function () {
			dashboardView.hide();
		}
	};

	$.diagnostics.registerScreen('keydown.ctrl_d', DASHBOARD, dashboardScreen);

	$(document).bind('keyup', function (e) {
		if ($(e.target).is(":input")) return;

		if (e.keyCode === 27) {
			$.diagnostics.close();
		}
	});
});