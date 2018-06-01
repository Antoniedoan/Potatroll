var Play = function(game) {}

WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['IM Fell English', 'Cardo', 'Comfortaa']
    }
};
//declare variables
var bg;
var swapKey;
var win1, win2, win3, king;
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
var winSound;

var style3 = {
            font: "40px IM Fell English",
            fill: 0x000000,
            align: "center"
        };
var style = {
            font: "40px IM Fell English"
        };

var style2 = {
            font: "100px Arial",
            fill: "#ff0000",
            align: "center"
        };

Play.prototype = {
  preload: function() {
  },

  create: function() {
    //game environment
    game.world.setBounds(0, 0, game.height - 300, game.width - 300);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    bg.tileScale.setTo(1, 0.17);
    bg.smoothed = false;

    //adding sprites
    win1 = game.add.sprite(-500, 220, 'win1');
    win1.anchor.set(0.5);
    win1.scale.setTo(0.4, 0.4);
    win2 = game.add.sprite(1850, 220, 'win2');
    win2.anchor.set(0.5);
    win2.scale.setTo(0.4, 0.4);
    win3 = game.add.sprite(200, -550, 'win3');
    win3.anchor.set(0.5);
    win3.scale.setTo(0.2, 0.2);
    king = game.add.sprite(-550, 300, 'king');
    king.anchor.set(0.5);
    king.scale.set(0.25);

    //show num of swaps
    stepText = game.add.text(game.width - 120, 40, "Swap:\t" + playerSteps, style);
    stepText.anchor.set(0.5);
    // stepText.inputEnabled = true;
    // stepText.events.onInputOver.add(this.over);
    // stepText.events.onInputOut.add(this.out);

    //audio
    winHighscore = game.add.audio('winHighscore');
    winSound = game.add.audio('win');
    bgMusic = game.add.audio('bgMusic');
    swapSound = game.add.audio('swapSound');
    swapSound.volume = 0.8;

    bgMusic.play();
    bgMusic.loopFull();

    swapKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    highscore = localStorage.getItem(highscorer) == null ? 0 : localStorage.getItem(highscorer);

    cautionText = game.add.text(game.width - 70, game.world.centerY - 200, '!!', style2);
    cautionText.anchor.setTo(0.5, 0.5);
    cautionText.angle = -20;
    cautionText.alpha = 0;

    //creating a group of potatoes
    potatoes = game.add.group();
    potatoes.inputEnableChildren = true;
    potatoes.enableBody = true;
    for (var i = 0; i < numOfPots; i++) {
      var potato = potatoes.create(100 * (i + 1), game.world.centerY + 50, 'potato');
      potato.anchor.setTo(0.5, 1);
      var scaleFactor = 0.3 * Math.random() + 0.06;
      potato.scale.set(scaleFactor);
      potato.name = 'pot' + i;
      potato.events.onInputDown.add(this.onClick);
      potato.body.velocity.x = (1 - scaleFactor) * 35;

      //used for comparison
      sortedPotatoes.push(potato.scale.x);

      //create maps of potato names and their positions
      position_potato[i] = potato;
      potatoName_position[potato.name] = i;
    }

    //sort scales ascendingly
    sortedPotatoes.sort(function(a, b) {
      return a-b;
    });

  },
  // over: function(item) {
  //   var grd = stepText.context.createLinearGradient(0, 0, 0, stepText.height);
  //
  //   //  Add in 2 color stops
  //   grd.addColorStop(0, '#8ED6FF');
  //   grd.addColorStop(1, '#a3d3e6');
  //   item.fill = grd;
  //
  // },
  // out: function(item){
  //   item.fill = "#fff";
  // },

  onClick: function(potato) {
    if (potato.tint === 0xffffff && counter < 2) {
      potato.tint = 0x936949;
      counter += 1;
      chosenPots.push(potato);
      //console.log(potato.name);
    } else if (potato.tint === 0x936949 && counter <= 2) {
      potato.tint = 0xffffff;
      counter -= 1;
      chosenPots.pop();
      //console.log(potato.name);
    }
  },

  replay: function (){
    // if(this.game.input.activePointer.justPressed()) {
    updatedPots = [];
    sortedPotatoes = []
    this.game.state.start('play');
    // }
  },

  update: function() {
    //scrolling background non-stop
    bg.tilePosition.x -= 1;

    //var for constantly checking scale values
    var updatedPots = [];

    //ensure potatoes don't overtatke
    game.physics.arcade.collide(potatoes, potatoes);

    //check losing
    potatoes.forEach(function(child) {
      if (child.x >= (game.width - 150)){
          count += 1;
          this.bgMusic.volume = 1.5;
          if (count > 20) {
            cautionText.alpha = 0;
            // console.log("yo");
            if (count === 40){
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
          sortedPotatoes = [];
          this.bgMusic.stop();
          this.game.state.start('gameover');
      }
    });

    if (swapKey.isDown && chosenPots.length === 2) {

      swapSound.play();

      //swapping mechanism

      var firstPotName = chosenPots[0].name;
      var secondPotName = chosenPots[1].name;
      // console.log("first name " + firstPotName);
      // console.log("second name " + secondPotName);

      var firstPosition = potatoName_position[firstPotName];
      var secondPosition = potatoName_position[secondPotName];
      // console.log("first position " + firstPosition);
      // console.log("second position " + secondPosition);

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

      console.log(updatedPots);
      console.log(sortedPotatoes);

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

          score = 100*numOfPots + (steps - playerSteps)*30;
          playerSteps = 0;
          bgMusic.stop();
          cautionText.destroy();
          potatoes.forEach(function(child){
            child.body.velocity.x = 0;
          });

          var playAgain = game.add.sprite(game.world.centerX + 400, game.world.centerY - 135, 'playAgain');
          playAgain.scale.set(0.17);
          playAgain.alpha = 0;
          playAgain.inputEnabled = true;

          if (score > highscore){
            winHighscore.play();
            highscore = score;
            localStorage.setItem(highscorer, highscore);
            var congratsText = game.add.text(510, -250, "Well Done", {font: "80px IM Fell English", fill: "#ffffff"});
            game.add.tween(congratsText).to({y:50}, 2000, Phaser.Easing.Bounce.Out, true);

            scoreText = game.add.text(555, 150, "New Highscore:\n"+ highscore, style3);

            game.add.tween(king).to({x: 250}, 1000, Phaser.Easing.Linear.None, true);

            playAgain.x = 654;
            playAgain.alpha = 1;
          }
          else {
            game.add.tween(win1).to( { x: 1100 }, 2000, Phaser.Easing.Bounce.Out, true);
            game.add.tween(win2).to( { x: 850 }, 2000, Phaser.Easing.Bounce.Out, true);
            game.add.tween(win3).to( { y: 250 }, 1500, Phaser.Easing.Linear.None, true);

            winSound.play();

            scoreText = game.add.text(480, 80, "Your Score:\n"+ score +"\nBest Score:\n"+ highscore, style3);

            playAgain.x = 540;
            playAgain.alpha = 1;
          }

          playAgain.events.onInputDown.add(this.replay);
      }

      //while still playing
      else {
        updatedPots = [];
      }
    }
  }
};
