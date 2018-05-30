var Play = function(game) {}

//declare variables
var bg;
var swapKey;

var potatoes = [];
var numOfPots = 7;
var sortedPotatoes = [];
var counter = 0;

var chosenPots = [];
var potID = '';

var position_potato = {};
var potatoName_position = {};
var stepText;
var steps = numOfPots - 1;
var score = 0;

// WebFontConfig = {
//     //  'active' means all requested fonts have finished loading
//     //  We set a 1 second delay before calling 'createText'.
//     //  For some reason if we don't the browser cannot render the text the first time it's created.
//     active: function() { game.time.events.add(Phaser.Timer.SECOND, this.createText, this); },
//
//     //  The Google Fonts we want to load (specify as many as you like in the array)
//     google: {
//       families: ['Finger Paint']
//     }
//
// };

Play.prototype = {
  preload: function() {
    //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  },

  create: function() {

    game.world.setBounds(0, 0, game.height - 300, game.width - 300);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    potatoes = game.add.group();
    potatoes.inputEnableChildren = true;
    swapKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    potatoes.enableBody = true;

    var style = {
      font: "28px",
      fill: "#fff"
    };
    stepText = game.add.text(450, 40, "Step:\t" + steps, style);
    stepText.anchor.set(0.5);
    stepText.inputEnabled = true;
    stepText.events.onInputOver.add(this.over);
    stepText.events.onInputOut.add(this.out);

    //creating a group of potatoes
    for (var i = 0; i < numOfPots; i++) {
      var potato = potatoes.create(game.world.centerX, 80 * (i + 1), 'potato');
      var scaleFactor = 0.2 * Math.random() + 0.05;
      potato.scale.set(scaleFactor);
      potato.name = 'pot' + i;
      potato.events.onInputDown.add(this.onClick);
      potato.body.velocity.y = -(1 - scaleFactor) * 10;
      // potato.body.collideWorldBounds = true;
      // potato.checkWorldBounds = true;
      // potato.events.onOutOfBounds.add(function(){
      //     alert('Game over!');
      //     location.reload();
      // }, this);
      //used for comparison
      sortedPotatoes.push(potato.scale.x);

      //create maps of potato names and their positions
      position_potato[i] = potato;
      potatoName_position[potato.name] = i;
    }

    //sort scales descendingly
    sortedPotatoes.sort(function(a, b) {
      return b - a;
    });


  },
  over: function(item) {
    var grd = stepText.context.createLinearGradient(0, 0, 0, stepText.height);

    //  Add in 2 color stops
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#a3d3e6');
    item.fill = grd;

  },
  out: function(item){
    item.fill = "#fff";
  },

  onClick: function(potato) {
    if (potato.tint === 0xffffff && counter < 2) {
      potato.tint = 0xff0000;
      counter += 1;
      chosenPots.push(potato);
      //console.log(potato.name);
    } else if (potato.tint === 0xff0000 && counter <= 2) {
      potato.tint = 0xffffff;
      counter -= 1;
      chosenPots.pop();
      //console.log(potato.name);
    }
  },

  update: function() {
    //scrolling background
    bg.tilePosition.y += 1;

    //var for constantly checking scale values
    var updatedPots = [];

    if (swapKey.isDown && chosenPots.length === 2) {

      var firstPotName = chosenPots[0].name;
      var secondPotName = chosenPots[1].name;
      // console.log("first name " + firstPotName);
      // console.log("second name " + secondPotName);

      var firstPosition = potatoName_position[firstPotName];
      var secondPosition = potatoName_position[secondPotName];
      // console.log("first position " + firstPosition);
      // console.log("second position " + secondPosition);

      //swapping y positions of selected potatoes
      var tempPos = chosenPots[0].y;
      chosenPots[0].y = chosenPots[1].y;
      chosenPots[1].y = tempPos;

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
      steps--;
      stepText.setText("Step:\t" + steps);

      //check winning
      if (updatedPots.length === sortedPotatoes.length && updatedPots.every(function(v, i) {
          return v === sortedPotatoes[i]
        }) && steps >=0) {
        //console.log(filledPotatoes);
          steps = numOfPots - 1;
          this.game.state.start('winning');
      }
      //check losing
      else if (steps === 0 && !(updatedPots.every(function(v, i) {
          return v === sortedPotatoes[i]
        }))) {
          steps = numOfPots - 1;
          this.game.state.start('menu');
      }
      //while playing
      else {
        updatedPots = [];
      }
    }
  }
};
