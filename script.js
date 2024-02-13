"use strict";
//game interface Elements DOM
const newGameButton = document.querySelector(".btn--new");
const rollDiceButton = document.querySelector(".btn--roll");
const holdScoreButton = document.querySelector(".btn--hold");
const diceEle = document.querySelector(".dice");
//player Objects with DOM selectors
const p1 = {
  cardEle: document.querySelector(".player--0"),
  currentScoreEle: document.getElementById("current--0"),
  currentScore: 0,
  totalScore: 0,
  totalScoreEle: document.getElementById("score--0"),
  activeStatus: true,
};
const p2 = {
  cardEle: document.querySelector(".player--1"),
  currentScoreEle: document.getElementById("current--1"),
  currentScore: 0,
  totalScore: 0,
  totalScoreEle: document.getElementById("score--1"),
  activeStatus: false,
};
let randomNum, activePlayer;
function init() {
  //if not first init, but being called by reset function
  if (activePlayer) {
    p1.cardEle.classList.remove("player--winner", "player--active");
    p2.cardEle.classList.remove("player--winner", "player--active");
  }
  //reset card status and only p1 should be active
  p1.cardEle.classList.add("player--active");
  p1.activeStatus = true;
  p2.activeStatus = false;

  //rest
  p1.currentScoreEle.innerText =
    p2.currentScoreEle.innerText =
    p1.totalScoreEle.innerText =
    p2.totalScoreEle.innerText =
    p1.currentScore =
    p2.currentScore =
    p1.totalScore =
    p2.totalScore =
      0;
  rollDiceButton.removeAttribute("disabled");
  holdScoreButton.removeAttribute("disabled");
  diceEle.style.visibility = "hidden";
}
init();

//GAME LOGIC
activePlayer = p1;
function isGameOver(score) {
  if (score >= 20) {
    activePlayer.totalScoreEle.innerText = score;
    console.log("game over with score : " + score);
    diceEle.style.visibility = "hidden";
    activePlayer.cardEle.classList.add("player--winner");
    rollDiceButton.disabled = true;
    holdScoreButton.disabled = true;
  }
}
function switchPlayers() {
  activePlayer.currentScoreEle.innerText = activePlayer.currentScore = 0;
  activePlayer.cardEle.classList.toggle("player--active");
  activePlayer.activeStatus = false;
  //switch active player object reference
  activePlayer == p1 ? (activePlayer = p2) : (activePlayer = p1);
  activePlayer.activeStatus = true;
  activePlayer.cardEle.classList.toggle("player--active");
}
function rollDiceHandler(e) {
  randomNum = Math.trunc(Math.random() * 6 + 1);
  console.log("random num = " + randomNum);
  diceEle.src = `./dice-${randomNum}.png`;
  diceEle.style.visibility = "visible";
  // activePlayer.currentScoreEle
  if (randomNum !== 1) {
    activePlayer.currentScore += randomNum;
    activePlayer.currentScoreEle.innerText = activePlayer.currentScore;
    isGameOver(activePlayer.totalScore + activePlayer.currentScore);
  } else {
    switchPlayers();
  }
}
function holdScoreHandler(e) {
  activePlayer.totalScore += activePlayer.currentScore;
  activePlayer.totalScoreEle.innerText = activePlayer.totalScore;
  isGameOver();
  switchPlayers();
}
rollDiceButton.addEventListener("click", rollDiceHandler);
holdScoreButton.addEventListener("click", holdScoreHandler);
newGameButton.addEventListener("click", init);

//modals
//everything modals
//seperate from game core logic, UI stuff
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const playerNamesEles = document.querySelectorAll(".name");
const btnCloseModal = document.querySelector(".close-modal");
const playerNameInput = document.getElementById("playerNameInput"); // Added for reference to the input field
let activePlayerNameEle; // Added to store the reference to the active player name element

const openModal = function () {
  playerNameInput.value = this.innerText.trim(); // Set the input value to the existing playerName
  activePlayerNameEle = this; // Store the reference to the active player name element
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  const updatedPlayerName = playerNameInput.value.trim();
  if (updatedPlayerName !== "") {
    activePlayerNameEle.innerText = updatedPlayerName; // Update only the active player name
  }

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < playerNamesEles.length; i++) {
  playerNamesEles[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Escape" || e.key === "Enter") &&
    !modal.classList.contains("hidden")
  ) {
    closeModal();
  }
});
