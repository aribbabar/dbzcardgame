let cards = generateCards(4);

addCardsToDocument();
addEventListeners();

/**
 * Handles all behaviour when a card is clicked
 * @param {Event} event 
 */
function cardOnClick(event) {
    let card = event.currentTarget.parameter;

    card.getCard().style.transform = "translateY(-10px)";
    
    changeCardsTextToPowerLevel();
    compareCharacters(card);
    removeEventListeners();
    addNextBtn(card);
}

/**
 * Adds the next button and also adds a event listener on the button
 * @param {Card} card 
 */
function addNextBtn(card) {
    let nextBtn = document.getElementById("next-btn");
    
    nextBtn.style.display = "block";

    nextBtn.addEventListener("click", function() {
        changeCardsTextToCharacterName();
        changeCharacters();
        removeHealthLoss();

        nextBtn.style.display = "none";
    });
}

/**
 * Remove the health loss text
 */
function removeHealthLoss() {
    document.getElementById("enemy-health-loss").style.display = "none";
    document.getElementById("player-health-loss").style.display = "none";
}

/**
 * Creates and sets a set of new random characters
 */
function changeCharacters() {
    cards = generateCards(4);

    removeCardsFromDocument();
    addCardsToDocument();
    addEventListeners();
}

/**
 * Remove all cards from both enemy and player container
 */
function removeCardsFromDocument() {
    let playerCardsContainer = document.getElementById("player-cards");
    let enemyCardContainer = document.getElementById("enemy-cards");

    // Remove all player cards
    while(playerCardsContainer.firstChild) {
        playerCardsContainer.removeChild(playerCardsContainer.firstChild);
    }

    // Remove enemy card
    enemyCardContainer.removeChild(enemyCardContainer.firstChild);
}

/**
 * Remove event listeners from player cards
 */
function removeEventListeners() {
    for(let i = 1;i < cards.length;i++) {
        cards[i].getCard().removeEventListener("click", cardOnClick);
    }
}

/**
 * Compares the player character that was clicked to the enemy character's power level.
 * Also handles win and lose states
 * @param {Card} card The player card that you want to compare with
 */
function compareCharacters(card) {
    let maxHealth = 10;
    let playerPowerLevel = card.character.getPowerLevel();
    let enemyPowerLevel = cards[0].character.getPowerLevel();

    let playerHealth = document.getElementById("player-health");
    let enemyHealth = document.getElementById("enemy-health");

    let playerHealthText = document.getElementById("player-health-text");
    let enemyHealthText = document.getElementById("enemy-health-text");

    // Player wins: Enemy loses health
    if(playerPowerLevel > enemyPowerLevel) {
        let enemyHealthLossElement = document.getElementById("enemy-health-loss");
        let enemyHealthLoss = playerPowerLevel - enemyPowerLevel;
        let newEnemyHealth = enemyHealthText.innerHTML - enemyHealthLoss;

        enemyHealth.style.width = (newEnemyHealth / maxHealth) * 100 + "%";

        enemyHealthText.innerHTML = newEnemyHealth;

        enemyHealthLossElement.style.display = "block";
        enemyHealthLossElement.innerHTML = "- " + enemyHealthLoss;
    }

    // Enemey wins: Player loses health
    if(playerPowerLevel < enemyPowerLevel) {
        let playerHealthLossElement = document.getElementById("player-health-loss");
        let playerHealthLoss = (enemyPowerLevel - playerPowerLevel);
        let newPlayerHealth = playerHealthText.innerHTML - playerHealthLoss;

        playerHealth.style.width = (newPlayerHealth / maxHealth) * 100 + "%";

        playerHealthText.innerHTML = newPlayerHealth;

        playerHealthLossElement.style.display = "block";
        playerHealthLossElement.innerHTML = "- " + playerHealthLoss;
    }

    if(playerHealthText.innerHTML <= 0) {
        alert("ENEMY WINS!");
        location.reload();
    } else if(enemyHealthText.innerHTML <= 0) {
        alert("PLAYER WINS!");
        location.reload();
    }
}

function changeCardsTextToCharacterName() {
    cards.forEach(card => {
        card.cardTitle.innerHTML = card.character.getName();
        card.cardTitle.classList.remove("large-font-size");
    });
}

/**
 * Changes all cards in the documents' title for its corresponding character power level
 */
function changeCardsTextToPowerLevel() {
    cards.forEach(card => {
        card.cardTitle.innerHTML = card.character.getPowerLevel();
        card.cardTitle.className = "large-font-size";
    });
}

/**
 * Adds event listeners to player cards
 */
function addEventListeners() {
    for(let i = 1;i < cards.length;i++) {
        // Add an event listener to each player card
        cards[i].getCard().addEventListener("click", cardOnClick);
        cards[i].getCard().parameter = cards[i];
    }
}

/**
 * Adds both enemy and player cards to document
 */
function addCardsToDocument() {
    document.getElementById("enemy-cards").appendChild(cards[0].getCard());

    for(let i = 1;i < cards.length;i++) {    
        // Append each player card to the player cards container
        document.getElementById("player-cards").appendChild(cards[i].getCard());
    }
}

/**
 * Creates and returns a new array of random character cards (divs)
 * @param {Number} numOfCards 
 * @returns A new array of random character cards
 */
function generateCards(numOfCards) {
    let cards = new Array();
    let randomCharacters = new Set();

    // Generate random characters
    while(randomCharacters.size != numOfCards) {
        let randomCharacter = allCharacters[getRandomInt(allCharacters.length - 1)];

        randomCharacters.add(randomCharacter);
    }

    randomCharacters = Array.from(randomCharacters);

    // Generate cards
    for(let i = 0;i < numOfCards;i++) {
        let card = new Card(randomCharacters[i]);

        cards.push(card);
    }

    return cards;
}

/**
 * Generates a random number between 0 (inclusive) and max (inclusive)
 * @param {Number} max 
 * @returns A random number between 0 (inclusive) and max (inclusive)
 */
 function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}