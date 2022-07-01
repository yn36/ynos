/*
 * @Description: MemoryStorage
 * @Version: 1.0
 * @Autor: yn36
 * @Date: 2022-04-24 17:26:22
 * @LastEditors: yn36
 * @LastEditTime: 2022-07-01 16:14:17
 */
/* eslint class-methods-use-this: off */

interface Ls {
  [key: string]: Array<any>
}

let ynosLs: Ls = {};

class MemoryStorageInterface {
  constructor() {
    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get() {
        return Object.keys(ynosLs).length;
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
    return name in ynosLs ? ynosLs[name] : null;
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  setItem(name: string | number, value: any) {
    ynosLs[name] = value;

    return true;
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeItem(name: string) {
    const found = name in ynosLs;

    if (found) {
      return delete ynosLs[name];
    }

    return false;
  }

  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  clear() {
    ynosLs = {};

    return true;
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  key(index: string | number) {
    const keys: any = Object.keys(ynosLs);

    return typeof keys[index] !== 'undefined' ? keys[index] : null;
  }
}

const MemoryStorage = new MemoryStorageInterface();

export { MemoryStorage };
