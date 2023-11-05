/**
 * @typedef {Object} CharacterType
 * @property {number} characterId
 * @property {string} imageUrl
 * @property {string} fullname
 * @property {string} status
 * @property {string} spice
 */
export class Character {
  /**
   * Crea una instancia de Character.
   * @param {CharacterType} characterData - Datos del personaje.
   */
  constructor({ characterId, imageUrl, fullname, status, spice }) {
    this.characterId = characterId;
    this.imageUrl = imageUrl;
    this.fullname = fullname;
    this.status = status;
    this.spice = spice;
  }
}
