/**
 * Created by sandstroh on 3/2/14.
 */
var ActivitiesController = function(view, model) {

    $('.activity').click(function (event) {
        console.log('on dragstart()');
       drag(event);

    });

    function drag(ev) {
        ev.dataTransfer.setData("Text",ev.target.id);
    }

}