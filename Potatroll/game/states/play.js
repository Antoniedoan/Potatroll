var Play = function(game){}

//declare variables
var bg;
var swapKey;

var potatoes = [];
var numOfPots = 7;
var sortedPotatoes = [];
var counter=0;

var chosenPots = [];
var potID='';

var position_potato = {};
var potatoName_position = {};

 Play.prototype = {
   create: function() {

     game.world.setBounds(0,0, game.height-300, game.width-300);
     game.physics.startSystem(Phaser.Physics.ARCADE);

     bg = game.add.tileSprite(0, 0, game.width, game.height,'background');
     potatoes = game.add.group();
     potatoes.inputEnableChildren = true;
     swapKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
     potatoes.enableBody = true;

     //creating a group of potatoes
     for (var i=0; i<numOfPots; i++){
       var potato = potatoes.create(game.world.centerX, 80*(i+1), 'potato');
       potato.scale.set(0.2*Math.random()+0.05);
       potato.name = 'pot'+i;
       potato.events.onInputDown.add(this.onClick);

       //used for comparison
       sortedPotatoes.push(potato.scale.x);

       //create maps of potato names and their positions
       position_potato[i] = potato;
       potatoName_position[potato.name] = i;
     }

     //sort scales descendingly
     sortedPotatoes.sort(function (a,b){
       return b-a;
     });

   },

   onClick: function(potato){
     if (potato.tint === 0xffffff && counter < 2){
       potato.tint = 0xff0000;
       counter +=1;
       chosenPots.push(potato);
       //console.log(potato.name);
     }
     else if (potato.tint === 0xff0000 && counter <= 2){
       potato.tint = 0xffffff;
       counter-=1;
       chosenPots.pop();
       //console.log(potato.name);
     }
   },

   update: function() {
     //scrolling background
     bg.tilePosition.y +=1;

     //var for constantly checking scale values
     var updatedPots = [];

     if(swapKey.isDown && chosenPots.length === 2){

       var firstPotName = chosenPots[0].name;
       var secondPotName = chosenPots[1].name;
       // console.log("first name " + firstPotName);
       // console.log("second name " + secondPotName);

       var firstPosition = potatoName_position[firstPotName];
       var secondPosition = potatoName_position[secondPotName];
       // console.log("first position " + firstPosition);
       // console.log("second position " + secondPosition);

       var tempPos = chosenPots[0].y;
       chosenPots[0].y = chosenPots[1].y;
       chosenPots[1].y = tempPos;

       var tempPot = position_potato[firstPosition];
       position_potato[firstPosition] = position_potato[secondPosition];
       position_potato[secondPosition] = tempPot;

       for (var j=0; j < Object.keys(position_potato).length; j++){
         updatedPots.push(position_potato[j].scale.x);
       }

       for (var g = 0 ; g < Object.keys(position_potato).length ; g++){
           potatoName_position[position_potato[g].name] = g;
       }

       // console.log(updatedPots);
       // console.log(filledPotatoes);

       //reset conditions
       chosenPots[0].tint = 0xffffff;
       chosenPots[1].tint = 0xffffff;
       chosenPots = [];
       counter = 0;

       //check winning
       if (updatedPots.length === sortedPotatoes.length && updatedPots.every(function(v,i) { return v === sortedPotatoes[i]})){
         //console.log(filledPotatoes);
         this.game.state.start('outcome');
       }
       else {
         updatedPots = [];
       }

     }

   }
 };
