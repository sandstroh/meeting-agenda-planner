/**
 * Created by sandstroh on 3/5/14.
 */
var DayController = function(view, model, day) {

    // TODO: drag n drop doesn't work yet

//    view.on('ondragover', onDragOver);
//    view.activitiesDiv.on('ondragover', onDragOver);
//    view.activitiesDiv.on('ondrop', onDrop);

    var onDragOver = function(event) {
        event.preventDefault();
    }

    var onDrop = function(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data))
    }

}