var enemies, player, playing, objective, levels;
var curlevel = 0;
var startscreenimgs, howtoplayscreenimg, successimg, failureimg, smokeunlockimg, smokeimg, wallphaseimg, wallphaseunlockimg, spritesheet, guardimgs, energyimg, cameraimg;
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
var howtoplaycurrent = 0;
var startedplaying = false;
var devmode = false;
var devmode2 = true;
var devmode3 = false;
var devmode4 = false;
var devmode5 = false;



function drawSprite(x, y, s, sx, sy) {
    image(spritesheet, x, y, 16 * s, 16 * s, sx * 17, sy * 17, 16, 16);
}

function preload() {
    startscreenimgs = [];
    startscreenimgs.push(loadImage("img/startscreen/1.png"));
    startscreenimgs.push(loadImage("img/startscreen/2.png"));
    startscreenimgs.push(loadImage("img/startscreen/3.png"));
    startscreenimgs.push(loadImage("img/startscreen/4.png"));
    startscreenimgs.push(loadImage("img/startscreen/5.png"));
    startscreenimgs.push(loadImage("img/startscreen/6.png"));
    startscreenimgs.push(loadImage("img/startscreen/7.png"));
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

    if (startedplaying) {
        createLevels();
        addLevelSpecifics(curlevel);
    } else {
        createLevels();
        createBaseIsland();
        addLevelSpecifics(curlevel);
    }


    playing = true;
    setLevel(levels[curlevel]);
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
document.getElementById("next").addEventListener("click", function() {
    if (currentThing == "starting") {
        if (howtoplaycurrent < 6) {
            howtoplaycurrent++;
        }
    }
});
document.getElementById("prev").addEventListener("click", function() {
    if (currentThing == "starting") {
        if (howtoplaycurrent > 0) {
            howtoplaycurrent--;
        }
    }
});
document.getElementById("devmode").addEventListener("click", function() {
    var pswd = prompt("Password?");
    if (pswd == "pandasreallylikebamboolol") {
        document.getElementById("devmode").style.display = "none";
        document.getElementById("devmodewindow").style.display = "block";
        devmode = true;
    }


});
document.getElementById("devbutton1").addEventListener("click", function() {
    if (devmode) {
        curlevel = parseInt(prompt("Set level to?")) - 1;
        setup();
    }
});
document.getElementById("devbutton2").addEventListener("click", function() {
    if (devmode) {
        devmode2 = (devmode2) ? false : true;
        if (devmode2) {
            document.getElementById("devlabel2").innerHTML = "Guards Moving: Enabled";
            document.getElementById("devbutton2").innerHTML = "Disable";
        }
        if (!devmode2) {

            document.getElementById("devlabel2").innerHTML = "Guards Moving: Disabled";
            document.getElementById("devbutton2").innerHTML = "Enable";
        }
    }
});
document.getElementById("devbutton3").addEventListener("click", function() {
    if (devmode) {
        devmode3 = (devmode3) ? false : true;
        if (devmode3) {
            document.getElementById("devlabel3").innerHTML = "Invincible: Enabled";
            document.getElementById("devbutton3").innerHTML = "Disable";
        }
        if (!devmode3) {

            document.getElementById("devlabel3").innerHTML = "Invincible: Disabled";
            document.getElementById("devbutton3").innerHTML = "Enable";
        }
    }
});
document.getElementById("devbutton4").addEventListener("click", function() {
    if (devmode) {
        devmode4 = (devmode4) ? false : true;
        if (!devmode4) {
            for (var enemy of enemies) {
                if (enemy instanceof Wall) {
                    enemy.playerCanPass = true;
                }
            }
        } else {
            for (var enemy of enemies) {
                if (enemy instanceof Wall) {
                    enemy.playerCanPass = false;
                }
            }
        }
        if (devmode4) {
            document.getElementById("devlabel4").innerHTML = "Phase Through Walls: Enabled";
            document.getElementById("devbutton4").innerHTML = "Disable";
        }
        if (!devmode4) {

            document.getElementById("devlabel4").innerHTML = "Phase Through Walls: Disabled";
            document.getElementById("devbutton4").innerHTML = "Enable";
        }
    }
});
document.getElementById("devbutton5").addEventListener("click", function() {
    if (devmode) {
        devmode5 = (devmode5) ? false : true;
        if (devmode5) {
            document.getElementById("devlabel5").innerHTML = "Remove Guards: Enabled";
            document.getElementById("devbutton5").innerHTML = "Disable";
        }
        if (!devmode5) {

            document.getElementById("devlabel5").innerHTML = "Remove Guards: Disabled";
            document.getElementById("devbutton5").innerHTML = "Enable";
        }
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
        image(startscreenimgs[howtoplaycurrent], 0, 0, 500, 500);
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
            startedplaying = true;
            setup();
        }
        background(0, 0, 0);
        image(successimg, 0, 100, 500, 300);
    }
    if (currentThing == "failing") {
        if (devmode3) {
            currentThing = "playing";
            return;
        }
        console.log(currentThingTimeLeft);
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
            console.log("test");
            startedplaying = true;
            setup();
            return;
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