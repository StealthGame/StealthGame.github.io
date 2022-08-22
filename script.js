var enemies, player, playing, objective, levels;
var curlevel = 2;
var startscreenimg, howtoplayscreenimg, successimg, failureimg, smokeunlockimg, smokeimg, wallphaseimg, wallphaseunlockimg, spritesheet, guardimgs, energyimg, cameraimg;
var playerimages = { "left": [], "right": [], "up": [], "down": [] }
var unlocking = "";
var powerupsunlocked = [];
var powerups = [];
var currentThing = "starting";
var currentThingTimeLeft = 0;
var using;
var spb = new SkillPointBar(10, 10, 80);
var backgroundtiles = [];
var originalbackgroundtiles = [];



function drawSprite(x, y, s, sx, sy) {
    image(spritesheet, x, y, 16 * s, 16 * s, sx * 17, sy * 17, 16, 16);
}

function preload() {
    startscreenimg = loadImage("img/startscreen.png");
    howtoplayscreenimg = loadImage("img/HowToPlay.png");
    successimg = loadImage("img/Success.png");
    failureimg = loadImage("img/Failure.png");
    smokeunlockimg = loadImage("img/smokebomb.png");
    smokeimg = loadImage("img/smokebombicon.png");
    wallphaseunlockimg = loadImage("img/WallPhase.png");
    wallphaseimg = loadImage("img/WallPhaseIcon.png");
    playerimages.left.push(loadImage("img/Player/Left 1.png"));
    playerimages.left.push(loadImage("img/Player/Left 2.png"));
    playerimages.right.push(loadImage("img/Player/Right 1.png"));
    playerimages.right.push(loadImage("img/Player/Right 2.png"));
    playerimages.down.push(loadImage("img/Player/Down 1.png"));
    playerimages.down.push(loadImage("img/Player/Down 2.png"));
    playerimages.up.push(loadImage("img/Player/Up 1.png"));
    playerimages.up.push(loadImage("img/Player/Up 2.png"));
    spritesheet = loadImage("img/spritesheet.png");
    guardimgs = [loadImage("img/guardneutral.png"), loadImage("img/guardchase.png")];
    energyimg = loadImage("img/energyball.png");
    cameraimg = loadImage("img/camera.png");
}


function setup() {
    powerups.push(new SmokeBombPowerup());
    powerups.push(new WallPhasePowerup());
    createBaseIsland();
    createLevels();
    playing = true;
    setLevel(levels[curlevel]);
    addLevelSpecifics(curlevel);
    createCanvas(496, 496);
}

function setLevel(level) {
    enemies = level.enemies;
    player = level.player;
    objective = level.objective;
}

document.getElementById("playbtn").addEventListener("click", function() {
    if (currentThing == "starting") {
        currentThing = "playing";
    }
});
document.getElementById("howbtn").addEventListener("click", function() {
    if (currentThing == "starting") {
        document.getElementById("back").style.display = "block";
        currentThing = "howtoplay";
    }
});
document.getElementById("back").addEventListener("click", function() {
    if (currentThing == "howtoplay") {
        currentThing = "starting";
        document.getElementById("back").style.display = "none";
    }
});

function draw() {
    if (currentThing != "playing") {
        doCurrentAction();
        return;
    }
    for (var i = 0; i < backgroundtiles.length; i++) {
        for (var j = 0; j < backgroundtiles[i].length; j++) {
            for (var k = 0; k < spritemappings.length; k++) {
                if (backgroundtiles[i][j] == spritemappings[k][0]) {
                    if (backgroundtiles[i][j].includes("wall")) {

                        drawSprite(j * 16, i * 16, 1, 5, 0);
                    }
                    drawSprite(j * 16, i * 16, 1, spritemappings[k][1], spritemappings[k][2]);
                }
            }
        }
    }

    for (enemy of enemies) {
        enemy.update();
    }
    player.update();
    checkGameOver();
    checkAlert();
    objective.update();
    for (var powerup of powerupsunlocked) {
        powerup.update();
    }
    if (register[48] && powerupsunlocked[0]) {
        powerupsunlocked[0].useAnimation();
    }
    if (register[39] && powerupsunlocked[1]) {
        powerupsunlocked[1].useAnimation();
    }
    spb.update();
}

function doCurrentAction() {
    if (currentThing == "starting") {
        background(0, 0, 0);
        image(startscreenimg, 0, 0, 500, 400);
    }
    if (currentThing == "howtoplay") {
        background(0, 0, 0);
        image(howtoplayscreenimg, -100, 0, 650, 400);
    }
    if (currentThing == "usingpowerup") {
        background(0, 0, 0);
        image(using.unlockimg, 0, 100, 500, 300);
        if (currentThingTimeLeft == 0) {
            using.use();
            currentThing = "playing";
        }
    }
    if (currentThing == "unlockingpowerup") {
        background(0, 0, 0);
        image(unlocking.unlockimg, 0, 100, 500, 300);
        if (currentThingTimeLeft == 0) {
            currentThing = "playing";
        }
    }
    if (currentThing == "winning") {
        if (currentThingTimeLeft == 0) {
            currentThing = "playing";
            setup();
        }
        background(0, 0, 0);
        image(successimg, 0, 100, 500, 300);
    }
    if (currentThing == "failing") {
        if (currentThingTimeLeft == 0) {
            for (var powerup of powerupsunlocked) {
                powerup.cooldowntime = 0;
                powerup.inUse = false;
            }
            currentThing = "playing";
            spb.reset();
            for (var powerup of powerupsunlocked) {
                if (powerup.unlockedthislevel == true) {
                    powerupsunlocked.splice(powerup.index, 1);
                }
            }
            setup();
        }
        background(0, 0, 0);
        image(failureimg, 0, 100, 500, 300);
    }
    currentThingTimeLeft--;

}

function checkGameOver() {
    for (var enemy of enemies) {
        if (enemy instanceof PatrolGuard) {
            if (rectOverlap({ "x": enemy.x - enemy.size / 2, "y": enemy.y - enemy.size / 2, "w": enemy.size, "h": enemy.size }, player)) {
                currentThing = "failing";
                currentThingTimeLeft = 15;
            }
        }
    }
}

function alertOn() {
    for (var enemy of enemies) {
        if (enemy.state == "alert") {
            return true;
        }
    }
    return false;
}

function checkAlert() {
    if (alertOn()) {
        for (var enemy of enemies) {
            if (enemy instanceof PatrolGuard) {
                enemy.state = "chase";
            }
            if (enemy instanceof SecurityCamera) {
                enemy.state = "alert";
            }
        }
    }
}