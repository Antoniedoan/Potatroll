var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'Potatroll');

//global variables

  // Game States
game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('menu', Menu);
game.state.add('play', Play);
game.state.add('gameover', GameOver);

game.state.start('boot');
