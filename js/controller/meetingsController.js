/**
 * Created by sandstroh on 3/5/14.
 */
var MeetingsController = function(view, model) {

    /**
     * Add a new day on a click on the 'Add day' button
     */
    view.addDayButton.click(function(){
        model.addDay();
    });

}