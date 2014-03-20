var DayView = function(container, model, day) {

    /**
     * This view doesn't need to be registered as an observer to the model,
     * because if the model changes, the MeetingsView gets updated, and all
     * previous DayViews get deleted and for each day a new DayView gets
     * created.
     */

    this.container = container;

    this.update = function() {

        /** Title Info: number of day + delete day button **/
        var dayTitleDiv = $("<div>");
        dayTitleDiv.addClass('day-title-div');
        dayTitleDiv.html('Day: ' + (model.getIdOfDay(day)+1));

        this.deleteDayButton = $("<span>");
        this.deleteDayButton.addClass("glyphicon glyphicon-remove");
        this.deleteDayButton.addClass('delete-day-button');

        dayTitleDiv.append(this.deleteDayButton);

        /** Time Info: start time, end time and length **/
        var dayTimeTable = $('<div>');
        dayTimeTable.addClass('day-time-table');

        var trStart = $('<tr>');
        var tdStartLabel = $('<td>');
        tdStartLabel.html('Start Time:');
        var tdStartValueDiv = $('<div>');
        tdStartValueDiv.addClass('input-group bootstrap-timepicker');
        this.inputStart = $('<input>')
        this.inputStart.addClass('form-control input-sm');
        this.inputStart.attr('type', 'text');
        this.inputStart.attr('style', 'width: 70px;');
        this.inputStart.val(day.getStart());
        this.inputStart.attr('disabled', true);
        this.spanAddon = $('<span>');
        this.spanAddon.addClass('input-group-addon');
        this.spanAddon.addClass('glyphicon glyphicon-time');

        tdStartValueDiv.append(this.inputStart);
        tdStartValueDiv.append(this.spanAddon);
        trStart.append(tdStartLabel);
        trStart.append(tdStartValueDiv);

        var trEnd = $('<tr>');
        var tdEndLabel = $('<td>');
        tdEndLabel.html('End Time:');
        var tdEndValue = $('<td>');
        tdEndValue.html(day.getEnd());
        trEnd.append(tdEndLabel);
        trEnd.append(tdEndValue);

        var trLength = $('<tr>');
        var tdLengthLabel = $('<td>');
        tdLengthLabel.html('Total Length:');
        var tdLengthValue = $('<td>');
        tdLengthValue.html(day.getTotalLength() + ' min');
        trLength.append(tdLengthLabel);
        trLength.append(tdLengthValue);

        dayTimeTable.append(trStart);
        dayTimeTable.append(trEnd);
        dayTimeTable.append(trLength);

        /** Canvas View **/
        var canvasDiv = $("<div>");
        canvasDiv.addClass('day-canvas-div');

        var dayCanvas = $('<canvas>');
        dayCanvas.attr('width', '70');
        dayCanvas.attr('height', '100');
        // we have to pass canvas.get(0) to the view because the created
        // canvas object is an jquery object and not a pure canvas element
        // see: http://stackoverflow.com/questions/5808162/getcontext-is-not-a-function
        var canvasView = new CanvasView(dayCanvas.get(0), model, day);

        canvasDiv.append(dayCanvas);

        /** Activities Container **/
        var dayActivitiesWrapper = $("<div>");
        dayActivitiesWrapper.addClass('day-activities-div-wrapper');

        this.dayActivitiesContainer = $('<div>');
        this.dayActivitiesContainer.addClass('day-activities-div');

        dayActivitiesWrapper.append(this.dayActivitiesContainer);

        /** Add all the activities to the activities container **/
        var activities = day.getActivities();
        for (var i = 0; i < activities.length; i++) {

            // activity wrapper div
            var activityWrapperDiv = $('<div>');
            activityWrapperDiv.addClass('day-activity-wrapper');

            // activity div
            var activityDiv = $('<div>');
            activityDiv.addClass('row');
            activityDiv.addClass('day-activity');
            activityDiv.attr('draggable', true);

            // activity length
            var lengthSpan = $('<span>');
            var startTime = day.getStartOfActivity(activities[i]);
            lengthSpan.html(formatTime(startTime, startTime));
            lengthSpan.addClass('col-md-3');

            // activity name
            var nameSpan = $('<span>');
            nameSpan.html(activities[i].getName());
            nameSpan.addClass('col-md-7');

            // activity delete X
            var deleteSpan = $('<span>');
            deleteSpan.addClass('col-md-1');
            deleteSpan.addClass('glyphicon');
            deleteSpan.addClass('glyphicon-remove');

            // append activity spans to activity div
            activityDiv.append(lengthSpan);
            activityDiv.append(nameSpan);
            activityDiv.append(deleteSpan);

            // add activity type class to activity div
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

            // add the activity div to the wrapper div and add it to the overall activity container
            activityWrapperDiv.append(activityDiv);

            // add a tooltip to the activity with its description
            activityWrapperDiv.tooltip({
                title: 'Description: ' + activities[i].getDescription(),
                placement:  'bottom'
            });

            this.dayActivitiesContainer.append(activityWrapperDiv);

        }

        /** Add all parts to the day view container **/
        container.append(dayTitleDiv);
//        container.append(dayTimeDiv);
        container.append(dayTimeTable);
        container.append(canvasDiv);
        container.append(dayActivitiesWrapper);

    }

    this.update();

}