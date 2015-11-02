  function getTimeRemaining(endtime) {
/*    var t = Date.parse(endtime) - Date.parse(new Date());*/
    var t = endtime;
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime,step) {
    console.log(id);
    var clock = document.getElementById('clockdiv');
    console.log(clock);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      endtime -= 1000;
      var t = getTimeRemaining(endtime);

      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        console.log("HIT 0!");
        clearInterval(timeinterval);
        //$('#clockPrompt').text(step.timer.completedPrompt);
		var audio = new Audio('alarm.mp3');
		audio.play();
		audio.addEventListener("ended", showAlert);
		function showAlert() {
			alert("REMOVE FROM OVEN!");
		}
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
function makeStep(instruction,timer,URL,notes){
this.instruction = instruction;
this.timer = timer;
this.URL = URL;
this.notes = notes;
}

function nextPage(){
if(stepCount < recipeSteps.length - 1){
  stepCount ++;
  displayPage(recipeSteps);
} else {
	document.getElementById("clockPrompt").innerHTML(myNavigator.pushPage('finished.html'));
}
}
 function refreshPage(){
   displayPage(recipeSteps);
   
 }
function displayPage(stepArray){
  step = stepArray[stepCount];
  displayInstructions(step);
  if(step.URL != ""){
      displayImage(step);
  }
  displayClock(step);
}
function displayInstructions(step){
  var instructionElement = $('#instructions');
  instructionElement.text(step.instruction);
}

function displayImage(step){
  var recipeImg = document.createElement("img");
img.src = step.URL;
var src = $("stepImg");
  src.empty();
src.appendChild(img);
}
function displayClock(step){
  var clockDisplay = $('#clockdiv');
  console.log(clockDisplay);
  if (step.timer && clockDisplay.hasClass('hidden')){
    console.log("TIMER + HIDDEN");
    clockDisplay.removeClass('hidden');
    // clockDisplay.empty();
    initializeClock('clockdiv', step.timer.duration, step);
    }else if(step.timer && !clockDisplay.hasClass('hidden')){
      console.log("TIMER + SHOULD BE THERE");
      clockDisplay.empty();
      initializeClock('clockdiv', step.timer.duration, step);
    }else if(!step.timer && !clockDisplay.hasClass('hidden')){
      console.log("NO TIMER + SHOULD BE THERE");
      clockDisplay.addClass('hidden');
    }
    $('#clockPrompt').text("");
}

  $( document ).ready(function(){
    recipeSteps = [];
    stepCount = 0;

     var t1 = {
     duration : 5000,
     completedPrompt : "REMOVE FROM OVEN!",
   }
   var clockDisplay = $('#clockdiv');
   console.log(clockDisplay);
	var step0 = new makeStep('Preheat oven to 350 degrees F (175 degrees C).', null,"","");
	var step1 = new makeStep('Grease and flour a 8-inch pan.', null, "", "");
    var step2 = new makeStep('In a large saucepan, melt the butter.',null,"","");
    var step3 = new makeStep("Remove butter from heat, and stir in sugar, eggs, and vanilla.",null,"","");
    var step4 = new makeStep("Beat in cocoa, flour, salt, and baking powder.",null,"","");
    var step5 = new makeStep("Spread batter into prepared pan.",null,"","");
    var step6 = new makeStep("Place pan in oven.",null,"","");
    var step7 = new makeStep("Bake in preheated oven for 25 to 30 minutes.",t1,"","");
	var step8 = new makeStep("Let brownies cool for 5 minutes and enjoy!", null, "", "");

    recipeSteps.push(step0,step1,step2,step3,step4,step5,step6,step7, step8);
    console.log(recipeSteps);
	$('#instructions').text(recipeSteps[stepCount].instruction);

    // var currentDate = new Date(Date.now());
    // initializeClock('clockdiv', 2000000);
});