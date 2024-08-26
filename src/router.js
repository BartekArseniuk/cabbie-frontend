import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage/HomePage.vue';
import OfferPage from '@/components/OfferPage/OfferPage.vue';
import AboutUsPage from './components/AboutUs/AboutUsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/Offer',
    name: 'Offer',
    component: OfferPage
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: AboutUsPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;