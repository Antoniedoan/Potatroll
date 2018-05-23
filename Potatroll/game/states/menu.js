
var Menu = function(game) {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var gameMenu = this.game.add.sprite(100, 100, 'menu');
    gameMenu.anchor.setTo(0.5, 0.5);
    var playButton = this.game.add.button(200, 300, 'playButton', this.update, this);
    playButton.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }
  }
};
