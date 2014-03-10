/**
 * Created by sandstroh on 3/3/14.
 */
var ActivityDialogView = function(container, model, activity) {

    this.activity = activity;

    this.activityDialogLabel = container.find('#activityDialogLabel');

    this.activityName = container.find("#activityName");
    this.activityLength = container.find("#activityLength");
    this.activityType = container.find("#activityType");
    this.activityDescription = container.find("#activityDescription");

    this.okButton = container.find("#addNewActivityButton");
    this.cancelButton = container.find("#cancelAddingNewActivityButton");

    // default value for activity length
    this.activityLength.val("1");

    if (activity == null) {
        this.activityDialogLabel = 'Add New Activity:';
    } else {
        this.activityDialogLabel = 'Edit Activity:';
        this.activityName = activity.getName();
        this.activityLength = activity.getLength();
        this.activityType = activity.getTypeId();
        this.activityDescription = activity.getDescription();
    }

    this.resetView = function() {
        this.activityName.val("");
        this.activityLength.val("1");
        this.activityType.val("0");
        this.activityDescription.val("");
    }

}