/**
 * Created by sandstroh on 3/2/14.
 */
var ActivitiesView = function(container, model) {

    this.parkedActivitiesContainer = container.find('#parkedActivitiesContainer');

    // register an observer to the model
    model.addObserver(this);

    // this function gets called when there is a change at the model
    this.update = function() {

        console.log('activitiesView.update()');

        // reset parked activities container (delete all previous parked activities)
        this.parkedActivitiesContainer.empty();

        // add all parked activities
        console.log("#parkedActivites = " + model.parkedActivities.length);
        var activities = model.parkedActivities;
        for (var i = 0; i < activities.length; i++) {
            var activityDiv = $('<div>');
            activityDiv.html(activities[i].getName());
            activityDiv.addClass('activity');
            switch(activities[i].getTypeId()) {
                case 0:
                    activityDiv.addClass('activity-presentation'); break;
                case 1:
                    activityDiv.addClass('activity-group-work'); break;
                case 2:
                    activityDiv.addClass('activity-discussion'); break;
                case 3:
                    activityDiv.addClass('activity-break'); break;
                default:
                    console.log('Error: unknown activity type \'' + activities[i].getTypeId() + '\'');
            }
            activityDiv.attr('draggable', true);
            this.parkedActivitiesContainer.append(activityDiv);
        }

    }

    // update the view
    this.update();

}