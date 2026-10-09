const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const centisecondsDisplay = document.querySelector("#centiseconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");
const statusDisplay = document.querySelector("#status");

let elapsedBeforeStart = 0;
let startedAt = null;
let animationFrame = null;

function renderTime() {
  const elapsed = elapsedBeforeStart + (startedAt === null ? 0 : performance.now() - startedAt);
  const totalCentiseconds = Math.floor(elapsed / 10);
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;

  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
  centisecondsDisplay.textContent = String(centiseconds).padStart(2, "0");

  if (startedAt !== null) {
    animationFrame = requestAnimationFrame(renderTime);
  }
}

startButton.addEventListener("click", () => {
  if (startedAt !== null) return;

  startedAt = performance.now();
  startButton.disabled = true;
  stopButton.disabled = false;
  statusDisplay.textContent = "Timer is running";
  renderTime();
});

stopButton.addEventListener("click", () => {
  if (startedAt === null) return;

  elapsedBeforeStart += performance.now() - startedAt;
  startedAt = null;
  cancelAnimationFrame(animationFrame);
  renderTime();
  startButton.disabled = false;
  stopButton.disabled = true;
  statusDisplay.textContent = "Paused — pick up whenever you're ready";
});

resetButton.addEventListener("click", () => {
  startedAt = null;
  elapsedBeforeStart = 0;
  cancelAnimationFrame(animationFrame);
  renderTime();
  startButton.disabled = false;
  stopButton.disabled = true;
  statusDisplay.textContent = "Ready when you are";
});
