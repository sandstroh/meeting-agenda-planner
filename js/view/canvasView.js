/**
 * Created by sandstroh on 3/3/14.
 */
var CanvasView = function(canvas, model, day) {

    /**
     * This view doesn't need to be registered as an observer to the model,
     * because if the model changes, the MeetingsView gets updated, and all
     * previous DayViews get deleted and for each day a new DayView gets
     * created and for each DayView a new CanvasView will be created.
     */

    this.update = function() {

        var activities = day.getActivities();

        /** Define all used colors here: **/
        var colorBox = "#000000";
        var colorBreakLine = "#ff0000";
        var colorPresentations = "#D9534F";
        var colorGroupWorks = "#5CB85C";
        var colorDiscussions = "#F0AD4E";
        var colorBreaks = "#5BC0DE";

        var lengthPresentations = 0;
        var lengthGroupWorks = 0;
        var lengthDiscussions = 0;
        var lengthBreaks = 0;

        // calculate the percentage of each activity type of the overall day
        for (var i = 0; i < activities.length; i++) {
            switch (activities[i].getTypeId()) {
                case 0:
                    lengthPresentations += activities[i].getLength();
                    break;
                case 1:
                    lengthGroupWorks += activities[i].getLength();
                    break;
                case 2:
                    lengthDiscussions += activities[i].getLength();
                    break;
                case 3:
                    lengthBreaks += activities[i].getLength();
                    break;
            }
        }

        var totalLength = day.getTotalLength();

        var percentagePresentations = lengthPresentations / totalLength;
        var percentageGroupWorks = lengthGroupWorks / totalLength;
        var percentageDiscussions = lengthDiscussions / totalLength;
        var percentageBreaks = lengthBreaks / totalLength;

        var ctx = canvas.getContext("2d");

        // we don't use the whole canvas to draw the box, on all sides we leave
        // some space (5px) such that we later have enough space to draw the
        // 30%-line going over the borders of the box
        var box_offset_x = 5;
        var box_offset_y = 5;

        var box_width = canvas.width - 2 * box_offset_x;
        var box_height = canvas.height - 2 * box_offset_y;

        var rect_y = box_offset_y;
        var rect_height;

        var percentagePrevious = 0;

        // draw the percentage of the presentations
        if (percentagePresentations > 0) {
            ctx.fillStyle = colorPresentations;
            rect_y = box_offset_y;
            rect_height = box_height * percentagePresentations;
            ctx.fillRect(5, rect_y, box_width, rect_height);
            percentagePrevious += percentagePresentations;
        }

        // draw the percentage of the group works
        if (percentageGroupWorks > 0) {
            ctx.fillStyle = colorGroupWorks;
            rect_y = box_offset_y + box_height * percentagePrevious;
            rect_height = box_height * percentageGroupWorks;
            ctx.fillRect(5, rect_y, box_width, rect_height);
            percentagePrevious += percentageGroupWorks;
        }

        // draw the percentage of the discussions
        if (percentageDiscussions > 0) {
            ctx.fillStyle = colorDiscussions;
            rect_y = box_offset_y + box_height * percentagePrevious;
            rect_height = box_height * percentageDiscussions;
            ctx.fillRect(5, rect_y, box_width, rect_height);
            percentagePrevious += percentageDiscussions;
        }

        // draw the percentage of the breaks
        if (percentageBreaks > 0) {
            ctx.fillStyle = colorBreaks;
            rect_y = box_offset_y + box_height * percentagePrevious;
            rect_height = box_height * percentageBreaks;
            ctx.fillRect(5, rect_y, box_width, rect_height);
        }

        // draw the border of box
        ctx.strokeStyle = colorBox;
        ctx.rect(box_offset_x - 1, box_offset_y - 1, box_width + 2, box_height + 2);
        ctx.stroke();

        // draw the 30%-breaks line
        ctx.strokeStyle = colorBreakLine;
        ctx.beginPath();
        var y = box_offset_y + box_height * 0.7;
        ctx.moveTo(0, y);
        ctx.lineTo(70, y);
        ctx.closePath();
        ctx.stroke();

    }

    // create the view in the beginning
    this.update();

}