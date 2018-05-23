
var Load = function (game){};

Load.prototype = {
  preload: function() {
    // this.game.add.sprite(this.game.world.centerX-100, this.game.world.centerY, 'preloader');
    this.load.image('preloader', 'assets/sky.png');

    // this.anchor.setTo(0.5, 0.5);
    //
    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.load.setPreloadSprite(loader);
    //this.load.image('menu', 'assets/menu.jpg');

    // game.load.image('background', 'assets/grass.png');
    // game.load.image('menu', 'assets/potato spuds.png');
    // game.load.image('potato', 'assets/1potato.png');
    // this.load.image('creature_1', 'assets/creature_1.png');
    // this.load.image('creature_2', 'assets/creature_2.png');
    // this.load.image('creature_3', 'assets/creature_3.png');
    // this.load.image('gameover', 'assets/gameover.jpg');
  },
  create: function() {

    //this.asset.cropEnabled = false;
    // var background = this.game.add.sprite(0, 0, 'background');
    this.game.add.sprite(this.game.world.centerX-100, this.game.world.centerY, 'preloader');
    this.game.state.start('play');
  },
};
