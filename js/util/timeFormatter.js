/**
 * Created by sandstroh on 3/6/14.
 */
function formatTime(startH, startM) {
    var timeH = Math.floor(startH/60);
    var timeM = startM % 60;
    var time = timeH + ":";
    if (timeM < 10) {
        time += "0" + timeM;
    } else {
        time += timeM;
    }
    return time;
}