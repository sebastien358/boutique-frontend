import './assets/scss/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000/api'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(createPinia())
app.use(router)
app.mount('#app')
