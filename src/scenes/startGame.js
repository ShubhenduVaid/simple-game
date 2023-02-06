const startGame = () => {
  scene("startGame", ({ champion }) => {
    add([
      text("Your champion is :", { size: 26 }),
      color(0, 255, 10),
      origin("center"),
      pos(width() / 2, 30),
    ]);
    add([
      text(champion.toUpperCase(), { size: 26 }),
      color(0, 255, 10),
      origin("center"),
      pos(width() / 2, 80),
    ]);
    add([
      sprite(champion),
      pos(width() / 2 - 60, height() / 2 - 120),
      origin("topleft"),
      scale(0.3),
    ]);
    add([
      text("Press space to start", { size: 20 }),
      origin("center"),
      color(0, 255, 10),
      pos(width() / 2, height() / 2 + 100),
    ]);
    add([
      text("Use arrow keys to move and space to jump.", { size: 20 }),
      color(0, 255, 10),
      origin("center"),
      pos(width() / 2, height() / 2 + 140),
    ]);
    onKeyPress("space", () => {
      go("marioGame", {
        level: 0,
        score: 0,
        champion,
      });
    });
  });
};

export { startGame };
