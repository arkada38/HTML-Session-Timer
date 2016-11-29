"use strict";

var width = 0;
var actionStatus = "stoped";
var tid = 0;

var numberOfSessions = 10;
var numberOfPeriods = 8;

var currentSession = 1;
var currentPeriod = 1;

var continuityOfActivity = 8;
var continuityOfSessionRelaxing = 30;
var continuityOfPeriodRelaxing = 10;

$(function() {

	$("#start_button").on("click", function () {
        if (actionStatus != "started") {
			actionStatus = "started";
			runTimer();
		}
    });

	$("#pause_button").on("click", function () {
        if (actionStatus != "paused") {
			actionStatus = "paused";
			clearInterval(tid);
		}
    });

	$("#stop_button").on("click", function () {
        if (actionStatus != "stoped") {
			actionStatus = "stoped";
			currentSession = 1;
			currentPeriod = 1;
			clearInterval(tid);
			document.getElementById("status").value = "Stoped";
		}
    });

});

function runTimer() { // to be called when you want to start the timer
	var elem = document.getElementById("myBar");
	var status = document.getElementById("status");
    width = 0;

    tid = setInterval(frame, 10); //100 calls per second
	var time = continuityOfActivity;
	
	var sessionOutput = document.getElementById("sessionStep");
	var periodOutput = document.getElementById("periodStep");
	
	status.value = "Activity";
	sessionOutput.value = currentSession + " of " + numberOfSessions;
	periodOutput.value = currentPeriod + " of " + numberOfPeriods;

	function frame() {
		if (width >= 100) {
			width = 0;
			
			if (time != continuityOfActivity) {//Завершился этап отдыха
				if (currentPeriod < numberOfPeriods)
					currentPeriod++;
				else {
					currentPeriod = 1;
				
					if (currentSession < numberOfSessions)
						currentSession++;
					else
						currentSession = 1;
				}
				
				time = continuityOfActivity;
				elem.style.backgroundColor = "green";
				
				status.value = "Activity";
			}
			else {
				if (currentPeriod < numberOfPeriods) {
					time = continuityOfPeriodRelaxing;
					elem.style.backgroundColor = "yellow";
				
					status.value = "Period of relaxing";
				}
				else {
					time = continuityOfSessionRelaxing;
					elem.style.backgroundColor = "red";
				
					status.value = "Session of relaxing";
				}
			}
			
			sessionOutput.value = currentSession + " of " + numberOfSessions;
			periodOutput.value = currentPeriod + " of " + numberOfPeriods;
		} else {
			width += 1 / time; 
			elem.style.width = width + '%'; 
		}
	}
}
