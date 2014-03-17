/**
 * Created by sandstroh on 3/5/14.
 */
var DayController = function(view, model, day) {

    // onDragStart
    view.activitiesDiv.on('dragstart', this, function(event) {

        console.log('dragstart');

        var selectedActivityIndex = -1;
        for (var i = 0; i < view.activitiesDiv.children().length; i++) {
            if (view.activitiesDiv.children()[i] == event.target) {
                selectedActivityIndex = i;
                break;
            }
        }
        if (selectedActivityIndex == -1) {
            console.log('Error: selected activity not found');
            return;
        }

        var dayIndex = -1;
        for (var i = 0; i < model.days.length; i++) {
            if (model.days[i] == day) {
                dayIndex = i;
            }
        }
        if (dayIndex == -1) {
            console.log('Error: Couldn\'t determine the day.');
            return;
        }

        event.originalEvent.dataTransfer.setData("SelectedActivity", selectedActivityIndex);
        event.originalEvent.dataTransfer.setData("From", dayIndex);

    });

    // onDragOver: we need to catch this event and stop the propagation
    // otherwise the 'drop' event won't be fired
    view.activitiesDiv.on('dragover', this, function(event) {
        console.log('dragover');
        event.preventDefault();
        event.stopPropagation();
    });

//    $('.activity').on('dragover', this, function(event) {
//
//        console.log('drag over activity');
//
//        var mouse_y = event.originalEvent.y;
//
//        var target_y = $(event.target).position().top;
//        var target_height = $(event.target).height();
//
////        console.log('mouse_y = ' + mouse_y);
////        console.log('target_y = ' + target_y);
////        console.log('target_h = ' + target_height);
//
//        if (mouse_y - 10 < (target_y + target_height / 2)) {
//            event.target.classList.add('dropOverTop');
//            event.target.classList.remove('dragOverBottom');
//        } else {
//            event.target.classList.add('dropOverBottom');
//            event.target.classList.remove('dragOverTop');
//        }
//
//    });

//    $('.activity').on('dragenter', this, function(event) {
//        console.log(event);
//
//    });

//    $('.activity').on('dragleave', this, function(event) {
//        console.log('drag leave activity');
//        event.target.classList.remove('dragOverTop');
//        event.target.classList.remove('dragOverBottom');
//    });

    // onDragEnter:
    view.activitiesDiv.on('dragenter', this, function(event) {
        console.log('dragenter');
        event.target.classList.add('over');
    });

    // onDragLeave:
    view.activitiesDiv.on('dragleave', this, function(event) {
        console.log('dragleave');
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove('over');
    });

    view.activitiesDiv.on('dragend', this, function(event) {
       console.log('dragend');
    });

    // onDrop:
    view.activitiesDiv.on('drop', this, function(event) {

        console.log('drop');

        event.preventDefault();
        event.stopPropagation();

        event.target.classList.remove('over');

        console.log(event);

        var selectedActivityIndex = event.originalEvent.dataTransfer.getData("SelectedActivity");
        var from = event.originalEvent.dataTransfer.getData("From");
        if (from == 'null') {
            from = null;
        }

        var dayIndex = -1;
        for (var i = 0; i < model.days.length; i++) {
            if (model.days[i] == day) {
                dayIndex = i;
            }
        }
        if (dayIndex == -1) {
            console.log('Error: Couldn\'t determine the day.');
            return;
        }

        // TODO: determine newposition of the activity
        // add the activity at the end of the day
        model.moveActivity(from, selectedActivityIndex, dayIndex, null);

    });

}