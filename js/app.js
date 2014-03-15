// Short hand for document ready.
$(function() {

    // instantiate our model and create some test data
    var model = new MeetingAgendaPlannerModel();
    model.createTestData();

    // instantiate our views and controller

    var parkedActivitiesView = new ParkedActivitiesView($('#parkedActivitiesView'), model);

    var meetingsView = new MeetingsView($('#meetingsView'), model);
    var meetingsController = new MeetingsController(meetingsView, model);

});