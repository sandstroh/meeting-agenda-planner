/**
 * Created by sandstroh on 3/6/14.
 */

/**
 * Formats the time nicely, i.e. 8:5 becomes 8:05
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

/**
 * Checks if the given time has the format HH:MM
 * @param time string that should be checked
 * @returns {boolean} true if the input has the right format or false
 * otherwise
 */
function isValidTime(time) {

    if (time.indexOf(':') == -1) {
        return false;
    }
    var parts = time.split(':');
    if (parts.length != 2) {
        return false;
    }

    var startH = -1;
    if (!isNaN(parseFloat(parts[0])) && isFinite(parts[0])) {
        startH = parseInt(parts[0]);
    }
    var startM = -1;
    if (!isNaN(parseFloat(parts[1])) && isFinite(parts[1])) {
        startM = parseInt(parts[1]);
    }
    if (startH == -1 || startM == -1) {
        return false;
    }

    if (startH < 0 && startH > 24) {
        return false;
    }
    if (startM < 0 && startM > 60) {
        return false;
    }

    // all check passed: the given string is a valid time
    return true;

}