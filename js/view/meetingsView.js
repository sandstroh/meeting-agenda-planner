/**
 * Created by sandstroh on 3/3/14.
    <table class="table table-bordered" id="meeting-table">
        <tr>
            <td class="active">Race</td>
        </tr>
    </table>
 */
var MeetingsView = function(container, model) {

    this.dayViewsContainer = container.find("#dayViewsContainer");
    this.addDayButton = container.find('#addDayButton');

    model.addObserver(this);

    this.update = function() {

        console.log('meetingsView.update()');
        console.log('#days = ' + model.days.length);

        // clear day views container before adding the days in the model
        this.dayViewsContainer.empty();

        var meetingTable = $('<table>');
        meetingTable.addClass("table table-bordered");
        meetingTable.attr("id","meeting-table");

        for (var i = 0; i < model.days.length; i++)
        {
            var trTag = $("<tr>");
            var column = $("<td>");
            column.addClass("active");

            var dayDiv = $('<div>');
            var dayView = new DayView(dayDiv, model, model.days[i]);
            var dayController = new DayController(dayView, model, model.days[i]);

            var halitTestView = new HalitTestView(container,model, model.days[i]);
            var halitController = new HalitTestController(halitTestView,model,model.days[i]);

            column.append(dayDiv);
            trTag.append(column);
            meetingTable.append(trTag);
            this.dayViewsContainer.append(meetingTable);
        }
    }

    this.update();

}