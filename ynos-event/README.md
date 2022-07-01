# ynos-storage

用于从js上下文处理localStorage、sessionStorage、memoryStorage

## 安装

#### NPM

```bash
npm install ynos-storage --save
```

#### Yarn

``` bash
yarn add ynos-storage
```

#### Bower

``` bash
bower install ynos-storage --save
```

## Development Setup

``` bash
# install dependencies
npm install

# build dist files
npm run build
```

## 使用

Vue2.x

``` js
import { Storage } from 'ynos-storage';

const options = {
  namespace: 'ynosjs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

//or
//Vue.use(Storage);

new Vue({
    el: '#app',
    mounted: function() {
        Vue.ls.set('foo', 'boo');
        //Set expire for item
        Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
        Vue.ls.get('foo');
        Vue.ls.get('boo', 10); //if not set boo returned default 10
        
        Vue.ls.remove('foo');
    }
});
```

Vue3.x
``` js
import { Storage } from 'ynos-storage';
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

const options = {
  namespace: 'ynosjs__', // key prefix
  name: 'ls', // name variable
  storage: 'local', // storage name session, local, memory
};

app.use(Storage, options)

//or
//Vue.use(Storage);

const { proxy } = getCurrentInstance() as ComponentInternalInstance

proxy?.ls.set('foo', 'boo');
//Set expire for item
proxy?.ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
proxy?.ls.get('foo');
proxy?.ls.get('boo', 10); //if not set boo returned default 10
proxy?.ls.remove('foo');
```



Use in js file
``` js
// localStore.js
import { Storage }  from 'ynos-storage';
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

const { ls } = Storage.useStorage(options)

export default ls

// somefile.js
import ls from 'localStore.js';

ls.set('foo', 'boo');
ls.get('foo');
```

#### Global

- `Vue.ls`
 
#### Context
- `this.$ls` | `proxy?.ls`

## API

#### `Vue.ls.get(name, def)`

返回存储中`name`下的值。在返回之前从JSON内部解析值。

- `def`: default null, 如果未设置`name` 则返回默认值

#### `Vue.ls.set(name, value, expire)`

在存储器中的`name`下持久化`value`。在内部将`value`转换为JSON。

- `expire`: default null, 为存储添加过期时间

#### `Vue.ls.remove(name)`

从存储器中删除`name`。如果成功删除属性，则返回`true`，否则返回`false`。

#### `Vue.ls.clear()`

清除存储。