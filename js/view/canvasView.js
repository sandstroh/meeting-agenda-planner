/**
 * Created by sandstroh on 3/3/14.
 */
var CanvasView = function(canvas, model, day) {

    model.addObserver(this);

    this.update = function() {

        var activities = day.getActivities();

        var lengthPresentations = 0;
        var lengthGroupWorks = 0;
        var lengthDiscussions = 0;
        var lengthBreaks = 0;

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
        // draw percentage presentations
        if (percentagePresentations > 0) {
            ctx.fillStyle = 'red';
            start_y = box_offset_y;
            end_y = box_height * percentagePresentations;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw percentage group works
        if (percentageGroupWorks > 0) {
            ctx.fillStyle = 'green';
            start_y = end_y;
            end_y = start_y + box_height * percentageGroupWorks;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw percentage discussions
        if (percentageDiscussions > 0) {
            ctx.fillStyle = 'yellow';
            start_y = end_y;
            end_y = start_y + box_height * percentageDiscussions;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw percentage breaks
        if (percentageBreaks > 0) {
            ctx.fillStyle = 'blue';
            start_y = end_y;
            end_y = start_y + box_height * percentageBreaks;
            if (start_y + end_y > box_height + box_offset_y) {
                end_y = box_height + box_offset_y - start_y;
            }
            ctx.fillRect(5, start_y, box_width, end_y);
        }

        // draw border of box:
        ctx.strokeStyle = "#000000";
        ctx.rect(box_offset_x - 1, box_offset_y - 1, box_width + 2, box_height + 2);
        ctx.stroke();

    }

    this.update();

}