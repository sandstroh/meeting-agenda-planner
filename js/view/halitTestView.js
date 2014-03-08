/*
<div id="menu" style="float:left;">
    Start Time <span id="startTime"> <input type="text" value="08:00"></span> <br>
    End Time <span id="endTime">10:00</span><br>
    Total Time <span id="totalLength">120 min</span>
    </div>

    <div id="canvasContainer">
    <canvas id="myCanvas" width="70" height="100"
    style="border:1px solid #000000;">
    </canvas>
    </div>

    <div id="tableContainer" style="width:300px;">
    <table class="table" style="height:500px;border:dashed gray;">

    <tr>
    <td>08:00</td>
    <td>Introduction</td>
    </tr>

    </table>
    </div>

    <div id="dayViewsContainer" style="border: black solid 1px;" class="table-view-custom">
    </div>

        <ul style="list-style-type: none;">
                        <li>Start Time <span id="startTime"> <input type="text" value="08:00"></span></li>
                        <li>End Time</li>
                        <li>Total Time</li>
                    </ul>
*/
var HalitTestView = function(container,model)
{
    this.mainDiv = container.find("#overallDayContainer");
    window.alert("breaking the habit");

    var div = $("<div>");
    div.attr("id","timeMenu");
    div.attr("style","float:left;");

    var listTag = $("<ul>");
    listTag.attr("style","list-style-type: none;");

    var startTimeTag = $("<li>");
    startTimeTag.html("Start Time");
    var startSpan = $("<span>");
    startSpan.attr("id","startActivityTime");

    var textArea = $("<input>");
    textArea.attr("type","text");
    textArea.attr("value","08:00");
    startSpan.append(textArea);

    startTimeTag.append(startSpan);

    var endTimeTag = $("<li>");
    endTimeTag.html("End Time");
    var endSpan = $("<span>");
    endSpan.attr("id","endActivityTime");
    endTimeTag.append(endSpan);

    var totalTimeTag = $("<li>");
    totalTimeTag.html("Total Time");
    var totalSpan = $("<span>");
    totalSpan.attr("id","totalActivityTime");
    totalTimeTag.append(totalSpan);

    listTag.append(startTimeTag);
    listTag.append(endTimeTag);
    listTag.append(totalTimeTag);

    var canvasDiv = $("<div>");
    canvasDiv.attr("id","canvasContainer");

    var canvasElement = $("<canvas>");
    canvasElement.attr("id","activityTimeGraph");
    canvasElement.attr("width","70");
    canvasElement.attr("height","100");
    canvasElement.attr("style","border:1px solid #000000;");
    canvasDiv.append(canvasElement);

    var tableDiv = $("<div>");
    tableDiv.attr("id","tableContainer");
    tableDiv.attr("style","width:300px;");

    var tableTag = $("<table>");
    tableTag.addClass("table");
    tableTag.attr("id","activityTable");
    tableTag.attr("style","height:500px;border:dashed gray;");

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
    div.append(listTag);

    this.mainDiv.append(div);
    this.mainDiv.append(canvasDiv);
    this.mainDiv.append(tableDiv);
}