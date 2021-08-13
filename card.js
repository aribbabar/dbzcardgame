class Card {
    constructor(character) {
        this.card = document.createElement("div");
        this.card.className = "card";
        this.card.style.backgroundImage = character.getBackgroundUrl();

        this.cardTitle = document.createElement("h1");
        this.cardTitle.className = "card-title";
        this.cardTitle.innerHTML = character.getName();

        this.card.appendChild(this.cardTitle);

        this.character = character;
    }

    getCard() {
        return this.card;
    }

    getCardTitle() {
        return this.cardTitle;
    }
}