let startTime = null;
let stopwatchInterval = null;
const lapTimes = [];

function startStop() {
  if (!startTime) {
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b) : 0);
    stopwatchInterval = setInterval(updateDisplay, 10);
  } else {
    clearInterval(stopwatchInterval);
    startTime = null;
  }
}

function reset() {
  clearInterval(stopwatchInterval);
  startTime = null;
  lapTimes.length = 0; // Clear lapTimes array
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (startTime) {
    const lapTime = Date.now() - startTime;
    lapTimes.push(lapTime);
    displayLap(lapTime);
  }
}

function updateDisplay() {
  const elapsedTime = startTime ? Date.now() - startTime : 0;
  document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(centiseconds)}`;
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function displayLap(lapTime) {
  const formattedLapTime = formatTime(lapTime);
  const lapDiv = document.createElement("div");
  lapDiv.textContent = `Lap ${lapTimes.length}: ${formattedLapTime}`;
  document.getElementById("laps").appendChild(lapDiv);
}
