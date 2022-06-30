/*
 * @Description: WebStorage
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-04-19 11:41:43
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-04-19 12:02:11
 */

export interface Options {
  namespace: string
}

/**
 * @description: Storage Bridge
 * @param {Storage} storage
 */
export class WebStorage {
  storage: Storage;
  options: Options;
  length: number = 0;

  /**
   * @description: constructor
   * @param {Storage} storage
   */
  constructor(storage: Storage) {
    this.storage = storage;
    this.options = {
      namespace: ''
    }

    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get() {
        return this.storage.length;
      },
    });
  }

  /**
   * @description: 设置 options
   * @param {Options} options
   */
  setOptions(options: Options) {
    this.options = Object.assign(this.options, options);
  }

  /**
   * @description: set 方法
   * @param {string} name 
   * @param {any} value
   * @param {number} expire 过期时间
   */
  set(name: string, value: any, expire?: number) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire ? new Date().getTime() + expire : null,
    });

    this.storage.setItem(this.options.namespace + name, stringifyValue);
  }

  /**
   * @description: get 方法
   * @param {string} name
   * @param {any} def 默认值 如果不存在则返回默认值
   * @return {T}
   */
  get<T>(name: string, def?: any): T {
    const item = this.storage.getItem(this.options.namespace + name);

    if (item) {
      try {
        const data = JSON.parse(item);

        if (data.expire === null) {
          return data.value as T;
        }

        if (data.expire >= new Date().getTime()) {
          return data.value as T;
        }
        // this.remove(name);
      } catch (err) {
        return def as T;
      }
    }

    return def as T;
  }

  /**
   * @description: 根据key获取
   * @param {number} index
   */
  key(index: number): string | null {
    return this.storage.key(index)
  }

  /**
   * @description 移除数据
   * @param {string} name
   */
  remove(name: string) {
    return this.storage.removeItem(this.options.namespace + name);
  }

  /**
   * @description 清除所有数据
   */
  clear() {
    if (this.length === 0) {
      return;
    }

    const removedKeys = [];

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i) as string;
      const regexp = new RegExp(`^${this.options.namespace}.+`, 'i');

      if (regexp.test(key) === false) {
        continue;
      }

      removedKeys.push(key);
    }

    for (const key in removedKeys) {
      this.storage.removeItem(removedKeys[key]);
    }
  }
}