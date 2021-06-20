kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: false,
  clearColor: [0, 0.4, 0.6, 0.6],
});

const MOVE_SPEED = 150;
const JUMP_FORCE = 400;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let isJumping = true;
const FALL_DEATH = 400;
const ENEMY_SPEED = 30;

//loadRoot("https://i.imgur.com/");
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

loadSprite("bg", "https://i.imgur.com/X24REw7.png");

scene("game", ({ level, score }) => {
  layers(["bg", "obj", "ui"], "obj");
  camIgnore(["ui"]);
  camScale(1.1);
  camRot(0.04);

  const maps = [
    [
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                                                                                                               ",
      "                                       *                                                                                       ",
      "     @@@@@@*                                                                                 %   =*=%=                         ",
      "                                                                                                                               ",
      "                                                                                       £                                       ",
      "                                              (      £        z        £  £            ££                   ^   (            ~ ",
      "================  ==========  =====================  ===================  ========================================= ===========",
    ],
    [
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£           @ @                                  @@                                              @@@@@@              x x        £",
      "£                             *                                                                                    x x x        £",
      "£                                                                                                                x x x x  x     £",
      "£                                   £                     z                    £                  ^     z   (  x x x x x  x ( ~ £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!  !!!!!!   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
    [
      "£                                                                                                                               £",
      "£                                                                                                                               £",
      "£                                            @@@@@@                           @@@@                                              £",
      "£                                                                                                                               £",
      "£                                 ^                                                                                             £",
      "£ ===================================================================   x  ===============                                      £",
      "£                                                                      x                                                        £",
      "£                                                                     x                                                ^        £",
      "£           @ @                                  @@                  x                           @@@@@@              x x        £",
      "£                             *                                     x                                              x x x        £",
      "£                                                                  x                                             x x x x        £",
      "£                                    £                      z      x                             ^     (   z  x x x x x x   ( ~  £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!  !!!!!!   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "brick"],
    $: [sprite("coin"), "coin"],
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid()],
    "~": [sprite("pipe"), solid(), "pipe", scale(0.1), origin("bot"), body()],
    "^": [
      sprite("evil-shroom"),
      solid(),
      "dangerousLeft",
      scale(0.09),
      origin("bot"),
      body(),
    ],
    "(": [
      sprite("another-evil-shroom"),
      solid(),
      "dangerousLeft",
      scale(0.09),
      origin("bot"),
      body(),
    ],
    "#": [
      sprite("mushroom"),
      solid(),
      "mushroom",
      body(),
      scale(0.1),
      origin("bot"),
    ],
    "!": [sprite("blue-block"), solid(), scale(0.5)],
    "£": [sprite("blue-brick"), solid(), scale(0.5), "bouncer"],
    z: [
      sprite("blue-evil-shroom"),
      solid(),
      scale(0.1),
      "dangerousRight",
      origin("bot"),
      body(),
    ],
    "@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
    x: [sprite("blue-steel"), solid(), scale(0.5)],
  };

  const gameLevel = addLevel(maps[level], levelCfg);

  add([sprite("bg"), layer("bg"), origin("topleft"), scale(0.5, 0.2)]);

  const scoreBg = add([layer("ui"), rect(90, 38), pos(0, 0)]);

  const scoreLabel = add([
    text("Score : " + score),
    pos(10, 20),
    color(0, 0, 0, 1),
    layer("ui"),
    {
      value: score,
    },
  ]);

  add([
    text("Level : " + parseInt(level + 1)),
    layer("ui"),
    pos(10, 10),
    color(0, 0, 0, 1),
  ]);

  function big() {
    let timer = 0;
    let isBig = false;
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
          timer -= dt();
          if (timer <= 0) {
            this.smallify();
          }
        }
      },
      isBig() {
        return isBig;
      },
      smallify() {
        camShake(5);
        this.scale = vec2(0.06);
        CURRENT_JUMP_FORCE = JUMP_FORCE;
        timer = 0;
        isBig = false;
      },
      biggify(time) {
        camShake(5);
        this.scale = vec2(0.08);
        timer = time;
        isBig = true;
      },
    };
  }

  const player = add([
    sprite("mario"),
    scale(0.06),
    solid(),
    pos(550, 200),
    body(),
    big(),
    origin("bot"),
  ]);

  action("mushroom", (m) => {
    m.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
    m.move(20, 0);
  });

  player.on("headbump", (obj) => {
    if (obj.is("coin-surprise")) {
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
    if (obj.is("mushroom-surprise")) {
      gameLevel.spawn("#", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
  });

  player.collides("mushroom", (m) => {
    destroy(m);
    player.biggify(6);
  });

  player.collides("coin", (c) => {
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = "Score : " + scoreLabel.value;
  });

  action("dangerousLeft", (d) => {
    d.move(-ENEMY_SPEED, 0);
  });

  action("dangerousRight", (d) => {
    d.move(ENEMY_SPEED, 0);
  });

  collides("dangerousLeft", "bouncer", (d, b) => {
    d.jump(150);
    d.move(2 * ENEMY_SPEED, 0);
  });

  collides("dangerousRight", "bouncer", (d, b) => {
    d.jump(150);
    d.move(2 * -ENEMY_SPEED, 0);
  });

  player.collides("dangerousRight", (d) => {
    if (isJumping) {
      camShake(5);
      destroy(d);
    } else {
      camShake(30);
      player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
      wait(0.5, () => {
        go("lose", { score: scoreLabel.value });
      });
    }
  });

  player.collides("dangerousLeft", (d) => {
    if (isJumping) {
      camShake(5);
      destroy(d);
    } else {
      camShake(30);
      player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
      wait(0.5, () => {
        go("lose", { score: scoreLabel.value });
      });
    }
  });

  player.action(() => {
    camPos(player.pos);
    if (player.pos.y >= FALL_DEATH) {
      camShake(30);
      wait(0.5, () => {
        go("lose", { score: scoreLabel.value });
      });
    }
  });

  player.collides("pipe", () => {
    keyPress("down", () => {
      go("game", {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
      });
    });
  });

  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });

  keyPress("space", () => {
    if (player.grounded()) {
      isJumping = true;
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
});

scene("lose", ({ score }) => {
  add([
    text("Your score : " + score, 32),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  add([
    text("Press space to restart", 20),
    origin("center"),
    pos(width() / 2, height() / 2 + 40),
  ]);
  keyPress("space", () => {
    go("game", {
      level: 0,
      score: 0,
    });
  });
});

start("game", { level: 0, score: 0 });
