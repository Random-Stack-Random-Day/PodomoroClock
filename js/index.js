var timer;

$(document).ready(function(){
var working = false;
var active = '';
var workTime = 0;
var breakTime = 0;
checkStatus();

  //Test Vars

/*  Alternate Method of 'checkStatus Function'

working ? $('#pause').addClass('disabled')&& $('#start').removeClass('disabled'): $('#start').addClass('disabled')&& $('#pause').removeClass('disabled');
 */

  //Controls if a button is disabled based on status of timer
function checkStatus() {
  if (!working) {
    $('#start').removeClass('disabled');
    $('#pause').addClass('disabled');
    $('#reset').addClass('disabled');
    } else {
    $('#pause').removeClass('disabled');
    $('#reset').removeClass('disabled');
    $('#start').addClass('disabled');
    }
}
//End Check Status
    //Function to Show Time  !!Finished!!
    function showTime(time) {
   var min = Math.floor(time/60);
   var sec = Math.round(time%60);
      if (sec < 10) {
        sec = '0' + sec
      }
      var timeString = min+':'+sec
      $('#msg').text("Hey! You've only got    "+timeString+" left to go!")
     }
  //End showTime
  //Enables the timer  !!Finalized!!
function startTimer() {
  $('.jumbotron').css('visibility', 'visible');
  return setInterval(function() {
    console.log("Work Timer...")
    workTime--;
    if (workTime < 0) {
      clearInterval(timer);
      timer = breakTimer();
    } else {
      showTime(workTime);
    }
  }, 1000);
}
  //End Timer
  //What Happens when #start is pressed
 function start() {     
   if (working == true){ //This keeps it from being spammable
      return
   } //Else
  workTime = $('#work').val()*60;
    breakTime = $('#break').val()*60;
   working = true;
   checkStatus();    
    timer = startTimer();
 } 
  //End Start Timer
  
  //What Happens when #pause/resume is pressed
  function pause() {
    clearInterval(timer);
    $('.resume').unbind().click(resume);
    $('#pause').html('Resume');
    $('#pause').addClass('resume');
    $('#pause').removeClass('pause');
    $('.resume').click(resume);
   }
  //End Pause
  //What happens when the "Resume" is pressed !!Finalized!!
  function resume(){  
    $('#pause').unbind().click(pause);
    $('#pause').html('Pause');
    $('#pause').addClass('pause');
    $('#pause').removeClass('resume');
    timer = startTimer();
    }
  //What happens when #reset is pressed !!Finalized!!
  function reset() {
   clearInterval(timer);
    working = false;
    workTime = 0;
    breakTime = 0;
    checkStatus();
    $('.jumbotron').css('visibility', 'hidden');
    $('#msg').html("");
  }
  //Break Timer !!Finalized!!
  function breakTimer() {
    $('.jumbotron').css('visibility', 'visible');
    return setInterval(function() {
      console.log("Break Timer...");
    breakTime--;
    if (breakTime < 0) {
      clearInterval(timer);
      working = false;
      start();
    } else {
      showTime(breakTime);
    }
  }, 1000);
}
  //Button Association!!Finalized!!
  $('#start').click(start);
    $('#work').keypress(function(e) {
    if(e.which == 13) {
       start();
    }
});
  //This Makes Enter Work as well to Start
  $('.pause').click(pause);
  $('#reset').click(reset); 
  
}); //End of DocReady