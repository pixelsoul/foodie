import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')