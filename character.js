let allCharacters = new Array();

class Character {
    constructor(name, powerLevel) {
        this.name = name;
        this.powerLevel = powerLevel;

        allCharacters.push(this);
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