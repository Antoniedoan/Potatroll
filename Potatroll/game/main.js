var game = new Phaser.Game(window.innerWidth/2 - 200, window.innerHeight/2, Phaser.AUTO, 'Potatroll');

//global variables

  // Game States
game.state.add('boot', Boot);
game.state.add('load', Load);
  // game.state.add('gameover', require('./states/gameover'));
// game.state.add('menu', Menu);
//game.state.add('play', Play);

game.state.start('boot');
