/**
 * Created by sandstroh on 3/20/14.
 */
var EditTimeDialogController = function(view, model, day) {

    view.saveNewStartTimeButton.on('click', this, function(event) {

        // get the input
        var newtime = view.newStartTimeInput.val();

        // check if has a valid time format: HH:MM
        if (!isValidTime(newtime)) {
            event.preventDefault();
            event.stopPropagation();
            view.timeFormatErrorLabel.addClass('error');
            return;
        }

        var parts = newtime.split(':');
        var startH = parseInt(parts[0]);
        var startM = parseInt(parts[1]);

        model.setStartOfDay(day, startH, startM);

    });

}
