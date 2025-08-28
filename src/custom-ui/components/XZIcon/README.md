# ICON 组件

## 基于 Font Awesome 图标库

[vue集成地址](https://docs.fontawesome.com/web/use-with/vue)
[图标搜索地址](https://fontawesome.com/search?q=fa&s=solid&o=r)

1. vue3集成 下载vue组件
```bash
$ npm install @fortawesome/vue-fontawesome@latest-3
```

2. 添加 SVG 核心
```bash
$ npm install @fortawesome/fontawesome-svg-core
```

3. 添加免费图标包
```bash
$ npm install @fortawesome/free-solid-svg-icons # 实心
$ npm install @fortawesome/free-regular-svg-icons # 空心
```

4. vue项目中使用
```js
// main.js
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas,far)
// icon.vue
<font-awesome-icon icon="fa-solid fa-dog" />
<font-awesome-icon icon="fa-solid fa-fan" />
```