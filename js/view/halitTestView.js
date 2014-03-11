var HalitTestView = function(container,model)
{
    model.addObserver(this);
    this.update = function()
    {
        this.mainDiv = container.find("#overallDayContainer");
        this.addButton = container.find("#wiener");

        this.contain = container;

        var div = $("<div>");
        div.attr("id","timeMenu");
        div.attr("style","height:150px;width:250px;float:left;");

        var startDiv = $("<div>");
        startDiv.html("Start Time");

        var startSpan = $("<span>");
        startSpan.attr("id","startActivityTime");
        var textArea = $("<input>");
        textArea.attr("type","text");
        textArea.attr("value","08:00");

        startSpan.append(textArea);
        startDiv.append(startSpan);


        var endDiv = $("<div>");
        endDiv.html("End Time");
        var endSpan = $("<span>");
        endSpan.attr("id","endActivityTime");

        endDiv.append(endSpan);
        div.append(endDiv);

        var totalDiv = $("<div>");
        totalDiv.html("Total Time");
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
        canvasElement.attr("style","border:1px solid #000000;");
        canvasDiv.append(canvasElement);

        var tableDiv = $("<div>");
        tableDiv.attr("id","tableContainer");
        tableDiv.attr("style","width:250px;");

        var tableTag = $("<table>");
        tableTag.addClass("table");
        tableTag.attr("id","activityTable");
        tableTag.attr("style","width:320px;height:500px;border:dashed gray;");

        //1 tr 2 td
        var trTag = $("<tr>");
        var timeRow = $("<td>");
        timeRow.html("08:00");
        var nameRow = $("<td>");
        nameRow.html("dark side");
        trTag.append(timeRow);
        trTag.append(nameRow);

        tableTag.append(trTag);
        tableDiv.append(tableTag);

        this.mainDiv.append(div);
        this.mainDiv.append(canvasDiv);
        this.mainDiv.append(tableDiv);

        window.alert("breaking the habit");
    }
    this.update();
}