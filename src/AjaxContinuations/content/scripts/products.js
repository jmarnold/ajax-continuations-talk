$(document).ready(function () {
	var dialog = $('#product-dialog');
	dialog.dialog({
		bgiframe: true,
		autoOpen: false,
		show: 'scale',
		hide: 'scale',
		height: 'auto',
		width: '400',
		modal: true,
		buttons: {
			'Save': function () {
				$('form', dialog).correlatedSubmit({
					closeDialog: true
				});
			},
			'Cancel': function () {
				dialog.dialog('close');
			}
		}
	});

	$('#new-product').click(function () {
		dialog.dialog('open');
	});
});

(function () {

	$.continuations.continuation.prototype.dialog = function () {
        if (!this.success || typeof (this.form) === 'undefined') {
            return $([]);
        }

        return this.form.parents('.dialog');
    };

    var closeDialogPolicy = {
        matches: function (continuation) {
            return continuation.isCorrelated() && continuation.options.closeDialog && continuation.dialog().size() != 0;
        },
        execute: function (continuation) {
            var dialog = continuation.dialog();
            dialog.dialog('close');
        }
    };

	$.continuations.applyPolicy(closeDialogPolicy);

} ());