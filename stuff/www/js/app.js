var timerTime = 0, // Time set on the interval.
    breakTime = 0,
    timerInterval = 0; // The interval for our loop.

var timerClock = $(".timer").find(".clock"),
    timerInput = $('#timer-input'),
    secondaryTimer,
    breakClock = $(".timer").find(".break-clock");

//http://www.joezimjs.com/javascript/jquery-html-youre-doing-it-wrong/
// If there is a valid set time from last session, set it again.
if (Number(localStorage.lastTimerTime)) {
    timerTime = Number(localStorage.lastTimerTime) * 60;

    timerClock.text(returnFormattedToSeconds(timerTime));
    timerInput.val(localStorage.lastTimerTime);

    breakClock.text(returnFormattedToSeconds(breakTime));

}


// When entering new time, the app will trim it and turn it into seconds (*60).
timerInput.on('change', function() {

    var newTime = timerInput.val().trim();


    if (newTime && newTime >= 0) {
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
        secondaryTimer = 0.2;
        breakTime = secondaryTimer * 60;
        breakClock.text(returnFormattedToSeconds(breakTime));
    }

    if (newTime == 52) {
        secondaryTimer = 17;
        breakTime = secondaryTimer * 60;
        breakClock.text(returnFormattedToSeconds(breakTime));

    }
    
});

$('.timer-btn.start').on('click', function() {
    if (timerTime > 0) {
        startTimer();
    }
});


// Clicking on the clock.


function startTimer() {

    // Prevent multiple intervals going on at the same time.
    clearInterval(timerInterval);

    // Every 1000ms (1 second) decrease the set time until it reaches 0.
    timerInterval = setInterval(function() {
        timerTime--;
        timerClock.text(returnFormattedToSeconds(timerTime));

        if (timerTime <= 0) {

            timerClock.text(returnFormattedToSeconds(0));
            pauseTimer();
            vibrate();
        }
    }, 1000);

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');

}

function startBreak() {
    // Prevent multiple intervals going on at the same time.
    clearInterval(timerInterval);

    // Every 1000ms (1 second) decrease the set time until it reaches 0.
    timerInterval = setInterval(function() {
        breakTime--;
        breakClock.text(returnFormattedToSeconds(breakTime));

        if (breakTime <= 0) {

            breakClock.text(returnFormattedToSeconds(0));
            pauseTimer();
            bVibrate();
            }
    }, 1000);

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');
}

function vibrate() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        console.log(navigator.vibrate);
        console.log(navigator.notification);
    }
    // Vibrate for 3 seconds
    navigator.vibrate(1000);
    navigator.notification.beep(2);
    navigator.notification.alert(
        'Stop working, noooow!', // message
        alertDismissed, // callback
        'Break Time', // title
        'Done' // buttonName
    );
}
function bVibrate() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        console.log(navigator.vibrate);
        console.log(navigator.notification);
    }
    // Vibrate for 1 seconds
    navigator.vibrate(1000);
    navigator.notification.alert(
        'Go back to work!', // message
        nextPage, // callback
        'Break Time', // title
        'Done' // buttonName
    );
}



function alertDismissed(element, content) {
   
        element = $("#timer");
        content = "<div id='notification'><section class='blue'><div class='top'><h1>Break Time!</h1><p>Slide to start your break :)</p></div></section><footer class='dark'><div  id='swipe' class='pink demo-no-reorder'><a href='#stop' class='circle break-stuff break-timer'>Start Break</a></div></footer>";

    element.html(content);
    $('#notification').on('swiperight', swiperightHandler);

}
   
function swiperightHandler(event) {
   
    $('#notification').html('<div id="stop"> <header class="light-pink quarter-height"><img src="eye.png" alt="eye"><p>Look somewhere far away</p></header><div class="blue timer quarter-height"></div><div class="green quarter-height"></div><footer class="dark"><a class="timer-btn start" href="#break-over"><button class="go">Go!</button></a></footer></div>');
 if(secondaryTimer > 0){
      startBreak();
 }
    console.log(breakTime);
   
}

function nextPage() {
    $("#timer").html("<div id='break-over'><div class='most'><div class='top'><h1> Back to work! </h1><p> Oh - oh, break's over ...</p></div></div><footer class='pink'><div class='timer'><a class='timer-btn start' href='#main'><button class='go big'>Go!</button></a></div></footer></div>");
}

function pauseTimer() {
    clearInterval(timerInterval);
}

// Reset the cl ock with the previous valid time.
// Useful for setting the same alarm over and over.
function resetTimer() {
    pauseTimer();
    if (Number(localStorage.lastTimerTime)) {
        timerTime = Number(localStorage.lastTimerTime) * 60;
        timerClock.text(returnFormattedToSeconds(timerTime));
    }
}


function returnFormattedToSeconds(time) {
    var minutes = Math.floor(time / 60),
        seconds = Math.round(time - minutes * 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}