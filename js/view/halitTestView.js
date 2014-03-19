var HalitTestView = function(container,model,day)
{
//    model.addObserver(this);
    this.update = function()
    {
        console.log('halitTestView.update()');

//        var huhh = $('#meetingsView').width();
        //$("#meetingsView").css("width", "150%");

//        this.mainDiv = container.find("#overallDayContainer");
//        this.addButton = $("#addDayButton");

//        var bigTestDiv = $("<div>");
        container.attr("style","display: table-cell;overflow:hidden;width:700px;height:400px;");

//        this.contain = container;

        var div = $("<div>");
//        div.attr("id","timeMenu");
        div.attr("style","height:150px;width:250px;float:left;");

        var startDiv = $("<div>");
        startDiv.html("Start Time: ");

        var startSpan = $("<span>");
//        startSpan.attr("id","startActivityTime");
        var textArea = $("<input>");
        textArea.attr("type","text");
        //textArea.attr("value","08:00");

        startSpan.append(textArea);
        startDiv.append(startSpan);

        var endDiv = $("<div>");
        endDiv.html("End Time: ");
        var endSpan = $("<span>");
//        endSpan.attr("id","endActivityTime");

        endDiv.append(endSpan);
        div.append(endDiv);

        var totalDiv = $("<div>");
        totalDiv.html("Total Time: ");
        var totalSpan = $("<span>");
//        totalSpan.attr("id","totalActivityTime");
        totalDiv.append(totalSpan);

        div.append(startDiv);
        div.append(endDiv);
        div.append(totalDiv);

        var canvasDiv = $("<div>");
//        canvasDiv.attr("id","canvasContainer");
        canvasDiv.attr("style","float:left;");

        var canvasElement = $("<canvas>");
//        canvasElement.attr("id","activityTimeGraph");
        canvasElement.attr("width","70");
        canvasElement.attr("height","100");
        canvasElement.attr("style","border:1px solid #000000;position:absolute;");
        canvasDiv.append(canvasElement);

        var tableDiv = $("<div>");
//        tableDiv.attr("id","tableContainer");
        tableDiv.attr("style","width:350px;");

        var tableTag = $("<table>");
        tableTag.addClass("table");
//        tableTag.attr("id","activityTable");
        tableTag.attr("style","width:320px;height:500px;border:dashed gray;");


        tableDiv.append(tableTag);


//        bigTestDiv.append(div);
//        bigTestDiv.append(canvasDiv);
//        bigTestDiv.append(tableDiv);
        container.append(div);
        container.append(canvasDiv);
        container.append(tableDiv);
        /*
        this.mainDiv.append(div);
        this.mainDiv.append(canvasDiv);
        this.mainDiv.append(tableDiv);
        */

        if (day.getActivities().length == 0) {
            var trTag = $("<tr>");
            var timeRow = $("<td>");
            //timeRow.html("08:00");
            var nameRow = $("<td>");
            //nameRow.html("dark side");
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
                //1 tr 2 td
                var trTag = $("<tr>");
                var timeRow = $("<td>");
                //timeRow.html("08:00");
                var nameRow = $("<td>");
                //nameRow.html("dark side");
                timeRow.html(day.getActivities()[i].getLength());
                nameRow.html(day.getActivities()[i].getName());

                trTag.append(timeRow);
                trTag.append(nameRow);
                tableTag.append(trTag);
            }
        }

//        container.add()
//        this.mainDiv.append(container);
    }
    this.update();
}