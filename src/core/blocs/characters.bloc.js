import { CharactersService } from "../services/characters.service.js";
import { BaseBloc } from "./base.bloc.js";

/**
 * @typedef {Object} CharactersState
 * @property {Array<import("../model/character.model.js").CharacterType>} characters
 * @property {number} currentPage
 * @property {number} lastPage
 */
export class CharactersBloc extends BaseBloc {
  static instance = null;

  /**
   * @param {string} stateName
   */
  constructor(stateName) {
    super(stateName);

    if (CharactersBloc.instance) {
      return CharactersBloc.instance;
    }

    CharactersBloc.instance = this;
  }

  /**
   * @returns {CharactersBloc}
   */
  static getInstance() {
    if (!CharactersBloc.instance) {
      CharactersBloc.instance = new CharactersBloc("characters_js_state");
    }
    return CharactersBloc.instance;
  }

  /**
   * @returns {Promise<import("../services/characters.service.js").GetCharactersOutput>}
   */
  async loadCharacters() {
    const service = new CharactersService();
    const /** @type {CharactersState} */ state = this.getState();
    const charactersOutput = await service.getCharacters(state.currentPage);
    this.setState({
      characters: charactersOutput.characters,
      lastPage: charactersOutput.lastPage,
    });
    return charactersOutput;
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
    const currentPage = state.currentPage + 1;
    const lastPage = state.lastPage;
    if (currentPage <= lastPage) {
      this.setState({ currentPage: state.currentPage + 1 });
      await this.loadCharacters();
    }
  }

  async previousPage() {
    const /** @type {CharactersState} */ state = this.getState();
    const currentPage = state.currentPage - 1;
    if (currentPage > 0) {
      this.setState({ currentPage });
      await this.loadCharacters();
    }
  }
}
