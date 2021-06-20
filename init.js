kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  crisp: true,
  debug: false,
  clearColor: [0, 0.4, 0.6, 0.6],
});

const MOVE_SPEED = 150;
const JUMP_FORCE = 400;
const BIG_JUMP_FORCE = 550;
const FALL_DEATH = 400;
const ENEMY_SPEED = 30;
let isJumping = true;
let CURRENT_JUMP_FORCE = JUMP_FORCE;

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
loadSprite("blue-evil-shroom", "https://i.imgur.com/Swmkpfs.png");
loadSprite("blue-surprise", "https://i.imgur.com/RMqCc1G.png");
