/**
 * Created by sandstroh on 3/3/14.
 */
var DayView = function (container, model, day) {

    model.addObserver(this);

    this.update = function () {

        var dayDiv = $('<div>');
        dayDiv.attr('style', 'max-width: 200px;');

        var dayTable = $('<table>');
        dayTable.addClass("table table-bordered");

        // start time:
        var trStart = $('<tr>');
        var tdStartLabel = $('<td>');
        tdStartLabel.html('Start:');
        var tdStartValue = $('<td>');
        tdStartValue.html(day.getStart());
        trStart.append(tdStartLabel);
        trStart.append(tdStartValue);
        dayTable.append(trStart);

        // end time:
        var trEnd = $('<tr>');
        var tdEndLabel = $('<td>');
        tdEndLabel.html('End:');
        var tdEndValue = $('<td>');
        tdEndValue.html(day.getEnd());
        trEnd.append(tdEndLabel);
        trEnd.append(tdEndValue);
        dayTable.append(trEnd);

        // total length:
        var trLength = $('<tr>');
        var tdLengthLabel = $('<td>');
        tdLengthLabel.html('Length:');
        var tdLengthValue = $('<td>');
        tdLengthValue.html(day.getTotalLength());
        trLength.append(tdLengthLabel);
        trLength.append(tdLengthValue);
        dayTable.append(trLength);

        // canvas
        var canvas = $('<canvas>')
        // we have to pass canvas.get(0) to the view because the created
        // canvas object is an jquery object and not a pure canvas element
        // see: http://stackoverflow.com/questions/5808162/getcontext-is-not-a-function
        var canvasView = new CanvasView(canvas.get(0), model, day);


        // activities
        this.activitiesDiv = $('<div>');
//        this.activitiesDiv.attr('style', 'border: solid black 1px; min-height: 100px;');
        this.activitiesDiv.addClass('activitiesDiv');

        for (var i = 0; i < day.getActivities().length; i++) {
            var activityDiv = $('<div>');
            activityDiv.html(day.getActivities()[i].getName());
            activityDiv.addClass('activity');
            switch (day.getActivities()[i].getTypeId()) {
                case 0:
                    activityDiv.addClass('activity-presentation');
                    break;
                case 1:
                    activityDiv.addClass('activity-group-work');
                    break;
                case 2:
                    activityDiv.addClass('activity-discussion');
                    break;
                case 3:
                    activityDiv.addClass('activity-break');
                    break;
                default:
                    console.log('Error: unknown activity type \'' + day.getActivities()[i].getTypeId() + '\'');
            }
            this.activitiesDiv.append(activityDiv);
            var trActivity = $("<tr>");
            var tdActivity = $("<td>");
            tdActivity.append(this.activitiesDiv);
            trActivity.append(tdActivity);
            dayTable.append(trActivity);
        }

        dayDiv.append(dayTable)
        dayDiv.append(canvas);
        //dayDiv.append(activitiesDiv);

        container.append(dayDiv);

    }

    this.update();

}