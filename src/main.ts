import './assets/css/main.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import { bootstrap } from 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {router} from "@/router";
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faUserSecret,
    faBars,
    faTrash,
    faPenToSquare,
    faMagnifyingGlass,
    faMessage,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faBars, faTrash, faPenToSquare, faMagnifyingGlass, faMessage, faXmark)

const pinia = createPinia()
const app = createApp(App)

app.use(bootstrap)
app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
