const playerLost = () => {
  scene("playerLost", ({ score, champion }) => {
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
      go("marioGame", {
        level: 0,
        score: 0,
        champion,
      });
    });
  });
};

module.exports = playerLost;
