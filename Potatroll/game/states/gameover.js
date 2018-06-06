var GameOver = function(game){}
WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['IM Fell English', 'Cardo', 'Comfortaa']
    }
};

var loseSound;
var score = 0;
var style4 = {
  font: "40px IM Fell English",
  fill: 0x000000,
  align: "center"
};
var roastPot1;
var roastPot2;
var countee = 0;
GameOver.prototype = {
  preload: function () {
  },

  create: function () {
    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    bg.tileScale.setTo(1, 0.16);

    loseSound = game.add.audio('lose');
    loseSound.play();
    loseSound.loopFull();
    roastPot2 = game.add.sprite(game.world.centerX + 100, -350,'roast2');
    roastPot1 = game.add.sprite(game.world.centerX + 100, -350,'roast1');

    roastPot1.scale.set(0.3);
    roastPot2.scale.set(0.3);

    var scoreText = game.add.text(200, 150, "Your Score\n"+ score, style4);

    var again = game.add.sprite(game.world.centerX + 75, game.world.centerY - 150, 'playAgain');
    again.inputEnabled = true;
    again.scale.set(0.17);
    again.events.onInputDown.add(function(){
      loseSound.stop();
      this.game.state.start('play');
    });
  },
  
  update: function() {
    countee+=1;
    console.log(counter);
    if (countee > 20){
      roastPot1.alpha = 0;
      roastPot2.alpha = 1;
      countee = 0;
    }
    else {
      roastPot1.alpha = 1;
      roastPot2.alpha = 0;
    }
  }
};
