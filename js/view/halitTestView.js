var HalitTestView = function(container,model,day)
{
    this.update = function()
    {
        console.log('halitTestView.update()');
        container.attr("style","display: table-cell;overflow:hidden;width:700px;height:400px;");

        var div = $("<div>");
        div.attr("style","height:150px;width:250px;float:left;");

        var dayNumberDiv = $("<div>");
        dayNumberDiv.attr("align","center");
        dayNumberDiv.attr("style","width:322px;border:1px solid black;");

        this.cancelButton = $("<a>");
        this.cancelButton.attr("id","cancelButton");
        this.cancelButton.addClass("btn glyphicon glyphicon-remove-circle");
        this.cancelButton.attr("href","#");
        this.cancelButton.attr("style","float:right;margin-top:0px;right:-13px;");

        var string = model.getIdOfDay(day)+1;
        dayNumberDiv.html("Day:" + string);
        dayNumberDiv.append(this.cancelButton);

        var startDiv = $("<div>");
        startDiv.html("Start Time: ");

        var startSpan = $("<span>");
        var textArea = $("<input>");
        textArea.attr("type","text");

        startSpan.append(textArea);
        startDiv.append(startSpan);

        var endDiv = $("<div>");
        endDiv.html("End Time: ");
        var endSpan = $("<span>");

        endDiv.append(endSpan);
        div.append(endDiv);

        var totalDiv = $("<div>");
        totalDiv.html("Total Time: ");
        var totalSpan = $("<span>");
        totalDiv.append(totalSpan);

        div.append(startDiv);
        div.append(endDiv);
        div.append(totalDiv);

        var canvasDiv = $("<div>");
        canvasDiv.attr("style","float:left;");

        var canvasElement = $("<canvas>");
        canvasElement.attr("width","70");
        canvasElement.attr("height","100");
        canvasElement.attr("style","border:1px solid #000000;position:absolute;");
        canvasDiv.append(canvasElement);

        var tableDiv = $("<div>");
        tableDiv.attr("style","width:350px;");

        var tableTag = $("<table>");
        tableTag.addClass("table");
        tableTag.attr("style","width:320px;height:500px;border:dashed gray;");

        tableDiv.append(tableTag);

        container.append(dayNumberDiv);
        container.append(div);
        container.append(canvasDiv);
        container.append(tableDiv);

        if (day.getActivities().length == 0) {

            textArea.attr("value",day.getStart());
            var trTag = $("<tr>");
            trTag.addClass("table-custom");
            trTag.attr("style","height:1px;");
            var timeRow = $("<td>");
            var nameRow = $("<td>");
            timeRow.html('');
            nameRow.html('drag elements here');
            trTag.append(timeRow);
            trTag.append(nameRow);
            tableTag.append(trTag);
        } else {
            for(var i = 0; i < day.getActivities().length; i++)
            {
                textArea.attr("value",day.getStart());
                endSpan.html(day.getEnd());
                totalSpan.html(day.getTotalLength() + "Min");
                var trTag = $("<tr>");
                trTag.addClass("table-custom");
                if(i != day.getActivities().length - 1)
                    trTag.attr("style","height:1px;");
                var timeRow = $("<td>");
                var nameRow = $("<td>");
                timeRow.html(day.getActivities()[i].getLength());
                nameRow.html(day.getActivities()[i].getName());

                switch (day.getActivities()[i].getTypeId()) {
                    case 0:
                        trTag.addClass('activity-presentation');
                        break;
                    case 1:
                        trTag.addClass('activity-group-work');
                        break;
                    case 2:
                        trTag.addClass('activity-discussion');
                        break;
                    case 3:
                        trTag.addClass('activity-break');
                        break;
                    default:
                        console.log('Error: unknown activity type \'' + day.getActivities()[i].getTypeId() + '\'');
                }
                trTag.append(timeRow);
                trTag.append(nameRow);
                tableTag.append(trTag);
            }
        }
    }
    this.update();
}