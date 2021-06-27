const levels = require("../levels");
const {
  BIG_JUMP_FORCE,
  FALL_DEATH,
  ENEMY_SPEED,
  ENEMY_JUMP_FORCE,
  BOSS_JUMP_FORCE,
  BOSS_JUMP_TIME,
  KAMINA_BOSS_JUMP_FORCE,
  KAMINA_BOSS_JUMP_TIME,
  MOVE_SPEED,
  JUMP_FORCE,
  BULLET_SPEED,
  BULLET_INTERVAL,
} = require("../../config");
const destroyAllAssets = require("../destructer");
let { isJumping, CURRENT_JUMP_FORCE, SOUND_STARTED } = require("../../config");

const marioGame = () => {
  scene("marioGame", ({ level, score, champion }) => {
    layers(["clouds", "obj", "ui"], "obj");
    camIgnore(["ui"]);
    camScale(1.1);

    const maps = levels;

    const levelCfg = {
      width: 20,
      height: 20,
      "=": [sprite("block"), solid(), "brick"],
      $: [sprite("coin"), "coin"],
      "%": [sprite("surprise"), solid(), "coin-surprise"],
      "*": [sprite("surprise"), solid(), "mushroom-surprise"],
      "}": [sprite("unboxed"), solid(), "unboxed"],
      "~": [
        sprite("pipe"),
        solid(),
        scale(0.15),
        origin("bot"),
        body(),
        "pipe",
      ],
      "^": [
        sprite("evil-shroom"),
        solid(),
        "dangerousLeft",
        scale(0.11),
        origin("bot"),
        body(),
      ],
      k: [
        sprite("kamina"),
        solid(),
        "kamina",
        scale(0.25),
        origin("bot"),
        body(),
      ],
      "(": [
        sprite("another-evil-shroom"),
        solid(),
        "dangerousLeft",
        scale(0.11),
        origin("bot"),
        body(),
      ],
      "#": [
        sprite("mushroom"),
        solid(),
        "mushroom",
        body(),
        scale(0.09),
        origin("bot"),
      ],
      "!": [sprite("blue-block"), solid(), scale(0.5), "blueBlock"],
      "£": [sprite("blue-brick"), solid(), scale(0.5), "bouncer"],
      z: [
        sprite("blue-evil-shroom"),
        solid(),
        scale(0.12),
        "dangerousRight",
        origin("bot"),
        body(),
      ],
      "@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
      x: [sprite("blue-steel"), solid(), scale(0.5)],
      b: [sprite("boss"), solid(), "boss", body(), scale(0.3), origin("bot")],
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    add([layer("ui"), rect(90, 38), pos(0, 0)]);
    for (let index = 0; index < 15; index++) {
      const rndIntX = Math.floor(Math.random() * 2200) + 50;
      const rndIntY = Math.floor(Math.random() * 400) + 1;
      add([
        layer("clouds"),
        sprite("cloudsOne"),
        pos(rndIntX, 50 + rndIntY),
        scale(0.25),
        origin("bot"),
      ]);
      add([
        layer("clouds"),
        sprite("cloudsTwo"),
        pos(200 + rndIntX, rndIntY),
        scale(0.3),
        origin("bot"),
      ]);
      add([
        layer("clouds"),
        sprite("cloudsThree"),
        pos(100 + rndIntX, 100 + rndIntY),
        scale(0.3),
        origin("bot"),
      ]);
    }

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
          this.scale = vec2(0.07);
          CURRENT_JUMP_FORCE = JUMP_FORCE;
          timer = 0;
          isBig = false;
        },
        biggify(time) {
          camShake(5);
          this.scale = vec2(0.09);
          timer = time;
          isBig = true;
        },
      };
    }

    const player = add([
      sprite(champion),
      scale(0.07),
      solid(),
      pos(40, 100),
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
      d.move(ENEMY_SPEED + 20, 0);
    });

    let bossPos = undefined;

    const spawnBullet = ({ x, y }) => {
      add([
        rect(6, 6),
        pos(x, rand(y, y - 400)),
        origin("topleft"),
        color(0, 0, 0),
        "bullet",
        solid(),
      ]);
    };

    action("bullet", (b) => {
      b.move(-BULLET_SPEED, 100);
      // remove the bullet if it's out of the scene for performance
      if (b.pos.x < 0 || b.pos.y < 0) {
        destroy(b);
      }
    });

    loop(BULLET_INTERVAL, () => {
      if (bossPos) {
        spawnBullet(bossPos);
        spawnBullet(bossPos);
      }
    });

    loop(BOSS_JUMP_TIME, () => {
      action("boss", (b) => {
        if (b.grounded()) {
          b.jump(BOSS_JUMP_FORCE);
          bossPos = b.pos.clone();
          if (Math.abs(bossPos.x - player.pos.clone().x) < 500) {
            camShake(5);
          }
        }
      });
    });

    loop(KAMINA_BOSS_JUMP_TIME, () => {
      action("kamina", (k) => {
        if (k.grounded()) {
          k.jump(KAMINA_BOSS_JUMP_FORCE);
        }
      });
    });

    player.collides("kamina", (k) => {
      if (isJumping) {
        camShake(5);
        k.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        k.scale = 0.09;
        wait(0.5, () => {
          destroy(k);
          scoreLabel.value += 10;
          scoreLabel.text = "Score : " + scoreLabel.value;
        });
      } else {
        camShake(30);
        player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.collides("boss", (d) => {
      camShake(30);
      player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
      wait(0.5, () => {
        go("playerLost", { score: scoreLabel.value, champion });
        destroyAllAssets();
      });
    });

    collides("dangerousLeft", "bouncer", (d, b) => {
      d.jump(ENEMY_JUMP_FORCE);
      d.move(2 * ENEMY_SPEED, 0);
    });

    collides("dangerousRight", "bouncer", (d, b) => {
      d.jump(ENEMY_JUMP_FORCE);
      d.move(2 * -ENEMY_SPEED, 0);
    });

    player.collides("dangerousRight", (d) => {
      if (isJumping) {
        camShake(5);
        d.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          destroy(d);
        });
      } else {
        camShake(30);
        player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.collides("dangerousLeft", (d) => {
      if (isJumping) {
        camShake(5);
        d.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          destroy(d);
        });
      } else {
        camShake(30);
        player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.5, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.action(() => {
      camPos(player.pos);
      if (player.pos.y >= FALL_DEATH) {
        camShake(30);
        wait(0.5, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.collides("pipe", () => {
      keyPress("down", () => {
        player.move(0, 100);
        go("marioGame", {
          level: (level + 1) % maps.length,
          score: scoreLabel.value,
          champion,
        });
      });
    });

    keyDown("left", () => {
      playSound();
      player.move(-MOVE_SPEED, 0);
    });

    keyDown("right", () => {
      playSound();
      player.move(MOVE_SPEED, 0);
    });

    player.action(() => {
      if (player.grounded()) {
        isJumping = false;
      }
    });

    keyPress("space", () => {
      playSound();
      if (player.grounded()) {
        isJumping = true;
        player.jump(CURRENT_JUMP_FORCE);
      }
    });

    function playSound() {
      if (!SOUND_STARTED) {
        SOUND_STARTED = true;
        var sound = document.getElementById("initAudio");
        sound.play();
        sound.loop = true;
      }
    }
  });
};

module.exports = marioGame;
