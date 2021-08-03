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
        return "url(\"images/" + this.name.replace(/\s+/g, "") + ".png\")";
    }
}