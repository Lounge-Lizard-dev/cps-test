var clicksTotalNum = 0;
var cpsStart = false;

function refreshCps(finished=false) {
  const cpsNumDiv = document.getElementById("cpsnumber");
  const totalDiv = document.getElementById("totalclicks");
  const timerDiv = document.getElementById("elapsedtime");
  if (finished == true) {
    cpsNum = clicksTotalNum / 10;
    cpsNumDiv.innerHTML = cpsNum;
    totalDiv.innerHTML = clicksTotalNum;
    timerDiv.innerHTML = "10s";
  }
  else {
    cpsNum = clicksTotalNum / ((new Date()) - clicksTimerStart) * 1000;
    cpsNumDiv.innerHTML = Math.round(cpsNum*10)/10;
    totalDiv.innerHTML = clicksTotalNum;
    var currentTime = new Date((new Date()) - clicksTimerStart);
    timerDiv.innerHTML = currentTime.getSeconds() + "." + Math.round(currentTime.getMilliseconds() / 10) + "s";
  }
}

function addCps() {
  if (cpsStart) {
    var currentTime = new Date((new Date()) - clicksTimerStart);
    if (currentTime.getSeconds() + currentTime.getMilliseconds() / 1000 < 10.0) {
      clicksTotalNum += 1;
      refreshCps();
    }
    else {
      refreshCps(true);
    }
  }
  else {
    document.getElementById("startMessage").innerHTML = "";
    cpsStart = true;
    clicksTimerStart = new Date();
    clicksTotalNum += 1;
    refreshCps();
  }
}

window.setInterval(function () {
  if (cpsStart) {
    var currentTime = new Date((new Date()) - clicksTimerStart);
    if (currentTime.getSeconds() + currentTime.getMilliseconds() / 1000 < 10.0) {
      refreshCps();
    }
    else {
      refreshCps(true);
      window.setTimeout(function () {
        document.getElementById("startMessage").innerHTML = "Click anywhere to start.";
        cpsStart = false;
        clickTimerStart = new Date();
        clicksTotalNum = 0;
      }, 1000);
    }
  }
}, 1);
