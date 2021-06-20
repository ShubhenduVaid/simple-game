kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  crisp: true,
  debug: true,
  clearColor: [0, 0.4, 0.6, 0.6],
});

const BIG_JUMP_FORCE = 700;
const FALL_DEATH = 400;
const ENEMY_SPEED = 30;
const ENEMY_JUMP_FORCE = 200;
const BOSS_JUMP_FORCE = 600;
const BOSS_JUMP_TIME = 1;
const GAME_MODE = 1; // 0 EASY 1 HARD
const MOVE_SPEED = GAME_MODE === 0 ? 300 : 170;
const JUMP_FORCE = GAME_MODE === 0 ? 600 : 415;
let isJumping = true;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const DEV_MODE = false;
if (DEV_MODE) {
  loadSprite("coin", "https://i.imgur.com/wbKxhcd.png");
  loadSprite("evil-shroom", "https://i.imgur.com/63EYaI7.png");
  loadSprite("another-evil-shroom", "https://i.imgur.com/cX2qpJN.png");
  loadSprite("brick", "https://i.imgur.com/pogC9x5.png");
  loadSprite("block", "https://i.imgur.com/M6rwarW.png");
  loadSprite("mario", "https://i.imgur.com/Cq01tRX.png");
  loadSprite("mushroom", "https://i.imgur.com/KQFb1ed.png");
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
  loadSprite("mario", "./images/yashi.png");
  loadSprite("mushroom", "./images/shivi.png");
  loadSprite("pipe", "./images/pipe.png");
  loadSprite("boss", "./images/boss.png");
}
