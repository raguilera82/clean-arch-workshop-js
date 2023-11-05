export class CacheService {
  /**
   * @param {String} key
   * @return {String}
   */
  load(key) {
    const cacheData = localStorage.getItem(key);
    return cacheData;
  }

  /**
   * @param {String} key
   * @param {String} value
   */
  save(key, value) {
    localStorage.setItem(key, value);
  }
}
