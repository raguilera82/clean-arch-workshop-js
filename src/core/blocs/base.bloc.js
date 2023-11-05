/**
 * Clase que define un Bloc base para el manejo de estado y suscripción a cambios.
 * @template T
 */
export class BaseBloc {
  /**
   * Lista de suscriptores que reaccionarán a cambios de estado.
   */
  #subscribers = [];

  /**
   * Estado actual del Bloc.
   * @type {T}
   */
  #state;

  /**
   * Clave para persistir el estado en el almacenamiento local.
   */
  #persistKey;

  /**
   * Crea una instancia del Bloc.
   * @param {string} persistKey - Clave para persistir el estado en el almacenamiento local.
   */
  constructor(persistKey) {
    this.#persistKey = persistKey;
    this.loadPersistedState();

    window.addEventListener("beforeunload", () => {
      this.savePersistedState();
    });
  }

  /**
   * Carga el estado previamente persistido desde el almacenamiento local.
   */
  loadPersistedState() {
    const persistedState = localStorage.getItem(this.#persistKey);
    if (persistedState) {
      this.#state = JSON.parse(persistedState);
      localStorage.removeItem(this.#persistKey);
    }
  }

  /**
   * Guarda el estado actual en el almacenamiento local.
   */
  savePersistedState() {
    localStorage.setItem(this.#persistKey, JSON.stringify(this.#state));
  }

  /**
   * Establece un nuevo estado combinando el estado actual con el nuevo estado proporcionado.
   * Luego notifica a los suscriptores sobre el cambio.
   * @param {T} newState - Nuevo estado a aplicar.
   */
  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#notifySubscribers();
  }

  /**
   * Obtiene el estado actual del Bloc.
   * @returns {T} - Estado actual del Bloc.
   */
  getState() {
    return this.#state;
  }

  /**
   * Suscribe una función para recibir notificaciones sobre cambios de estado.
   * @param {Function} callback - Función a suscribir.
   */
  subscribe(callback) {
    this.#subscribers.push(callback);
    this.#notifySubscriber(callback);
  }

  /**
   * Desuscribe una función para dejar de recibir notificaciones sobre cambios de estado.
   * @param {Function} callback - Función a desuscribir.
   */
  unsubscribe(callback) {
    const index = this.#subscribers.indexOf(callback);
    if (index !== -1) {
      this.#subscribers.splice(index, 1);
    }
  }

  /**
   * Notifica a todos los suscriptores sobre el cambio de estado.
   */
  #notifySubscribers() {
    this.#subscribers.forEach((callback) => {
      this.#notifySubscriber(callback);
    });
  }

  /**
   * Notifica a un suscriptor específico sobre el cambio de estado.
   * @param {Function} callback - Función del suscriptor a notificar.
   */
  #notifySubscriber(callback) {
    callback(this.#state);
  }
}
