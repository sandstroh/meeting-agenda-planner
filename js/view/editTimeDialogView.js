/**
 * Created by sandstroh on 3/20/14.
 */
var EditTimeDialog = function(container, model, day) {

    this.update = function() {

        container.empty();

        this.createDialog();

        // set the input field to the current start time of the day
        this.newStartTimeInput.val(day.getStart());

    }

    this.createDialog = function() {

        var modalDialogDiv = $('<div>');
        modalDialogDiv.addClass('modal-dialog modal-sm');

        var modalDialogContentDiv = $('<div>');
        modalDialogContentDiv.addClass('modal-content');

        var modalDialogHeaderDiv = $('<div>');
        modalDialogHeaderDiv.addClass('modal-header');

        var closeButton = $('<button>');
        closeButton.addClass('close');
        closeButton.attr('type', 'button');
        closeButton.attr('data-dismiss', 'modal');
        closeButton.attr('aria-hidden', true);
        closeButton.html('&times;')

        var dialogTitle = $('<h4>');
        dialogTitle.addClass('modal-title');
        dialogTitle.html('Set new time:');

        modalDialogHeaderDiv.append(closeButton);
        modalDialogHeaderDiv.append(dialogTitle);

        var modalDialogBodyDiv = $('<div>');
        modalDialogBodyDiv.addClass('modal-body');

        var table = $('<table>');
        var tr = $('<tr>');
        var td1 = $('<td>');
        this.newStartTimeInput = $('<input>');
        this.newStartTimeInput.attr('type', 'text');
        this.newStartTimeInput.addClass('form-control');
        this.newStartTimeInput.addClass('time-input-text');
        this.newStartTimeInput.attr('placeholder', 'HH:MM');
        td1.append(this.newStartTimeInput);
        var td2 = $('<td>');
        this.saveNewStartTimeButton = $('<button>');
        this.saveNewStartTimeButton.addClass('time-save-button');
        this.saveNewStartTimeButton.attr('type', 'button');
        this.saveNewStartTimeButton.addClass('btn btn-primary');
        this.saveNewStartTimeButton.html('Save');
        this.saveNewStartTimeButton.attr('data-dismiss', 'modal');
        td2.append(this.saveNewStartTimeButton);
        tr.append(td1);
        tr.append(td2);
        table.append(tr);

        this.timeFormatErrorLabel = $('<label>');
        this.timeFormatErrorLabel.html('Invalid time format');
        this.timeFormatErrorLabel.addClass('error-label');

        modalDialogBodyDiv.append(table);
        modalDialogBodyDiv.append(this.timeFormatErrorLabel);


        modalDialogContentDiv.append(modalDialogHeaderDiv);
        modalDialogContentDiv.append(modalDialogBodyDiv);

        modalDialogDiv.append(modalDialogContentDiv);

        container.append(modalDialogDiv);

    }

    this.update();

}
