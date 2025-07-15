import { createApp } from 'vue'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import globProvide from '@/utils/tools/index'
import App from '@/App.vue'
import router from '@/router'
createApp(App).use(router).use(globProvide).mount('#app')
