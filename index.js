let randomCharacters = Array.from(generateRandomCharacters(4));
let cards = generateCards(randomCharacters);

// Append enemy cards
document.getElementById("enemy-cards").appendChild(cards[0]);

for(let i = 1;i < cards.length;i++) {
    // Add an event listener to each player card
    cards[i].addEventListener("click", cardOnClick);

    // Append each player card to the player cards container
    document.getElementById("player-cards").appendChild(cards[i]);
}

// Add event listener for the next button
let nextBtn = document.getElementById("middle-btn");

nextBtn.addEventListener("click", nextBtnClick);

function nextBtnClick() {
    addEventListeners();

    nextBtn.style.display = "none";
}

function addEventListeners() {
    let playerCardsContainer = document.getElementById("player-cards");
    let enemyCardContainer = document.getElementById("enemy-cards");

    // Generate new characters
    randomCharacters = Array.from(generateRandomCharacters(4));

    // Generate new cards (divs) with the newly generated characters
    cards = generateCards(randomCharacters);

    // Remove all player cards
    while(playerCardsContainer.firstChild) {
        playerCardsContainer.removeChild(playerCardsContainer.firstChild);
    }

    // Remove enemy card
    enemyCardContainer.removeChild(enemyCardContainer.firstChild);

    // Append enemy cards
    enemyCardContainer.appendChild(cards[0]);

    for(let i = 1;i < cards.length;i++) {
        // Add an event listener to each player card
        cards[i].addEventListener("click", cardOnClick);

        // Append each player card to the player cards container
        document.getElementById("player-cards").appendChild(cards[i]);
    }
}

/**
 * All of the onClick event logic goes here
 * @param {Event} e 
 */
function cardOnClick(e) {
    let characterName;

    // This is for handling whether player clicks on the actual div or the character name
    if(e.target.firstChild.innerHTML) {
        characterName = e.target.firstChild.innerHTML;
    } else {
        characterName = e.target.innerHTML;
    }

    let index = findCharacterIndex(characterName);
    
    compareCharacters(index);
    removeEventListeners();

    nextBtn.style.display = "block";
}

/**
 * Removes all event listeners from the cards array
 */
function removeEventListeners() {
    for(let i = 1;i < cards.length;i++) {
        cards[i].removeEventListener("click", cardOnClick);
    }
}

/**
 * Finds and returns a character index from the randomCharacters array
 * @param {String} characterName 
 * @returns Character index
 */
function findCharacterIndex(characterName) {
    for(let i = 0;i < randomCharacters.length;i++) {
        if(randomCharacters[i].getName() == characterName) {
            return i;
        }
    }
}

/**
 * Compares the enemy character with the "index" player character
 * @param {Number} index 
 */
function compareCharacters(index) {
    let playerPowerLevel = randomCharacters[index].getPowerLevel();
    let enemyPowerLevel = randomCharacters[0].getPowerLevel();

    let playerHealth = document.getElementById("player-health");
    let enemyHealth = document.getElementById("enemy-health");

    let playerHealthText = document.getElementById("player-health-text");
    let enemyHealthText = document.getElementById("enemy-health-text");

    changeTextToPowerLevel();


    if(playerPowerLevel > enemyPowerLevel) {
        // Player wins: Enemy loses health
        let newEnemyHealth = enemyHealthText.innerHTML - (playerPowerLevel - enemyPowerLevel);

        enemyHealth.style.width = (newEnemyHealth / 10) * 100 + "%";

        enemyHealthText.innerHTML = newEnemyHealth;
    } else if(playerPowerLevel < enemyPowerLevel) {
        // Enemey wins: Player loses health
        let newPlayerHealth = playerHealthText.innerHTML - (enemyPowerLevel - playerPowerLevel);

        playerHealth.style.width = (newPlayerHealth / 10) * 100 + "%";

        playerHealthText.innerHTML = newPlayerHealth;
    }

    if(playerHealthText.innerHTML <= 0) {
        alert("ENEMY WINS!");
        location.reload();
    } else if(enemyHealthText.innerHTML <= 0) {
        alert("PLAYER WINS!");
        location.reload();
    }
}

/**
 * Changed the card text from character names to their power levels
 */
function changeTextToPowerLevel() {
    for(let i = 0;i < cards.length;i++) {
        console.log(cards[i].firstChild.className);
        cards[i].firstChild.className = "large-font-size";
        cards[i].firstChild.innerHTML = randomCharacters[i].getPowerLevel();
    }
}

/**
 * Generates an array of random character cards
 * @param {Array} randomCharacters 
 * @returns An array of random character cards
 */
function generateCards(randomCharacters) {
    let cards = new Array();

    for(let i = 0;i < randomCharacters.length;i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.style.backgroundImage = randomCharacters[i].getBackgroundUrl();

        let cardTitle = document.createElement("h1");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = randomCharacters[i].getName();

        card.appendChild(cardTitle);

        cards.push(card);
    }

    return cards;
}

/**
 * Generates random characters
 * @param {Number} numOfCharacters Integer
 * @returns {Set} A set of distinct characters
 */
function generateRandomCharacters(numOfCharacters) {
    let characters = new Set();

    while(characters.size != numOfCharacters) {
        let randomCharacter = allCharacters[getRandomInt(allCharacters.length - 1)];

        characters.add(randomCharacter);
    }

    return characters;
}

/**
 * Generates a random number between 0 (inclusive) and max (inclusive)
 * @param {Number} max 
 * @returns A random number between 0 (inclusive) and max (inclusive)
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}