import axios from "axios";
import { NotificationBloc } from "../blocs/notification.bloc.js";

export class CharactersData {
  /**
   * @param {number} page
   */
  async fetchCharacters(page) {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const /**@type {import("./types.js").CharactersDataDto} */ data =
          await response.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
