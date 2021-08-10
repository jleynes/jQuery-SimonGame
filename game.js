// Creation of arrays
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

// jQuery in click event
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});

// jQuery to detect keyboard key pressed
$(document).keypress(function() {
  if (!gameStart) {

    $("#level-title").text("Level 0");
    nextSequence();
    gameStart = true;
  }
});

// Chooses a random number from 0 to 3
function nextSequence() {
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

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  },100);
};
