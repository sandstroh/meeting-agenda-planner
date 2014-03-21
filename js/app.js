// Short hand for document ready.
$(function() {

    // instantiate our model and create some test data
    var model = new MeetingAgendaPlannerModel();
    model.createTestData();

    // instantiate our views and controller

    // the controller for this view is created inside the view. an explanation why
    // we do this can be found in the view
    var parkedActivitiesView = new ParkedActivitiesView($('#parkedActivitiesView'), model);

    var meetingsView = new MeetingsView($('#meetingsView'), model);
    var meetingsController = new MeetingsController(meetingsView, model);

});