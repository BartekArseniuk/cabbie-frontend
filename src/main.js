import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/fonts.scss'
import router from './router';

const app = createApp(App);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Cabbie';
  next();
});

app.use(router);
app.mount('#app');