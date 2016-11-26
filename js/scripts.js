"use strict";

var numberOfSessions = 10;
var numberOfPeriods = 8;

var currentSession = 1;
var currentPeriod = 1;

var continuityOfActivity = 8;
var continuityOfSessionRelaxing = 30;
var continuityOfPeriodRelaxing = 10;

$(function() {

	startTimer();

});

function startTimer() { // to be called when you want to start the timer
	var elem = document.getElementById("myBar");
	var condition = document.getElementById("condition");
    var width = 0;
    var tid = setInterval(frame, 10); //100 calls per second
	var time = continuityOfActivity;
	
	var sessionOutput = document.getElementById("sessionStep");
	var periodOutput = document.getElementById("periodStep");
	
	condition.value = "Activity";
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
				
				condition.value = "Activity";
			}
			else {
				if (currentPeriod < numberOfPeriods) {
					time = continuityOfPeriodRelaxing;
					elem.style.backgroundColor = "yellow";
				
					condition.value = "Period of relaxing";
				}
				else {
					time = continuityOfSessionRelaxing;
					elem.style.backgroundColor = "red";
				
					condition.value = "Session of relaxing";
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

function abortTimer() { // to be called when you want to stop the timer
  clearInterval(tid);
}
