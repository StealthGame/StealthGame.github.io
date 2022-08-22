var levelspecifics = [{}, {}, {
    "changearea": [{
            "point1": { "x": 1, "y": 29 },
            "point2": { "x": 1, "y": 30 },
            "changeto": "waterr"
        },
        {
            "point1": { "x": 2, "y": 29 },
            "point2": { "x": 28, "y": 30 },
            "changeto": "grass"
        },
        {
            "point1": { "x": 29, "y": 29 },
            "point2": { "x": 29, "y": 30 },
            "changeto": "waterl"
        },
        {
            "point1": { "x": 29, "y": 2 },
            "point2": { "x": 30, "y": 30 },
            "changeto": "grass"
        },
        {
            "point1": { "x": 29, "y": 1 },
            "point2": { "x": 30, "y": 1 },
            "changeto": "waterb"
        },
        {
            "point1": { "x": 2, "y": 26 },
            "point2": { "x": 11, "y": 26 },
            "changeto": "wallh"
        }
    ]
}, {}];
var spritemappings = [
    ["grass", 5, 0],
    ["waterl", 2, 1],
    ["waterr", 4, 1],
    ["watert", 3, 0],
    ["waterb", 3, 2],
    ["water", 1, 0],
    ["watertl", 1, 2],
    ["watertr", 0, 2],
    ["waterbl", 1, 1],
    ["waterbr", 0, 1],
    ["wallv", 34, 19],
    ["wallhl", 48, 23],
    ["wallhr", 49, 23],
    ["wallh", 52, 23]
];










function createLevels() {
    levels = [];
    levels.push({
        "enemies": [new PatrolGuard(250, 250, [
                { x: 250, y: 250 },
                { x: 160, y: 40 },
                { x: 160, y: 160 },
                { x: 40, y: 160 },
                { x: 40, y: 460 },
                { x: 250, y: 460 }
            ]),
            new PatrolGuard(40, 160, [
                { x: 40, y: 160 },
                { x: 40, y: 460 },
                { x: 250, y: 460 },
                { x: 250, y: 250 },
                { x: 160, y: 40 },
                { x: 160, y: 160 }
            ]),
            new PatrolGuard(300, 250, [
                { x: 300, y: 40 },
                { x: 300, y: 460 },
                { x: 460, y: 460 },
                { x: 460, y: 40 },
                { x: 300, y: 460 },
            ]),
            new SecurityCamera(40, 40, 20, [Math.PI * -0.2, Math.PI * 0.7], 150),
            new SecurityCamera(460, 460, 20, [Math.PI * 1.6, Math.PI * 0.7], 150),
            new Laser(50, 50, 10, [
                { x: 140, y: 10 },
                { x: 140, y: 140 },
                { x: 10, y: 140 }
            ], 120, 40)
        ],
        "player": new Player(250, 400, 25),
        "objective": new Objective(100, 100, 70)
    });
    levels.push({
        "enemies": [
            new SecurityCamera(500, 0, 25, [PI, PI * 0.5], 150, PI / 90, 10, PI * 0.7),
            new SecurityCamera(500, 500, 25, [PI, PI * 1.5], 120, PI / 90, 10, PI * 1.3),
            new SecurityCamera(0, 500, 25, [0, PI * 1.5], 120, PI / 90, 10, PI * 0.55),
            new SecurityCamera(0, 0, 25, [0, PI * 0.5], 120, PI / 90, 10, PI * 0.3),
            new Laser(50, 50, 10, [
                { x: 370, y: 10 },
                { x: 370, y: 130 },
                { x: 490, y: 130 }
            ]),
            new Laser(50, 50, 10, [
                { x: 50, y: 50 },
                { x: 100, y: 50 },
                { x: 100, y: 250 },
                { x: 50, y: 250 },
                { x: 50, y: 450 },
            ]),
            new PatrolGuard(480, 160, [
                { x: 470, y: 150 },
                { x: 310, y: 150 },
                { x: 310, y: 40 },
                { x: 310, y: 150 }
            ]),
            new PatrolGuard(340, 160, [
                { x: 370, y: 180 },
                { x: 330, y: 40 },
                { x: 360, y: 180 },
                { x: 450, y: 180 }
            ]),
            new PatrolGuard(340, 40, [
                { x: 340, y: 40 },
                { x: 350, y: 160 },
                { x: 480, y: 160 },
                { x: 340, y: 160 }
            ]),
            new PatrolGuard(20, 20, [
                { x: 20, y: 20 },
                { x: 100, y: 100 },
                { x: 20, y: 180 },
                { x: 100, y: 260 },
                { x: 20, y: 340 },
                { x: 100, y: 420 },
                { x: 20, y: 480 }
            ], 20),
            new PatrolGuard(20, 450, [
                { x: 20, y: 450 },
                { x: 450, y: 450 }
            ])
        ],
        "player": new Player(250, 400, 25),
        "objective": new Objective(400, 100, 70)
    });
    levels.push({
        "enemies": [
            new PowerupCollectable(powerups[0], 210, 390, 30),
            new Laser(50, 50, 20, [{ "x": 450, "y": 150 }, { "x": 500, "y": 150 }], 30, 60),
            new PatrolGuard(400, 460, [
                { "x": 400, "y": 460 },
                { "x": 120, "y": 460 }
            ], 30, PI / 10, 40),
            new SecurityCamera(500, 0, 20, [PI, PI * 0.5], 250, PI / 60, 1, PI * 0.7),
            new PatrolGuard(400, 150, [{ "x": 400, "y": 150 }, { "x": 200, "y": 150 }], 11, PI * 0.6, 70, PI / 60),
            new PatrolGuard(260, 150, [{ "x": 400, "y": 150 }, { "x": 200, "y": 150 }], 7, PI * 0.3, 70, PI / 60),
            new PatrolGuard(90, 50, [{ "x": 400, "y": 50 }, { "x": 200, "y": 50 }], 15, PI * 0.4, 70, PI / 60),
            new PatrolGuard(400, 50, [{ "x": 400, "y": 50 }, { "x": 200, "y": 50 }], 12, PI * 0.5, 70, PI / 60)
        ],
        "player": new Player(20, 435, 25),
        "objective": new Objective(400, 100, 70)
    });
    levels.push({
        "enemies": [
            new PatrolGuard(0, 200, [{ "x": 0, "y": 200 }, { "x": 500, "y": 200 }], 1, PI * 1.5, 60),
            new PatrolGuard(100, 200, [{ "x": 0, "y": 200 }, { "x": 500, "y": 200 }], 1, PI * 1.5, 60),
            new PatrolGuard(200, 200, [{ "x": 0, "y": 200 }, { "x": 500, "y": 200 }], 1, PI * 1.5, 60),
            new PatrolGuard(300, 200, [{ "x": 0, "y": 200 }, { "x": 500, "y": 200 }], 1, PI * 1.5, 60),
            new PatrolGuard(400, 200, [{ "x": 0, "y": 200 }, { "x": 500, "y": 200 }], 1, PI * 1.5, 60),
            new PatrolGuard(500, 200, [{ "x": 0, "y": 200 }, { "x": 500, "y": 200 }], 1, PI * 1.5, 60),
            new Wall([{ "x": 0, "y": 260 }, { "x": 500, "y": 260 }]),
            new Wall([{ "x": 250, "y": 260 }, { "x": 250, "y": 350 }]),
            new Wall([{ "x": 250, "y": 500 }, { "x": 250, "y": 440 }]),
            new PatrolGuard(200, 300, [{ "x": 200, "y": 260 }, { "x": 200, "y": 500 }], 1, PI * 1.99999999, 60),
            new Wall([{ "x": 300, "y": 260 }, { "x": 300, "y": 410 }]),
            new Laser(50, 50, 20, [{ "x": 300, "y": 410 }, { "x": 300, "y": 500 }], 60, 60),
            new Wall([{ "x": 390, "y": 260 }, { "x": 390, "y": 500 }]),
            new PatrolGuard(420, 290, [{ "x": 420, "y": 290 }], 1, 1, 1, PI / 70),
            new PatrolGuard(420, 390, [{ "x": 420, "y": 390 }], 1, 1, 1, PI / 70),
            new PatrolGuard(420, 340, [{ "x": 420, "y": 340 }], 1, 1, 1, PI / 70),
            new PatrolGuard(420, 440, [{ "x": 420, "y": 440 }], 1, 1, 1, PI / 70),
            new PatrolGuard(420, 490, [{ "x": 420, "y": 490 }], 1, 1, 1, PI / 70),
            new SecurityCamera(420, 390, 30, [PI * 0.9, PI * 1.1], 100, PI / 60, 4, PI * 0.9, PI),
            new PowerupCollectable(powerups[1], 340, 390, 30),
        ],
        "player": new Player(20, 400, 25),
        "objective": new Objective(400, 100, 70)
    });
}






function createBaseIsland() {
    // backgroundtiles[y][x] not background tiles [x][y];
    for (var i = 0; i < 31; i++) {
        backgroundtiles.push([]);
        for (var j = 0; j < 31; j++) {
            backgroundtiles[i].push("grass");
        }

    }
    for (var i = 1; i < 30; i++) {
        backgroundtiles[1][i] = "waterb";
        backgroundtiles[0][i] = "water";
    }
    for (var i = 1; i < 30; i++) {
        backgroundtiles[i][1] = "waterr";
        backgroundtiles[i][0] = "water";
    }
    for (var i = 1; i < 30; i++) {
        backgroundtiles[i][29] = "waterl";
        backgroundtiles[i][30] = "water";
    }
    for (var i = 1; i < 30; i++) {
        backgroundtiles[29][i] = "watert";
        backgroundtiles[30][i] = "water";
    }
    backgroundtiles[29][29] = "watertl";
    backgroundtiles[1][29] = "waterbl";
    backgroundtiles[29][0] = "water";
    backgroundtiles[1][1] = "waterbr";
    backgroundtiles[30][30] = "water";
    backgroundtiles[30][0] = "water";
    backgroundtiles[0][0] = "water";
    backgroundtiles[0][30] = "water";
    backgroundtiles[29][1] = "watertr";
    for (var i = 0; i < backgroundtiles.length; i++) {
        originalbackgroundtiles.push([])
        for (var j = 0; j < backgroundtiles[i].length; j++) {
            originalbackgroundtiles[i].push(backgroundtiles[i][j]);
        }
    }
}


function addLevelSpecifics(level) {
    if (levelspecifics[level].change) {
        for (var i = 0; i < levelspecifics[level].change.length; i++) {
            backgroundtiles[levelspecifics[level].change[i].x][levelspecifics[level].change[i].y] = levelspecifics[level].change[i].changeto;
        }
    }
    if (levelspecifics[level].changearea) {
        for (var i = 0; i < levelspecifics[level].changearea.length; i++) {
            var current = levelspecifics[level].changearea[i];
            var lesserpointx = (current.point1.x > current.point2.x) ? current.point2.x : current.point1.x;
            var lesserpointy = (current.point1.y > current.point2.y) ? current.point2.y : current.point1.y;
            var width = Math.abs(current.point1.x - current.point2.x) + 1;
            var height = Math.abs(current.point1.y - current.point2.y) + 1;
            console.log(lesserpointx, lesserpointy, width, height);
            if (current.changeto == "wallh" && width > 2) {
                for (var x = lesserpointx + 1; x < lesserpointx + width - 1; x++) {
                    for (var y = lesserpointy; y < lesserpointy + height; y++) {
                        backgroundtiles[y][x] = current.changeto;
                    }
                }
                for (var y = lesserpointy; y < lesserpointy + height; y++) {
                    backgroundtiles[y][lesserpointx] = "wallhl";
                }
                for (var y = lesserpointy; y < lesserpointy + height; y++) {
                    backgroundtiles[y][lesserpointx + width - 1] = "wallhr";
                }
            } else {
                for (var x = lesserpointx; x < lesserpointx + width; x++) {
                    for (var y = lesserpointy; y < lesserpointy + height; y++) {
                        backgroundtiles[y][x] = current.changeto;
                    }
                }
            }
        }
    }
}