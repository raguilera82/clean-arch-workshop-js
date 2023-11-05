import axios from "axios";

export class CharactersData {
  /**
   * @param {number} page
   */
  async fetchCharacters(page) {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    if (response.status === 200) {
      const /**@type {import("./types.js").CharactersDataDto} */ data =
          await response.data;
      return data;
    } else {
      throw new Error(response.statusText);
    }
  }
}
