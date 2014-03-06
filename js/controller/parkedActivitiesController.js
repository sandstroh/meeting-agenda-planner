/**
 * Created by sandstroh on 3/2/14.
 */
var ActivitiesController = function(view, model) {

    $('.activity').on('dragstart', this, function(event) {

        console.log('dragstart()');

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

        event.originalEvent.dataTransfer.setData("SelectedActivity", selectedActivityIndex);

    });

    $('.activity').on('dragend', this, function(event) {
        console.log('dragend()');
    });


}