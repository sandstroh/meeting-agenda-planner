/**
 * Created by sandstroh on 3/20/14.
 */
var EditTimeDialog = function(container, model, day) {

    this.update = function() {

        container.empty();
        this.createDialog();

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
        this.input = $('<input>');
        this.input.attr('type', 'text');
        this.input.addClass('form-control');
        this.input.addClass('time-input-text');
        this.input.attr('placeholder', 'HH:MM');
        td1.append(this.input);
        var td2 = $('<td>');
        this.button = $('<button>');
        this.button.addClass('time-save-button');
        this.button.attr('type', 'button');
        this.button.addClass('btn btn-primary');
        this.button.html('Save');
        this.button.attr('data-dismiss', 'modal');
        td2.append(this.button);
        tr.append(td1);
        tr.append(td2);
        table.append(tr);

        this.label = $('<label>');
        this.label.html('Invalid time format');
        this.label.addClass('error-label');

        modalDialogBodyDiv.append(table);
        modalDialogBodyDiv.append(this.label);


        modalDialogContentDiv.append(modalDialogHeaderDiv);
        modalDialogContentDiv.append(modalDialogBodyDiv);

        modalDialogDiv.append(modalDialogContentDiv);

        container.append(modalDialogDiv);

    }

    this.update();

}
