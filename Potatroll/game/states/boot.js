var Boot = function (game){};

Boot.prototype = {
  preload: function() {
    // this.load.image('preloader', 'assets/cutlass.png');
  },
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //this.game.scale.refresh();

    // this.game.add.sprite(this.game.world.centerX-100, this.game.world.centerY, 'preloader');
    this.game.input.maxPointers = 1;

    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('preload');
  }
};
