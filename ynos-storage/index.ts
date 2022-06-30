/*
 * @Description: 加载器
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-04-24 10:17:12
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-06-30 15:30:13
 */
import { WebStorage } from './src//WebStorage'
import { MemoryStorage } from './src/MemoryStorage'

export interface Option {
  /** storage name session, local, memory */
  storage?: "local" | "session" | "memory"
  /** name variable Vue.[ls] or this.[$ls], */
  name?: string
  /** key prefix */
  namespace?: string
}

// eslint-disable-next-line
const _global: any = (typeof window !== 'undefined' ? window : globalThis || {});

export const VueStorage = {
  install(Vue: any, options: Option = {}) {
    let version: Array<string> = Vue?.version?.split('.') || []
    if (version.length <= 0) {
      console.error('暂未获取vue版本')
      return false
    }

    const _options = {
      ...options,
      storage: options.storage || 'local',
      name: options.name || options.storage == 'local' ? 'ls' : options.storage == 'session' ? 'ss' : 'storage',
    };

    if (_options.storage && ['local', 'session', 'memory'].indexOf(_options.storage) === -1) {
      throw new Error(`ynos-storage: Storage "${_options.storage}" 不支持`);
    }

    let store = null;

    switch (_options.storage) { // eslint-disable-line
      case 'local':
        store = 'localStorage' in _global
          ? _global.localStorage
          : null
          ;
        break;
      case 'session':
        store = 'sessionStorage' in _global
          ? _global.sessionStorage
          : null
          ;
        break;
      case 'memory':
        store = MemoryStorage;
        break;
    }

    if (!store) {
      store = MemoryStorage;
      // eslint-disable-next-line
      console.error(`ynos-storage: Storage "${_options.storage}" 系统不支持，请使用内存存储`);
      return
    }

    const ls = new WebStorage(store);

    ls.setOptions(Object.assign(ls.options, {
      namespace: '',
    }, _options || {}));

    if (version[0] == '2') {
      Vue[_options.name] = ls; // eslint-disable-line
      Object.defineProperty(Vue.prototype, `$${_options.name}`, {
        /**
         * Define $ls property
         *
         * @return {WebStorage}
         */
        get() {
          return ls;
        },
      });
    } else if (version[0] == '3') {
      Vue.config.globalProperties[_options.name] = ls;
      return Vue
    }
  }
}

// eslint-disable-next-line
_global.VueStorage = VueStorage;

export default { VueStorage, WebStorage };