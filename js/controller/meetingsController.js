/**
 * Created by sandstroh on 3/5/14.
 */
var MeetingsController = function(view, model) {

    // TODO: in meetingsView -> clear daysViewContainer before update
    view.addDayButton.click(function() {
        model.addDay();
    });

}