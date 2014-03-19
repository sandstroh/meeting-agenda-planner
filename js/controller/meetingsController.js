/**
 * Created by sandstroh on 3/5/14.
 */
var MeetingsController = function(view, model) {

    view.addDayButton.click(function(){
        model.addDay();
    });
}