import { LitElement, html } from "lit";
import { CharactersBloc } from "../core/blocs/characters.bloc.js";

export class CharactersContainer extends LitElement {
  static get properties() {
    return {
      characters: { type: Array },
      currentPage: { type: Number },
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.currentPage = 1;

    this.charactersBloc = CharactersBloc.getInstance();
    await this.charactersBloc.loadCharacters();

    const handleState = (
      /** @type {import("../core/blocs/characters.bloc.js").CharactersState} */ state
    ) => {
      this.characters = state.characters;
      this.currentPage = state.currentPage;
    };

    this.charactersBloc.subscribe(handleState);
  }

  showCurrentPage() {
    return html`<p>Page: ${this.currentPage}</p>`;
  }

  showActions() {
    return html`<button @click="${() => this.charactersBloc.previousPage()}">
        Previous</button
      ><button @click="${() => this.charactersBloc.nextPage()}">Next</button>`;
  }

  render() {
    return html`${this.showCurrentPage()}${this.showActions()}${this.characters
      ? this.characters.map((character) => {
          return html`<div>${character.fullname}</div>`;
        })
      : ``}`;
  }
}

window.customElements.define("characters-app", CharactersContainer);
