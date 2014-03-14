/**
 * Created by sandstroh on 3/2/14.
 */
var ParkedActivitiesController = function(view, model) {

    /**
     * Show an 'Add New Activity' dialog after a click on the 'Add New Activity' button.
     */
    view.addNewActivityButton.click(function(event) {
        var activityDialogView = new ActivityDialogView($('#activityDialog'), model);
        var activityDialogController = new ActivityDialogController(activityDialogView, model);
        $('#activityDialog').modal('show');
    });

    /**
     * Display the 'X' for delete an activity.
     */
    $(view.container).find('.activity').on('mouseenter', this, function(event) {
        event.target.classList.add('over');
    });
    /**
     * Hide the 'X' for delete an activity.
     */
    $(view.container).find('.activity').on('mouseleave', this, function(event) {
        event.target.classList.remove('over');
    });

    /**
     * Delete the activity on a click on the 'X'.
     */
    $(view.container).find('.glyphicon-remove').on('click', this, function(event) {

        var parent = event.target.parentNode;

        // determine the index of the activity
        var selectedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == parent) {
                selectedActivityIndex = i;
                break;
            }
        }
        if (selectedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }

        model.removeParkedActivity(selectedActivityIndex);

    });

    /**
     * Show an 'Edit Activity' dialog, after a double-click on an activity.
     */
    $(view.container).find('.activity').on('dblclick', this, function(event) {

        // TODO: same dirty hack as below...
        // hide the 'X' for delete an activity
        event.target.classList.remove('over');
        event.target.parentNode.classList.remove('over');

        // determine the index of the activity
        var selectedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == event.target) {
                selectedActivityIndex = i;
                break;
            }
        }
        // TODO: fix this dirty hack
        //       the controller listens to double clicks of both the div and its children (spans)
        //       so if we can't determine the selected activity, maybe the double click was on a span
        if (selectedActivityIndex == -1) {
            var parent = event.target.parentNode;
            for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
                if (view.parkedActivitiesContainer.children()[i] == parent) {
                    selectedActivityIndex = i;
                    break;
                }
            }
        }
        if (selectedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }
        var selectedActivity = model.parkedActivities[selectedActivityIndex];

        var activityDialogView = new ActivityDialogView($('#activityDialog'), model, selectedActivity);
        var activityDialogController = new ActivityDialogController(activityDialogView, model);
        $('#activityDialog').modal('show');

    });

    // onDragStart
    view.parkedActivitiesContainer.on('dragstart', this, function(event) {

        console.log('dragstart');

        var selectedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == event.target) {
                selectedActivityIndex = i;
                break;
            }
        }

        if (selectedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }
        var selectedActivity = model.parkedActivities[selectedActivityIndex];

        event.originalEvent.dataTransfer.setData("SelectedActivity", selectedActivityIndex);
        event.originalEvent.dataTransfer.setData("From", null);

    });

    // onDragEnd:
    view.parkedActivitiesContainer.on('dragend', this, function(event) {
        console.log('dragend');
    });

    // onDragOver: we need to catch this event and stop the propagation
    // otherwise the 'drop' event won't be fired
    view.parkedActivitiesContainer.on('dragover', this, function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    // onDragEnter:
    view.parkedActivitiesContainer.on('dragenter', this, function(event) {
        console.log('dragenter()');
        event.target.classList.add('over');
    });

    // onDragLeave:
    view.parkedActivitiesContainer.on('dragleave', this, function(event) {
        console.log('dragleave()');
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove('over');
    });

    // onDrop:
    view.parkedActivitiesContainer.on('drop', this, function(event) {

        console.log('drop');

        event.preventDefault();
        event.stopPropagation();

        event.target.classList.remove('over');

        var selectedActivityIndex = event.originalEvent.dataTransfer.getData("SelectedActivity");
        var from = event.originalEvent.dataTransfer.getData("From");
        if (from == 'null') {
            from = null;
        }

        // TODO: determine newposition of the activity
        // add the activity at the end of the day
        model.moveActivity(from, selectedActivityIndex, null, null);

    });



    // onDrop:
    $(view.container).find('.activity').on('drop', this, function(event) {

        console.log('drop on activity');

        event.preventDefault();
        event.stopPropagation();

        // TODO: same dirty hack as below...
        // hide the 'X' for delete an activity
        event.target.classList.remove('over');
        event.target.parentNode.classList.remove('over');

        // TODO: fix this dirty hack (same as above)
        // determine the index of the activity
        var droppedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == event.target) {
                droppedActivityIndex = i;
                break;
            }
        }
        if (droppedActivityIndex == -1) {
            var parent = event.target.parentNode;
            for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
                if (view.parkedActivitiesContainer.children()[i] == parent) {
                    droppedActivityIndex = i;
                    break;
                }
            }
        }
        if (droppedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }

        var selectedActivityIndex = event.originalEvent.dataTransfer.getData('SelectedActivity');

        console.log('from: ' + selectedActivityIndex);
        console.log('to: ' + droppedActivityIndex);

//        // TODO: determine newposition of the activity
//        // add the activity at the end of the day
        model.moveActivity(null, selectedActivityIndex, null, droppedActivityIndex);

    });

}