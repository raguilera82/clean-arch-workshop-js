/**
 * Información sobre los personajes en el universo de Rick and Morty.
 * @typedef {Object} CharacterInfoDto
 * @property {number} count - El número total de personajes.
 * @property {number} pages - El número de páginas.
 * @property {string|null} next - URL de la siguiente página.
 * @property {string|null} prev - URL de la página anterior.
 */

/**
 * Representa un personaje en el universo de Rick and Morty.
 * @typedef {Object} CharacterDto
 * @property {number} id - El ID del personaje.
 * @property {string} name - El nombre del personaje.
 * @property {string} status - El estado del personaje.
 * @property {string} species - La especie del personaje.
 * @property {string} type - El tipo del personaje.
 * @property {string} gender - El género del personaje.
 * @property {Object} origin - Origen del personaje.
 * @property {string} origin.name - Nombre del origen.
 * @property {string} origin.url - URL del origen.
 * @property {Object} location - Ubicación actual del personaje.
 * @property {string} location.name - Nombre de la ubicación.
 * @property {string} location.url - URL de la ubicación.
 * @property {string} image - URL de la imagen del personaje.
 * @property {string[]} episode - Lista de URLs de los episodios en los que aparece el personaje.
 * @property {string} url - URL del recurso del personaje.
 * @property {string} created - Fecha de creación del recurso.
 */

/**
 * Información sobre un personaje y su URL.
 * @typedef {Object} CharactersDataDto
 * @property {CharacterDto[]} results - Lista de personajes.
 * @property {CharacterInfoDto} info - Información sobre los personajes.
 */
