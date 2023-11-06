/**
 * @template T
 */
export class BaseBloc {
  /**
   * @type {String}
   */
  #persistKey;

  /**
   * @type {Function[]}
   */
  #subscribers;

  /** @type {T} */
  #state;

  /**
   * @param {String} persistKey
   */
  constructor(persistKey) {
    this.#subscribers = [];
    this.#persistKey = persistKey;

    this.#loadPersistedState();

    window.addEventListener("beforeunload", () => {
      this.#savePersistedState();
    });
  }

  /**
   * @param {T} newState
   */
  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#notifySubscribers();
  }

  /**
   * @returns {T}
   */
  getState() {
    return this.#state;
  }

  /**
   * @param {Function} callback
   */
  subscribe(callback) {
    this.#subscribers.push(callback);
    this.#notifySubscriber(callback);
  }

  /**
   * @param {Function} callback
   */
  unsubscribe(callback) {
    const index = this.#subscribers.indexOf(callback);
    if (index !== -1) {
      this.#subscribers.splice(index, 1);
    }
  }

  #loadPersistedState() {
    const persistedState = sessionStorage.getItem(this.#persistKey);
    if (persistedState) {
      this.#state = JSON.parse(persistedState);
      sessionStorage.removeItem(this.#persistKey);
    }
  }

  #savePersistedState() {
    sessionStorage.setItem(this.#persistKey, JSON.stringify(this.#state));
  }

  #notifySubscribers() {
    this.#subscribers.forEach((callback) => {
      this.#notifySubscriber(callback);
    });
  }

  #notifySubscriber(callback) {
    callback(this.#state);
  }
}
