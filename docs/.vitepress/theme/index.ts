import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css'
import '@/custom-ui/styles/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas,far)
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer)
    app.config.warnHandler = (message,comp,node) => {
      if(node.includes('<AntDesign>')){
        return null
      }else{
        console.warn(message,comp,node)
      }
    };
  }
}