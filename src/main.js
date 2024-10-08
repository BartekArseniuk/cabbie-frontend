import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/fonts.scss'
import './styles/sweetalert2-custom.scss'
import '@fortawesome/fontawesome-free/css/all.css';
import store from './store';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import router from './router'

const app = createApp(App);

const options = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Cabbie';
  next();
});

app.use(Toast, options);
app.use(router);
app.use(store);
app.mount('#app');