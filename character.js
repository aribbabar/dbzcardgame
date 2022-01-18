class Character {
  constructor(name, powerLevel) {
    this.name = name;
    this.powerLevel = powerLevel;
  }

  getName() {
    return this.name;
  }

  getPowerLevel() {
    return this.powerLevel;
  }

  getBackgroundUrl() {
    let lowerCaseName = this.name.toLowerCase();

    return 'url("images/' + lowerCaseName.replace(/\s+/g, "") + '.png")';
  }
}

export default Character;
