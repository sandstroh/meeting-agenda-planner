/**
 * Created by sandstroh on 3/3/14.
 */
var CanvasView = function(canvas, model, day) {

    canvas.css('width: 100px;');
    canvas.css('height: 150px;');

    this.update = function() {

        // TODO: doesn't work (Object has no method 'getContext')
//        var ctx = canvas.getContext("2d");
//        ctx.fillStyle = "#FF0000";
//        ctx.fillRect(20,10,75,75);

    }

    this.update();

}