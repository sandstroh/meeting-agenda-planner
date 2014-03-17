var HalitTestView = function(container,model,day)
{
    //model.addObserver(this);
    this.update = function()
    {
        var huhh = $('#meetingsView').width();

        this.mainDiv = container.find("#dayViewsContainer");
        this.addButton = container.find("#addDayButton");

        var bigTestDiv = $("<div>");
        bigTestDiv.attr("style","display: table-cell;overflow:hidden;width:700px;height:400px;");

        this.contain = container;

        var div = $("<div>");
        div.attr("id","timeMenu");
        div.attr("style","height:150px;width:250px;float:left;");

        var startDiv = $("<div>");
        startDiv.html("Start Time: ");

        var startSpan = $("<span>");
        startSpan.attr("id","startActivityTime");
        var textArea = $("<input>");
        textArea.attr("type","text");
        //textArea.attr("value","08:00");

        startSpan.append(textArea);
        startDiv.append(startSpan);

        var endDiv = $("<div>");
        endDiv.html("End Time: ");
        var endSpan = $("<span>");
        endSpan.attr("id","endActivityTime");

        endDiv.append(endSpan);
        div.append(endDiv);

        var totalDiv = $("<div>");
        totalDiv.html("Total Time: ");
        var totalSpan = $("<span>");
        totalSpan.attr("id","totalActivityTime");
        totalDiv.append(totalSpan);

        div.append(startDiv);
        div.append(endDiv);
        div.append(totalDiv);

        var canvasDiv = $("<div>");
        canvasDiv.attr("id","canvasContainer");
        canvasDiv.attr("style","float:left;");

        var canvasElement = $("<canvas>");
        canvasElement.attr("id","activityTimeGraph");
        canvasElement.attr("width","70");
        canvasElement.attr("height","100");
        canvasElement.attr("style","border:1px solid #000000;position:absolute;");
        canvasDiv.append(canvasElement);

        var tableDiv = $("<div>");
        tableDiv.attr("id","tableContainer");
        tableDiv.attr("style","width:350px;");

        var tableTag = $("<table>");
        tableTag.addClass("table");
        tableTag.attr("id","activityTable");
        tableTag.attr("style","width:320px;height:500px;border:dashed gray;");

        tableDiv.append(tableTag);

        bigTestDiv.append(div);
        bigTestDiv.append(canvasDiv);
        bigTestDiv.append(tableDiv);

        var trTag = $("<tr>");
        var timeRow = $("<td>");
        var nameRow = $("<td>");

        for(var i = 0; i < day.getActivities().length; i++)
        {
            textArea.attr("value",day.getStart());
            endSpan.html(day.getEnd());
            totalSpan.html(day.getTotalLength() + "Min");
            timeRow.html(day.getActivities()[i].getLength());
            nameRow.html(day.getActivities()[i].getName());
        }

         trTag.append(timeRow);
                    trTag.append(nameRow);
                    tableTag.append(trTag);

        this.mainDiv.append(bigTestDiv);
        window.alert("called the update");
    }
    this.update();
}