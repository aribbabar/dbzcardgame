let randomCharacters = Array.from(generateRandomCharacters(4));
let cards = generateCards(randomCharacters);

// Append enemy cards
document.getElementById("enemy-cards").appendChild(cards[cards.length - 1]);

// Append player cards
for(let i = 0;i < cards.length - 1;i++) {
    document.getElementById("player-cards").appendChild(cards[i]);
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