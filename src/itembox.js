"use strict";

import * as sound from "./sound.js";

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class ItemBox {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.itemBox = document.querySelector(".itemBox");
    this.boxWidth = this.itemBox.offsetWidth;
    this.boxHeight = this.itemBox.offsetHeight;

    this.itemBox.addEventListener("click", this.onClick);
  }

  init() {
    this.itemBox.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "./img/carrot.png");
    this._addItem("bug", this.bugCount, "./img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, src) {
    const x0 = 0;
    const y0 = 0;
    const x1 = this.boxWidth - 80;
    const y1 = this.boxHeight - 80;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", src);
      item.style.left = `${randomNumber(x0, x1)}px`;
      item.style.top = `${randomNumber(y0, y1)}px`;
      this.itemBox.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.className === "carrot") {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.className === "bug") {
      this.onItemClick && this.onItemClick(ItemType.bug);
      sound.playBug();
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
