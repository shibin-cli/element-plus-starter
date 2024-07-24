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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia()).use(router).component('SvgIcon', SgvIcon).use(ElementPlus).use(i18n)
app.mount('#app')
