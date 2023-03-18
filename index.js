import kaboom from "kaboom";

import { DEV_MODE } from "./config";
import { pickChampion, startGame, marioGame, playerLost } from "./src/scenes";

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: false,
  crisp: true,
  background: [255, 255, 255, 0.7],
  font: "sinko",
  canvas: document.getElementById("game"),
  width: window.width,
  height: window.height,
});

if (DEV_MODE) {
  loadSprite("coin", "https://i.imgur.com/wbKxhcd.png");
  loadSprite("evil-shroom", "https://i.imgur.com/63EYaI7.png");
  loadSprite("another-evil-shroom", "https://i.imgur.com/cX2qpJN.png");
  loadSprite("brick", "https://i.imgur.com/pogC9x5.png");
  loadSprite("block", "https://i.imgur.com/M6rwarW.png");
  loadSprite("marco", "https://i.ibb.co/ncWfh9j/marco.png");
  loadSprite("shubhendu", "https://i.ibb.co/wzVrG0b/shubhendu.png");
  loadSprite("badar", "https://i.ibb.co/Ks7gDzX/badar.png");
  loadSprite("vinatha", "https://i.ibb.co/W2GTc26/vinatha.png");
  loadSprite("anson", "https://i.ibb.co/H4VLY3V/anson.png");
  loadSprite("kamina", "https://i.imgur.com/HgLm8A3.png");
  loadSprite("mushroom", "https://i.imgur.com/WVyDZ9V.png");
  loadSprite("surprise", "https://i.imgur.com/gesQ1KP.png");
  loadSprite("unboxed", "https://i.imgur.com/bdrLpi6.png");
  loadSprite("pipe", "https://i.imgur.com/Dnjhs96.png");
  loadSprite("blue-block", "https://i.imgur.com/fVscIbn.png");
  loadSprite("blue-brick", "https://i.imgur.com/3e5YRQd.png");
  loadSprite("blue-steel", "https://i.imgur.com/gqVoI2b.png");
  loadSprite("cloudsOne", "https://i.imgur.com/Ad4qM4E.png");
  loadSprite("cloudsTwo", "https://i.imgur.com/gPoY6Pg.png");
  loadSprite("cloudsThree", "https://i.imgur.com/X1s30iP.png");
  loadSprite("blue-evil-shroom", "https://i.imgur.com/Swmkpfs.png");
  loadSprite("blue-surprise", "https://i.imgur.com/RMqCc1G.png");
  loadSprite("boss", "https://i.imgur.com/DappYKF.png");
} else {
  loadSprite("coin", "https://i.imgur.com/wbKxhcd.png");
  loadSprite("brick", "https://i.imgur.com/pogC9x5.png");
  loadSprite("block", "https://i.imgur.com/M6rwarW.png");
  loadSprite("surprise", "https://i.imgur.com/gesQ1KP.png");
  loadSprite("unboxed", "https://i.imgur.com/bdrLpi6.png");
  loadSprite("blue-block", "https://i.imgur.com/fVscIbn.png");
  loadSprite("blue-brick", "https://i.imgur.com/3e5YRQd.png");
  loadSprite("blue-steel", "https://i.imgur.com/gqVoI2b.png");
  loadSprite("blue-surprise", "https://i.imgur.com/RMqCc1G.png");

  loadSprite("cloudsOne", "./images/cloudsOne.png");
  loadSprite("cloudsTwo", "./images/cloudsTwo.png");
  loadSprite("cloudsThree", "./images/cloudsThree.png");
  loadSprite("blue-evil-shroom", "./images/monsterTwo.png");
  loadSprite("evil-shroom", "./images/monsterOne.png");
  loadSprite("another-evil-shroom", "./images/monsterThree.png");
  loadSprite("yashi", "./images/yashi.png");
  loadSprite("shivi", "./images/shivi.png");
  loadSprite("chinu", "./images/chinu.png");
  loadSprite("babu", "./images/babu.png");
  loadSprite("priyank", "./images/priyank.png");
  loadSprite("kamina", "./images/kamina.png");
  loadSprite("mushroom", "./images/icecream.png");
  loadSprite("pipe", "./images/pipe.png");
  loadSprite("boss", "./images/boss.png");
}

// SCENE
// 1) pickChampion
pickChampion();
// 2) startGame
startGame();
// 3) marioGame
marioGame();
// 4) playerLost
playerLost();
