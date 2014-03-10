/**
 * Created by sandstroh on 3/3/14.
 */
var ActivityDialogController = function(view, model) {

    view.cancelButton.click(function() {
        view.resetView();
    });

    view.okButton.click(function(event) {

        if (view.activity == null) {
            addNewActivity();
        } else {
            editActivity();
        }

        view.resetView();

    });

    function editActivity() {

    }

    function addNewActivity() {

        // get values for new activity
        var name = view.activityName.val();
        // check that the name of the new activity isn't empty
        if (name == '') {
            event.preventDefault();
            event.stopPropagation();
            alert('Error: the name of an activity cannot be empty!');
            return;

        }
        var length = view.activityLength.val();
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
        var description = view.activityDescription.val();

        // create new activity and add it to the model
        var newActivity = new Activity(name, length, type, description);
        model.addParkedActivity(newActivity);

    }

}