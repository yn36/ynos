/*
 * @Description: sesion
 * @Version: 1.0
 * @Autor: jiajun.wu
 * @Date: 2022-09-08 14:00:48
 * @LastEditors: jiajun.wu
 * @LastEditTime: 2022-09-08 15:05:17
 */

export class SessionStorage {
  key: string;

  constructor() {
    this.key = '';
  }

  /** 生成随机key */
  private getRandomString(len = 10) {
    let str = ''
    while (len--) {
      str += String.fromCharCode(48 + ~~(Math.random() * 42))
    }
    return str
  }

  private getKey() {
    let key = window.sessionStorage.getItem('sessionKey');
    if (!key) {
      key = this.getRandomString();
      window.sessionStorage.setItem('sessionKey', key);
    }
    this.key = key;
  }

  private getObj() {
    if (!this.key) {
      this.getKey();
    }
    let val = JSON.parse(window.sessionStorage.getItem(this.key) ?? '{}');
    return val || {}
  }

  /**
  * @description: get 方法
  * @param {string} key
  * @param {any} def 默认值 如果不存在则返回默认值
  * @return {T}
  */
  public get<T>(key: string, def?: any): T {
    let val = this.getObj()
    return val[key] || def;
  }

  private setObj(val: any) {
    if (!this.key) {
      this.getKey()
    }
    window.sessionStorage.setItem(this.key, JSON.stringify(val));
  }

  /**
   * @description: set 方法
   * @param {string} key 
   * @param {any} value
   */
  public set(key: string, value: any) {
    let val = this.getObj();
    val[key] = value;
    this.setObj(val);
  }

  /**
   * @description: 是否存在
   * @param {string} key
   * @return {boolean}
   */
  public exists(key: string) {
    let val = this.getObj();
    return key in val
  }

  /**
   * @description 移除数据
   * @param {string} key
   */
  public remove(key: string) {
    let val = this.getObj();
    delete val[key];
    this.setObj(val);
  }

  /**
 * @description 清除所有数据
 */
  public clear() {
    this.setObj({})
  }
}

export default {
  useStorage() {
    const ss = new SessionStorage();
    return ss;
  },
  install(Vue: any) {
    let version: Array<string> = Vue?.version?.split('.') || []
    if (version.length <= 0) {
      console.error('暂未获取vue版本')
      return false
    }
    const ss = this.useStorage();

    if (version[0] == '2') {
      Vue['ss'] = ss; // eslint-disable-line
      Object.defineProperty(Vue.prototype, `$ss`, {
        /**
         * Define $ss property
         *
         * @return {SessionStorage}
         */
        get() {
          return ss;
        },
      });
    } else if (version[0] == '3') {
      Vue['ss'] = ss; // eslint-disable-line
      Vue.config.globalProperties['ss'] = ss;
      return Vue
    }
  }
}