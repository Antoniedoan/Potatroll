var Play = function(game){}
var bg;

var arrow1;
var swapKey;
var downKey;
//var potatoes = [potato1, potato2, potato3,potato4, potato5, potato6, potato7];
var potatoes = [];
var numOfPots = 7;
var filledPotatoes = [];
var counter=0;

var chosenPots = [];
var potID='';

var swapped = false;
var childrenPots = [];
var potDict = {};


  Play.prototype = {
    create: function() {
      // background
      game.world.setBounds(0,0, game.height-300, game.width-300);
      game.physics.startSystem(Phaser.Physics.ARCADE);

      bg = game.add.tileSprite(0, 0, game.width, game.height,'background');
      potatoes = game.add.group();
      potatoes.inputEnableChildren = true;
      swapKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      //potatoes.enableBody = true;
      //filledPotatoes = game.add.group();
      for (var i=0; i<numOfPots; i++){
        var potato = potatoes.create(game.world.centerX, 80*(i+1), 'potato');
        potato.scale.set(0.2*Math.random()+0.05);
        potato.name = 'pot'+i;
        potato.alive = false;
        potato.events.onInputDown.add(this.onClick);
        filledPotatoes.push(potato.scale.x);
        potDict[i] = potato;
        // updatedPots.push(potDict[i].scale.x);
        //potID = potato.name;


      }
      // childrenPots = potatoes.children;
      console.log(potDict);
      // console.log(updatedPots);
      // console.log(filledPotatoes);
      filledPotatoes.sort(function (a,b){
        return b-a;
      });
      //console.log(filledPotatoes);

    //   // create enemy pool
    //   this.enemy = [];
    //   for(var i = 0; i < 60; i++) {
    //     var enemy = this.enemy[i] = this.game.add.sprite(100, 400, 'creature_' + this.game.rnd.integerInRange(1, 3));
    //     this.game.physics.arcade.enable(enemy);
    //     enemy.jump_timer = 0;
    //     enemy.jump_height = 110 + (Math.random() * 260);
    //     enemy.body.collideWorldBounds = true;
    //     enemy.visible = false;
    //   }
    //
    //   // enemy related
    //   this.enemy_timer = Math.random() * 120;
    //   this.current_enemy = 0;
    //
    //   // score
    //   this.game.score = 0;
    //   this.game.score_multiplier = 0;
    //   this.score_hit = false;
    //   this.score_text = this.game.add.text(20, 20, "Score: 0\nCombo: 0", {
    //     font: "26px Arial",
    //     fill: "#ffffff",
    //     align: "left"
    // });
    //
    //   // game time
    //   this.game_time = 2750;
    //   this.game_time_text = this.game.add.text(this.game.width - 122, 20, "Time: 60", {
    //     font: "26px Arial",
    //     fill: "#ffffff",
    //     align: "left"
    // });
    },
    onClick: function(potato){
      //console.log(updatedPots);
      //console.log(potatoes);
      if (potato.tint === 0xffffff && counter < 2){
        potato.tint = 0xff0000;
        counter +=1;
        chosenPots.push(potato);
        potato.alive = true;
        console.log(potato.scale.x);
      }
      else if (potato.tint === 0xff0000 && counter <= 2){
        potato.tint = 0xffffff;
        counter-=1;
        chosenPots.pop();
        //selected = false;
        potato.alive = false;
        console.log(potato.scale.x);
      }
    },

    // sorted: function(filledPotatoes){
    //   var sorted = false;
    //   for (var i=0; i<potatoes.children.length-1; i++){
    //     if (potatoes.children[i].scale.x >= potatoes.children[i+1].scale.x){
    //       sorted = true;
    //       break;
    //     }
    //   }
    //   console.log(sorted);
    //   return sorted;
    //
    // },
    // wait: function(ms){
    //   var start = new Date().getTime();
    //   var end = start;
    //   while(end < start + ms) {
    //     end = new Date().getTime();
    //   }
    // },

    update: function() {
      bg.tilePosition.y +=1;
      var potIndex = [];
      var updatedPots = [];

      if(swapKey.isDown && chosenPots.length === 2){

        var firstPotName = chosenPots[0].name;
        var secondPotName = chosenPots[1].name;
        //console.log(firstPotName);

        var firstPotId = parseInt(firstPotName.slice(-1));
        var secondPotId = parseInt(secondPotName.slice(-1));
        //console.log(secondPotId);

        var tempPos = chosenPots[0].y;
        chosenPots[0].y = chosenPots[1].y;
        chosenPots[1].y = tempPos;

        var tempPot = potDict[firstPotId];
        potDict[firstPotId] = potDict[secondPotId];
        potDict[secondPotId] = tempPot;
        var newDict = {};
        for (var i=0; i<Object.keys(potDict).length; i++){
          newDict[i] = potDict[i];
        }
        potDict = newDict;

        console.log(potDict);
        console.log(updatedPots);
        console.log(potDict[firstPotId].name);
        console.log(potDict[secondPotId].name);
        // var tempOt = updatedPots[firstPotId].name;
        // updatedPots[firstPotId].name = 'pot'+ firstPotName.slice(-1);
        // updatedPots[secondPotId].name = 'pot' + secondPotName.slice(-1);
        //
        // var tempPot = updatedPots[firstPotId];
        // updatedPots[firstPotId] = updatedPots[secondPotId];
        // updatedPots[secondPotId] = tempPot;


        for (var j=0; j < Object.keys(potDict).length; j++){
          updatedPots.push(potDict[j].scale.x);
        }
        // var tempScaleX = updatedPots[firstPotId];
        // updatedPots[firstPotId] = updatedPots[secondPotId];
        // updatedPots[secondPotId] = tempScaleX;


        // var tempScaleY = updatedPots[firstPotId].scale.y;
        // // tempScale = updatedPots[firstPotId].scale;
        // updatedPots[firstPotId].scale.set(updatedPots[secondPotId].scale.x, updatedPots[secondPotId].scale.y);
        // updatedPots[secondPotId].scale.set(tempScaleX, tempScaleY);
        // console.log(chosenPots);
        // console.log(updatedPots[firstPotId].name);
        // console.log(updatedPots[firstPotId].scale.x);
        // console.log(updatedPots[secondPotId].name);
        // console.log(updatedPots[secondPotId].scale.x);

        console.log(updatedPots);
        // for (var i=0; i<potDict.length; i++){
        //   console.log(potDict[i].scale.x);
        // }

        // swapped = true;
        // tempPotArrPos = childrenPots[firstPotId];
        // tempName = childrenPots[firstPotId].name;
        //
        // childrenPots[firstPotId] = childrenPots[secondPotId];
        // childrenPots[firstPotId].name = childrenPots[secondPotId].name;
        //
        // childrenPots[secondPotId] = tempPotArrPos;
        // childrenPots[secondPotId].name = tempName;
        // console.log(childrenPots[firstPotId].name);
        // console.log(childrenPots[secondPotId].name);
        // tempName = firstPotName;
        // firstPotName = secondPotName;
        // secondPotName = tempName;
        //console.log(potID);
        // console.log(chosenPots[0].name);
        // console.log(chosenPots[1].name);
        //console.log(childrenPots);

        // for (var i=0; i<potatoes.children.length; i++){
        //   console.log(potatoes.children[i].scale.x);
        // }

        // for (var i=0; i<childrenPots.length; i++){
        //   if (swapped === true){
        //     //potIndex.push(i);
        //     console.log(childrenPots[i].name);
        //     swapped = false;
        //     //childrenPots[i].alive = false;
        //   }
        // }

        chosenPots[0].tint = 0xffffff;
        chosenPots[1].tint = 0xffffff;
        chosenPots = [];
        counter = 0;

        //console.log(updatedPots);
        //console.log('after:');
        //console.log(potIndex);

        //potIndex = [];
        //console.log(updatedPots);
        //console.log(potatoes.children);
        console.log(filledPotatoes);


        if (updatedPots.length === filledPotatoes.length && updatedPots.every(function(v,i) { return v === filledPotatoes[i]})){
          //console.log(filledPotatoes);
          this.game.state.start('outcome');
        }
        else {
          updatedPots = [];
        }

      }



      //this.potato.alive = false;
      //selected = false;
    //   for (var i=0; i<potatoes.children.length-1; i++){
    //     console.log(potatoes.children[i].scale.x);
    //     var sorted = false;
    //     if (potatoes.children[i].scale.x >= potatoes.children[i+1].scale.x){
    //       sorted = true;
    //       console.log(sorted);
    //       //this.game.state.start('outcome');
    //   }
    // }

    //   if (downKey.isDown) {
    //     for (var i=1; i<filledPotatoes.length+1; i++){
    //       arrow1.centerY = filledPotatoes.children[2].centerY;
    //
    //     if (arrow1.centerY === filledPotatoes.children[1].centerY){
    //       arrow1.centerY = filledPotatoes.children[2].centerY;
    //     }
    //     if (arrow1.centerY === filledPotatoes.children[2].centerY){
    //       arrow1.centerY = filledPotatoes.children[3].centerY;
    //     }
    //   }
    // }


    //     // input controls
    //     this.cursors = this.game.input.keyboard.createCursorKeys();
    //     this.jump_button = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //
    //     // smooth movement horizontally
    //     this.player.body.velocity.x *= 0.8;
    //
    //     // move player left/right
    //     if(this.cursors.left.isDown && !this.player.body.onFloor()) {
    //         this.player.body.velocity.x = -90;
    //         this.player.scale.x = 1;
    //     }
    //     else if(this.cursors.right.isDown && !this.player.body.onFloor()) {
    //         this.player.body.velocity.x = 90;
    //         this.player.scale.x = -1;
    //     }
    //
    //     // player jump
    //     if(this.player.body.onFloor() && this.game.time.now > this.player.jump_timer) {
    //         this.player.body.velocity.y = -460;
    //         this.player.jump_timer = this.game.time.now + 2250;
    //
    //         // keep track of hitting enemies per jump
    //         if(this.score_hit == false) {
    //           this.game.score_multiplier = 0;
    //           this.score_text.setText("Score: " + this.game.score + "\nCombo: "+ this.game.score_multiplier);
    //         } else
    //         {
    //           this.score_hit = false;
    //         }
    //     }
    //
    //     // enemy jump
    //     for(var i = 0; i < this.enemy.length; i++) {
    //       var enemy = this.enemy[i];
    //       if(enemy.body.onFloor() && enemy.live && this.game.time.now > enemy.jump_timer) {
    //         enemy.body.velocity.y = -enemy.jump_height;
    //         enemy.jump_timer = this.game.time.now + 1860;
    //       }
    //
    //       if(enemy.body.onFloor() && enemy.live) {
    //         enemy.body.velocity.x = 0;
    //       }
    //
    //       if(!enemy.body.onFloor() && enemy.live) {
    //         enemy.direction == "right" ? enemy.body.velocity.x = 80 : enemy.body.velocity.x = -80;
    //       }
    //     }
    //
    //     // enemy collides
    //     var count = this.enemy.length;
    //     for(var i = 0; i < count; i++) {
    //       var boundsA = this.enemy[i].getBounds();
    //       var boundsB = this.player.getBounds();
    //
    //       if(Phaser.Rectangle.intersects(boundsA, boundsB) && this.enemy[i].visible == true) {
    //         this.onCollide(this.enemy[i], this.player);
    //       }
    //     }
    //
    //     // enemy reset
    //     this.enemy_timer--;
    //     if(this.enemy_timer < 0) {
    //       this.reset_enemy();
    //       this.enemy_timer = 50 + Math.random() * 200;
    //     }
    //
    //     // game time
    //     this.game_time--;
    //     this.game_time_text.setText("Time: " + parseInt(this.game_time / 60));
    //     if(this.game_time < 0) {
    //       this.game.state.start('gameover');
    //     }
    // },
    //
    // // invoked when a collision occurs between a player and an enemy
    // onCollide: function(enemy, player) {
    //   if(player.y < 420) {
    //     enemy.x = 0;
    //     enemy.y = 0;
    //     enemy.visible = false;
    //
    //     // score related
    //     this.game.score_multiplier++;
    //     this.game.score += (2 * this.game.score_multiplier);
    //     this.score_text.setText("Score: " + this.game.score + "\nCombo: "+ this.game.score_multiplier);
    //     this.score_hit = true;
    //   }
    // },
    //
    // // reset an enemy to a starting position (left or right)
    // reset_enemy: function() {
    //   var enemy = this.enemy[this.current_enemy];
    //   enemy.y = 300;
    //
    //   // appear left or right
    //   var left_or_right = this.game.rnd.integerInRange(0, 1);
    //   if(left_or_right == 0) {
    //     enemy.body.x = 30;
    //     enemy.direction = "right";
    //   } else {
    //     enemy.body.x = this.game.width - 70;
    //     enemy.direction = "left";
    //   }
    //
    //   // iterate over the object pool - reusing enemies where possible
    //   this.current_enemy++;
    //   if(this.current_enemy > this.enemy.length - 1) {
    //     this.current_enemy = 0;
    //   }
    //
    //   enemy.visible = true;
    //   enemy.live = true;
    }
  };
