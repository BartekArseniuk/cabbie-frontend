import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/fonts.scss'
import './styles/sweetalert2-custom.scss'
import '@fortawesome/fontawesome-free/css/all.css';

import router from './router'

const app = createApp(App);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Cabbie';
  next();
});

app.use(router);
app.mount('#app');