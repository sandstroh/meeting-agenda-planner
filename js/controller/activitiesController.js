/**
 * Created by sandstroh on 3/2/14.
 */
var ActivitiesController = function(view, model) {

    $('.activity').on('dragstart', this, function(event) {
        console.log('dragstart()');
        event.originalEvent.dataTransfer.setData("Text", event.target);
    });

    $('.activity').on('dragend', this, function(event) {
        console.log('dragend()');
    });


}