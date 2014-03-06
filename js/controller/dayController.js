/**
 * Created by sandstroh on 3/5/14.
 */
var DayController = function(view, model, day) {

    // onDragOver: we need to catch this event and stop the propagation
    // otherwise the 'drop' event won't be fired
    view.activitiesDiv.on('dragover', this, function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    // onDragEnter:
    view.activitiesDiv.on('dragenter', this, function(event) {
        console.log('dragenter()');
        event.target.classList.add('over');
    });

    // onDragLeave:
    view.activitiesDiv.on('dragleave', this, function(event) {
        console.log('dragleave()');
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove('over');
    });

    // onDrop:
    view.activitiesDiv.on('drop', this, function(event) {
        console.log('drop()');
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove('over');
        // TODO: retrieve activity from event and add it to the day
        // TODO: in the model
//        var data = event.originalEvent.dataTransfer.getData("Text");
//        view.activitiesDiv.append(data);
    });

}