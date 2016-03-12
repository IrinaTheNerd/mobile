
var timerTime = 0,          // Time set on the interval.
    breakTime = 0,
    timerInterval = 0;      // The interval for our loop.

var timerClock = $(".timer").find(".clock"),
    timerInput = $('#timer-input'),
    secondaryTimer, //defined later
    breakClock = $(".timer").find(".break-clock"),
    timerSoundsButton = $('#timer-sounds');
  

// If there is a valid set time from last session, set it again.
if(Number(localStorage.lastTimerTime)){
    timerTime = Number(localStorage.lastTimerTime) * 60;

    timerClock.text(returnFormattedToSeconds(timerTime));
    timerInput.val(localStorage.lastTimerTime);
    
    breakClock.text(returnFormattedToSeconds(breakTime));

}



// When entering new time, the app will trim it and turn it into seconds (*60).
timerInput.on('change', function () {

    var newTime = timerInput.val().trim();
    

    if(newTime && newTime>=0) {
        timerTime = newTime * 60;
        localStorage.lastTimerTime = newTime;
        timerClock.text(returnFormattedToSeconds(timerTime));
    }
    if (newTime == 20) {
        secondaryTimer = 1;
        breakTime = secondaryTimer * 60;
        breakClock.text(returnFormattedToSeconds(breakTime));
    }
    //debugging change, needs to be 30 and 3
    if (newTime == 0.1) {
        secondaryTimer = 0.1;
        breakTime = secondaryTimer * 60;
        breakClock.text(returnFormattedToSeconds(breakTime));
    }
        
    if (newTime == 52) {
        secondaryTimer = 17;
        breakTime = secondaryTimer * 60;
        breakClock.text(returnFormattedToSeconds(breakTime));
        
    }
    //if newTime<=0 change screen to notification
});

$('.timer-btn.start').on('click',function(){
    if(timerTime>0) {
        startTimer();
    }
});
/*
$('.cicrle.break-stuff.break-timer').on('click',function(){
    if(secondaryTimer>0) {
        startBreak();
    }
});
$('header.light-pink.quarter-height').on('click',function(){

});*/
/**, function(){
             $(this).on('click',function(){
    if(secondaryTimer>0) {
        startBreak();
    }
});
         }*/
// Timer sounds button

timerSoundsButton.on('change', function () {
    localStorage.timerSounds = this.checked;
});

// Clicking on the clock.

timerClock.on('click',function(e){

    if(timerClock.hasClass('inactive')){
        if(timerTime>0) {
            startTimer();
        }
    }
    else{
        pauseTimer();
        startBreak();
    }

});

function startTimer() {

    // Prevent multiple intervals going on at the same time.
    clearInterval(timerInterval);

    // Every 1000ms (1 second) decrease the set time until it reaches 0.
    timerInterval = setInterval(function () {
        timerTime--;
       // secondaryTimer--;
        timerClock.text(returnFormattedToSeconds(timerTime));
       // breakTime.text(returnFormattedToSeconds(secondaryTimer));
        
        if (timerTime <= 0) {

            timerClock.text(returnFormattedToSeconds(0));

           // $('#times-up-modal').openModal();

            pauseTimer();
            vibrate();
 
           //     startBreak();
         
        }
    }, 1000);

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');

}

function startBreak() {
        // Prevent multiple intervals going on at the same time.
    clearInterval(timerInterval);

    // Every 1000ms (1 second) decrease the set time until it reaches 0.
    timerInterval = setInterval(function () {
       breakTime--;
       breakClock.text(returnFormattedToSeconds(breakTime));
        
        if (breakTime <= 0) {

            breakClock.text(returnFormattedToSeconds(0));
            
            pauseTimer();
            startTimer();
            
        }
    }, 1000);

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');
}

function vibrate(){
          document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady() {
        console.log(navigator.vibrate);
        console.log(navigator.notification);
      }
      // Vibrate for 3 seconds
      navigator.vibrate(5000);
      navigator.notification.beep(10);


      navigator.notification.alert(
        'Stop working, noooow!',  // message
        alertDismissed,         // callback
        'Break Time',            // title
        'Done'                  // buttonName
      );
         function alertDismissed() {
           //  $("#timer").load('timer.html #notification');
          //   $('html').addClass('display-stuff');
                //    $("#main-app").load('timer.html');

       $("#timer").html("<div id='notification'><section class='blue'><div class='top'><h1>Break Time!</h1><p>Slide to start your break :)</p></div></section><footer class='dark'><div  id='swipe' class='pink demo-no-reorder'><p class='circle break-stuff break-timer'>Start Break</p></div></footer>");
             
         //need to make sure the page content changes
          //   $("#timer").slideUp('fast', );
         //    $('#timer').animate({'top:': '100'}, 'fast');
             $('#notification').on('swiperight', swiperightHandler);
             
         }
  //  loadPage();
}

function pauseTimer(){
    clearInterval(timerInterval);
          
    timerInput.prop('disabled', false);
    timerClock.addClass('inactive');
            
}

// Reset the cl ock with the previous valid time.
// Useful for setting the same alarm over and over.
function resetTimer(){
    pauseTimer();

    if(Number(localStorage.lastTimerTime)){
        timerTime = Number(localStorage.lastTimerTime) * 60;
        timerClock.text(returnFormattedToSeconds(timerTime));
    }
}


// Dismissing alarm sounds from the modal.
$('.disable').on('click', function(){
    alarmSound.pause();
    alarmSound.currentTime = 0;

    $('#times-up-modal').closeModal();
});


function returnFormattedToSeconds(time){
    var minutes = Math.floor(time / 60),
        seconds = Math.round(time - minutes * 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}
 

//adding swiping



 function swiperightHandler(event){
    startBreak();
    $('#notification' ).html('<div id="stop"> <header class="light-pink quarter-height"><img src="eye.png" alt="eye"><p>Look somewhere far away</p></header><div class="blue timer quarter-height"><div class="break-clock"><a href="#break-over">0:00</a></div></div><div class="green quarter-height"></div><footer class="dark"><a class="timer-btn start " href="#break-over"><button class="go">Go!</button></a></footer></div>');
 }
