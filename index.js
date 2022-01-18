import * as game from "/game.js";

const startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click", () => {
  const instructions = document.querySelector(".instructions");
  instructions.style.display = "none";

  const game = document.querySelector(".game");
  game.style.display = "block";

  game.startGame();
});

game.startGame();
