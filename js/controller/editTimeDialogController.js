/**
 * Created by sandstroh on 3/20/14.
 */
var EditTimeDialogController = function(view, model, day) {

    view.button.on('click', this, function(event) {

        // get the input
        var newtime = view.input.val();

        // check if has a valid time format: HH:MM
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
