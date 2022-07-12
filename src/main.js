"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

let gameDuration = +prompt("게임 시간을 입력해주세요(초 단위)");
let carrotCount = +prompt("당근 개수를 입력해주세요");
let bugCount = +prompt("벌레 개수를 입력해주세요");

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .gameDuration(gameDuration)
  .carrotCount(carrotCount)
  .bugCount(bugCount)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLAY?";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WON🎉";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST😅";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
