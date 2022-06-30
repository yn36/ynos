/*
 * @Description: MemoryStorage
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-04-24 17:26:22
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-04-24 17:26:38
 */
/* eslint class-methods-use-this: off */

let ls: any = {};

class MemoryStorageInterface {
  constructor() {
    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get() {
        return Object.keys(ls).length;
      },
    });
  }

  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  getItem(name: string) {
    return name in ls ? ls[name] : null;
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  setItem(name: string | number, value: any) {
    ls[name] = value;

    return true;
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeItem(name: string) {
    const found = name in ls;

    if (found) {
      return delete ls[name];
    }

    return false;
  }

  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  clear() {
    ls = {};

    return true;
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  key(index: string | number) {
    const keys: any = Object.keys(ls);

    return typeof keys[index] !== 'undefined' ? keys[index] : null;
  }
}

const MemoryStorage = new MemoryStorageInterface();

export { MemoryStorage };
