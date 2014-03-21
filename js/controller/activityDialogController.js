/**
 * Created by sandstroh on 3/3/14.
 */
var ActivityDialogController = function(view, model) {

    view.cancelButton.click(function() {
        view.activity = null;
    });

    view.okButton.click(function(event) {

        if (view.activity == null) {
            addNewActivity();
        } else {
            editActivity();
        }

    });

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

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
        if (view.day == null) {
            model.editParkedActivity(view.activity, editedActivity);
        } else {
            model.editActivity(view.day, view.activity, editedActivity);
        }

    }

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