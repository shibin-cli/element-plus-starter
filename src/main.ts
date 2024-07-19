import './assets/css/index.scss'
import '@/assets/css/theme.scss'

import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SgvIcon from '@/components/SvgIcon/Index.vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import i18n from './locals'

const app = createApp(App)

app.use(createPinia()).use(router).component('SvgIcon', SgvIcon).use(ElementPlus).use(i18n)
app.mount('#app')
