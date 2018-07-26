// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score=-2;
var labelScore;
var player;
var count = 0;
var pipes=[];
var minGap=50;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight = 10;
var pipeEndExtraWidth= 10;
var balloons=[];
var weight=[];
var gameSpeed= -200;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.spritesheet("playerImage","../assets/playerSprite.png", 56, 29, 14);
  game.load.audio("score","../assets/point.ogg");
  game.load.image("pipeBlock","../assets/laser.png");
  game.load.image("backgroundImage","../assets/backroung.png")
  game.load.image("pipeEnd","../assets/pipeEnd.png")
  game.load.image("balloons","../assets/new piskel.png")
  game.load.image("weight","../assets/weight.png")
}

/*
 * Initialises the game. This function is only called once.
 */

function create() {
  var backgroungVelocity = - gameSpeed / 10;
  var backgroundSprite= game.add.tileSprite(0,0,790,400,"backgroundImage")
  backgroundSprite.autoScroll(-backgroungVelocity, 0);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  player=game.add.sprite(100, 200, "playerImage")
    game.physics.arcade.enable(player);
  player.x=100
  player.y=200
  labelScore = game.add.text(20, 20, "0", {fill: "orange"  });
  score=-2

  game.input.keyboard
  .addKey(Phaser.Keyboard.ENTER)
  .onDown.add(start);



}
  function start() {
    var walk = player.animations.add('walk');
    player.animations.play('walk', 30, true);

    game.input.keyboard
    .addKey(Phaser.Keyboard.ENTER)
    .onDown.remove(start);


  player.body.velocity.x = (0) ;
  player.body.gravity.y=400;
  player.anchor.setTo(0.5,0.5);

  game.input
  .keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);
  game.input
  .keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(moveLeft);
  game.input
  .keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(moveDown);
  game.input
  .keyboard.addKey(Phaser.Keyboard.P)
  .onDown.add(scorePowerUp);
  game.input
  .keyboard.addKey(Phaser.Keyboard.M)
  .onDown.add(easterEgg);

  game.input.keyboard
  .addKey(Phaser.Keyboard.N)
  .onDown
  .add(kidName);



     game.input.keyboard
     .addKey(Phaser.Keyboard.SPACEBAR)
     .onDown
     .add(playerJump);

     var pipeInterval = 1.75 * Phaser.Timer.SECOND;
     game.time.events.loop(
     pipeInterval,
     generatePipe
     );


     var puInterval = 2.00000001 * Phaser.Timer.SECOND;
     game.time.events.loop(
       puInterval,
       generate
     );


generatePipe ();
       // set the background colour of the scene
}

/*
 * This function updates the scene. It is called for every new frame.
 */





function update() {
  player.rotation = Math.atan(player.body.velocity.y / 200);
  game.physics.arcade.overlap(
player,
pipes,
gameOver);
checkBoundary();
gapChange(gapSize);
for(var i = balloons.length - 1; i >= 0; i--){
game.physics.arcade.overlap(player, balloons[i], function(){
score=score+5;
balloons[i].destroy();
balloons.splice(i, 1);
});
};
}






function gapChange(gapSize) {
  console.log(gapSize);
if(gapSize>50){
gapSize = 100 -score;
  }
}

function gameOver() {
  registerScore(score);
game.state.restart();
gameGravity= 400

}


function checkBoundary() {
  if(player.y>400)
{
if(player.y>400)
registerScore(score);
game.state.restart();
}

else if(player.y<0)
{  registerScore(score);
game.state.restart();}
}


function spaceHandler(event) {
  game.sound.play("score");
}

function changeScore () {
score=score+1
if(score>0){
labelScore.setText(score.toString())
game.sound.play("score");
}}
function  moveRight() {
  player.x=player.x+10

  }

  function  moveLeft() {
    player.x=player.x-10

    }

    function  moveUp() {
      player.y=player.y-10

      }

      function  moveDown() {
        player.y=player.y+10  }

        function scorePowerUp() {
          score=score+10;
        }
        function generatePipe() {
        var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
        addPipeEnd(width - (pipeEndExtraWidth / 2)-5, gapStart - 10);
        for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
        }
        addPipeEnd(width - (pipeEndExtraWidth / 2)-5, gapStart + gapSize);
        for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
        }
        changeScore();
        }

  //       function generatePipe() {
  // var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
  // for(var y = gapStart; y > 0; y -= blockHeight){
  // addPipeBlock(width, y - blockHeight);
  // }
  // for(var y = gapStart + gapSize; y < height; y += blockHeight) {
  // addPipeBlock(width, y);
  // }
  // changeScore();
  // }

        // calculate a random position for the gap
        //var gap = game.rnd.integerInRange(1 ,5);
        // generate the pipes, except where the gap should be
        //for (var count=0; count<8; count++) {
        //if (count != gap && count != gap+1) {
        //addPipeBlock(800, count*50);
        //}
        //}

function addPipeBlock(x, y) {
// create a new pipe block
var pipeBlock = game.add.sprite(x,y,"pipeBlock");
// insert it in the 'pipes' array
pipes.push(pipeBlock);
game.physics.arcade.enable(pipeBlock);
pipeBlock.body.velocity.x= -200;
}

function addPipeEnd(x,y) {
  var pipeEnd = game.add.sprite(x,y,"pipeEnd");
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x=-200;
}



function playerJump () {
  player.body.gravity.y= -player.body.gravity.y
}


function registerScore(score) {
  var playerName = prompt("what's your name?")
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
    jQuery("#content2").append(
           "<div>" + scoreEntry + "</div>"
    );
}

function changeGravity(g) {
gameGravity += g;
player.body.gravity.y = gameGravity;
}

function generateBalloons(){
var bonus = game.add.sprite(width, height, "balloons");
balloons.push(bonus);
game.physics.arcade.enable(bonus);
bonus.body.velocity.x = - 200;
bonus.body.velocity.y = - game.rnd.integerInRange(60, 80);
}

function generateMalus(){
var bonus = game.add.sprite(width, height, "weight");
weight.push(bonus);
game.physics.arcade.enable(bonus);
bonus.body.velocity.x = - 200;
bonus.body.velocity.y = - game.rnd.integerInRange(50, 60);
}

function generate() {
var diceRoll = game.rnd.integerInRange(1, 10);
if(diceRoll==1) {
generateBalloons();
} else if(diceRoll==11) {
generateMalus();
}}

function kidName() {
alert("His name is Vincent")
}

function easterEgg() {
  alert ("baci e abbracci, <3 <3 <3 <3 <3")
}


for(var i = balloons.length - 1; i >= 0; i--){
game.physics.arcade.overlap(player, balloons[i], function(){
alert("!");
balloons[i].destroy();
balloons.splice(i, 1);
});
};
