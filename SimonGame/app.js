let gameSeq = [];
let playerSeq = [];
let level = 0;
let start = false;
let highestScore = 0;
let isPlayerTurn = false;

// Accessing required elements
let h3 = document.querySelector("h3");
let divList = document.querySelectorAll(".btn");
let bdy = document.querySelector("body");
let hS = document.querySelector("#highScore");
hS.innerHTML = `Highest Score = ${highestScore}`;

// Detecting any key press to start game
document.addEventListener("keypress", function () {
  if (!start) {
    console.log("Game Started");
    start = true;
    levelUp();
  }
});

// Level up: increment level, update text, generate sequence
function levelUp() {
  playerSeq = [];
  level++;
  highScore(level);
  h3.innerText = `Level ${level}`;
  isPlayerTurn = false; // Disable player interaction

  let rand = Math.floor(Math.random() * 4);
  let randBtn = divList[rand];
  flash(randBtn);

  gameSeq.push(randBtn);

  console.dir(gameSeq);

  // Enable player turn after game sequence
  setTimeout(() => {
    isPlayerTurn = true;
  }, 1000);
}

// Flash effect for game sequence
function flash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 150);
}

// Flash effect for user selection
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 150);
}

// Event listener for user clicks
for (let btn of divList) {
  btn.addEventListener("click", btnPress);
}

// Handle user clicks
function btnPress() {
  if (!isPlayerTurn) return; // Prevent clicks during game sequence

  let btn = this;
  userFlash(btn);
  playerSeq.push(btn);

  console.dir(playerSeq);
  checkSequence(playerSeq.length - 1);
}

// Check if user sequence matches game sequence
function checkSequence(idx) {
  if (gameSeq[idx] === playerSeq[idx]) {
    if (gameSeq.length === playerSeq.length) {
      setTimeout(levelUp, 1000);
      console.log("Next level triggered.");
    }
  } else {
    h3.innerHTML = `Game Over :( <br>Your score was <b>${level}</b><br> Press any key to start again`;
    gameOver();
    reset();
  }
}

// Game over effect
function gameOver() {
  bdy.classList.add("gameOver");
  setTimeout(() => {
    bdy.classList.remove("gameOver");
  }, 200);
}

// Reset the game
function reset() {
  start = false;
  gameSeq = [];
  playerSeq = [];
  level = 0;
}

// Update highest score
function highScore(currentLevel) {
  if (currentLevel > highestScore) {
    highestScore = currentLevel;
    hS.innerHTML = `Highest Score = ${highestScore}`;
  }
}
