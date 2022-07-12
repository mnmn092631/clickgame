"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.retryBtn = document.querySelector(".retry");
    this.popUpText = document.querySelector(".pop-upText");
    this.retryBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showText(text) {
    this.popUp.classList.remove("hidden");
    this.popUpText.innerHTML = text;
  }

  hide() {
    this.popUp.classList.add("hidden");
  }
}
