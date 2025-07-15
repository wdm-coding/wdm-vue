import { createApp } from 'vue'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import App from '@/App.vue'
import router from '@/router'
createApp(App).use(router).mount('#app')
