import { CharactersData } from "../data/characters.data.js";
import { Character } from "../model/character.model.js";

/**
 * @typedef {Object} GetCharactersOutput
 * @property {Character[]} characters
 * @property {number} lastPage
 *
 */
export class CharactersService {
  /**
   * @param {number} page
   *
   * @returns {Promise<GetCharactersOutput>}
   */
  async getCharacters(page) {
    const repository = new CharactersData();
    const data = await repository.fetchCharacters(page);

    const characters = data.results.map((result) => {
      return new Character({
        characterId: result.id,
        fullname: result.name,
        imageUrl: result.image,
        spice: result.species,
        status: result.status,
      });
    });

    return {
      characters,
      lastPage: data.info.pages,
    };
  }
}
