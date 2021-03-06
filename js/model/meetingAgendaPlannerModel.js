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
function Day(startH,startM,id) {

	this._start = startH * 60 + startM;
	this._activities = [];
	this.id = id;

	// sets the start time to new value
	this.setStart = function(startH,startM) {
		this._start = startH * 60 + startM;
	};

	// returns the total length of the activities in
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
        for (var i = 0; i < this._activities.length; i++) {
            totalLength += this._activities[i].getLength();
        }
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

    this.getStartOfActivity = function(activity) {
        var startTime = this._start;
        for (var i = 0; i < this._activities.length; i++) {
            if (this._activities[i] == activity) {
                break;
            }
            startTime += this._activities[i].getLength();
        }
        return startTime;
    }
	
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

    this.setStartOfDay = function(day, startH, startM) {
        day.setStart(startH, startM);
        this.notifyObservers();
    }
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM,this.days.length);
		} else {
			day = new Day(8,0,this.days.length);
		}
		this.days.push(day);
		this.notifyObservers();
		return day;
	};

	this.deleteDay = function(day){
	    for(var i = 0; i < this.days.length; i++)
	    {
	        if(this.days[i] == day){
	            this.days.splice(i,1);
	        }
	    }

        this.notifyObservers();
	}

	this.getIdOfDay = function(day)	{
	    for(var i = 0; i < this.days.length; i++)
	    {
	        if(this.days[i] == day)
	        {
	            return i;
	        }
	    }
	    return -1;
	}

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

    // remove an activity from a certain day
    this.removeActivity = function(day, position) {
        day._activities.splice(position, 1);
        this.notifyObservers();
    }

    this.editActivity = function(day, oldActivity, editedActivity) {
        var edited = false;
        for (var i = 0; i < this.days.length; i++) {
            if (this.days[i] == day) {
                for (var j = 0; j < this.days[i].getActivities().length; j++) {
                    if (this.days[i].getActivities()[j] == oldActivity) {
                        this.days[i].getActivities()[j] = editedActivity;
                        edited = true;
                    }
                }
            }
        }
        if (edited) {
            this.notifyObservers();
        } else {
            console.log('Error: Couldn\'t edit activity.');
        }
    }

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
            var activity = this._removeParkedActivity(oldposition);
            this.days[newday]._addActivity(activity,newposition);
        }else if(newday == null) {
            var activity = this.days[oldday]._removeActivity(oldposition);
            this._addParkedActivity(activity);
        } else {
            var activity = this.days[oldday]._removeActivity(oldposition);
            this.days[newday]._addActivity(activity,newposition);
        }

        this.notifyObservers();

    };

    this.createTestData = function() {

        this.addParkedActivity(new Activity("Introduction", 15, 0, "Briefly introducing what we gonna to today."));
        this.addParkedActivity(new Activity("Gathering Ideas", 30, 2, "All together, gather some ideas what could be interesting to investigate further."));
        this.addParkedActivity(new Activity("Lunch Break", 60, 3, "Time to eat something."));
        this.addParkedActivity(new Activity("Show Results", 20, 0, "Each group will present what they have found out."));

        this.addDay();
        this.addActivity(new Activity("Introduction", 10, 0, "Brief Introduction to the work shop."), 0);
        this.addActivity(new Activity("Idea 1", 30, 0, "Presentation of the idea we have and how it could be useful."), 0);
        this.addActivity(new Activity("Working in groups", 35, 1, "Each group (of 4 people) work independently on the idea."), 0);
        this.addActivity(new Activity("Idea 1 discussion", 15, 2, "Discussion of the results of each group."), 0);
        this.addActivity(new Activity("Coffee break", 20, 3, "Coffee, coffee, coffee!"), 0);

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