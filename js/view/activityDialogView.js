/**
 * Created by sandstroh on 3/3/14.
 */
var ActivityDialogView = function(container, model, activity, activityIndex) {

    this.activity = activity;
    this.activityIndex = activityIndex;

    this.activityDialogLabel = container.find('#activityDialogLabel');

    this.activityName = container.find("#activityName");
    this.activityLength = container.find("#activityLength");
    this.activityType = container.find("#activityType");
    this.activityDescription = container.find("#activityDescription");

    this.okButton = container.find("#addNewActivityButton");
    this.cancelButton = container.find("#cancelAddingNewActivityButton");

    if (activity == null) {
        this.activityDialogLabel.html('Add New Activity:');
        this.activityName.val("");
        this.activityLength.val(1);
        this.activityType.val(0);
        this.activityDescription.val("");
        this.okButton.html('Add Activity');
    } else {
        this.activityDialogLabel.html('Edit Activity:');
        this.activityName.val(activity.getName());
        this.activityLength.val(activity.getLength());
        this.activityType.val(activity.getTypeId());
        this.activityDescription.val(activity.getDescription());
        this.okButton.html('Edit Activity');
    }

}