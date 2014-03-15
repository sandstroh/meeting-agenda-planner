// JavaScript Document

// The possible activity types
var ActivityType = ["Presentation","Group Work","Discussion","Break"];

// This is an activity constructor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);
function Activity(name,length,typeid,description){
	var _name = name;
	var _length = length;
	var _typeid = typeid;
	var _description = description;
	
	// sets the name of the activity
	this.setName = function(name) {
		_name = name;
		model.notifyObservers();
	};

	// get the name of the activity
	this.getName = function(name) {
		return _name;
	};
	
	// sets the length of the activity
	this.setLength = function(length) {
		_length = length;
		model.notifyObservers();
	};

	// get the name of the activity
	this.getLength = function() {
		return _length;
	};
	
	// sets the typeid of the activity
	this.setTypeId = function(typeid) {
		_typeid = typeid;
		model.notifyObservers();
	};

	// get the type id of the activity
	this.getTypeId = function() {
		return _typeid;
	};
	
	// sets the description of the activity
	this.setDescription = function(description) {
		_description = description;
		model.notifyObservers();
	};

	// get the description of the activity
	this.getDescription = function() {
		return _description;
	};
	
	// This method returns the string representation of the
	// activity type.
	this.getType = function () {
		return ActivityType[_typeid];
	};
}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH,startM) {
	this._start = startH * 60 + startM;
	this._activities = [];

	// sets the start time to new value
	this.setStart = function(startH,startM) {
		this._start = startH * 60 + startM;
		model.notifyObservers();
	};

	// returns the total length of the acitivities in 
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
		$.each(this._activities,function(index,activity){
			totalLength += activity.getLength();
		});
		return totalLength;
	};

    this.getActivities = function() {
        return this._activities;
    }
	
	// returns the string representation Hours:Minutes of 
	// the end time of the day
	this.getEnd = function() {
		var end = this._start + this.getTotalLength();
        return formatTime(end, end);
	};
	
	// returns the string representation Hours:Minutes of 
	// the start time of the day
	this.getStart = function() {
        return formatTime(this._start, this._start);
	};
	
	// returns the length (in minutes) of activities of certain type
	this.getLengthByType = function (typeid) {
		var length = 0;
		$.each(this._activities,function(index,activity){
			if(activity.getTypeId() == typeid){
				length += activity.getLength();
			}
		});
		return length;
	};
	
	// adds an activity to specific position
	// if the position is not provided then it will add it to the 
	// end of the list
	this._addActivity = function(activity,position){
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
			this._activities.push(activity);
		}
	};
	
	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
	this._removeActivity = function(position) {
		return this._activities.splice(position,1)[0];
	};
	
	// moves activity inside one day
	// this method will be called when needed from the model
	// don't call it directly
	this._moveActivity = function(oldposition,newposition) {
		if(newposition > oldposition) {
			newposition--;
		}
		var activity = this._removeActivity(oldposition);
		this._addActivity(activity, newposition);
	};
}


// this is our main module that contians days and praked activites
function MeetingAgendaPlannerModel(){

	this.days = [];
	this.parkedActivities = [];
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM);
		} else {
			day = new Day(8,0);
		}
		this.days.push(day);
		this.notifyObservers();
		return day;
	};
	
	// add an activity to model
	this.addActivity = function (activity,day,position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position);
		} else {
			this.parkedActivities.push(activity);
		}
		this.notifyObservers();
	};
	
	// add an activity to parked activities
	this.addParkedActivity = function(activity, position){
        console.log('add parked activity...');
        if (position == null) {
		    this.parkedActivities.push(activity);
        } else {
            this.parkedActivities.splice(position, 0, activity);
        }
		this.notifyObservers();
	};

    // added:
    // add an activity on provided position from parked activites
    // without notifying observers
    this._addParkedActivity = function(activity, position){
        if (position == null) {
            this.parkedActivities.push(activity);
        } else {
            this.parkedActivities.splice(position, 0, activity);
        }
    };


    // edit a parked activity
    this.editParkedActivity = function(oldActivity, editedActivity) {
        for (var i = 0; i < this.parkedActivities.length; i++) {
            if (this.parkedActivities[i] == oldActivity) {
                this.parkedActivities[i] = editedActivity;
            }
        }
        this.notifyObservers();
    }
	
	// remove an activity on provided position from parked activites 
	this.removeParkedActivity = function(position) {
		act = this.parkedActivities.splice(position,1)[0];
		this.notifyObservers();
		return act;
	};

    // added:
    // remove an activity on provided position from parked activites
    // without notifying observers
    this._removeParkedActivity = function(position) {
        act = this.parkedActivities.splice(position,1)[0];
        return act;
    };

    // moves activity between the days, or day and parked activities.
    // to park activity you need to set the new day to null
    // to move a parked activity to let's say day 0 you set oldday to null
    // and new day to 0
    this.moveActivity = function(oldday, oldposition, newday, newposition) {
        // added: check if we don't have to move the activity
        if (oldday == newday && oldposition == newposition) {
            // nothing to do here...
            return;
        }
        if(oldday !== null && oldday == newday) {
            this.days[oldday]._moveActivity(oldposition,newposition);
        }else if(oldday == null && newday == null) {
            // fixed: it's now possible to add an activity at a specific position
            var activity = this._removeParkedActivity(oldposition);
            if (newposition == null) {
                this._addParkedActivity(activity, null);
            } else {
                if (oldposition > newposition) {
                    this._addParkedActivity(activity,newposition);
                } else {
                    this._addParkedActivity(activity,newposition-1);
                }
            }
        }else if(oldday == null) {
            var activity = this.removeParkedActivity(oldposition);
            this.days[newday]._addActivity(activity,newposition);
        }else if(newday == null) {
            var activity = this.days[oldday]._removeActivity(oldposition);
            this.addParkedActivity(activity);
        } else {
            var activity = this.days[oldday]._removeActivity(oldposition);
            this.days[newday]._addActivity(activity,newposition);
        }
        this.notifyObservers();
    };

    this.createTestData = function() {

        this.addParkedActivity(new Activity("Test Presentation", 15, 0, "Description..."));
        this.addParkedActivity(new Activity("Test Discussion", 30, 2, "Description..."));
        this.addParkedActivity(new Activity("A long Break", 120, 3, "blub"));
        this.addParkedActivity(new Activity("Test Group Work", 20, 1, "blub"));

        this.addDay();
        this.addActivity(new Activity("Introduction", 10, 0, ""), 0);
//        this.addActivity(new Activity("Idea 1", 30, 0, ""), 0);
//        this.addActivity(new Activity("Working in groups", 35, 1, ""), 0);
//        this.addActivity(new Activity("Idea 1 discussion", 15, 2, ""), 0);
//        this.addActivity(new Activity("Coffee break", 20, 3, ""), 0);

//        this.addDay();
//        this.addActivity(new Activity("Presentation", 30, 0, ""), 1);

    };
	
	//*** OBSERVABLE PATTERN ***
	var listeners = [];

    this.notifyObservers = function(args) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].update(args);
        }
    };

    this.addObserver = function(listener) {
        listeners.push(listener);
    };

	//*** END OBSERVABLE PATTERN ***

};