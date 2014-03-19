/**
 * Created by sandstroh on 3/3/14.
 */
var ActivityDialogView = function(container, model, activity) {

    /**
     * Explanation why we create the dialog here with JavaScript instead of having it
     * in the HTML file and only change the necessary fields here which would be easier
     * to understand and also be easier to maintain:
     *
     * The problem with having the code of the dialog in the HTML file is that in the
     * ParkedActivityController several listener to the same dialog get created. Especially
     * there would be multiple event listener that listen to clicks on the OK button. As a
     * result it is possible that a new activity is added several times instead of only once.
     *
     * But this isn't the only problem. We use the same dialog for editing and adding
     * activities (depending on if an activity is passed in the constructor as an argument).
     * If we edit an activity an activityDialogView and activityDialogController get created.
     * If we then want to add a new activity, another activityDialogView and
     * activityDialogController get created (for the same HTML elements). If we then click on
     * the OK button, both of the controllers get the event. The result is that a new activity
     * is created, but also the before edited activity is edited again and will become exactly
     * the same as the new added activity.
     *
     * So we thought it would be the best to create the HTML elements for the dialog each
     * time new when a dialog view is created. Then we have the guarantee that only on controller
     * listens to the click events of the buttons. Another reason why we did it like this is
     * that it was the best solution regarding having a good MVC architecture for our
     * application.
     */

    this.activity = activity;

    this.update = function() {

        this.createDialog();

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

    this.createDialog = function() {

        var modalDialogDiv = $('<div>');
        modalDialogDiv.addClass('modal-dialog');

        var modalContentDiv = $('<div>');
        modalContentDiv.addClass('modal-content');

        /** Modal Header **/
        var modalHeaderDiv = $('<div>');
        modalHeaderDiv.addClass('modal-header');

        var headerCloseButton = $('<button>');
        headerCloseButton.attr('type', 'button');
        headerCloseButton.addClass('close');
        headerCloseButton.attr('data-dismiss', 'modal');
        headerCloseButton.attr('aria-hidden', true);
        headerCloseButton.html('&times;');
        this.activityDialogLabel = $('<h4>');
        this.activityDialogLabel.addClass('modal-title');
        this.activityDialogLabel.attr('id', 'activityDialogLabel');

        modalHeaderDiv.append(headerCloseButton);
        modalHeaderDiv.append(this.activityDialogLabel);

        /** Modal Body **/
        var modalBodyDiv = $('<div>');
        modalBodyDiv.addClass('modal-body');

        var table = $('<table>');
        table.addClass('activitydialog-table');

        var trName = $('<tr>');
        var tdNameLabel = $('<td>');
        tdNameLabel.html('Name:');
        var tdNameInput = $('<td>');
        this.activityName = $('<input>');
        this.activityName.attr('id', 'activityName');
        this.activityName.attr('type', 'text');
        this.activityName.addClass('form-control');
        this.activityNameErrorLabel = $('<label>');
        this.activityNameErrorLabel.html('Name must not be empty.');
        this.activityNameErrorLabel.addClass('error-label');
        tdNameInput.append(this.activityName);
        tdNameInput.append(this.activityNameErrorLabel);
        trName.append(tdNameLabel);
        trName.append(tdNameInput);

        var trLength = $('<tr>');
        var tdLengthLabel = $('<td>')
        tdLengthLabel.html('Length:');
        var tdLengthInput = $('<td>');
        var activityLengthWrapper = $('<div>');
        activityLengthWrapper.addClass('row');
        activityLengthWrapper.attr('id', 'activityLengthWrapper');
        this.activityLength = $('<input>');
        this.activityLength.attr('id', 'activityLength');
        this.activityLength.attr('type', 'number');
        this.activityLength.attr('min', 1);
        this.activityLength.attr('max', 1440);
        this.activityLength.addClass('form-control');
        this.activityLength.addClass('col-md-9');
        var activityLengthSpan = $('<span>');
        activityLengthSpan.html('min');
        activityLengthSpan.addClass('col-md-3');
        activityLengthWrapper.append(this.activityLength);
        activityLengthWrapper.append(activityLengthSpan);
        tdLengthInput.append(activityLengthWrapper);
        trLength.append(tdLengthLabel);
        trLength.append(tdLengthInput);

        var trType = $('<tr>');
        var tdTypeLabel = $('<td>');
        tdTypeLabel.html('Type:');
        var tdTypeInput = $('<td>');
        this.activityType = $('<select>');
        this.activityType.attr('id', 'activityType');
        this.activityType.addClass('form-control');
        var optionPresentation = $('<option>');
        optionPresentation.attr('value', 0);
        optionPresentation.html('Presentation');
        var optionGroupWork = $('<option>');
        optionGroupWork.attr('value', 1);
        optionGroupWork.html('Group Work');
        var optionDiscussion = $('<option>');
        optionDiscussion.attr('value', 2);
        optionDiscussion.html('Discussion');
        var optionBreak = $('<option>');
        optionBreak.attr('value', 3);
        optionBreak.html('Break');
        this.activityType.append(optionPresentation);
        this.activityType.append(optionGroupWork);
        this.activityType.append(optionDiscussion);
        this.activityType.append(optionBreak);
        tdTypeInput.append(this.activityType);
        trType.append(tdTypeLabel);
        trType.append(tdTypeInput);

        var trDescription = $('<tr>');
        var tdDescriptionLabel = $('<td>');
        tdDescriptionLabel.attr('id', 'activityDescriptionLabel');
        tdDescriptionLabel.html('Description:');
        var tdDescriptionInput = $('<td>');
        this.activityDescription = $('<textarea>');
        this.activityDescription.attr('id', 'activityDescription');
        this.activityDescription.attr('type', 'text');
        this.activityDescription.addClass('form-control');
        tdDescriptionInput.append(this.activityDescription);
        trDescription.append(tdDescriptionLabel);
        trDescription.append(tdDescriptionInput);

        table.append(trName);
        table.append(trLength);
        table.append(trType);
        table.append(trDescription);

        modalBodyDiv.append(table);

        /** Modal Footer **/
        var modalFooterDiv = $('<div>');
        modalFooterDiv.addClass('modal-footer');

        this.cancelButton = $('<button>');
        this.cancelButton.attr('id', 'cancelActivityDialogButton');
        this.cancelButton.attr('type', 'button');
        this.cancelButton.addClass('btn');
        this.cancelButton.addClass('btn-default');
        this.cancelButton.attr('data-dismiss', 'modal');
        this.cancelButton.html('Cancel');

        this.okButton = $('<button>');
        this.okButton.attr('id', 'okActivityDialogButton');
        this.okButton.attr('type', 'button');
        this.okButton.addClass('btn');
        this.okButton.addClass('btn-primary');
        this.okButton.attr('data-dismiss', 'modal');

        modalFooterDiv.append(this.cancelButton);
        modalFooterDiv.append(this.okButton);

        /** Compose Complete Modal **/
        modalContentDiv.append(modalHeaderDiv);
        modalContentDiv.append(modalBodyDiv);
        modalContentDiv.append(modalFooterDiv);


        modalDialogDiv.append(modalContentDiv);

        container.html('');
        container.append(modalDialogDiv);

    }

    this.update();

}