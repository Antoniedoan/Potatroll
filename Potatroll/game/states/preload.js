
var Preload = function (game){};

Preload.prototype = {
  preload: function() {
    var loader = this.add.sprite(this.game.world.centerX-100, this.game.world.centerY, 'preloader');
    loader.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(loader);
    //this.load.image('menu', 'assets/menu.jpg');

    this.load.image('background', 'assets/grass.png');
    this.load.image('instruction', 'assets/potato_spuds.png');
    this.load.image('potato', 'assets/1potato.png');
    //this.load.image('arrow', 'assets/arrowleft.png');
    // this.load.image('creature_1', 'assets/creature_1.png');
    // this.load.image('creature_2', 'assets/creature_2.png');
    // this.load.image('creature_3', 'assets/creature_3.png');
    // this.load.image('gameover', 'assets/gameover.jpg');
  },
  create: function() {
    //this.game.add.sprite(0, 0, window.innerWidth, window.innerHeight, 'background');
  },
  update: function() {
    if(!!this.ready) {
      //this.background = this.game.add.sprite(0, 0, window.innerWidth, window.innerHeight, 'background');
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
