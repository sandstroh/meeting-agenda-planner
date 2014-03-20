/**
 * Created by sandstroh on 3/20/14.
 */
var EditTimeDialogController = function(view, model, day) {

    view.button.on('click', this, function(event) {
        var newtime = view.input.val();
        console.log('newtime = ' + newtime);

        if (!isValidTime(newtime)) {
            event.preventDefault();
            event.stopPropagation();
            view.label.addClass('error');
            return;
        }

        var parts = newtime.split(':');
        var startH = parseInt(parts[0]);
        var startM = parseInt(parts[1]);

        model.setStartOfDay(day, startH, startM);

    });

}
