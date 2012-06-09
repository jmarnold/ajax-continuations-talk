ContinuationLog = (function() {
    var continuations = [];
    var loggingPolicy = {
        matches: function(continuation) {
            return true;
        },
        execute: function(continuation) {
            continuations.push(continuation);
        }
    };
    
    $.continuations.applyPolicy(loggingPolicy);
    
    return {
        all: function() {
            return continuations;
        },
        clear: function() {
            continuations.length = 0;
        }
    };
}());

$(function () {
	var continuationsView = null;
	var continuationsScreen = {
		name: 'Continuations',
		activate: function () {
			continuationsView = $.diagnostics.createView('jquery.continuations');
			continuationsView.configure(function () {
				var continuations = ContinuationLog.all();
				var list = $('<ul></ul>');
				for (var i = 0; i < continuations.length; i++) {
					var continuation = continuations[i];
					var item = $('<li style="margin-bottom:10px;list-style-type:none;"></li>');

					for (var key in continuation) {
						var val = continuation[key];
						if (val instanceof jQuery) {
							continuation[key] = '<em>jquery object...</em>';
						}
					}
					if (continuation) {
						var errors = continuation.errors;
						for (var j = 0; j < errors.length; j++) {
							var error = errors[j];
							for (var k in error) {
								var obj = error[k];
								if (obj instanceof jQuery) {
									error[k] = '<em>jquery object...</em>';
								}
							}
						}
					}

					item.append('<span class="data">' + JSON.stringify(continuation) + '</span>');
					item.appendTo(list);
				}

				if ($('li', list).size() != 0) {
					this.append('<h4>Continuation Log</h4>');
					this.append(list);
				}
				else {
					this.append('<p>Continuation Log is empty</p>');
				}
			});
			continuationsView.show();
		},
		deactivate: function () {
			continuationsView.hide();
		}
	};

	$.diagnostics.registerScreen('keydown.ctrl_z', 'jqueryContinuations', continuationsScreen);
} ());