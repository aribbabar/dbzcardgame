let allCharacters = new Array();
let numOfCharacters = 0;

class Character {
    constructor(name, powerLevel) {
        this.name = name;
        this.powerLevel = powerLevel;

        allCharacters.push(this);
        numOfCharacters++;
    }

    getName() {
        return this.name;
    }

    getPowerLevel() {
        return this.powerLevel;
    }

    getBackgroundUrl() {
        let lowerCaseName = this.name.toLowerCase();

        return "url(\"images/" + lowerCaseName.replace(/\s+/g, "") + ".png\")";
    }
}