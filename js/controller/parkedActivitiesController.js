/**
 * Created by sandstroh on 3/2/14.
 */
var ActivitiesController = function(view, model) {

    // TODO: only specify actions for elements with class '.activity' inside the view

    view.addNewActivityButton.click(function(event) {

        console.log('Add new activity...');

        var activityDialogView = new ActivityDialogView($('#activityDialogView'), model, null);
        var activityDialogController = new ActivityDialogController(activityDialogView, model);

        $('#activityDialogView').modal('show');

    });

    // onDoubleClick
    $('.activity').on('dblclick', this, function(event) {

        console.log('doubleclick');

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

        // show dialog
        var activityDialogView = new ActivityDialogView($('#activityDialogView'), model, selectedActivity);
        var activityDialogController = new ActivityDialogController(activityDialogView, model);

        $('#activityDialogView').modal('show');

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
    $('.activity').on('drop', this, function(event) {

        console.log('drop on activity');

        event.preventDefault();
        event.stopPropagation();

//        console.log(event);

        var droppedActivityIndex = -1;
        for (var i = 0; i < view.parkedActivitiesContainer.children().length; i++) {
            if (view.parkedActivitiesContainer.children()[i] == event.target) {
                droppedActivityIndex = i;
                break;
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