const pickChampion = () => {
  const champions = [
    {
      name: "marco",
      scaleFactor: 0.28,
      posOffset: { x: 15, y: 50 },
      row: 0,
      rectOffset: { rectX: 10, rectY: 0, rectW: 0, rectH: 38 },
      description: ["Leader of", "Marketplace and", "Originations"],
    },
    {
      name: "shubhendu",
      scaleFactor: 0.33,
      posOffset: { x: -28, y: 35 },
      row: 1,
      rectOffset: { rectX: -6, rectY: 0, rectW: 0, rectH: 38 },
      description: ["Leads", "Sales", "Journeys"],
    },
    {
      name: "badar",
      scaleFactor: 0.28,
      posOffset: { x: -18, y: 60 },
      row: 0,
      rectOffset: { rectX: -20, rectY: 0, rectW: 0, rectH: 38 },
      description: ["The", "Orchestration", "Man"],
    },
    {
      name: "vinatha",
      scaleFactor: 0.27,
      posOffset: { x: -28, y: 60 },
      row: 1,
      rectOffset: { rectX: -36, rectY: 0, rectW: 0, rectH: 38 },
      description: ["She connects", "all teams"],
    },
    {
      name: "anson",
      scaleFactor: 0.28,
      posOffset: { x: -50, y: 45 },
      row: 0,
      rectOffset: { rectX: -56, rectY: 0, rectW: 0, rectH: 38 },
      description: ["Creates", "Connections with", "Vendors "],
    },
  ];

  let selectedChampion = "marco";

  scene("pickChampion", () => {
    add([
      text("Select Your Champion !!!", { size: 40 }),
      pos(40, 20),
      origin("topleft"),
      color(255, 255, 255),
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
        const posX = index * 190 + x;
        const posY = row * 100 + 76 + y;
        add([
          rect(150 + rectW, 250 + rectH),
          area(),
          pos(index * 190 + rectX, row * 100 + 76 + rectY),
          color(rand(rgb(0, 0, 0), rgb(255, 255, 255))),
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
          text(name.toUpperCase(), { size: 12 }),
          pos(vec2(index * 190 + rectX + 10, row * 100 + 76 + rectY + 10)),
          origin("topleft"),
          color(255, 255, 255),
        ]);
        description.forEach((desc, _index) => {
          add([
            text(desc, { size: 10 }),
            pos(
              vec2(
                index * 190 + rectX + 9,
                row * 100 + 200 + rectY + 125 + 10 * _index
              )
            ),
            origin("topleft"),
            color(255, 255, 255),
          ]);
        });
      }
    );

    for (let index = 0; index < champions.length; index++) {
      onClick("bg" + index, (bg) => {
        selectedChampion = champions[index].name;
        go("startGame", { champion: selectedChampion });
      });
    }
  });

  go("pickChampion");
};

export { pickChampion };
