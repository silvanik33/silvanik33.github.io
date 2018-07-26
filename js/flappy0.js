// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score=-2;
var labelScore;
var player
var count = 0;
var gapStart = game.rnd.integerInRange(1, 6);
var pipes=[];




/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImage","../assets/pixel art  for game.png");
  game.load.audio("score","../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipes(1).png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {


  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.text(335,200,"Good luck!",{font: "30px Times New Roman", fill: "#2a9b01"});
  game.stage.setBackgroundColor("#42d7f4");
  player=game.add.sprite(100, 200, "playerImage")
  player.x=100
  player.y=200
  labelScore = game.add.text(20, 20, "0");
  score=-2;
  game.physics.arcade.enable(player);
  player.body.velocity.x =0;
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

     game.input.keyboard
     .addKey(Phaser.Keyboard.SPACEBAR)
     .onDown
     .add(playerJump);

     var pipeInterval = 1.75 * Phaser.Timer.SECOND;
     game.time.events.loop(
     pipeInterval,
     generatePipe
     );

generatePipe ();
       // set the background colour of the scene
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  player.rotation += 1;
  game.physics.arcade.overlap(
player,
pipes,
gameOver);
checkBoundary();

}

function gameOver() {
  registerScore(score);
game.state.restart();

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
          score=score+500
        }

        function generatePipe() {
        // calculate a random position for the gap
        var gap = game.rnd.integerInRange(1 ,5);
        // generate the pipes, except where the gap should be
        for (var count=0; count<8; count++) {
        if (count != gap && count != gap+1) {
        addPipeBlock(800, count*50);
        }
        }
        changeScore();
        }

function addPipeBlock(x, y) {
// create a new pipe block
var pipeBlock = game.add.sprite(x,y,"pipeBlock");
// insert it in the 'pipes' array
pipes.push(pipeBlock);
game.physics.arcade.enable(pipeBlock);
pipeBlock.body.velocity.x= -200
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
