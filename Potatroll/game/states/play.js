var Play = function(game) {}

//declare variables
var bg;
var swapKey;

var potatoes = [];
var numOfPots = 8;
var sortedPotatoes = [];
var counter = 0;

var chosenPots = [];
var potID = '';

var position_potato = {};
var potatoName_position = {};
var stepText;
var steps = numOfPots - 1;
var playerSteps = 0;
var score = 0;
var bgMusic;
var swapSound;
var scoreText;
var cautionText;
var highscore;
var highscorer = 'player';
var count = 0;

WebFontConfig = {

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Finger Paint', 'Comfortaa']
    }

};

Play.prototype = {

    preload: function() {
        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('replay', 'assets/grass.png', 190, 70);


    },

    create: function() {

        game.world.setBounds(0, 0, game.height - 300, game.width - 300);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        //bg.anchor.setTo(1, 1);
        bg.tileScale.setTo(1, 0.16);
        bg.smoothed = false;

        potatoes = game.add.group();
        potatoes.inputEnableChildren = true;
        swapKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        potatoes.enableBody = true;

        var style = {
            font: "28px Comfortaa",
            fill: "#ffffff"
        };

        stepText = game.add.text(450, 40, "Swap:\t" + playerSteps, style);
        stepText.anchor.set(0.5);
        stepText.inputEnabled = true;
        stepText.events.onInputOver.add(this.over);
        stepText.events.onInputOut.add(this.out);

        bgMusic = game.add.audio('bgMusic');
        swapSound = game.add.audio('swapSound');
        swapSound.volume = 0.1;

        bgMusic.play();
        bgMusic.loopFull();

        highscore = localStorage.getItem(highscorer) == null ? 0 : localStorage.getItem(highscorer);

        var style2 = {
            font: "100px Arial",
            fill: "#ff0000",
            align: "center"
        };
        cautionText = game.add.text(game.width - 70, game.world.centerY - 200, '!!', style2);
        cautionText.anchor.setTo(0.5, 0.5);
        cautionText.angle = -20;
        cautionText.alpha = 0;

        //creating a group of potatoes
        for (var i = 0; i < numOfPots; i++) {
            var potato = potatoes.create(100 * (i + 1), game.world.centerY, 'potato');
            potato.anchor.setTo(0.5, 1);
            var scaleFactor = 0.3 * Math.random() + 0.06;
            potato.scale.set(scaleFactor);
            potato.name = 'pot' + i;
            potato.events.onInputDown.add(this.onClick);
            potato.body.velocity.x = (1 - scaleFactor) * 10;

            sortedPotatoes.push(potato.scale.x);

            //create maps of potato names and their positions
            position_potato[i] = potato;
            potatoName_position[potato.name] = i;
        }
        //var frameNames = Phaser.Animation.generateFrameNames('potatoe', 0, 24, '', 4);
        //potatoes.callAll('animations.add', 'animations', 'swim', frameNames, 30, true, false);

        //  Here we just say 'play the swim animation', this time the 'play' method exists on the child itself, so we can set the context to null.
        //potatoes.callAll('play', null, 'swim');
        // potatoes.animations.add('swim');
        //potatoes.animations.play('swim', 30, true);

        //sort scales descendingly
        sortedPotatoes.sort(function(a, b) {
            return a - b;
        });


    },
    over: function(item) {
        var grd = stepText.context.createLinearGradient(0, 0, 0, stepText.height);

        //  Add in 2 color stops
        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#a3d3e6');
        item.fill = grd;

    },
    out: function(item) {
        item.fill = "#fff";
    },

    onClick: function(potato) {
        if (potato.tint === 0xffffff && counter < 2) {
            potato.tint = 0xff0000;
            counter += 1;
            chosenPots.push(potato);

        } else if (potato.tint === 0xff0000 && counter <= 2) {
            potato.tint = 0xffffff;
            counter -= 1;
            chosenPots.pop();

        }
    },

    replay: function() {
        // if(this.game.input.activePointer.justPressed()) {
        updatedPots = [];
        sortedPotatoes = []
        this.game.state.start('play');
        // }
    },

    update: function() {
        //scrolling background
        bg.tilePosition.x -= 1;

        //var for constantly checking scale values
        var updatedPots = [];

        //check losing
        game.physics.arcade.collide(potatoes, potatoes);

        potatoes.forEach(function(child) {

            if (child.x >= (game.width - 150)) {
                count += 1;

                if (count > 20) {
                    cautionText.alpha = 0;

                    if (count === 40) {
                        count = 0;
                    }
                } else {
                    cautionText.alpha = 1;
                }

            }

            if (child.x > (game.width + 30)) {
                score = 0;
                playerSteps = 0;
                updatedPots = [];
                this.bgMusic.stop();
                this.game.state.start('gameover');
            }

        });

        if (swapKey.isDown && chosenPots.length === 2) {

            swapSound.play();

            var firstPotName = chosenPots[0].name;
            var secondPotName = chosenPots[1].name;

            var firstPosition = potatoName_position[firstPotName];
            var secondPosition = potatoName_position[secondPotName];

            //swapping y positions of selected potatoes
            var tempPos = chosenPots[0].x;
            chosenPots[0].x = chosenPots[1].x;
            chosenPots[1].x = tempPos;

            //swapping them in the checking array
            var tempPot = position_potato[firstPosition];
            position_potato[firstPosition] = position_potato[secondPosition];
            position_potato[secondPosition] = tempPot;

            //update their states
            for (var j = 0; j < Object.keys(position_potato).length; j++) {
                updatedPots.push(position_potato[j].scale.x);
            }

            for (var g = 0; g < Object.keys(position_potato).length; g++) {
                potatoName_position[position_potato[g].name] = g;
            }

            // console.log(updatedPots);
            // console.log(sortedPotatoes);

            //reset conditions
            chosenPots[0].tint = 0xffffff;
            chosenPots[1].tint = 0xffffff;
            chosenPots = [];
            counter = 0;
            playerSteps++;
            stepText.setText("Swap:\t" + playerSteps);

            //check winning

            if (updatedPots.length === sortedPotatoes.length && updatedPots.every(function(v, i) {
                    return v === sortedPotatoes[i]
                })) {

                score = 100 * numOfPots + (steps - playerSteps) * 30;

                playerSteps = 0;

                potatoes.forEach(function(child) {
                    child.body.velocity.x = 0;
                });

                highscore = Math.max(score, highscore);
                localStorage.setItem(highscorer, highscore);

                var style = {
                    font: "28px Comfortaa",
                    fill: "#ffffff"
                };

                scoreText = game.add.text(500, 100, "Your Score:\n" + score + "\nBest Score:\n" + highscore, style);

                var replay = game.add.button(game.world.centerX, game.world.centerY, 'replay');
                replay.onInputDown.add(this.replay);
            }

            //while playing
            else {
                updatedPots = [];
            }
        }
    }
};
