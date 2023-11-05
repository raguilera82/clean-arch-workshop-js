import { CharactersData } from "../data/characters.data.js";
import { Character } from "../model/character.model.js";
import { CacheService } from "../services/cache.service.js";

/**
 * @typedef {Object} GetCharactersOutput
 * @property {Character[]} characters
 * @property {number} lastPage
 *
 */
/**
 * @typedef {Object} GetCharacterInput
 * @property {number} page
 */
export class GetCharactersUseCase {
  /**
   * @param {GetCharacterInput} input
   *
   * @returns {Promise<GetCharactersOutput>}
   */
  async execute(input) {
    const cacheService = new CacheService();
    const cacheData = cacheService.load(`page-${input.page}`);
    if (!cacheData) {
      const repository = new CharactersData();
      const data = await repository.fetchCharacters(input.page);

      const characters = data.results.map((result) => {
        return new Character({
          characterId: result.id,
          fullname: result.name,
          imageUrl: result.image,
          spice: result.species,
          status: result.status,
        });
      });

      const result = {
        characters,
        lastPage: data.info.pages,
      };

      cacheService.save(`page-${input.page}`, JSON.stringify(result));

      return result;
    }
    return JSON.parse(cacheData);
  }
}
