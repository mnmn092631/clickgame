"use strict";
import PopUp from "./popup.js";
import Game from "./game.js";

let gameDuration = +prompt("게임 시간을 입력해주세요(초 단위)");
let carrotCount = +prompt("당근 개수를 입력해주세요");
let bugCount = +prompt("벌레 개수를 입력해주세요");

const gameFinishBanner = new PopUp();

const game = new Game(gameDuration, carrotCount, bugCount);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "REPLAY?";
      break;
    case "win":
      message = "YOU WON🎉";
      break;
    case "lose":
      message = "YOU LOST😅";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
