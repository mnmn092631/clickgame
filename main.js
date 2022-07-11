"use strict";

const playBtn = document.querySelector(".playBtn");
const timerText = document.querySelector(".timer");
const scoreText = document.querySelector(".score");
const itemBox = document.querySelector(".itemBox");
const popUp = document.querySelector(".pop-up");
const retryBtn = document.querySelector(".retry");
const popUpText = document.querySelector(".pop-upText");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let timer = undefined;
let score = 0;

const carrotCount = 10;
const bugCount = 10;
const GAME_DURATION_SEC = 10;

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

itemBox.addEventListener("click", clickItemBox);

retryBtn.addEventListener("click", () => {
  popUp.classList.add("hidden");
  startGame();
});

function startGame() {
  started = true;
  initGame();
  bgSound.play();
  showTimerScore();
  startTimer();
  stopIcon();
}

function stopGame() {
  started = false;
  bgSound.pause();
  alertSound.play();
  playBtn.classList.add("hidden");
  stopTimer();
  showPopUp("YOU LOST😅");
}

function winGame(win) {
  started = false;
  playBtn.classList.add("hidden");
  if (win) {
    winSound.play();
  } else {
    bugSound.play();
  }
  stopTimer();
  bgSound.pause();
  showPopUp(win ? "YOU WON🎉" : "YOU LOST😅");
}

function initGame() {
  score = 0;
  itemBox.innerHTML = "";
  scoreText.innerHTML = carrotCount;
  addItem("carrot", carrotCount, "./img/carrot.png");
  addItem("bug", bugCount, "./img/bug.png");
}

function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      winGame(score === carrotCount);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  timerText.innerHTML = `0:${time}`;
}

function stopTimer() {
  clearInterval(timer);
}

function clickItemBox(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.className === "carrot") {
    carrotSound.play();
    target.remove();
    score++;
    scoreText.innerHTML = `${carrotCount - score}`;
    if (score === carrotCount) {
      winGame(true);
    }
  } else if (target.className === "bug") {
    bugSound.play();
    stopGame();
  }
}

function stopIcon() {
  const icon = playBtn.querySelector(".fa-solid");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-stop");
  playBtn.classList.remove("hidden");
}

function showTimerScore() {
  timerText.classList.remove("hidden");
  scoreText.classList.remove("hidden");
}

function showPopUp(text) {
  popUp.classList.remove("hidden");
  popUpText.innerHTML = text;
}

const boxWidth = itemBox.offsetWidth;
const boxHeight = itemBox.offsetHeight;
function addItem(className, count, src) {
  const x0 = 0;
  const y0 = 0;
  const x1 = boxWidth - 80;
  const y1 = boxHeight - 80;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", src);
    item.style.left = `${randomNumber(x0, x1)}px`;
    item.style.top = `${randomNumber(y0, y1)}px`;
    itemBox.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
