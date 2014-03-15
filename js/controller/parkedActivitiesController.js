/**
 * Created by sandstroh on 3/2/14.
 */
var ParkedActivitiesController = function(view, model) {

    /**
     * Show an 'Add New Activity' dialog after a click on the 'Add New Activity' button.
     */
    view.addNewActivityButton.on('click', this, function(event) {
        var activityDialogView = new ActivityDialogView($('#activityDialog'), model);
        var activityDialogController = new ActivityDialogController(activityDialogView, model);
        $('#activityDialog').modal('show');
    });


    /**
     * Display the 'X' for delete an activity.
     */
    $(view.container).find('.parked-activity-wrapper').on('mouseenter', this, function(event) {
        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }
        target.classList.add('mouseOver');
    });
    /**
     * Hide the 'X' for delete an activity.
     */
    $(view.container).find('.parked-activity-wrapper').on('mouseleave', this, function(event) {
        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }
        target.classList.remove('mouseOver');
    });

    /**
     * Delete the activity on a click on the 'X'.
     */
    $(view.container).find('.glyphicon-remove').on('click', this, function(event) {

        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }

        // determine the index of the activity
        var selectedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == target) {
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
    $(view.container).find('.parked-activity-wrapper').on('dblclick', this, function(event) {

        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }

        // hide the 'X' for delete an activity
        target.classList.remove('mouseOver');

        // determine the index of the activity
        var selectedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == target) {
                selectedActivityIndex = i;
                break;
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


    /**
     * onDragStart: Add the index of the selected activity that is dragged to the
     * event such that it can later be read again. Also mark that the activity is
     * dragged from the parked activities.
     */
    $(view.container).find('.parked-activity-wrapper').on('dragstart', this, function(event) {

        console.log('dragstart: parked-wrapper');

        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }

        target.parentNode.classList.add('dragOver');

        var selectedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == target) {
                selectedActivityIndex = i;
                break;
            }
        }
        if (selectedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }

        event.originalEvent.dataTransfer.setData("SelectedActivity", selectedActivityIndex);
        event.originalEvent.dataTransfer.setData("From", null);

    });

    /**
     * onDragEnter:
     */
    $(view.container).find('.parked-activity-wrapper').on('dragenter', this, function(event) {
        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }
        target.classList.add('dragOver');
    });

    /**
     * onDragLeave:
     */
    $(view.container).find('.parked-activity-wrapper').on('dragleave', this, function(event) {
        var target = event.target;
        if (!target.classList.contains('parked-activity-wrapper')) {
            return;
        }
        target.classList.remove('dragOver');
    });

    /**
     * onDragOver:
     */
    $(view.container).find('.parked-activity-wrapper').on('dragover', this, function(event) {
        console.log('dragover: parked-wrapper');
        event.preventDefault();
        event.stopPropagation();
    });

    /**
     * onDrop:
     */
    $(view.container).find('.parked-activity-wrapper').on('drop', this, function(event) {

        console.log('drop: wrapper');

        event.preventDefault();
        event.stopPropagation();

        var selectedActivityIndex = event.originalEvent.dataTransfer.getData("SelectedActivity");
        var from = event.originalEvent.dataTransfer.getData("From");
        if (from == 'null') {
            from = null;
        }

        var target = event.target;
        while (!target.classList.contains('parked-activity-wrapper')) {
            target = target.parentNode;
        }

        target.parentNode.classList.remove('dragOver');

        var droppedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == target) {
                droppedActivityIndex = i;
                break;
            }
        }
        if (droppedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }

        model.moveActivity(from, selectedActivityIndex, null, droppedActivityIndex);

    });


    /**
     * onDragEnter: If an element is dragged over the parkedActivitiesContainer
     * highlight the container with a dashed red border so that it's clear that
     * the element can dropped here.
     */
    view.parkedActivitiesContainer.on('dragenter', this, function(event) {
        event.target.classList.add('dragOver');
    });

    /**
     * onDragLeave: If a dragged element leaves the parkedActivitiesContainer
     * un-highlight the container.
     */
    view.parkedActivitiesContainer.on('dragleave', this, function(event) {
        event.target.classList.remove('dragOver');
    });

    /**
     * onDragOver: We need to catch this event and stop the propagation
     * otherwise the 'drop' event won't be fired.
     */
    view.parkedActivitiesContainer.on('dragover', this, function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    /**
     * onDrop: Add the dragged activity at the end of the list of all
     * parked activities.
     */
    view.parkedActivitiesContainer.on('drop', this, function(event) {

        event.preventDefault();
        event.stopPropagation();

        // un-highlight the parkedActivitiesContainer
        event.target.classList.remove('dragOver');

        var selectedActivityIndex = event.originalEvent.dataTransfer.getData("SelectedActivity");
        var from = event.originalEvent.dataTransfer.getData("From");
        if (from == 'null') {
            from = null;
        }

        // since the activity was dropped on another activity, we add the dropped
        // activity at the end
        model.moveActivity(from, selectedActivityIndex, null, null);

    });

}