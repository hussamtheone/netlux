import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useShowsStore } from './stores/shows'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

useShowsStore().load()
app.mount('#app')
