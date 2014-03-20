/**
 * Created by sandstroh on 3/3/14.
 */
var MeetingsView = function(container, model) {

    this.dayViewsContainer = container.find("#overallDayContainer");
    this.addDayButton = container.find('#addDayButton');

    // register this view as an observer to the model
    model.addObserver(this);

    // this function gets called when there is a change at the model
    this.update = function() {

        console.log('meetingsView.update()');
        console.log('#days = ' + model.days.length);

        // clear the container that holds the old DayViews before creating
        // new DayViews according to the days in the model
        this.dayViewsContainer.empty();

        for (var i = 0; i < model.days.length; i++)
        {

            var dayDiv = $("<div>");
            dayDiv.addClass('day-view-container');

            var dayView = new DayView(dayDiv, model, model.days[i]);
            var dayController = new DayController(dayView, model, model.days[i]);

            this.dayViewsContainer.append(dayDiv);
        }

    }

    // update the view in the beginning
    this.update();

}