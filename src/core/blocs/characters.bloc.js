import { GetCharactersUseCase } from "../usecases/characters.usecase.js";
import { BaseBloc } from "./base.bloc.js";
import notificationBloc from "./notification.bloc.js";

/**
 * @typedef {Object} CharactersState
 * @property {Array<import("../model/character.model.js").CharacterType>} characters
 * @property {number} currentPage
 * @property {number} lastPage
 */
class CharactersBloc extends BaseBloc {
  /**
   * @param {string} stateName
   */
  constructor(stateName) {
    super(stateName);
  }

  /**
   * @returns {Promise<void>}
   */
  async loadCharacters() {
    try {
      const useCase = new GetCharactersUseCase();
      const /** @type {CharactersState} */ state = this.getState();
      const page = state?.currentPage || 1;
      this.setState({ currentPage: page });
      const charactersOutput = await useCase.execute({ page });
      this.setState({
        characters: charactersOutput.characters,
        lastPage: charactersOutput.lastPage,
      });
    } catch (error) {
      notificationBloc.setNotification("Error en los characters");
      throw error;
    }
  }

  /**
   * @returns {Array<import("../model/character.model.js").CharacterType>}
   */
  getCharacters() {
    const /** @type {CharactersState} */ state = this.getState();
    return state.characters;
  }

  async nextPage() {
    const /** @type {CharactersState} */ state = this.getState();
    const currentPage = state.currentPage ? state.currentPage + 1 : 1;
    const lastPage = state.lastPage;
    if (currentPage <= lastPage) {
      this.setState({ currentPage });
      await this.loadCharacters();
    }
  }

  async previousPage() {
    const /** @type {CharactersState} */ state = this.getState();
    const currentPage = state.currentPage ? state.currentPage - 1 : 1;
    if (currentPage > 0) {
      this.setState({ currentPage });
      await this.loadCharacters();
    }
  }
}

const charactersBlocInstance = new CharactersBloc("characters_state");
export default charactersBlocInstance;
