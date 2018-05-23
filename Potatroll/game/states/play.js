'use strict';
var Play = function(game) {}

var player;
var potatoes;

var cursors;

var stars;
var score = 0;
var scoreText;

Play.prototype = {
    create: function() {


        // game.world.setBounds(0, 0, 1400, 1400);
        // game.camera.x += 50;

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        // The player and its settings
        player = game.add.sprite(400, 300, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        // player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        potatoes = game.add.group();
        potatoes.enableBody = true;

        for (var i = 0; i < 8; i++) {

            var potat = potatoes.create(i * 70, 0, 'potato');

            var scaleFactor = Math.random() * 0.4;
            potat.scale.setTo(scaleFactor, scaleFactor);

            potat.body.velocity.x = (1 - scaleFactor) * 50;

        }

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(player);
    },

    update: function() {
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        } else {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        if (cursors.up.isDown) {
            //  Move up
            player.body.velocity.y = -150;

            // player.animations.play('left');
        } else if (cursors.down.isDown) {
            //  Move down
            player.body.velocity.y = 150;

            // player.animations.play('right');
        } else {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        game.physics.arcade.collide(potatoes);
    },


};

// module.exports = Play;
