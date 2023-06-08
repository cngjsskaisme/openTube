import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import VideoList from './components/VideoList.vue'

import setting from './personalData/setting'
import { useSettingStore } from './store/setting'

const routes = [
  { path: '/', component: VideoList }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

useSettingStore().setSetting(setting.setting)

app.mount('#app')