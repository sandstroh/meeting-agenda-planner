/**
 * Created by sandstroh on 3/3/14.
 */
var AddNewActivityView = function(container, model) {

    this.activityName = container.find("#activityName");
    this.activityLength = container.find("#activityLength");
    this.activityType = container.find("#activityType");
    this.activityDescription = container.find("#activityDescription");

    this.okButton = container.find("#addNewActivityButton");
    this.cancelButton = container.find("#cancelAddingNewActivityButton");

    // default value for activity length
    this.activityLength.val("1");

}