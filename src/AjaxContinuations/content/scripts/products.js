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
            	$('form', dialog).submit();
            	dialog.dialog('close');
            },
            'Cancel': function () {
                dialog.dialog('close');
            }
        }
    });

    $('#new-product').click(function() {
        dialog.dialog('open');
    });
});