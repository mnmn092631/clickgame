"use strict";

import * as sound from "./sound.js";
import { ItemBox, ItemType } from "./itembox.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount, //
      this.bugCount
    );
  }
}

class Game {
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
        this.stop(Reason.cancel);
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

  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.playBtn.classList.add("hidden");
    sound.stopBg();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.scoreText.innerHTML = `${this.carrotCount - this.score}`;
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
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
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
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
