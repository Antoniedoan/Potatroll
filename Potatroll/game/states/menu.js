var Menu = function(game) {}

var clicked = false;
Menu.prototype = {
  preload: function() {
    // game.load.spritesheet('circle1', '/assets/grass.png', 190, 70);
    // game.load.spritesheet('circle2', '/assets/grass.png', 190, 70);
  },
  create: function() {
    var intro2 = game.add.sprite(0, 0, 'instruction2');
    var intro1 = game.add.sprite(0, 0, 'instruction1');
    intro1.scale.setTo(0.314, 0.3);
    intro2.scale.setTo(0.314, 0.3);

    var invisiblebg = game.add.sprite(this.world.centerX - 37, this.world.centerY + 5, 'invisible');
    //invisiblebg.anchor.setTo(0.02, 0.02);
    invisiblebg.scale.setTo(0.35, 0.45);
    invisiblebg.alpha = 0;
    //invisiblebg.tint = 0x000000;
    invisiblebg.inputEnabled = true;

    invisiblebg.events.onInputDown.add(function(){
      if(clicked === false){
        intro1.destroy();
        clicked = true;
      } else{
        this.game.state.start('play');
      }
    });
  },

  update: function() {

  }
};
