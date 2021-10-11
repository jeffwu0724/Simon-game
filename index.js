//array to store game pattern
var userClickedPattern = [];
var gamePattern = [];

//array to store color
var buttonColours = ["red", "blue", "green", "yellow"];

//level
var level = 0;
var start = false;

$(document).keypress(function(){
  if(start != true){
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }

});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  //console.log(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});




//fucntion to general random number
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  //getting random color
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //use jQuery to get the button with randomChosenColour flash
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
  //click to play sounds
  playSound(randomChosenColour)


}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()
      }, 1000);
      //userClickedPattern = [];
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}
