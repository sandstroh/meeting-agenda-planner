/**
 * Created by sandstroh on 3/3/14.
 */
var MeetingsView = function(container, model) {

    this.dayViewsContainer = container.find("#dayViewsContainer");

    this.update = function() {

        console.log('meetingsView.update()');

        for (var i = 0; i < model.days.length; i++) {
            var dayDiv = $('<div>');
            var dayView = new DayView(dayDiv, model, model.days[i]);
            var dayController = new DayController(dayView, model, model.days[i]);
            this.dayViewsContainer.append(dayDiv);
        }

    }

    this.update();

}