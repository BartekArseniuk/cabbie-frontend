import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/fonts.scss'
import router from './router';

createApp(App)
.use(router)
.mount('#app')
