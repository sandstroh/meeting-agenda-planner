// Short hand for document ready.
$(function() {

    // instantiate our model and create some test data
    var model = new MeetingAgendaPlannerModel();
    model.createTestData();

    // instantiate our views and controller
    var activitiesView = new ActivitiesView($('#parkedActivitiesView'), model)
    var activitiesController = new ActivitiesController(activitiesView, model);

//    var addNewActivityView = new AddNewActivityView($('#addNewActivityView'), model);
//    var addNewActivityController = new AddNewActivityController(addNewActivityView, model);

    var meetingsView = new MeetingsView($('#meetingsView'), model);
    var meetingsController = new MeetingsController(meetingsView, model);
});