/**
 * Created by sandstroh on 3/3/14.
 */
var DayView = function(container, model, day) {

//    <div>
//        <table>
//            <tr>
//                <td>Start:</td>
//                <td><input type="text"/></td>
//            </tr>
//            <tr>
//                <td>End:</td>
//                <td>xy</td>
//            </tr>
//            <tr>
//                <td>Duration:</td>
//                <td>xy</td>
//            </tr>
//        </table>
//        <div style="border: solid black 1px; min-height: 100px; margin: 5px;">
//
//        </div>
//    </div>

    this.update = function() {

            var dayDiv = $('<div>');
            dayDiv.attr('style', 'max-width: 200px;');
            var dayTable = $('<table>');

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

            var activitiesDiv = $('<div>');
            activitiesDiv.attr('style', 'border: solid black 1px; min-height: 100px;');

            dayDiv.append(dayTable)
            dayDiv.append(activitiesDiv);

            container.append(dayDiv);

    }

    this.update();

}