import { levels } from "../levels";
import {
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
  isJumping,
  CURRENT_JUMP_FORCE,
  SOUND_STARTED,
} from "../../config";
import { destroyAllAssets } from "../destructer";

const marioGame = () => {
  let _isJumping = isJumping;
  scene("marioGame", ({ level, score, champion }) => {
    layers(["clouds", "obj", "ui"], "obj");
    camScale(1.1);

    const maps = levels;

    const levelCfg = {
      width: 20,
      height: 20,
      pos: vec2(0, 0),
      "=": () => [sprite("block"), area(), solid(), "brick"],
      $: () => [sprite("coin"), area(), solid(), "coin"],
      "%": () => [sprite("surprise"), area(), solid(), "coin-surprise"],
      "*": () => [sprite("surprise"), area(), solid(), "mushroom-surprise"],
      "}": () => [sprite("unboxed"), area(), solid(), "unboxed"],
      "~": () => [
        sprite("pipe"),
        area(),
        solid(),
        scale(0.15),
        origin("bot"),
        body(),
        "pipe",
      ],
      "^": () => [
        sprite("evil-shroom"),
        area(),
        solid(),
        "dangerousLeft",
        scale(0.11),
        origin("bot"),
        body(),
      ],
      k: () => [
        sprite("kamina"),
        area(),
        solid(),
        "kamina",
        scale(0.25),
        origin("bot"),
        body(),
      ],
      "(": () => [
        sprite("another-evil-shroom"),
        area(),
        solid(),
        "dangerousLeft",
        scale(0.11),
        origin("bot"),
        body(),
      ],
      "#": () => [
        sprite("mushroom"),
        area(),
        solid(),
        "mushroom",
        body(),
        scale(0.09),
        origin("bot"),
      ],
      "!": () => [
        sprite("blue-block"),
        area(),
        solid(),
        scale(0.5),
        "blueBlock",
      ],
      "£": () => [sprite("blue-brick"), area(), solid(), scale(0.5), "bouncer"],
      z: () => [
        sprite("blue-evil-shroom"),
        area(),
        solid(),
        scale(0.12),
        "dangerousRight",
        origin("bot"),
        body(),
      ],
      "@": () => [
        sprite("blue-surprise"),
        area(),
        solid(),
        scale(0.5),
        "coin-surprise",
      ],
      x: () => [sprite("blue-steel"), area(), solid(), scale(0.5)],
      b: () => [
        sprite("boss"),
        area(),
        solid(),
        "boss",
        body(),
        scale(0.3),
        origin("bot"),
      ],
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    console.log(level, score, champion);

    add([layer("ui"), rect(90, 38), pos(0, 0)]);
    for (let index = 0; index < 15; index++) {
      const rndIntX = Math.floor(Math.random() * 2200) + 50;
      const rndIntY = Math.floor(Math.random() * 420) + 1;
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
      text("Score : " + score, { size: 40 }),
      pos(10, 20),
      color(0, 255, 255),
      layer("ui"),
      {
        value: score,
      },
      fixed(),
    ]);

    add([
      text("Level : " + parseInt(level + 1), { size: 40 }),
      layer("ui"),
      pos(10, 60),
      color(0, 255, 255),
      fixed(),
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
          shake(5);
          this.scale = vec2(0.1);
          CURRENT_JUMP_FORCE = JUMP_FORCE;
          timer = 0;
          isBig = false;
        },
        biggify(time) {
          shake(5);
          this.scale = vec2(0.12);
          timer = time;
          isBig = true;
        },
      };
    }

    const player = add([
      sprite(champion),
      scale(0.1),
      area(),
      solid(),
      pos(40, 100),
      body(),
      big(),
      origin("bot"),
    ]);

    onUpdate("mushroom", (m) => {
      m.color = rand(rgb(0, 0, 0), rgb(255, 255, 255));
      m.move(20, 0);
    });

    player.onHeadbutt((obj) => {
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

    player.onCollide("mushroom", (m) => {
      destroy(m);
      player.biggify(6);
    });

    player.onCollide("coin", (c) => {
      destroy(c);
      scoreLabel.value++;
      scoreLabel.text = "Score : " + scoreLabel.value;
    });

    onUpdate("dangerousLeft", (d) => {
      d.move(-ENEMY_SPEED, 0);
    });

    onUpdate("dangerousRight", (d) => {
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
        area(),
        solid(),
      ]);
    };

    onUpdate("bullet", (b) => {
      b.move(-BULLET_SPEED, 100);
      // remove the bullet if it's out of the scene for performance
      if (b.pos.x < 0 || b.pos.y < 0) {
        destroy(b);
      }
    });

    loop(BULLET_INTERVAL, () => {
      if (bossPos && level % 2 === 0) {
        spawnBullet(bossPos);
        spawnBullet(bossPos);
      }
    });

    loop(BOSS_JUMP_TIME, () => {
      onUpdate("boss", (b) => {
        if (b.isGrounded()) {
          b.jump(BOSS_JUMP_FORCE);
          bossPos = b.pos.clone();
          if (Math.abs(bossPos.x - player.pos.clone().x) < 500) {
            shake(5);
          }
        }
      });
    });

    loop(KAMINA_BOSS_JUMP_TIME, () => {
      onUpdate("kamina", (k) => {
        if (k.isGrounded()) {
          k.jump(KAMINA_BOSS_JUMP_FORCE);
        }
      });
    });

    player.onCollide("kamina", (k) => {
      if (_isJumping) {
        shake(5);
        k.color = rand(rgb(0, 0, 0), rgb(255, 127, 255));
        k.scale = 0.09;
        wait(0.5, () => {
          destroy(k);
          scoreLabel.value += 10;
          scoreLabel.text = "Score : " + scoreLabel.value;
        });
      } else {
        shake(30);
        player.color = rand(rgb(0, 0, 0), rgb(100, 200, 230));
        wait(0.1, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.onCollide("boss", (d) => {
      shake(30);
      player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
      wait(0.5, () => {
        go("playerLost", { score: scoreLabel.value, champion });
        destroyAllAssets();
      });
    });

    onCollide("dangerousLeft", "bouncer", (d, b) => {
      d.jump(ENEMY_JUMP_FORCE);
      d.move(2 * ENEMY_SPEED, 0);
    });

    onCollide("dangerousRight", "bouncer", (d, b) => {
      d.jump(ENEMY_JUMP_FORCE);
      d.move(2 * -ENEMY_SPEED, 0);
    });

    player.onCollide("dangerousRight", (d) => {
      if (_isJumping) {
        shake(5);
        d.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          destroy(d);
        });
      } else {
        shake(30);
        player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.onCollide("dangerousLeft", (d) => {
      if (_isJumping) {
        shake(5);
        d.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.1, () => {
          destroy(d);
        });
      } else {
        shake(30);
        player.color = rand(rgb(0, 0, 0), rgb(1, 1, 1));
        wait(0.5, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.onUpdate(() => {
      // center camera to player

      camPos(player.pos);

      if (player.pos.y >= FALL_DEATH) {
        shake(30);
        wait(0.5, () => {
          go("playerLost", { score: scoreLabel.value, champion });
          destroyAllAssets();
        });
      }
    });

    player.onCollide("pipe", () => {
      go("marioGame", {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
        champion,
      });
    });

    onKeyDown("left", () => {
      playSound();
      player.move(-MOVE_SPEED, 0);
    });

    onKeyDown("right", () => {
      playSound();
      player.move(MOVE_SPEED, 0);
    });

    player.onUpdate(() => {
      if (player.isGrounded()) {
        _isJumping = false;
      }
    });

    onKeyPress("space", () => {
      playSound();
      if (player.isGrounded()) {
        _isJumping = true;
        player.jump(CURRENT_JUMP_FORCE);
      }
    });

    function playSound() {
      if (!SOUND_STARTED) {
        SOUND_STARTED = true;
        const sound = document.getElementById("initAudio");
        sound.play();
        sound.loop = true;
      }
    }
  });
};

export { marioGame };
