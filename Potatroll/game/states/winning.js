
var Winning = function(game){}

Winning.prototype = {
  preload: function () {

  },
  create: function () {
    game.stage.backgroundColor = 0xffff00;
    // this.score_text = this.game.add.text(this.game.world.centerX, 325, this.game.score, { font: '32px Arial', fill: '#ffffff', align: 'center'});
    // this.score_text.anchor.setTo(0.5, 0.5);
    var replay = game.add.button(game.world.centerX, game.world.centerY, 'background', this.update);
    //var replayText = game.add.text();
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
