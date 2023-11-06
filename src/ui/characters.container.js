import { LitElement, html } from "lit";
import charactersBlocInstance from "../core/blocs/characters.bloc.js";
import notificationBlocInstance from "../core/blocs/notification.bloc.js";

export class CharactersContainer extends LitElement {
  static get properties() {
    return {
      characters: { type: Array },
      currentPage: { type: Number },
      notification: { type: String },
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.currentPage = 1;
    this.notification = "";

    await charactersBlocInstance.loadCharacters();

    const handleStateCharacters = (
      /** @type {import("../core/blocs/characters.bloc.js").CharactersState} */ state
    ) => {
      this.characters = state.characters;
      this.currentPage = state.currentPage;
    };

    charactersBlocInstance.subscribe(handleStateCharacters);

    const handleStateNotification = (
      /** @type {import("../core/blocs/notification.bloc.js").NotificationState} */ state
    ) => {
      this.notification = state.notification;
    };

    notificationBlocInstance.subscribe(handleStateNotification);
  }

  showNotification() {
    return html`<div>${this.notification}</div>`;
  }

  showCurrentPage() {
    return html`<p>Page: ${this.currentPage}</p>`;
  }

  showActions() {
    return html`<button @click="${() => charactersBlocInstance.previousPage()}">
        Previous</button
      ><button @click="${() => charactersBlocInstance.nextPage()}">
        Next
      </button>`;
  }

  render() {
    return html`${this.showNotification()}${this.showCurrentPage()}${this.showActions()}${this
      .characters
      ? this.characters.map((character) => {
          return html`<div>${character.fullname}</div>
            <img src="${character.imageUrl}" />`;
        })
      : ``}`;
  }
}

window.customElements.define("characters-app", CharactersContainer);
