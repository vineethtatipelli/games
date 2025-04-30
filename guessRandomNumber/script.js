"use strict";

let secretNum = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

const clicked = function () {
  // this function is for check button
  const guessed = Number(document.querySelector(".guessedvalue").value);
  // if no input is given
  if (!guessed) {
    document.querySelector(".guessline").textContent =
      "you didnot guess any number";
  }
  // if player wins
  else if (guessed === secretNum) {
    document.querySelector(".guessline").textContent = "HEY! You guessed it!";
    document.querySelector(".number").textContent = secretNum;
    document.querySelector("body").style.backgroundColor = "rgb(73, 231, 73)";
    document.querySelector(".number").style.width = "140px";
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  // if the guessed number is lower
  else if (guessed < secretNum && guessed > 0) {
    score--;
    if (score > 0) {
      document.querySelector(".guessline").textContent = "It's too low...";
      document.querySelector(".yourscore").textContent = score;
    } else {
      document.querySelector(".guessline").textContent = "You lost!";
      document.querySelector(".yourscore").textContent = 0;
    }
  }
  // if the guessed number is higher
  else if (guessed > secretNum && guessed < 20) {
    score--;
    if (score > 0) {
      document.querySelector(".guessline").textContent = "It's too high...";
      document.querySelector(".yourscore").textContent = score;
    } else {
      document.querySelector(".guessline").textContent = "You lost!";
      document.querySelector(".yourscore").textContent = 0;
    }
  }
  // if the guessed number is not in the range
  else {
    document.querySelector(".guessline").textContent =
      "Guess between 1 and 20 only";
  }
};

document.querySelector(".check").addEventListener("click", clicked); // if check button is clicked

const againClicked = function () {
  // this function is for again button
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".guessline").textContent = "Start guessing....";
  document.querySelector(".yourscore").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guessedvalue").value = "";
  document.querySelector("body").style.backgroundColor = "rgb(207, 177, 177)";
  document.querySelector(".number").style.width = "70px";
};

document.querySelector(".again").addEventListener("click", againClicked); // if again button is pressed

// here we added two features that if enter key is pressed then check button is pressed and escape key is pressed then again button is pressed...

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    clicked();
  }
  if (e.key === "Escape") {
    againClicked();
  }
});
