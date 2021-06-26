scene("start", ({ score }) => {
  add([text("START GAME"), origin("center"), pos(width() / 2, height() / 2)]);

  keyPress("space", () => {
    go("game", {
      level: 0,
      score: 0,
    });
  });
});

start("start", { level: 0, score: 0 });
