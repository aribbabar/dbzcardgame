import { allCharacters } from "./characters.js";

const startGame = () => {
  gameLogic();
};

const gameLogic = () => {
  let characters = [...allCharacters];
  characters = shuffle(characters);

  let enemyCard;

  // Pick an enemy card whose power level is at least 5
  for (let character of characters) {
    if (character.getPowerLevel() >= 5) {
      enemyCard = character;
      characters.splice(characters.indexOf(character), 1);
      break;
    }
  }

  let playerCards = [];

  // Pick a player card such that at least one has a power level that is great than or equal to the enemy card's power level
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].getPowerLevel() >= enemyCard.getPowerLevel()) {
      playerCards.push(characters[i]);
      characters.splice(i, 1);
      break;
    }
  }

  // Pick the remaining two player cards
  for (let i = 0; i < 2; i++) {
    let randomInt = getRandomInt(characters.length);
    playerCards.push(characters[randomInt]);
    characters.splice(randomInt, 1);
  }

  // Update enemy card image and text
  const enemyCardDiv = document.querySelector(".enemy .cards .card");
  enemyCardDiv.style.backgroundImage = enemyCard.getBackgroundUrl();
  enemyCardDiv.innerHTML = `<h1>${enemyCard.getName()}</h1>`;

  // Update player cards
  const playerCardsDivs = document.querySelectorAll(".player .cards .card");

  for (let i = 0; i < 3; i++) {
    playerCardsDivs[i].style.backgroundImage =
      playerCards[i].getBackgroundUrl();
    playerCardsDivs[i].innerHTML = `<h1>${playerCards[i].getName()}</h1>`;
  }

  // Add event listeners
  playerCardsDivs.forEach((card) => {
    // Arguments
    card.enemyCardDiv = enemyCardDiv;
    card.enemyCard = enemyCard;
    card.playerCardsDivs = playerCardsDivs;
    card.playerCards = playerCards;

    card.addEventListener("click", handleClick);
  });
};

const handleClick = (e) => {
  let card = e.currentTarget;
  let enemyCardDiv = e.currentTarget.enemyCardDiv;
  let enemyCard = e.currentTarget.enemyCard;
  let playerCardsDivs = e.currentTarget.playerCardsDivs;
  let playerCards = e.currentTarget.playerCards;

  const nextBtn = document.querySelector(".next-btn");

  nextBtn.style.display = "block";

  nextBtn.selectedCard = card;

  nextBtn.addEventListener("click", handleNextBtnClick);

  // Change enemy card's text to power level
  enemyCardDiv.innerHTML = `<h1>${enemyCard.getPowerLevel()}</h1>`;

  // Change player card's text to power level
  for (let i = 0; i < 3; i++) {
    playerCardsDivs[i].innerHTML = `<h1>${playerCards[i].getPowerLevel()}</h1`;
  }

  card.style.transform = "translateY(-10px)";

  let enemyHealth = document.querySelector(".enemy .health");
  let enemyHealthBar = document.querySelector(".enemy .health-bar");

  let playerHealth = document.querySelector(".player .health");
  let playerHealthBar = document.querySelector(".player .health-bar");

  // The player's card has a larger power level
  if (enemyCard.getPowerLevel() < parseInt(card.firstChild.innerHTML)) {
    let healthLost =
      parseInt(card.firstChild.innerHTML) - parseInt(enemyCard.getPowerLevel());

    enemyHealth.innerHTML = parseInt(enemyHealth.innerHTML) - healthLost;

    let width = (parseInt(enemyHealth.innerHTML) / 10) * 100;
    enemyHealthBar.style.width = width + "%";

    enemyCardDiv.style.animation = "red-fade-out 0.5s";

    setTimeout(() => {
      enemyCardDiv.style.animation = "";
    }, 500);
  } else if (enemyCard.getPowerLevel() > parseInt(card.firstChild.innerHTML)) {
    let healthLost =
      parseInt(enemyCard.getPowerLevel()) - parseInt(card.firstChild.innerHTML);

    playerHealth.innerHTML = parseInt(playerHealth.innerHTML) - healthLost;

    let width = (parseInt(playerHealth.innerHTML) / 10) * 100;
    playerHealthBar.style.width = width + "%";

    card.style.animation = "red-fade-out 0.5s";

    setTimeout(() => {
      card.style.animation = "";
    }, 500);
  }

  const playAgainBtn = document.querySelector(".play-again-btn");

  // Arguments
  playAgainBtn.card = card;
  playAgainBtn.enemyHealth = enemyHealth;
  playAgainBtn.playerHealth = playerHealth;
  playAgainBtn.enemyHealthBar = enemyHealthBar;
  playAgainBtn.playerHealthBar = playerHealthBar;

  if (parseInt(enemyHealth.innerHTML) <= 0) {
    enemyHealth.innerHTML = 0;
    enemyHealthBar.style.width = "0";

    document.querySelector(".winning-screen h1").innerHTML = "You Win!";
    document.querySelector(".winning-screen").style.display = "flex";

    playAgainBtn.addEventListener("click", handlePlayAgainBtnClick);
  } else if (parseInt(playerHealth.innerHTML) <= 0) {
    playerHealth.innerHTML = 0;
    playerHealthBar.style.width = "0";

    document.querySelector(".winning-screen h1").innerHTML = "Enemy Wins!";
    document.querySelector(".winning-screen").style.display = "flex";

    playAgainBtn.addEventListener("click", handlePlayAgainBtnClick);
  }

  playerCardsDivs.forEach((card) => {
    card.removeEventListener("click", handleClick);
  });
};

const handleNextBtnClick = (e) => {
  const card = e.currentTarget.selectedCard;

  gameLogic();

  e.currentTarget.style.display = "none";
  card.style.transform = "";
};

const handlePlayAgainBtnClick = (e) => {
  const card = e.currentTarget.card;
  const enemyHealth = e.currentTarget.enemyHealth;
  const playerHealth = e.currentTarget.playerHealth;
  const enemyHealthBar = e.currentTarget.enemyHealthBar;
  const playerHealthBar = e.currentTarget.playerHealthBar;

  // Reset selected card's transform
  card.style.transform = "";

  // Reset health
  enemyHealth.innerHTML = 10;
  playerHealth.innerHTML = 10;

  // Reset health bar
  enemyHealthBar.style.width = "100%";
  playerHealthBar.style.width = "100%";

  // Restart Game
  gameLogic();

  // Remove the winning screen
  document.querySelector(".winning-screen").style.display = "none";

  // Remove the next btn
  document.querySelector(".next-btn").style.display = "none";
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export { startGame };
