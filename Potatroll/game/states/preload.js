
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
    this.load.image('instruction2', 'assets/sorting game background-02.jpg');
    this.load.image('potato', 'assets/1potato.png');
    this.load.image('invisible', 'assets/transparentbg.png');
    this.load.image('roast', 'assets/roast.png');

    //add audio
    this.load.audio('bgMusic', 'assets/bodenstaendig.mp3');
    this.load.audio('swapSound', 'assets/Mario_jump.mp3');

    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
