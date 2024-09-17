import '@/assets/scss/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './services/router'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css'

import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseForm from '@/components/common/BaseForm.vue'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(ToastPlugin)
app.use(pinia)
app.use(router)

app.component('base-button', BaseButton)
app.component('base-input', BaseInput)
app.component('base-form', BaseForm)

app.mount('#app')
