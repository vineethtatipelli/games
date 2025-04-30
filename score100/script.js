"use strict";

const current1Elem = document.querySelector("#current1");
const current2Elem = document.querySelector("#current2");
const score1Elem = document.querySelector("#score1");
const score2Elem = document.querySelector("#score2");
const player1Elem = document.querySelector(".player1");
const player2Elem = document.querySelector(".player2");
const newbtn = document.querySelector(".btn-new");
const rollbtn = document.querySelector(".btn-roll");
const holdbtn = document.querySelector(".btn-hold");
const image = document.querySelector(".dice-img");

let playing; // boolean for stop or continue playing
let activePlayer; // present playing player i.e active player
let currentScore; // it is current score of the active player
let scores; // array contains score of the two players

// initial conditions
activePlayer = 1;
playing = true;
image.classList.add("hidden");
currentScore = 0;
score1Elem.textContent = 0;
score2Elem.textContent = 0;
scores = [0, 0];

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current${activePlayer}`).textContent = 0;
  if (activePlayer === 1) {
    activePlayer = 2;
  } else {
    activePlayer = 1;
  }
  player1Elem.classList.toggle("player-active");
  player2Elem.classList.toggle("player-active");
};

const playerWin = function () {
  document.querySelector(`.win${activePlayer}`).classList.remove("hidden");
  playing = false;
};

const buttonroll = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    image.classList.remove("hidden");
    image.src = `${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.querySelector(`#current${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const buttonhold = function () {
  if (playing) {
    scores[activePlayer - 1] += currentScore;
    document.querySelector(`#score${activePlayer}`).textContent =
      scores[activePlayer - 1];
    document.querySelector(`#current${activePlayer}`).textContent = 0;
    if (scores[activePlayer - 1] >= 100) {
      playerWin();
    } else {
      switchPlayer();
    }
  }
};

const buttonnew = function () {
  playing = true;
  player1Elem.classList.add("player-active");
  player2Elem.classList.remove("player-active");
  console.log(playing);
  image.classList.add("hidden");
  // document.querySelector(".win").classList.add("hidden");
  document.querySelector(".win1").classList.add("hidden");
  document.querySelector(".win2").classList.add("hidden");
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 1;
  score1Elem.textContent = 0;
  score2Elem.textContent = 0;
  current1Elem.textContent = 0;
  current2Elem.textContent = 0;
};

rollbtn.addEventListener("click", buttonroll);

holdbtn.addEventListener("click", buttonhold);

newbtn.addEventListener("click", buttonnew);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    buttonhold();
  } else if (e.key === " ") {
    buttonroll();
  } else if (e.key === "Escape") {
    buttonnew();
  }
  console.log(e.key);
});
