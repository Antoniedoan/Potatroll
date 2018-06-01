
var Preload = function (game){};

Preload.prototype = {
  preload: function() {
    var loader = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader');
    loader.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(loader);

    //add images
    this.load.image('background', 'assets/sorting game background tiled.png');
    this.load.image('instruction1', 'assets/sorting game background-01.jpg');
    this.load.image('instruction2', 'assets/sorting game background-02-02.jpg');
    this.load.image('potato', 'assets/1potato.png');
    this.load.image('invisible', 'assets/transparentbg.png');
    this.load.image('roast', 'assets/roast.png');
    this.load.image('roast1', 'assets/roast1.png');
    this.load.image('roast2', 'assets/roast2.png');
    this.load.image('win3', 'assets/for3.png');
    this.load.image('win1', 'assets/axe.png');
    this.load.image('win2', 'assets/grenadier.png');
    this.load.image('king', 'assets/Potato King.png');
    this.load.image('playAgain', 'assets/replay button.png');

    //google fonts
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    //add audio
    this.load.audio('bgMusic', 'assets/bodenstaendig.mp3');
    this.load.audio('swapSound', 'assets/booing.mp3');
    this.load.audio('win', 'assets/tada.mp3');
    this.load.audio('winHighscore', 'assets/ovation.mp3');
    this.load.audio('lose', 'assets/fire.mp3');

  },
  create: function() {

  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
