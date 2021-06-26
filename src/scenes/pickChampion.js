const champions = [
  {
    name: "yashi",
    scaleFactor: 0.32,
    posOffset: { x: 48, y: 25 },
    row: 0,
    rectOffset: { rectX: 22, rectY: 0, rectW: 10, rectH: 38 },
    description: ["She is just a", "kid but the", "most agile one."],
  },
  {
    name: "shivi",
    scaleFactor: 0.38,
    posOffset: { x: 0, y: 18 },
    row: 1,
    rectOffset: { rectX: -8, rectY: 0, rectW: 40, rectH: 38 },
    description: [
      "She is the mother",
      "of Yashi and got",
      "skills with knife.",
    ],
  },
  {
    name: "chinu",
    scaleFactor: 0.36,
    posOffset: { x: 15, y: 20 },
    row: 0,
    rectOffset: { rectX: 2, rectY: 0, rectW: 18, rectH: 38 },
    description: ["An animal lover", "and a", "trouble maker."],
  },
  {
    name: "babu",
    scaleFactor: 0.4,
    posOffset: { x: 18, y: 16 },
    row: 1,
    rectOffset: { rectX: 0, rectY: 0, rectW: 5, rectH: 38 },
    description: ["The smoker and", "most", "notorious one."],
  },
  {
    name: "priyank",
    scaleFactor: 0.32,
    posOffset: { x: 0, y: 30 },
    row: 0,
    rectOffset: { rectX: -15, rectY: 0, rectW: 10, rectH: 38 },
    description: ["Rumer has it", "his name is", "Mr VP."],
  },
];

let selectedChampion = "yashi";

scene("pickChampion", () => {
  add([
    text("Select Your Champion !!!", 36),
    pos(10, 20),
    origin("topleft"),
    color(1, 1, 1),
  ]);

  champions.forEach(
    (
      {
        name,
        scaleFactor,
        posOffset: { x, y },
        row,
        rectOffset: { rectX, rectY, rectW, rectH },
        description,
      },
      index
    ) => {
      const posX = index * 200 + x;
      const posY = row * 100 + 76 + y;
      add([
        rect(150 + rectW, 250 + rectH),
        pos(index * 200 + rectX, row * 100 + 76 + rectY),
        color(rand(rgb(0, 0, 0), rgb(1, 1, 1))),
        origin("topleft"),
        "bg" + index,
      ]);
      add([
        sprite(name),
        scale(scaleFactor),
        pos(posX, posY),
        origin("topleft"),
      ]);
      add([
        text(name.toUpperCase(), 12),
        pos(index * 200 + rectX + 10, row * 100 + 76 + rectY + 10),
        origin("topleft"),
        color(1, 1, 1),
      ]);
      description.forEach((desc, _index) => {
        add([
          text(desc, 10),
          pos(
            index * 200 + rectX + 9,
            row * 100 + 200 + rectY + 125 + 10 * _index
          ),
          origin("topleft"),
          color(1, 1, 1),
        ]);
      });
    }
  );

  mouseClick(() => {
    const { x, y } = mousePos();
    add([
      rect(1, 1),
      pos(x, y),
      color(rgba(0, 0, 0, 0)),
      origin("topleft"),
      "mousePointer",
    ]);
    for (let index = 0; index < champions.length; index++) {
      let isHit = false;
      overlaps("mousePointer", "bg" + index, (p, b) => {
        destroy(p);
        isHit = true;
        selectedChampion = champions[index].name;
        go("startGame", { champion: selectedChampion });
      });
      if (isHit) break;
    }
  });
});

start("pickChampion");
