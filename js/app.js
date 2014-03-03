// Short hand for document ready.
$(function() {

    //We instantiate our model
    var model = new MeetingAgendaPlannerModel();
    model.createTestData();

//    model.addParkedActivity(new Activity("Test Activity", 15, 3, "Description..."));
//    model.addParkedActivity(new Activity("Another Test Activity", 30, 2, "Description..."));
//    model.addDay();
//	model.addActivity(new Activity("Introduction",10,0,""),0);
//	model.addActivity(new Activity("Idea 1",30,0,""),0);
//	model.addActivity(new Activity("Working in groups",35,1,""),0);
//	model.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
//	model.addActivity(new Activity("Coffee break",20,3,""),0);

    var activitiesView = new ActivitiesView($('#activitiesView'), model)
    var activitiesController = new ActivitiesController(activitiesView, model);

    var addNewActivityView = new AddNewActivityView($('#addNewActivityView'), model);
    var addNewActivityController = new AddNewActivityController(addNewActivityView, model);

    var meetingsView = new MeetingsView($('#meetingsView'), model);

});