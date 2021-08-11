// Creation of arrays and variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

// jQuery to detect keyboard key pressed to start game
$(document).keypress(function() {
  if (!gameStart) {

    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});


// jQuery in click event
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length - 1);
});


// Chooses a random number from 0 to 3
function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  // Places the chosen color from the array into a new variable
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Variable and jQuery to make chosen button flash
  var buttonColor = "#" + randomChosenColor;
  $(buttonColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
};


// Adding sounds to button clicks
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
};


// Animates button on click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};


// Function to check for correct answer
function checkAnswer(currentLevel) {
  var currentAnswer = userClickedPattern[currentLevel];

  // If statement to check if most recent answer is the same as the game pattern
  if (currentAnswer === gamePattern[currentLevel]) {

    console.log("success");

    // If correct, if statement to check if sequence is complete and call nextSquence if so
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // else statement that changes body background, plays a sound, and changes the title if answer is wrong
  } else {
    console.log("wrong");

    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any key to Restart");

    startOver();
  }
};

// function that resets game variables and status
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
};
