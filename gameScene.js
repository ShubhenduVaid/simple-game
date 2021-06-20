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
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£           @ @                                  @@                                              @@@@@@              x x      £",
      "£                             *                                                                                    x x x      £",
      "£                                                                                                                x x x x  x   £",
      "£                                   £                     z                    £                  ^     z   (x x x x x  x ( ~ £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!  !!!!!!   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
    [
      "£                                                                                                                             £",
      "£                                                                                                                             £",
      "£                                            @@@@@@                           @@@@                                            £",
      "£                                                                                                                             £",
      "£                                 ^                                                                                           £",
      "£ ===================================================================   x  ===============                                    £",
      "£                                                                      x                                                      £",
      "£                                                                     x                                                ^      £",
      "£           @ @                                  @@                  x                           @@@@@@              x x      £",
      "£                             *                                     x                                              x x x      £",
      "£                                                                  x                                             x x x x      £",
      "£                                    £                      z      x                             ^     (   z  x x x x x x ( ~ £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!  !!!!!!   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "brick"],
    $: [sprite("coin"), "coin"],
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid(), "unboxed"],
    "~": [sprite("pipe"), solid(), scale(0.1), origin("bot"), body(), "pipe"],
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
    "!": [sprite("blue-block"), solid(), scale(0.5), "blueBlock"],
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
    pos(50, 100),
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
        window.destroyAllAssets();
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
        window.destroyAllAssets();
      });
    }
  });

  player.action(() => {
    camPos(player.pos);
    if (player.pos.y >= FALL_DEATH) {
      camShake(30);
      wait(0.5, () => {
        go("lose", { score: scoreLabel.value });
        window.destroyAllAssets();
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

start("game", { level: 0, score: 0 });
