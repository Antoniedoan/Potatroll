var GameOver = function(game){}

var score = 0;
GameOver.prototype = {
  preload: function () {
    game.load.spritesheet('replay', 'assets/sky.png', 190, 70);
  },
  create: function () {
    game.stage.backgroundColor = 0xfff000;
    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    bg.tileScale.setTo(1, 0.16);
    var style = {
      font: "50px",
      fill: "#f49542",
      align: "center"
    };
    var roastPot = game.add.sprite(game.world.centerX + 400, game.world.centerY - 300,'roast');
    roastPot.scale.setTo(0.3,0.3);
    var scoreText = game.add.text(160, 100, "Your Score\n"+ score, style)

    var replay = game.add.button(game.world.centerX, game.world.centerY, 'replay', this.update);
    var replayText = game.add.text(18, 15, "Play Again", {font: "35px", fill: "#f49542", wordWrap: false, wordWrapWidth: replay.width});
    replay.addChild(replayText);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
