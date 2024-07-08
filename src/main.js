import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

import { createPinia } from 'pinia'
import {LoadingPlugin} from 'vue-loading-overlay'; //loading
import 'vue-loading-overlay/dist/css/index.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(CKEditor)
app.use(createPinia())
app.use(router)
app.use(LoadingPlugin);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
