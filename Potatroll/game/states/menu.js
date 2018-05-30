var Menu = function(game) {}

Menu.prototype = {
  preload: function() {
    game.load.spritesheet('playButton', 'assets/grass.png', 190, 70);

  },
  create: function() {
    var menuBg = game.add.sprite(-300,0, 'instruction');
    menuBg.scale.setTo(0.25, 0.25);
    var tweenMn = game.add.tween(menuBg);
    tweenMn.to({x: this.world.centerX - 245}, 1500, 'Linear', true, 0);

    var playButton = game.add.button(this.world.centerX, this.world.centerY, 'playButton', this.update, this, 0, 1, 0);
    var btnText = game.add.text(-90, -15, "Click to Play", {font: "32px Arial", fill: "#f49542", wordWrap: false, wordWrapWidth: playButton.width});
    playButton.addChild(btnText);
    playButton.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
