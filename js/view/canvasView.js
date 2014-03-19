/**
 * Created by sandstroh on 3/3/14.
 */
var CanvasView = function(canvas, model, day) {

    model.addObserver(this);

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

        var box_offset_x = 5;
        var box_offset_y = 5;

        var box_width = canvas.width - 2 * box_offset_x;
        var box_height = canvas.height - 2 * box_offset_y;

        var start_y;
        var end_y;

        // draw the percentage of the presentations
        if (percentagePresentations > 0) {
            ctx.fillStyle = colorPresentations;
            start_y = box_offset_y;
            end_y = box_height * percentagePresentations;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw the percentage of the group works
        if (percentageGroupWorks > 0) {
            ctx.fillStyle = colorGroupWorks;
            start_y = end_y;
            end_y = start_y + box_height * percentageGroupWorks;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw the percentage of the discussions
        if (percentageDiscussions > 0) {
            ctx.fillStyle = colorDiscussions;
            start_y = end_y;
            end_y = start_y + box_height * percentageDiscussions;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw the percentage of the breaks
        if (percentageBreaks > 0) {
            ctx.fillStyle = colorBreaks;
            start_y = end_y;
            end_y = start_y + box_height * percentageBreaks;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
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

    this.update();

}