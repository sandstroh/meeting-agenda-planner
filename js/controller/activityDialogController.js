/**
 * Created by sandstroh on 3/3/14.
 */
var ActivityDialogController = function(view, model, activity, day) {

    /**
     * On a click on the OK button either add a new activity or edit the
     * given one (depending on for which purpose the dialog was created).
     */
    view.okButton.click(function(event) {

        if (activity == null) {
            addNewActivity();
        } else {
            editActivity();
        }

    });

    /**
     * Checks if a given value is a number or not.
     * @param n value that should be checked
     * @returns {boolean} true if the given value is a number and false
     * otherwise
     */
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Edits the given activity, i.e. replaces it with a new activity
     * that is created based on the values specified through the dialog.
     */
    function editActivity() {

        // get the name of the activity
        // and check that it's not empty
        var name = view.activityName.val();
        if (name == '') {
            event.preventDefault();
            event.stopPropagation();
            view.activityNameErrorLabel.addClass('error');
            return;
        }

        // get the length of the activity
        // and check that the value is numerical and greater than 0
        var length = view.activityLength.val();
        if (isNumber(length)) {
            if (length <= 0) {
                event.preventDefault();
                event.stopPropagation();
                view.activityLengthErrorLabel.html('Length must be greater than 0.');
                view.activityLengthErrorLabel.addClass('error');
                return;
            }
        } else {
            event.preventDefault();
            event.stopPropagation();
            view.activityLengthErrorLabel.html('Value must be numerical.');
            view.activityLengthErrorLabel.addClass('error');
            return;
        }
        // the value we got from the dialog is a string and we have to convert
        // it to an integer, otherwise we get weird results when computing the total
        // length of a day (found out the hard way ;-))
        length = parseInt(length);

        // get the type of the activity
        var type = view.activityType.val();
        switch (type) {
            case '0':
                type = 0; break;
            case '1':
                type = 1; break;
            case '2':
                type = 2; break;
            case '3':
                type = 3; break;
            default:
                console.log("Error: unknown activity type");
        }

        // get the description of the activity
        var description = view.activityDescription.val();

        // create new activity and replace the old activity in the model
        var editedActivity = new Activity(name, length, type, description);
        if (day == null) {
            model.editParkedActivity(activity, editedActivity);
        } else {
            model.editActivity(day, activity, editedActivity);
        }

    }

    /**
     * Add a new activity to the parked activity. Creates the activity based
     * on the values that were specified through the dialog.
     */
    function addNewActivity() {

        // get the name of the activity
        // and check that it's not empty
        var name = view.activityName.val();
        if (name == '') {
            event.preventDefault();
            event.stopPropagation();
            view.activityNameErrorLabel.addClass('error');
            return;
        }

        // get the length of the activity
        // and check that the value is numerical and greater than 0
        var length = view.activityLength.val();
        if (isNumber(length)) {
            if (length <= 0) {
                event.preventDefault();
                event.stopPropagation();
                view.activityLengthErrorLabel.html('Length must be greater than 0.');
                view.activityLengthErrorLabel.addClass('error');
                return;
            }
        } else {
            event.preventDefault();
            event.stopPropagation();
            view.activityLengthErrorLabel.html('Value must be numerical.');
            view.activityLengthErrorLabel.addClass('error');
            return;
        }
        // the value we got from the dialog is a string and we have to convert
        // it to an integer, otherwise we get weird results when computing the total
        // length of a day (found out the hard way ;-))
        length = parseInt(length);

        // get the type of the activity
        var type = view.activityType.val();
        switch (type) {
            case '0':
                type = 0; break;
            case '1':
                type = 1; break;
            case '2':
                type = 2; break;
            case '3':
                type = 3; break;
            default:
                console.log("Error: unknown activity type");
        }

        // get the description of the activity
        var description = view.activityDescription.val();

        // create new activity and add it to the model
        var newActivity = new Activity(name, length, type, description);
        model.addParkedActivity(newActivity);

    }

}