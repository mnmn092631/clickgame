"use strict";

import * as sound from "./sound.js";
import ItemBox from "./itembox.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.playBtn = document.querySelector(".playBtn");
    this.timerText = document.querySelector(".timer");
    this.scoreText = document.querySelector(".score");

    this.gameItemBox = new ItemBox(carrotCount, bugCount);
    this.gameItemBox.setClickListener(this.onItemClick);

    this.started = false;
    this.timer = undefined;
    this.score = 0;

    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.init();
    sound.playBg();
    this.showTimerScore();
    this.startTimer();
    this.stopIcon();
  }

  stop() {
    this.started = false;
    sound.stopBg();
    sound.playAlert();
    this.playBtn.classList.add("hidden");
    this.stopTimer();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.playBtn.classList.add("hidden");
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopTimer();
    sound.stopBg();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.scoreText.innerHTML = `${this.carrotCount - this.score}`;
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  init() {
    this.score = 0;
    this.scoreText.innerHTML = this.carrotCount;
    this.gameItemBox.init();
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.score === this.carrotCount);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timerText.innerHTML = `${minutes}:${seconds}`;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  stopIcon() {
    const icon = this.playBtn.querySelector(".fa-solid");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-stop");
    this.playBtn.classList.remove("hidden");
  }

  showTimerScore() {
    this.timerText.classList.remove("hidden");
    this.scoreText.classList.remove("hidden");
  }
}
