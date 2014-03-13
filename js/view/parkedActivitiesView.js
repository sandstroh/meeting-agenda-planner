/**
 * Created by sandstroh on 3/2/14.
 */
var ParkedActivitiesView = function(container, model) {

    this.container = container;

    this.parkedActivitiesContainer = container.find('#parkedActivitiesContainer');

    this.addNewActivityButton = container.find('#addActivityButton');

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
            activityDiv.addClass('row');

//            activityDiv.html(activities[i].getName());
//            activityDiv.html(activities[i].getLength() + 'min');

            var lengthSpan = $('<span>');
            lengthSpan.html(activities[i].getLength() + 'min');
            lengthSpan.addClass('col-md-3');
//            lengthSpan.addClass('length-span');
            var nameSpan = $('<span>');
            nameSpan.html(activities[i].getName());
            nameSpan.addClass('col-md-7');

            var deleteSpan = $('<span>');
            deleteSpan.addClass('col-md-1');
            deleteSpan.addClass('glyphicon');
            deleteSpan.addClass('glyphicon-remove');

            activityDiv.append(lengthSpan);
            activityDiv.append(nameSpan);
            activityDiv.append(deleteSpan);
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

        /**
         * Why do we create the controller for this view here and update it on each model update?
         *
         * Short: Otherwise it wouldn't work.
         *
         * More detailed: Let's take a look at the delete 'X' of each activity that appears if you
         * are with the mouse over an activity. When you click on it, the parked activity gets deleted
         * and the model gets updated. It's now one element less. But the controller isn't updated and
         * a lot of its functionality simply doesn't work anymore. We cannot explain why exactly this is
         * the case, but the problem seems to be, that at the very end of a click event other events are
         * triggered. But when the model gets updated and the element on which you clicked doesn't exist
         * anymore, these events cannot be triggered and the leads to some problems.
         */
        var parkedActivitiesController = new ParkedActivitiesController(this, model);

    }

    // update the view
    this.update();

}