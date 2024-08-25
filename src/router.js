import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage/HomePage.vue';
import OfferPage from '@/components/OfferPage/OfferPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/offer',
    name: 'Offer',
    component: OfferPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;